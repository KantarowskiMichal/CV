import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import IntroductionCard from './components/IntroductionCard/IntroductionCard';
import ExperienceCard from './components/ExperienceCard/ExperienceCard';
import SkillsCard from './components/SkillsCard/SkillsCard';
import ProjectsCard from './components/ProjectsCard/ProjectsCard';
import NavBar from './components/NavBar/NavBar';

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

    // Get all direct children of the App component, which are our cards
    // Filter out the NavBar from the cards list
    const cards = Array.from(appElement.children).filter(child => !child.classList.contains('navbar')) as HTMLDivElement[];
    cardsRef.current = cards;

    const handleWheel = (event: WheelEvent) => {
      if (isAnimating.current || !isScrollingEnabled) {
        event.preventDefault();
        return;
      }

      const direction = event.deltaY > 0 ? SCROLL_DOWN : SCROLL_UP;
      let nextCardIndex = currentCardIndex.current + direction;

      // Ensure the next index is within bounds
      if (nextCardIndex < 0) {
        nextCardIndex = 0;
      } else if (nextCardIndex >= cards.length) {
        nextCardIndex = cards.length - 1;
      }

      // Only scroll if the target card is different
      if (nextCardIndex !== currentCardIndex.current) {
        event.preventDefault(); // Only prevent default if we are actually scrolling to a new card
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
      const deltaY = touchCurrentY - touchStartY; // Calculate delta from start

      const direction = deltaY < 0 ? SCROLL_DOWN : SCROLL_UP;

      const atTopBoundary = currentCardIndex.current === 0 && direction === SCROLL_UP;

      if (!atTopBoundary) {
        // Only prevent default if we are not at a boundary and attempting to scroll
        event.preventDefault();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      if (isAnimating.current || !isScrollingEnabled) return;

      const touchEndY = event.changedTouches[0].clientY;
      const deltaY = touchEndY - touchStartY;

      const SWIPE_THRESHOLD = 50; // Minimum vertical swipe distance to trigger scroll

      if (Math.abs(deltaY) > SWIPE_THRESHOLD) {
        const direction = deltaY < 0 ? SCROLL_DOWN : SCROLL_UP;
        let nextCardIndex = currentCardIndex.current + direction;

        // Ensure the next index is within bounds
        if (nextCardIndex < 0) {
          nextCardIndex = 0;
        } else if (nextCardIndex >= cards.length) {
          nextCardIndex = cards.length - 1;
        }

        // Only scroll if the target card is different
        if (nextCardIndex !== currentCardIndex.current) {
          scrollToCard(nextCardIndex);
        }
      }
    };

    // Add event listeners
    appElement.addEventListener('wheel', handleWheel, { passive: false });
    appElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    appElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    appElement.addEventListener('touchend', handleTouchEnd, { passive: false });

    // Cleanup function to remove the event listeners
    return () => {
      appElement.removeEventListener('wheel', handleWheel);
      appElement.removeEventListener('touchstart', handleTouchStart);
      appElement.removeEventListener('touchmove', handleTouchMove);
      appElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isScrollingEnabled]); // Add isScrollingEnabled to dependency array

  // Easing function: ease-in-out cubic
  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const scrollToCard = (index: number) => {
    const appElement = appRef.current;
    const cards = cardsRef.current;

    if (!appElement || !cards[index]) return;

    isAnimating.current = true; // Set animation flag to true
    const startScrollTop = appElement.scrollTop; // Current scroll position
    const targetScrollTop = index === 0 ? 0 : cards[index].offsetTop; // Target scroll position (top of the next card)
    const distance = targetScrollTop - startScrollTop; // Distance to scroll
    const duration = ANIMATION_DURATION_MS;
    let startTime: number | null = null; // To track animation start time

    const animateScroll = (currentTime: number) => {
      if (!startTime) startTime = currentTime; // Record start time on first frame
      const elapsedTime = currentTime - startTime; // Time elapsed since animation started
      const progress = Math.min(elapsedTime / duration, 1); // Animation progress (0 to 1)
      const easedProgress = easeInOutCubic(progress); // Apply easing function

      // Update scroll position
      appElement.scrollTop = startScrollTop + distance * easedProgress;

      // Continue animation if not finished
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        currentCardIndex.current = index; // Update current card index
        isAnimating.current = false; // Reset animation flag
      }
    };

    // Start the animation loop
    requestAnimationFrame(animateScroll);
  };

  return (
    <div className="App" ref={appRef}>
      <NavBar cardNames={cardNames} onNavigate={scrollToCard} />
      <IntroductionCard/>
      <ExperienceCard/>
      <SkillsCard/>
      <ProjectsCard setIsScrollingEnabled={setIsScrollingEnabled} />
    </div>
  );
}

export default App;