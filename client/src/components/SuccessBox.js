import React from 'react';

const SuccessBox = props => (
  <div className= { successBox }>
    {props.message}
  </div>
);

export default SuccessBox;


const successBox = {
  marginTop: '1.5rem',
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'green',
  }