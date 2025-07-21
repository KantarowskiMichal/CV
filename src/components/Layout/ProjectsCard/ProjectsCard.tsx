import React from 'react';
import './ProjectsCard.css';
import Carousel from '../../Carousel/Carousel';
import ExpandableCard from '../../ExpandableCard/ExpandableCard';

interface ProjectsCardProps {
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({}) => {
  return (
    <div className="projects-card">
      <Carousel numVisibleItems={5}>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<div>Click to expand</div>}
            expandedContent={<div>This is the expanded content!</div>}
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
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<div>Click to expand4</div>}
            expandedContent={<div>This is the expanded content4!</div>}
          />
        </div>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<div>Click to expand5</div>}
            expandedContent={<div>This is the expanded content5!</div>}
          />
        </div>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<div>Click to expand6</div>}
            expandedContent={<div>This is the expanded content6!</div>}
          />
        </div>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<div>Click to expand7</div>}
            expandedContent={<div>This is the expanded content7!</div>}
          />
        </div>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<div>Click to expand8</div>}
            expandedContent={<div>This is the expanded content8!</div>}
          />
        </div>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<div>Click to expand9</div>}
            expandedContent={<div>This is the expanded content9!</div>}
          />
        </div>
        <div className="card-wrapper">
          <ExpandableCard
            collapsedContent={<div>Click to expand10</div>}
            expandedContent={<div>This is the expanded content10!</div>}
          />
        </div>
      </Carousel>
    </div>
  );
};


export default ProjectsCard;