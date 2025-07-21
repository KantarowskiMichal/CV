import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

interface NavBarProps {
  cardNames: string[];
  onNavigate: (index: number) => void;
}

const NavBar: FC<NavBarProps> = ({ cardNames, onNavigate }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FontAwesomeIcon icon={faFileAlt} className="navbar-icon" />
        <span className="navbar-title">Michal Kantarowski's CV</span>
      </div>
      <ul className="navbar-list">
        {cardNames.map((name, index) => (
          <li key={index} className="navbar-item">
            <button onClick={() => onNavigate(index)} className="navbar-button">
              {name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
