import React from 'react';
import shoping from '../../assets/img/shopping-cart.png'
import catalog from '../../assets/img/catalog.png'
import home from './../../assets/img/home (1).png'
import './Header.css';

const Header = () => {
  return (
    <header>
      <input type={"text"} placeholder={'Search'}/>
      <nav>
        <img src={home} alt="" className={'home'}/>
        <img src={catalog} alt="" className={'catalog'}/>
        <img src={shoping} alt="" className={'logo'}/>
      
      </nav>
    </header>
  );
};

export default Header;

