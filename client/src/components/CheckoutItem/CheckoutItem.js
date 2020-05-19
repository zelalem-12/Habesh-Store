import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, decrementQuantity, incrementQuantity } from '../../actions/cart-actions';
import styles from './CheckoutItem.module.css';

const CheckoutItem = props=> {
  const dispatch = useDispatch();
  const {product, name, imageUrl, price, quantity, countInStock } = props.cartItem;
  const decrementHandler = item => {
    if(item.quantity === 1 ){
      dispatch(removeFromCart(item.product))
    } else {
      dispatch(decrementQuantity(item))
    }
  }

  const incremntHandler = item => {
    if(item.quantity < item.countInStock)
      dispatch(incrementQuantity(item))
      else 
      window.alert(`Sorry we have only ${countInStock} 0f ${name} items in the store `)
  }

  return (
    <div className={styles.checkout_item}>
      <div className={styles.image_container}>
        <img src={`${process.env.PUBLIC_URL}/${imageUrl}`} alt='item' />
      </div>
      <span className={styles.name}>{name}</span>
      <span className={styles.quantity}>
        <div className={styles.arrow} onClick={() => decrementHandler(props.cartItem)}>&#10094;  </div>
        <span className={styles.value}>{quantity}</span>
        <div className={styles.arrow} onClick={() => incremntHandler(props.cartItem)}> &#10095;</div>
      </span>
      <span className={styles.price}>{price}</span>
      <div className={styles.remove_button}
       onClick={() =>dispatch(removeFromCart(product))}>
        &#10005;
      </div>
    </div>
  );
};  


export default CheckoutItem;
