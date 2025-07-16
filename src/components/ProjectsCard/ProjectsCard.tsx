import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import './ProjectsCard.css';
import ProjectItem from './ProjectItem';

interface ProjectsCardProps {
  setIsScrollingEnabled: (isScrollingEnabled: boolean) => void;
}

export interface ProjectsCardRef {
  handleClose: () => void;
}

const ProjectsCard = forwardRef<ProjectsCardRef, ProjectsCardProps>(({ setIsScrollingEnabled }, ref) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setIsScrollingEnabled(false);
    }
  };

  const handleClose = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setIsScrollingEnabled(true);
    }
  };

  useImperativeHandle(ref, () => ({
    handleClose,
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = ''; // Enable scrolling
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isExpanded, setIsScrollingEnabled]);

  return (
    <div className="projects-card">
      {isExpanded && <div className="overlay" onClick={handleClose}></div>}
      <ProjectItem
        title="CV Website"
        description="This project is a personal portfolio website built with React. It showcases my skills, experience, and projects in an interactive and visually appealing manner. The website features smooth animations, responsive design, and a clean user interface."
        githubLink="https://github.com/Kanta-V/CV_Website"
        isExpanded={isExpanded}
        onExpand={handleToggle}
        onClose={handleClose}
      />
    </div>
  );
});

export default ProjectsCard;