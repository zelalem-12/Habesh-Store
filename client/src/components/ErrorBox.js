import React from 'react';

const ErrorBox = (props) => (
  <div style = {errorBox}>
    {props.message}
  </div>
);

export default ErrorBox;

const errorBox ={
  marginTop: '1.5rem',
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'red'
  }