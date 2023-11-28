import React from 'react';
import './Laptop.css';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import hp from '../../assets/img/hp.png';
import { useEffect } from 'react';
import { getLaptopById } from '../../services/fetchService';
import Loader from '../loader/Loader';


const Laptop =() => {
    const [laptops,setLaptops] = useState([])
    const location = useParams();
    const idParams = parseInt(location.id)
    const [selectedLaptop , setSelectedLaptop]= useState({});
    const [isLoaded , setIsLoaded] = useState(false)

    useEffect(()=>{
      getLaptopById(idParams)
      .then(item => {
        setSelectedLaptop(item)
        console.log(item)
      })
      setIsLoaded(true)
    },[])

    return (
      <div className="clearfix center-container">
        { !isLoaded ? <Loader/> : selectedLaptop ? (
          <div>
            <img src={hp} alt="" className={'hp_item'} />
            <div className="laptop-details">
              <h4>{selectedLaptop.company}</h4>
              <p>{selectedLaptop.model}</p>
              <p>{selectedLaptop.properties}</p>
              <p>Price: {selectedLaptop.price}$</p>
              <p>Screen Size: {selectedLaptop.screenSize}</p>
              <Link to="/catalog" className="button-link">
              Back to Catalog
            </Link>
            </div>
          </div>
        ) : (
          <p>Laptop not found</p>
        )}
      </div>
    );
}

export default Laptop