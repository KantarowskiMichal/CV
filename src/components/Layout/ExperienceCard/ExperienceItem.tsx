import { FC } from 'react';
import './ExperienceItem.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface ExperienceItemProps {
  institution: string;
  qualification: string;
  timeRange?: string;
  description: string;
  grades?: string[];
  isExpanded: boolean;
  onToggle: () => void;
}

const ExperienceItem: FC<ExperienceItemProps> = ({ institution, qualification, timeRange, description, grades, isExpanded, onToggle }) => {

  return (
    <div 
      className="experience-item"
      onClick={onToggle}
    >
      <div className="experience-item-header">
        <h2>{institution}</h2>
        <h3>{qualification}</h3>
        {timeRange && <p className="time-range">{timeRange}</p>}
      </div>
      <div className={`experience-item-body ${isExpanded ? 'expanded' : ''}`}>
        <p>{description}</p>
        {grades && (
          <ul>
            {grades.map((grade, index) => (
              <li key={index}>{grade}</li>
            ))}
          </ul>
        )}
      </div>
      <div className={`arrow-icon ${isExpanded ? 'expanded' : ''}`}><FontAwesomeIcon icon={faChevronDown} /></div>
    </div>
  );
};


export default ExperienceItem;
