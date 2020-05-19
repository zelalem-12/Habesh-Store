import React, { useState} from 'react';
import { useDispatch } from 'react-redux';
import  { Checkbox } from '@material-ui/core';

import { addPayment } from '../../actions/cart-actions';
import { CustomButton, CheckoutSteps} from '../../components';

import styles from './PaymentPage.module.css';

const PaymentPage = props => {
    const [paymentMethod, setPaymentMethod] = useState('paypal');
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(addPayment({
        paymentMethod,
      }));
      props.history.push('/placeorder');
    };

        return (
            <div>
                <CheckoutSteps step1 step2 step3 />
                <div className={styles.payment}>
                <span className={styles.span}>Payment</span>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className = {styles.radio_button}>
                <input type="radio" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} name="paymentMethod" value="paypal" id="paypal" />
                {' '}
                <label htmlFor="paypal">Paypal</label>
                    </div>
                  <div className={styles.buttons}>
                     <CustomButton type='submit'>continue</CustomButton>
                    </div>
                    </form>
                    </div>
              </div>
        )
    }


export default PaymentPage;
