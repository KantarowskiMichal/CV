import React from 'react';
import './ProjectsCard.css';
import Carousel from '../../Carousel/Carousel';
import ExpandableCard from '../../ExpandableCard/ExpandableCard';
import CollapsedCvWebsite from './CvWebsiteProject/CollapsedCvWebsite';
import ExpandedCvWebsite from './CvWebsiteProject/ExpandedCvWebsite';
import CollapsedFaceGesture from './FaceGestureProject/CollapsedFaceGesture';
import ExpandedFaceGesture from './FaceGestureProject/ExpandedFaceGesture';

interface ProjectsCardProps {
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({}) => {
  return (
    <div className="projects-card">
      <Carousel numVisibleItems={3}>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<CollapsedCvWebsite />}
            expandedContent={<ExpandedCvWebsite />}
          />
        </div>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<CollapsedFaceGesture />}
            expandedContent={<ExpandedFaceGesture />}
          />
        </div>
      </Carousel>
    </div>
  );
};


export default ProjectsCard;