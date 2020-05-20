import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {LoadingBox, ErrorBox, FormInput, CustomButton} from '../../components';

import { register } from '../../actions/user-actions';


import styles from './RegisterPage.module.css';

const RegisterPage = props => {

  const [ first_name, setFirstName ] = useState('');
  const [ last_name, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirm_password, setConfirmPassword ] = useState('')

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, success } = userRegister;

 const  handleSubmit = e => {
    e.preventDefault();
    dispatch(register(first_name, last_name, email, password, confirm_password));
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    props.switchHandler();
  };

  useEffect(() => {
    if (success) {
      props.history.push('/login');
    }
    return () => {
      //
    };
  }, [success]);

    return (
      <div className={styles.sign_up}>
        <span className={styles.span}>Create Account</span>
        <form className={styles.form} onSubmit={handleSubmit}>
          { error && <ErrorBox  message ={error} /> }
          {loading && <LoadingBox /> }
          <FormInput
            type='text'
            name='first_name'
            value={first_name}
            handleChange = {e => setFirstName(e.target.value)}
            label='First Name'
            required
          />
          <FormInput
            type='text'
            name='last_name'
            value={last_name}
            handleChange = {e => setLastName(e.target.value)}
            label='Last Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            handleChange = {e => setEmail(e.target.value)}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            handleChange = {e => setPassword(e.target.value)}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirm_password'
            value={confirm_password}
            handleChange = {e => setConfirmPassword(e.target.value)}
            label='Confirm Password'
            required
          />
           <div className={styles.buttons}>
           <CustomButton type='submit'>SIGN UP</CustomButton>
           </div>
          
        </form>
      </div>
    );
  }

export default RegisterPage;
