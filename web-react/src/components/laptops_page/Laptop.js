import React from 'react';
import './Laptop.css';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import hp from '../../assets/img/hp.png';
import { useEffect } from 'react';
import { getLaptopById } from '../../services/fetchService';
import Loader from '../loader/Loader';
import {useDispatch} from "react-redux";
import {cartActions} from "../../store/store";

const Laptop =() => {
    const location = useParams();
    const idParams = parseInt(location.id)
    const [selectedLaptop , setSelectedLaptop]= useState({});
    const [isLoaded , setIsLoaded] = useState(false)
    const dispatcher = useDispatch()
    const [quantity, setQuantity] = useState(1);
    const [isOpen , setIsOpen] = useState(false)

    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value, 10));
    };
    const addItemToCart = () => {
      selectedLaptop.quantity = quantity
      dispatcher(cartActions.addToCart(selectedLaptop))
      setIsOpen(true)
    }
    const onRequestClose =() => {
      setIsOpen(false)
    }

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
          <div className={'header-laptop'}>
              <Link to="/catalog" className="button-link">
                  Back to Catalog
              </Link>
          </div>
        {
          !isOpen ? "" : <>
          <div className='modal-cart'>
          <h2>Item added to Cart!</h2>
            <p>Your item has been added to the cart.</p>
            <Link to="/cart" onClick={onRequestClose}>
                View Cart
            </Link>
            <button onClick={onRequestClose}>Close</button>
          </div>
          </>
        }
        { !isLoaded ? <Loader/> : selectedLaptop ? (
          <div>
            <img src={hp} alt="" className={'hp_item'} />
            <div className="laptop-details">
              <h4>{selectedLaptop.company}</h4>
              <p>{selectedLaptop.model}</p>
              <p>{selectedLaptop.properties}</p>
              <p>Price: {selectedLaptop.price}$</p>
              <p>Screen Size: {selectedLaptop.screenSize}</p>
              <p>Quantity: <input type="number" value={quantity} onChange={handleQuantityChange} min="1" /></p>
                <button onClick={() => addItemToCart(quantity)}>
                    Add to cart
                </button>
            </div>
          </div>
        ) : (
          <p>Laptop not found</p>
        )}
      </div>
    );
}

export default Laptop