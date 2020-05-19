import React from 'react';
import { withRouter } from 'react-router-dom';
import Rating from '../Rating/Rating';

import styles from './Product.module.css';

const Product = (props) => (   
        <div 
        className={styles.product}
        onClick={() => props.history.push(`/product/${props._id}`)}>
          <div
            className={styles.image}
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/${props.imageUrl})`
            }}
          /> 
          <div className={styles.product_footer}>
         <span className={styles.name}>{props.name}</span> 
            <span className={styles.price}>${props.price}</span>
          </div>
          <div className={styles.product_footer}>
          <Rating value={props.rating} />
          <span className ={styles.review}>({props.numReviews} {' '} Reviews)</span>
          </div>
        </div>
      
);
export default withRouter(Product);

  