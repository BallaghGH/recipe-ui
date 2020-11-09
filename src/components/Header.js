import React, {useState} from 'react';
import MenuIcon from '@material-ui/icons/Menu';

export default function Header(props) {
  const [menuState, setMenuState] = useState('closed');

  const toggleMenuState = (event) => {
    console.log(event)
  }

  return (
    <header>
      <div className="header--container">
        <h6>Grace & Maman's Recipes</h6>
        <button onClick={(event) => toggleMenuState(event)} className="menu-icon--interaction">
          <MenuIcon />
        </button>
      </div>
    </header>
  );
};