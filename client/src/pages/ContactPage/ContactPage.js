import React, { useState} from 'react';
import {useSelector, useDispatch } from 'react-redux';
import {postVisitorContactMessage} from '../../actions/visitor-actions';

import{FormInput, CustomButton, LoadingBox, ErrorBox, SuccessBox} from '../../components';


import styles from './ContactPage.module.css';

const ContactPage = _ => {
      const [first_name, setFirstName] = useState('');
      const [last_name, setLastName] = useState('');
      const [email, setEmail] = useState('');
      const [message, setMessage] = useState('');

    const dispactch = useDispatch();

   const handleSubmit = event => {
    event.preventDefault();
    dispactch(postVisitorContactMessage({first_name, last_name, email, message}));
    setFirstName('');
    setLastName('');
    setEmail('');
    setMessage('');
  }
const userContact = useSelector(state => state.visitorContact)

const {loading, success, message: contact_message, error} = userContact;

    return (
       <div className={styles.contact_us}>
            <span className={styles.heading}> Contact Us </span>
              {success && <SuccessBox message = {contact_message} />}
                {loading && <LoadingBox />}
                {error && <ErrorBox message={error}/>}
            <form onSubmit={handleSubmit}>
            <FormInput
                type='text'
                name='first_name'
                value={first_name}
                onChange={event => setFirstName(event.target.value)}
                label='First Name'
                required
            />
            <FormInput
                type='text'
                name='last_name'
                value={last_name}
                onChange={event => setLastName(event.target.value)}
                label='Last Name'
                required
            />
             <FormInput
                type='email'
                name='email'
                value={email}
                onChange={event => setEmail(event.target.value)}
                label='Email'
                required
            />
            <FormInput
                type='textarea'
                name='message'
                value={message}
                onChange={event => setMessage(event.target.value)}
                label='Message '
                required
            />
            <div className={styles.buttons}>
            <CustomButton type='submit'>submit</CustomButton>
            </div>
            </form>
      </div>
    );
  }

export default ContactPage;
