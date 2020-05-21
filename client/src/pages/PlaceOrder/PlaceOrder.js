import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CheckoutSteps, CustomButton} from '../../components';
import { createOrder } from '../../actions/order-actions';
import { removeCartItmes} from '../../actions/cart-actions';

import styles from './PlaceOrder.module.css';

const  PlaceOrder = props =>{
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);

  const { cartItems, shipping, payment } = cart;
  const {  success, data: order, } = orderCreate;

  !shipping && props.history.push('/shipping');
  !payment && props.history.push('/payment');
  
  cart.itemsPrice = cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.quantity, 0);
  cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
  cart.taxPrice = cart.itemsPrice * 0.15;
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`);
      dispatch(removeCartItmes());
    }
    return () => {
      //
    };
  }, [success, props, dispatch, order]);

        return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className= {styles.placeorder}>
        <div className= {styles.placeorder_info}>
          <div>
            <h3>Shipping Address</h3>
            <div>
              {shipping.address}
              ,
              {' '}
              {shipping.city}
              ,
              {' '}
              {shipping.country}
              ,
              {' '}
              {shipping.postalCode}
            </div>
          </div>
          <div>
            <h3>Payment Method</h3>
            <div>
              {payment.paymentMethod}
            </div>
          </div>
          <div className = {styles.orderItems}>Cart Items</div>
            <div className ={styles.order_items}>
               <div className={styles.product_header}>
                 <div className={styles.header_block} style ={{width: '25%'}}>
                   <span>Product</span>
                 </div>
                 <div className={styles.header_block}>
                   <span>name</span>
                 </div>
                 <div className={styles.header_block}>
                   <span>quantity</span>
                 </div>
                 <div className={styles.header_block}>
                   <span>Price</span>
                 </div>
               </div>

               {cartItems.map(item =>
                      <div className={styles.product_item}>
                      <div className={styles.image_container}>
                        <img className ={styles.product_img_list} src={`${process.env.PUBLIC_URL}/${item.imageUrl}`} alt='item' />
                      </div>
                      <span className={styles.name}>{item.name}</span>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <span className={styles.price}>$ {item.price}</span>
                    </div>
                   ) }
          </div>
        </div>
        <div className= {styles.placeorder_actions}>
          <ul>
            <li>
              <CustomButton onClick={() => dispatch(createOrder(cart))} type="button">
                Submit Order
              </CustomButton>
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items:</div>
              <div>
                $
                {cart.itemsPrice}
              </div>
            </li>
            <li>
              <div>Shipping:</div>
              <div>{cart.shippingPrice ? `$${cart.shippingPrice}` : 'Free'}</div>
            </li>
            <li>
              <div>Tax:</div>
              <div>
                $
                {cart.taxPrice}
              </div>
            </li>
            <li>
              <div>Order Total:</div>
              <div>
                $
                {cart.totalPrice}

              </div>
            </li>
          </ul>
        </div>
      </div>
 </div>
        )
    }


export default PlaceOrder;
