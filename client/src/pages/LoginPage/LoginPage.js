import React, { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import {LoadingBox, ErrorBox, FormInput, CustomButton} from '../../components';
import { signin } from '../../actions/user-actions'

import styles from './LoginPage.module.css';;

const LoginPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispath = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    dispath(signin(email, password));
    setEmail('');
    setPassword('');
  };
  const loggedUser = useSelector(state => state.loggedUser);
  const {loading, user, error} = loggedUser;
  const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
  user && props.history.push(redirect);

    return (
      <div className={styles.signIn}>
        <span className={styles.span} >Sign in</span>
        {error && (
            <div className = {styles.errorBox}>
              <ErrorBox message={error} />
            </div>
          )}
          {loading && (
            <div className = {styles.loadingBox}>
              <LoadingBox />
            </div>
          )}
        <form className = {styles.form} onSubmit={handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={e => setEmail(e.target.value)}
            value={email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={e => setPassword(e.target.value)}
            label='password'
            required
          />
          <div className={styles.buttons}>
            <CustomButton type='submit'> Sign in </CustomButton>
          </div>
        </form>
        <div className = {styles.new_user}>
         <span>New to Habesha Store?</span>   <Link to='/register'>Create Account</Link>
        </div>
      </div>
    );
}

export default LoginPage;
