import { FC } from 'react';
import './NavBar.css';

interface NavBarProps {
  cardNames: string[];
  onNavigate: (index: number) => void;
}

const NavBar: FC<NavBarProps> = ({ cardNames, onNavigate }) => {
  return (
    <nav className="navbar">
      <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Logo" className="navbar-logo" />
      <div className="navbar-brand">
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
