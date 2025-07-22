import { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './NavBar.css';

interface NavBarProps {
  cardNames: string[];
  onNavigate: (index: number) => void;
}

const NavBar: FC<NavBarProps> = ({ cardNames, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FontAwesomeIcon icon={faFileAlt} className="navbar-icon" />
        <span className="navbar-title">Michal Kantarowski's CV</span>
      </div>
      <ul className={'navbar-list'}>
        {cardNames.map((name, index) => (
          <li key={index} className="navbar-item">
            <button
              onClick={() => {
                onNavigate(index);
              }}
              className="navbar-button"
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
