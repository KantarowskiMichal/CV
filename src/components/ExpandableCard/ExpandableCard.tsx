import { useSpring } from 'react-spring';
import ExpandableCardContent from './content/ExpandableCardContent';
import ExpandableCardPopup from './popup/ExpandableCardPopup';
import './ExpandableCard.css';
import { useRef, useState, useEffect } from 'react';

interface ExpandableCardProps {
    collapsedContent: React.ReactNode;
    expandedContent: React.ReactNode;
    onFinishedInitializing?: () => void;
}

const SPRING_CONFIG = { tension: 170, friction: 200, duration: 500 };
const EXPANDED_VIEWPORT_HEIGHT_RATIO = 0.83;
const EXPANDED_VIEWPORT_WIDTH_RATIO = 0.90;

const ExpandableCard: React.FC<ExpandableCardProps> = ({ collapsedContent, expandedContent, onFinishedInitializing }) => {
  const wrapperRef: React.RefObject<HTMLDivElement | null> = useRef<HTMLDivElement>(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const [springs, api] = useSpring(() => ({
    from: {
      top: 0,
      left: 0,
      width: 0,
      height: 0,
    },
    config: SPRING_CONFIG,
  }));

  const expand = () => {
    if (isAnimating) return;
    if (isExpanded) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    api.set({
      top: wrapperRef.current?.getBoundingClientRect().top! + scrollTop,
      left: wrapperRef.current?.getBoundingClientRect().left! + scrollLeft,
      width: wrapperRef.current?.getBoundingClientRect().width,
      height: wrapperRef.current?.getBoundingClientRect().height,
    });

    setIsAnimating(true);
    setIsExpanded(true);
  };

  const collapse = () => {
    if (isAnimating) return;
    if (!isExpanded) return;
    setIsAnimating(true);
    setIsExpanded(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        collapse();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [collapse]);

  useEffect(() => {
  const handleResize = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    if (isExpanded) {
      const vh: number = EXPANDED_VIEWPORT_HEIGHT_RATIO * window.innerHeight;
      const vw: number = EXPANDED_VIEWPORT_WIDTH_RATIO * window.innerWidth;

      const top = ((window.innerHeight - vh) / 2) + scrollTop;
      const left = ((window.innerWidth - vw) / 2) + scrollLeft;

      api.start({
        top: top + scrollTop,
        left: left + scrollLeft,
        width: vw,
        height: vh,
        config: SPRING_CONFIG,
      });
    }
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, [isExpanded, api]);

  useEffect(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    if (isExpanded) {
      const vh: number = EXPANDED_VIEWPORT_HEIGHT_RATIO * window.innerHeight;
      const vw: number = EXPANDED_VIEWPORT_WIDTH_RATIO * window.innerWidth;

      const top = ((window.innerHeight - vh) / 2) + scrollTop;
      const left = ((window.innerWidth - vw) / 2) + scrollLeft;

      api.start({
        top: top,
        left: left,
        width: vw,
        height: vh,
        onRest: () => {
          setIsAnimating(false);
        },
      });
    }
    else {
      api.start({
        top: wrapperRef.current?.getBoundingClientRect().top! + scrollTop,
        left: wrapperRef.current?.getBoundingClientRect().left! + scrollLeft,
        width: wrapperRef.current?.getBoundingClientRect().width,
        height: wrapperRef.current?.getBoundingClientRect().height,
        onRest: () => {
          setIsAnimating(false);
        },
      });
    }
  }, [isExpanded, wrapperRef]);

  return (
    <div ref={wrapperRef} className="expandable-card-wrapper" onClick={expand}>
      <div className="expandable-card">
        <ExpandableCardContent
          collapsedContent={collapsedContent}
          expandedContent={expandedContent}
          isExpanded={false}
        />
      </div>

      {(isExpanded || isAnimating) && (
        <ExpandableCardPopup
          collapsedContent={collapsedContent}
          expandedContent={expandedContent}
          isExpanded={isExpanded}
          isAnimating={isAnimating}
          springs={springs}
          collapse={collapse}
        />
      )}
    </div>
  );
}

export default ExpandableCard;