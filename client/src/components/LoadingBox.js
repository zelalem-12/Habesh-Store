import React from 'react';

const LoadingBox = ({ message }) => (
  <div style = {loadingBox}>
    Loading...
    {' '}
    {message}
  </div>
);
export default LoadingBox;


const loadingBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2rem'
}