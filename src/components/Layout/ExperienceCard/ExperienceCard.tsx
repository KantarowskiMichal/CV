import { FC, useRef, useState } from 'react';
import './ExperienceCard.css';
import ExperienceItem from './ExperienceItem';

const ExperienceCard: FC = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = (institution: string) => {
    if (expandedItem && expandedItem !== institution) {
      setExpandedItem(null);
      setExpandedItem(institution);
    } else if (expandedItem === institution) {
      setExpandedItem(null);
    } else {
      setExpandedItem(institution);
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
          description="I have been hired at Hatless Studio as a backend developer following a technical interview, I have completed the training in Django there and gained some knowledge regarding React as it was the fronted framework used by the company. Sadly, the company has been closed down, but I have gained valuable experience in working with a team and using Git for version control."
          isExpanded={expandedItem === 'Hatless Studio'}
          onToggle={() => handleToggle('Hatless Studio')}
        />
      </div>
      <div className="separator"></div>
      <div className="experience-column">
        <h1>Education</h1>
        <ExperienceItem
          institution="University of Exeter"
          qualification="BSc Computer Science and Mathematics"
          timeRange="2022 - 2025"
          description="During my degree, I have worked on individual and team-based projects. These include an online game written in Django and React in a team, and two programming tasks which I led. In my final year, I embarked on a project consisting of creating a pipeline for finding the best architecture for a neural network based approach for incorporating facial gestures into video games. Due to the dual nature of my degree, I have learned multiple mathematical concepts that can be applied within programming, developing my understanding of both disciplines."
          grades={['Final grade achieved: 2:1']}
          isExpanded={expandedItem === 'University of Exeter'}
          onToggle={() => handleToggle('University of Exeter')}
        />
        <ExperienceItem
          institution="Northampton School for Boys"
          
          qualification="A-Levels"
          timeRange="2020 - 2022"
          description="During my A-Levels, I focused on subjects that would enhance my understanding of both mathematics and computer science. I engaged in various projects and practical assessments that allowed me to apply theoretical knowledge to real-world problems. I have also worked on numerous personal projects during this time."
          grades={['Maths: A*', 'Further Maths: A', 'Physics: A*', 'Computer Science: A']}
          isExpanded={expandedItem === 'Northampton School for Boys'}
          onToggle={() => handleToggle('Northampton School for Boys')}
        />
      </div>
    </div>
  );
};

export default ExperienceCard;