import React, { useRef, useEffect } from 'react';
import './ProjectItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated, useTransition } from 'react-spring';

interface ProjectItemProps {
  title: string;
  description: string;
  githubLink: string;
  isExpanded: boolean;
  onExpand: () => void;
  onClose: () => void;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ title, description, githubLink, isExpanded, onExpand, onClose }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  const [spring, api] = useSpring(() => ({
    from: {
      x: 0,
      y: 0,
      width: 400,
      height: 300,
    },
    config: { tension: 170, friction: 26},
  }));

  useEffect(() => {
  console.log('ProjectItem mounted');
  return () => console.log('ProjectItem unmounted');
}, []);

  const transitions = useTransition(isExpanded, {
    from: { opacity: 0, transform: 'translateY(20px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
  });

  useEffect(() => {
      if (!boxRef.current) return;
      const rect = boxRef.current!.getBoundingClientRect();

      const centerX: number = window.innerWidth / 2;
      const centerY: number = window.innerHeight / 2;

      const vh: number = 0.83 * window.innerHeight
      const vw: number = 0.90 * window.innerWidth

      var displacementDueToScalingX: number = Math.max((vw-rect.width)/2 - rect.left, (vw-rect.width)/2 - (window.innerWidth - 8 - rect.right))
      var displacementDueToScalingY: number = Math.max((vh-rect.height)/2 - rect.top, (vh-rect.height)/2 - (window.innerHeight - rect.bottom))

      displacementDueToScalingX = displacementDueToScalingX > 0 ? (rect.left > (window.innerWidth - rect.right) ? -displacementDueToScalingX : displacementDueToScalingX) : 0
      displacementDueToScalingY = displacementDueToScalingY > 0 ? (rect.top > (window.innerHeight - rect.bottom) ? -displacementDueToScalingY : displacementDueToScalingY) : 0

      const newComponentCenterX = rect.left + rect.width / 2 + displacementDueToScalingX
      const newComponentCenterY = rect.top + rect.height / 2 + displacementDueToScalingY


      const dx = centerX - newComponentCenterX;
      const dy = centerY - newComponentCenterY;

      debugger;

      if (isExpanded) {
        api.start({ x: dx, y: dy, height: vh, width: vw});
      } else {
        api.start({ x: 0, y: 0, height: 300, width: 400});
      }
    }, [isExpanded, api, boxRef]);

  return (
    <animated.div 
    ref={boxRef}
    className={`project-item ${isExpanded ? 'expanded' : ''}`} 
    onClick={onExpand}
    style={spring}
    >
      {isExpanded && (
        <button className="close-button" onClick={onClose} onTouchEnd={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
      {transitions((style, item) =>
        item ? (
          <animated.div style={style} className="project-description">
            <p>{description}</p>
          </animated.div>
        ) : (
          <animated.div style={style}>
            <h3>{title}</h3>
            <a href={githubLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </animated.div>
        )
      )}
    </animated.div>
  );
};

export default ProjectItem;
