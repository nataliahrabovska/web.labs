import React from 'react';
import Header from './components/header/Header';
import Banner from './components/banner/Banner';
import FeaturedLaptops from './components/featured_laptops/FeaturedLaptops';
import ButtonViewMore from './components/bvm/ButtonViewMore';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <div>
      <Header />
      <Banner />
      <FeaturedLaptops/>
      <ButtonViewMore/> 
      <Footer/> 

    </div>
  );
};

export default App;
