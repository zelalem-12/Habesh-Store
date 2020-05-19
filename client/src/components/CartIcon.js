import React from 'react';

import { ReactComponent as ShoppingIcon } from '../assets/shopping-bag.svg';


const CartIcon = ({cartCount }) => (
  <div style = {cart_icon} >
    <ShoppingIcon style = {shopping_icon} />
{cartCount !==0 && <span style = {item_count}>{cartCount}</span>}
  </div>
);


export default CartIcon;

  const cart_icon = {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  
  }
    const shopping_icon = {
      width: '2.5rem',
      height: '2rem'

    }
  
    const item_count = {
      position: 'absolute',
      fontSize: '1rem',
      fontWeight: 'bold',
      bottom: '0.45rem',
      left: '0.6rem',
      color: 'red'
    }

