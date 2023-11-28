import React, { useEffect, useState } from 'react';
import LaptopCard from './LaptopCard';
import './FeaturedLaptops.css'
import ButtonViewMore from '../bvm/ButtonViewMore';
import { getLaptops } from '../../services/fetchService';
import Loader from '../loader/Loader';



const FeaturedLaptops = () => {
  const [itemsToShow, setItemsToShow] = useState(4);
  const [laptops,setLaptops] = useState([]);
  const [isLoaded , setIsLoaded] = useState(false)

  const handleViewMore = () => {
    setItemsToShow(8);
  };

  useEffect(()=>{
    getLaptops().then(laptop => {
      setLaptops(laptop)
    })
    setIsLoaded(true)
    console.log(laptops)
  },[])
  
  return (
    <div className="featured-laptops">
      <h3>Best Seller</h3>
      <ul>
        { !isLoaded ? <Loader/> : laptops.slice(0, itemsToShow).map(laptop => (
          <LaptopCard
            key={laptop.id}
            model={laptop.model}
            properties={laptop.properties}
            price={laptop.price}
            screenSize={laptop.screenSize}
          />
        ))}
      </ul>
      <ButtonViewMore onClick={handleViewMore} />
    </div>
  );
};


export default FeaturedLaptops;
