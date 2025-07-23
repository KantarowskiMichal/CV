import React from 'react';
import './ExpandedCvWebsite.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const ExpandedCvWebsite: React.FC = () => {
  return (
    <div className="project-details">
      <div className="project-header">
        <h2>This Website</h2>
      </div>
      <div className="project-content">
        <div className="tech-stack">
          <h3>Tech Stack</h3>
          <div className="tech-stack-items">
            <p><a href={"https://react.dev/"}>React</a></p>
            <p><a href={"https://www.typescriptlang.org/"}>TypeScript</a></p>
            <p><a href={"https://www.react-spring.dev/"}>React Spring</a></p>
          </div>
        </div>
        <div className="project-description">
          <h3>Description</h3>
          <p>
            This website is a single-page application built with React and TypeScript with improved responsiveness and animations using React Spring. It serves as a personal CV, allowing me to showcase my skills and projects in an interactive and engaging way. As practice, all of the components and animations were created from scratch, without using any templates or libraries for the layout.
          </p>
        </div>
        <div className="project-link">
          <a href="https://github.com/KantarowskiMichal/CV" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} size="2x" />
            <span className="github-text">View on GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExpandedCvWebsite;
