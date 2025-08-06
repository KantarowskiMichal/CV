import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import './IntroductionCard.css';

const EMAIL = "kantarowskimichal@gmail.com"
const PHONE = "+44 7388 405695"
const GITHUB = "https://github.com/KantarowskiMichal"
const LINKEDIN = "https://www.linkedin.com/in/michal-kantarowski-b35757257/"

interface IntroductionCardProps {}

const IntroductionCard: FC<IntroductionCardProps> = () => (
  <div className="introduction-card" data-testid="IntroductionCard">
    <div className="info">
      <h1>Michal Kantarowski</h1>
      <h2>Software Engineer</h2>
      <p>
        I have recently graduated from Exeter University with a bachelor's in Computer Science and Mathematics. I have a passion for problem solving and strive to apply these skills to working in software engineering.
      </p>
      <div className="contact-info">
        <p><a href={"mailto:"+EMAIL}><FontAwesomeIcon icon={faEnvelope} />{EMAIL}</a></p>
        <p><a href={"tel:"+PHONE}><FontAwesomeIcon icon={faPhone} />{PHONE}</a></p>
        <p><a href={GITHUB} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faGithub} />GitHub</a></p>
        <p><a href={LINKEDIN} target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} />LinkedIn</a></p>
      </div>
    </div>
    <div className="profile-picture">
      <img src={`${process.env.PUBLIC_URL}/my-picture.jpg`} alt="A photograph of Michal Kantarowski" />
    </div>
  </div>
);

export default IntroductionCard;
