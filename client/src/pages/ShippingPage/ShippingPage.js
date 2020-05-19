import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addShipping } from '../../actions/cart-actions'

import {FormInput, CustomButton, CheckoutSteps} from '../../components';
import styles from './ShippingPage.module.css';

const ShippingPage = props => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

     const dispatch = useDispatch();
  
    const handleSubmit =  event => {
      event.preventDefault();
      dispatch(addShipping({address, city, postalCode, country}));
      props.history.push('/payment');
    }

    return (
        <div>
        <CheckoutSteps step1 step2 />
        <div className={styles.shipping}>
        <span className={styles.span}>Shipping</span>
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='address'
            value={address}
            onChange={e => setAddress(e.target.value)}
            label='Address'
            required
          />
          <FormInput
            type='text'
            name='city'
            value={city}
            onChange={e => setCity(e.target.value)}
            label='City'
            required
          />
          <FormInput
            type='text'
            name='postalCode'
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            label='Postal Code'
            required
          />
          <FormInput
            type='text'
            name='country'
            value={country}
            onChange={e => setCountry(e.target.value)}
            label='Country'
            required
          />
           <div className={styles.buttons}>
           <CustomButton type='submit'>continue</CustomButton>
           </div>      
        </form>
      </div>
      </div>
    );
}

export default ShippingPage;
