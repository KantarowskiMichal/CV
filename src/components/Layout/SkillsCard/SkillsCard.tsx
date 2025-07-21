import React, { FC } from 'react';
import './SkillsCard.css';

interface SkillsCardProps {}

const SkillsCard: FC<SkillsCardProps> = () => (
  <div className="skills-card" data-testid="SkillsCard">
    <div className="skills-content">
      <h1>Skills & Interests</h1>

      <section className="skills-section">
        <h2>Programming Languages</h2>
        <ul>
          <li>Java</li>
          <li>Python</li>
          <li>TypeScript</li>
          <li>SQL</li>
        </ul>
      </section>

      <section className="skills-section">
        <h2>Web Frameworks & Libraries</h2>
        <ul>
          <li>Angular</li>
          <li>Spring</li>
          <li>Django</li>
          <li>React</li>
        </ul>
      </section>

      <section className="skills-section">
        <h2>Machine Learning & AI</h2>
        <ul>
          <li>TensorFlow</li>
        </ul>
      </section>

      <section className="skills-section">
        <h2>Languages</h2>
        <ul>
          <li>Polish (Fluent)</li>
          <li>English (Fluent)</li>
        </ul>
      </section>

      <section className="skills-section">
        <h2>Hobbies & Interests</h2>
        <ul>
          <li>Electric Engineering & Robotics (Arduino, Raspberry Pi)</li>
          <li>3D Printing</li>
          <li>Parametric 3D Modeling</li>
        </ul>
      </section>
    </div>
  </div>
);

export default SkillsCard;
