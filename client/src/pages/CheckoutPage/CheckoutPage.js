import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeCartItmes } from '../../actions/cart-actions';


import { CheckoutItem, CustomButton } from '../../components';

import styles from  './CheckoutPage.module.css';

const CheckoutPage = props =>{
   const proccedToCheckout = _ => {
      props.history.push('/login?redirect=/shipping');
    }
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const dispatch = useDispatch()
    useEffect(() => {
      if (props.match.params.id) {
        const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
        dispatch(addToCart(props.match.params.id, qty));
      }
      return () => {
        //
      };
    }, []);

        return(
            <div className= {styles.checkout_container}>
           { cartItems.length > 0 ? 
            <div className={styles.checkout_page}>
              <div className={styles.checkout_header}>
                <div className={styles.header_block}>
                  <span>Product</span>
                </div>
                <div className={styles.header_block}>
                  <span>Description</span>
                </div>
                <div className={styles.header_block}>
                  <span>Quantity</span>
                </div>
                <div className={styles.header_block}>
                  <span>Price</span>
                </div>
                <div className={styles.header_block}>
                  <span>Remove</span>
                </div>
              </div>
              {cartItems.map(cartItem => 
                <CheckoutItem key={cartItem.product} cartItem={cartItem} />
                  ) }
            </div>  
            : 
            <div className={styles.cart_empty}>
              <h1 className={styles.title} >your cart is currently empity</h1>
            </div>
            } 
            <div className= {styles.checkout_button}>
                <div className ={styles.subtotal}> Subtotal
                (
          {cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0)} {' '} items): $
          {cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity, 0)}
                </div>
                <CustomButton 
                            style={{fontSize: '0.9rem', background: '#f8e80d', marginBottom: '3rem', width: '80%'}}
                           type="button"
                           disabled={cartItems.length === 0}
                           onClick={() => proccedToCheckout()}           
                   > Proceed to checkout</CustomButton>
               <CustomButton 
                style={{width: '80%'}}
                      type="button"
                      disabled={cartItems.length === 0}
                      onClick={() => dispatch(removeCartItmes())}           
              > Clear carts</CustomButton>
                
            </div>
            </div>
        )
    }

export default CheckoutPage;
