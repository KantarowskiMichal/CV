import { useEffect, useRef, useState } from 'react';
import './App.css';
import ExperienceCard from './components/Layout/ExperienceCard/ExperienceCard';
import IntroductionCard from './components/Layout/IntroductionCard/IntroductionCard';
import NavBar from './components/Layout/NavBar/NavBar';
import ProjectsCard from './components/Layout/ProjectsCard/ProjectsCard';
import SkillsCard from './components/Layout/SkillsCard/SkillsCard';

const SCROLL_DOWN = 1;
const SCROLL_UP = -1;
const ANIMATION_DURATION_MS = 800;

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const currentCardIndex = useRef(0);
  const isAnimating = useRef(false);
  const [isScrollingEnabled, setIsScrollingEnabled] = useState(true);

  const cardNames = ["Introduction", "Experience", "Skills", "Projects"];

  useEffect(() => {
    const appElement = appRef.current;
    if (!appElement) return;

    const cards = Array.from(appElement.children).filter(child => !child.classList.contains('navbar')) as HTMLDivElement[];
    cardsRef.current = cards;

    const handleWheel = (event: WheelEvent) => {
      if (isAnimating.current || !isScrollingEnabled) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? SCROLL_DOWN : SCROLL_UP;
      let nextCardIndex = currentCardIndex.current + direction;

      if (nextCardIndex < 0) {
        nextCardIndex = 0;
      } else if (nextCardIndex >= cards.length) {
        nextCardIndex = cards.length - 1;
      }

      if (nextCardIndex !== currentCardIndex.current) {
        event.preventDefault();
        scrollToCard(nextCardIndex);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (event: TouchEvent) => {
      if (!isScrollingEnabled) {
        event.preventDefault();
        return;
      }
      touchStartY = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (isAnimating.current || !isScrollingEnabled) {
        event.preventDefault();
        return;
      }

      const touchCurrentY = event.touches[0].clientY;
      const deltaY = touchCurrentY - touchStartY;

      const direction = deltaY < 0 ? SCROLL_DOWN : SCROLL_UP;
      const atTopBoundary = currentCardIndex.current === 0 && direction === SCROLL_UP;

      if (!atTopBoundary) {
        event.preventDefault();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (isAnimating.current || !isScrollingEnabled) return;

      const touchEndY = event.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY;

      const SWIPE_THRESHOLD = 50;

      if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        const direction = deltaY < 0 ? SCROLL_DOWN : SCROLL_UP;
        let nextCardIndex = currentCardIndex.current + direction;

        if (nextCardIndex < 0) {
          nextCardIndex = 0;
        } else if (nextCardIndex >= cards.length) {
          nextCardIndex = cards.length - 1;
        }

        if (nextCardIndex !== currentCardIndex.current) {
          scrollToCard(nextCardIndex);
        }
      }
    };

    appElement.addEventListener('wheel', handleWheel, { passive: false });
    appElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    appElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    appElement.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      appElement.removeEventListener('wheel', handleWheel);
      appElement.removeEventListener('touchstart', handleTouchStart);
      appElement.removeEventListener('touchmove', handleTouchMove);
      appElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isScrollingEnabled]);

  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const scrollToCard = (index: number) => {
    const appElement = appRef.current;
    const cards = cardsRef.current;

    if (!appElement || !cards[index]) return;

    isAnimating.current = true;
    const startScrollTop = appElement.scrollTop;
    const targetScrollTop = index === 0 ? 0 : cards[index].offsetTop;
    const distance = targetScrollTop - startScrollTop;
    const duration = ANIMATION_DURATION_MS;
    let startTime: number | null = null;

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easeInOutCubic(progress);

      appElement.scrollTop = startScrollTop + distance * easedProgress;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        currentCardIndex.current = index;
        isAnimating.current = false;
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleNavigate = (index: number) => {
    scrollToCard(index);
  };

  return (
    <div className="App" ref={appRef}>
      <NavBar cardNames={cardNames} onNavigate={handleNavigate} />
      <IntroductionCard/>
      <ExperienceCard/>
      <SkillsCard/>
      <ProjectsCard/>
    </div>
  );
}

export default App;
