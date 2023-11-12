import React from 'react';
import shoping from '../../assets/img/shopping-cart.png'
import catalog from '../../assets/img/catalog.png'
import home from './../../assets/img/home (1).png'
import './Header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <input className ={'search'} type={"text"} placeholder={'Search'}/>
      <nav>
        <NavLink to={"/"}> 
          <img src={home} alt="" className={'home'}/>
        </NavLink>
        <NavLink to={"/catalog"}> 
          <img src={catalog} alt="" className={'catalog'}/>
        </NavLink>
        <img src={shoping} alt="" className={'logo'}/>
      </nav>
    </header>
  );
};

export default Header;

