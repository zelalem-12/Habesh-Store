import React from 'react';

import styles from './CheckoutSteps.module.css';


const CheckoutSteps = (props) => (
  <div className= {styles.checkout_steps}>
    <div className={`${props.step1 ?  styles.active : ''} ${ styles.steps}`}>Sign-In</div>
    <div className={`${props.step2 ? styles.active : ''} ${ styles.steps}`}>Shipping</div>
    <div className={`${props.step3 ? styles.active : ''} ${ styles.steps}`}>Payment</div>
    <div className={`${props.step4 ? styles.active : ''} ${ styles.steps}`}>Place Order</div>
  </div>
);
export default CheckoutSteps;
