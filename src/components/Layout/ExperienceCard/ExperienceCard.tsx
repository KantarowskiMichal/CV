import { FC, useEffect, useRef, useState } from 'react';
import './ExperienceCard.css';
import ExperienceItem from './ExperienceItem';

const ExperienceCard: FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = (institution: string) => {
    if (expandedItem && expandedItem !== institution) {
      setExpandedItem(null); // Collapse the currently expanded item
      setExpandedItem(institution);
    } else if (expandedItem === institution) {
      setExpandedItem(null); // Collapse the currently expanded item if it's already open
    } else {
      setExpandedItem(institution); // Expand the new item if nothing is open
    }
  };

  return (
    <div className="experience-card" data-testid="ExperienceCard" ref={cardRef}>
      <div className="experience-column">
        <h1>Work Experience</h1>
        <ExperienceItem
          institution="Hatless Studio"
          qualification="Backend Developer"
          timeRange="Nov 2023 - Feb 2024"
          description="I have been hired at Hatless Studio as a backend developer following a technical interview, I have completed the training in Django there and gained some knowledge regarding React as it was the fronted framework used by the company. Sadly, the company has been closed down due to financial issues, but I have gained valuable experience in working with a team and using Git for version control."
          isExpanded={expandedItem === 'Hatless Studio'}
          onToggle={() => handleToggle('Hatless Studio')}
        />
        <ExperienceItem
          institution="Your Company Name Here?"
          qualification="Future Position"
          timeRange="Now - Future"
          description="I'm hoping you, the reader of this website, can help me fill this section with more amazing experiences."
          isExpanded={expandedItem === 'Your Company Name Here?'}
          onToggle={() => handleToggle('Your Company Name Here?')}
        />
      </div>
      <div className="separator"></div>
      <div className="experience-column">
        <h1>Education</h1>
        <ExperienceItem
          institution="University of Exeter"
          qualification="BSc (Hons) Mathematics and Computer Science"
          timeRange="2022 - 2025"
          description="During the course I have worked on my own, and in groups of two or more on several projects, including: A online game written in Django and React in a team of six, two pair programming tasks where I took the lead, and my final year project that consisted of a pipeline for fining the best archoitecture for a neural network approach to incorporating facial gestures into video games. I have also learned many mathematical concepts that can be applied in programming."
          grades={['Final grade achieved: 2:1']}
          isExpanded={expandedItem === 'University of Exeter'}
          onToggle={() => handleToggle('University of Exeter')}
        />
        <ExperienceItem
          institution="Northampton School for Boys"
          qualification="A-Levels"
          timeRange="2020 - 2022"
          description=""
          grades={['Maths: A*', 'Further Maths: A', 'Physics: A*', 'Computer Science: A']}
          isExpanded={expandedItem === 'Northampton School for Boys'}
          onToggle={() => handleToggle('Northampton School for Boys')}
        />
      </div>
    </div>
  );
};

export default ExperienceCard;