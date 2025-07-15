import React, { forwardRef, useRef } from 'react';
import './ProjectItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ProjectItemProps {
  title: string;
  githubLink: string;
  isExpanded: boolean;
  onToggle: () => void;
  onClose: () => void;
}

const ProjectItem = forwardRef<HTMLDivElement, ProjectItemProps>(({ title, githubLink, isExpanded, onToggle, onClose }) => {

  return (
    <div className={`project-item ${isExpanded ? 'expanded' : ''}`} onClick={onToggle}>
      {isExpanded && (
        <button className="close-button" onClick={onClose} onTouchEnd={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
      <h3>{title}</h3>
      <a href={githubLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
        <FontAwesomeIcon icon={faGithub} />
      </a>
    </div>
  );
});

export default ProjectItem;
