import { useState, useEffect, useRef, Children, FC, ReactNode } from 'react';
import './Carousel.css';

interface CarouselProps {
  children: ReactNode;
  numVisibleItems?: number;
}

const Carousel: FC<CarouselProps> = ({ children, numVisibleItems = 1 }) => {
  /* ────────────────────────────
     1.  State & Refs
  ──────────────────────────── */
  const rawItems = Children.toArray(children);
  const realCount = rawItems.length;

  // Start on the first real item (after the head clones)
  const [currentIndex, rawSetCurrentIndex] = useState(numVisibleItems);
  const [itemWidth, setItemWidth]   = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(300);               // ms

  const trackRef    = useRef<HTMLDivElement>(null);
  const containerRef= useRef<HTMLDivElement>(null);
  const itemRef     = useRef<HTMLDivElement>(null);

  /* ────────────────────────────
     2.  Build `[tail clones] + real + [head clones]`
  ──────────────────────────── */
  const items = [
    ...rawItems.slice(-numVisibleItems),
    ...rawItems,
    ...rawItems.slice(0, numVisibleItems),
  ];
  const totalWithClones = items.length;

  /* ────────────────────────────
     3.  Helpers
  ──────────────────────────── */
  const getTranslateX = () => {
    const containerWidth = itemWidth * numVisibleItems;
    const offset = (itemWidth * currentIndex) + itemWidth / 2 - containerWidth / 2;
    return -offset;
  };

  const jumpWithoutAnimation = (target: number) => {
    if (!trackRef.current) return;
    setTransitionDuration(0); // Temporarily disable transition
    
    rawSetCurrentIndex(target);
    // re‑enable transition on the next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionDuration(300); // Reset to default transition duration
      });
      });
  };

  /* ────────────────────────────
     4.  Step‑by‑step animation
  ──────────────────────────── */
  const stepToIndex = (target: number) => {
    if (target === currentIndex) return;

    const direction   = Math.sign(target - currentIndex);         // +1 or -1
    const stepsNeeded = Math.abs(target - currentIndex);

    for (let i = 1; i <= stepsNeeded; i++) {
      setTimeout(() => {
        rawSetCurrentIndex(prev => prev + direction);
      }, (i - 1) * transitionDuration);
    }
  };

  /* ────────────────────────────
     5.  Snap back if we walk into clones
  ──────────────────────────── */
  useEffect(() => {
    // Wait exactly one frame (= one CSS transition) before checking bounds
    const id = setTimeout(() => {
      if (currentIndex >= realCount + numVisibleItems) {
        jumpWithoutAnimation(numVisibleItems);                         // back to first real
      } else if (currentIndex < numVisibleItems) {
        jumpWithoutAnimation(realCount + numVisibleItems - 1);         // back to last real
      }
    }, transitionDuration);

    return () => clearTimeout(id);
  }, [currentIndex, realCount, numVisibleItems, transitionDuration]);

  /* ────────────────────────────
     6.  Measure width once items render
  ──────────────────────────── */
  useEffect(() => {
    debugger;
    if (itemRef.current) setItemWidth(itemRef.current.offsetWidth);
  }, [numVisibleItems]);

  /* ────────────────────────────
     7.  Render
  ──────────────────────────── */
  return (
    <div
      className="carousel-container"
      ref={containerRef}
      style={{ width: `${itemWidth * numVisibleItems}px` }}
    >
      <div
        className="carousel-track"
        ref={trackRef}
        style={{
          transform: `translateX(${getTranslateX()}px)`,
          transition: `transform ${transitionDuration}ms ease-in-out`,
          width: `${itemWidth * totalWithClones}px`,
        }}
      >
        {items.map((item, i) => {
          const isCenter = i === currentIndex;

          return (
            <div
              key={i}
              ref={i === numVisibleItems ? itemRef : null} // first real item
              className={`carousel-item ${isCenter ? '' : 'non-center-item'}`}
              style={{
                transition: `transform ${transitionDuration}ms ease-in-out`,
              }}
            >
              {item}
              {!isCenter && (
                <div
                  className="carousel-item-overlay"
                  onClick={() => stepToIndex(i)}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Dots always point to the “real” cards */}
      <div className="carousel-dots">
        {rawItems.map((_, i) => (
          <button
            key={i}
            className={`dot ${
              currentIndex === i + numVisibleItems ? 'active' : ''
            }`}
            onClick={() => stepToIndex(i + numVisibleItems)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;