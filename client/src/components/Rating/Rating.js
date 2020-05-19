import React from 'react';

import styles from './Rating.module.css';

 const Rating = ({value}) => {
  return (
    <div className= {styles.rating } >
      <span className={value >= 1 ? styles.active : ''}>&#9734;</span>
      <span className={value >= 2 ? styles.active : ''}>&#9734;</span>
      <span className={value >= 3 ? styles.active : ''}>&#9734;</span>
      <span className={value >= 4 ? styles.active : ''}>&#9734;</span>
      <span className={value >= 5 ? styles.active : ''}>&#9734;</span>
    </div>
  );
}
export default Rating;