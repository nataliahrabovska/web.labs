import {CartTitle} from "./CartTitle";
import './Cart.css'
import {CartItem} from "./CartItem";
import {ItemsContainer} from "./ItemsContainer";
import React from "react";
import {useSelector} from "react-redux";

export const CartContainer = () => {
    const cart = useSelector(state=>state.cart)
    console.log(cart)

  return (
      <div>
          <div className="shopping-cart">
              <CartTitle/>
              <ItemsContainer>
                  {
                      Array.isArray(cart) && cart.map(item => (
                          <CartItem
                              id={item.id}
                              key={item.id}
                              price={item.price}
                              model={item.model}
                              item={item}
                          />
                      ))
                  }
              </ItemsContainer>
          </div>
      </div>
  )
}