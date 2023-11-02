import React from 'react';
import banner from '../../assets/img/banner.png'
import './Banner.css';

const Banner = () => {
  return (
    <div className="banner">
      <img src={banner} alt="" className={'banner'}/>
   </div>
  );
};

export default Banner;