import React from 'react';
import LaptopCard from './LaptopCard';
import './FeaturedLaptops.css'

const laptops = [
  { 
    id:1,
    model:"HP",
    properties:"15-dw1015ua (2F3G3EA) Silver",
    price: 900 
  },
  {
    id:2,
    model:"Dell",
    properties:"Inspiron 3530",
    price: 870 
  },
  {
    id:3,
    model:"MacBook",
    properties:"Air 13 256GB Space Gray",
    price: 1200
  },
  {
    id:4,
    model:"Asus",
    properties:"TUF Gaming F15",
    price: 1010
  }
]

const FeaturedLaptops = () => {
  return (
    <div className="featured-laptops">
      <h3>Best Seller</h3>
      <ul>
        {laptops.map(laptop => (
          <LaptopCard
            key={laptop.id}
            model={laptop.model}
            properties={laptop.properties}
            price={laptop.price}
          />
        ))}
      </ul>
    </div>
  );
};


export default FeaturedLaptops;
