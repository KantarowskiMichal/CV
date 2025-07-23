import React from 'react';
import './CollapsedCvWebsite.css';

const CollapsedCvWebsite: React.FC = () => {
  return (
    <div className="collapsed-project-card">
      <h2>This Website</h2>
      <p className='description'>A personal CV website to showcase my skills and projects.</p>
        <div className="view-more">Click To View More</div>
    </div>
  );
};

export default CollapsedCvWebsite;
