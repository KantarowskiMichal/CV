import { FC } from 'react';
import './SkillsCard.css';

interface SkillsCardProps {}

const SkillsCard: FC<SkillsCardProps> = () => (
  <div className="skills-card" data-testid="SkillsCard">
    <div className="skills-content">
      <h1>Skills & Interests</h1>

      <section className="skills-section">
        <h2>Programming Languages</h2>
        <ul>
          <li><a href="https://www.java.com/">Java</a></li>
          <li><a href="https://www.python.org/">Python</a></li>
          <li><a href="https://www.typescriptlang.org/">TypeScript</a></li>
          <li>SQL</li>
        </ul>
      </section>

      <section className="skills-section">
        <h2>Web Frameworks & Libraries</h2>
        <ul>
          <li><a href="https://angular.io/">Angular</a></li>
          <li><a href="https://spring.io/">Spring</a></li>
          <li><a href="https://www.djangoproject.com/">Django</a></li>
          <li><a href="https://reactjs.org/">React</a></li>
        </ul>
      </section>

      <section className="skills-section">
        <h2>Machine Learning & AI</h2>
        <ul>
          <li><a href="https://www.tensorflow.org/">TensorFlow</a></li>
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
          <li>Electric Engineering & Robotics <br className="break"/> (Arduino, Raspberry Pi)</li>
          <li><a href="https://en.wikipedia.org/wiki/3D_printing">3D Printing</a></li>
          <li>Parametric 3D Modeling</li>
        </ul>
      </section>
    </div>
  </div>
);

export default SkillsCard;
