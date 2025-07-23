import React from 'react';
import './CollapsedFaceGesture.css';

const CollapsedFaceGesture: React.FC = () => {
  return (
    <div className="collapsed-face-gesture-project-card">
      <h2>Face Gesture Recognition Pipeline</h2>
      <p className="face-gesture-description">A Python and TensorFlow pipeline for finding optimal facial gesture recognition models for video games.</p>
      <p className="face-gesture-view-more">Click To View More</p>
    </div>
  );
};

export default CollapsedFaceGesture;