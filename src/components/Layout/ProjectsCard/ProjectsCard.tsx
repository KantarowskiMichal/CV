import React from 'react';
import './ProjectsCard.css';
import Carousel from '../../Carousel/Carousel';
import ExpandableCard from '../../ExpandableCard/ExpandableCard';
import CollapsedProjectCard from './CvWebsiteProject/CollapsedProjectCard';
import ProjectDetails from './CvWebsiteProject/ProjectDetails';

interface ProjectsCardProps {
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({}) => {
  return (
    <div className="projects-card">
      <Carousel numVisibleItems={3}>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<CollapsedProjectCard />}
            expandedContent={<ProjectDetails />}
          />
        </div>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<div>Click to expand2</div>}
            expandedContent={<div>This is the expanded content2!</div>}
          />
        </div>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<div>Click to expand3</div>}
            expandedContent={<div>This is the expanded content3!</div>}
          />
        </div>
      </Carousel>
    </div>
  );
};


export default ProjectsCard;