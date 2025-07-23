import React from 'react';
import './ExpandedFaceGesture.css';

const ExpandedFaceGesture: React.FC = () => {
  return (
    <div className="project-details">
      <div className="project-header">
        <h2>Face Gesture Recognition Pipeline</h2>
      </div>
      <div className="project-content">
        <div className="tech-stack">
          <h3>Tech Stack</h3>
          <div className="tech-stack-items">
            <p><a href={"https://www.python.org/"}>Python</a></p>
            <p><a href={"https://www.tensorflow.org/"}>TensorFlow</a></p>
            <p><a href={"https://keras.io/keras_tuner/"}>Keras-Tuner</a></p>
            <p><a href={"https://matplotlib.org/"}>Matplotlib</a></p>
          </div>
        </div>
        <div className="project-description">
          <h3>Description</h3>
          <p>This project, my bachelor's thesis, involved creating a pipeline using Python, TensorFlow, and Keras-Tuner. The goal was to discover the best neural network architectures for recognizing facial gestures in different video game scenarios. This included applications for accessibility, increasing input bandwidth for both competitive and casual gameplay, and enabling new game mechanics. The pipeline generated various effective models, and I used Matplotlib to visualize and compare their performance to identify the most suitable models for each scenario.</p>
        </div>
      </div>
    </div>
  );
};

export default ExpandedFaceGesture;