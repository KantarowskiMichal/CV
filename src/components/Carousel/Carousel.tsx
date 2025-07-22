import { useState, useEffect, useRef, Children, FC, ReactNode } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './Carousel.css';

interface CarouselProps {
  children: ReactNode;
  numVisibleItems?: number;
}

const DEFAULT_TRANSITION_DURATION = 300;
const MIN_STEP_DURATION = 100;
const SWIPE_THRESHOLD = 50; // pixels

const Carousel: FC<CarouselProps> = ({ children, numVisibleItems = 1 }) => {
  const rawItems = Children.toArray(children);
  const realCount = rawItems.length;
  const totalItems = realCount + 2 * numVisibleItems;

  const [currentIndex, setCurrentIndex] = useState(numVisibleItems);
  const [itemWidth, setItemWidth] = useState(0);
  const [transitionDuration, setTransitionDuration] = useState(DEFAULT_TRANSITION_DURATION);
  const [touchStartX, setTouchStartX] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  const currentIndexRef = useRef(currentIndex);
  const itemWidthRef = useRef(itemWidth);
  const isAnimatingRef = useRef(false);

  const items = [
    ...rawItems.slice(-numVisibleItems),
    ...rawItems,
    ...rawItems.slice(0, numVisibleItems),
  ];

  const [springs, api] = useSpring(() => ({ from: { x: 0 } }));

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    itemWidthRef.current = itemWidth;
  }, [itemWidth]);

  useEffect(() => {
    if (itemRef.current) {
      const width = itemRef.current.offsetWidth;
      setItemWidth(width);
      itemWidthRef.current = width;
      api.start({
        x: getTranslateX(numVisibleItems),
        config: { duration: 0 },
      });
    }
  }, [numVisibleItems]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isAnimatingRef.current) return;
      if (event.key === 'ArrowLeft') {
        stepToIndex(currentIndexRef.current - 1);
      } else if (event.key === 'ArrowRight') {
        stepToIndex(currentIndexRef.current + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getTranslateX = (index: number) => {
    const width = itemWidthRef.current;
    const containerWidth = width * numVisibleItems;
    const offset = (width * index) + width / 2 - containerWidth / 2;
    return -offset;
  };

  const jumpWithoutAnimation = (target: number) => {
    setTransitionDuration(0);
    api.start({
      x: getTranslateX(target),
      config: { duration: 0 },
      onResolve: () => setTransitionDuration(DEFAULT_TRANSITION_DURATION),
    });
    setCurrentIndex(target);
  };

  const stepToIndex = (target: number) => {
    const current = currentIndexRef.current;
    if (target === current) return;

    const direction = target > current ? 1 : -1;
    const steps = Math.abs(target - current);
    const duration = Math.max(DEFAULT_TRANSITION_DURATION / steps, MIN_STEP_DURATION);

    setTransitionDuration(duration);
    isAnimatingRef.current = true;
    stepInDirection(direction, steps, duration);
  };

  const stepInDirection = (direction: number, remainingSteps: number, duration: number) => {
    const nextIndex = currentIndexRef.current + direction;

    api.start({
      x: getTranslateX(nextIndex),
      config: { duration },
      onResolve: () => {
        remainingSteps--;
        if (remainingSteps > 0) {
          stepInDirection(direction, remainingSteps, duration);
        } else {
          if (nextIndex >= realCount + numVisibleItems) {
            jumpWithoutAnimation(nextIndex - realCount);
          } else if (nextIndex < numVisibleItems) {
            const jumpIndex = realCount + numVisibleItems - (numVisibleItems - nextIndex);
            jumpWithoutAnimation(jumpIndex);
          }
          isAnimatingRef.current = false;
        }
      },
    });

    currentIndexRef.current = nextIndex;
    setCurrentIndex(nextIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isAnimatingRef.current) return;
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isAnimatingRef.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > SWIPE_THRESHOLD) {
      stepToIndex(currentIndexRef.current + 1); // Swipe left
    } else if (diff < -SWIPE_THRESHOLD) {
      stepToIndex(currentIndexRef.current - 1); // Swipe right
    }
  };

  return (
    <div
      className="carousel-container"
      style={{ width: `${itemWidth * numVisibleItems}px` }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <animated.div
        className="carousel-track"
        ref={trackRef}
        style={{
          ...springs,
          width: `${itemWidth * totalItems}px`,
        }}
      >
        {items.map((item, i) => {
          const isCenter = i === currentIndex;

          return (
            <div
              key={i}
              ref={i === numVisibleItems ? itemRef : null}
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
      </animated.div>

      <div className="carousel-dots">
        {rawItems.map((_, i) => (
          <button
            key={i}
            className={`dot ${currentIndex === i + numVisibleItems ? 'active' : ''}`}
            onClick={() => stepToIndex(i + numVisibleItems)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
