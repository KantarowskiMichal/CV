import React, { FC, useState, useEffect, useRef } from 'react';
import './ProjectsCard.css';
import ProjectItem from './ProjectItem';

interface ProjectsCardProps {
  setIsScrollingEnabled: (isScrollingEnabled: boolean) => void;
}

const ProjectsCard: FC<ProjectsCardProps> = ({ setIsScrollingEnabled }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      setIsScrollingEnabled(false);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setIsScrollingEnabled(true);
  };

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
        githubLink="https://github.com/Kanta-V/CV_Website"
        isExpanded={isExpanded}
        onExpand={handleToggle}
        onClose={handleClose}
      />
    </div>
  );
};

export default ProjectsCard;
