import React, { useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {listProducts } from '../../actions/product-actions';
import { 
  Product, LoadingBox , ErrorBox, 
} from '../../components';


import styles from  './LandingPage.module.css';

const LandingPage = props => {
  const search = '';

  const category = props.match.params.id ? props.match.params.id : '';

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(listProducts(category, search));
    return () => {
      //
    };
  }, [category, search, dispatch]);

      const { loading, products, error } = productList;
        return(
          <div className={styles.landingPage}>
          {loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
        : products.length === 0 ? (
          <div className={styles.empty_list}>
            There is no products.
          </div>)
          : (           
            <div className={styles.products}>
             {category && <span className= {styles.path}>Store>products>{category}</span> }
              {products.map(product => (
                <Product key={product._id} {...product} />
              ))}
            </div>
          )}
  </div> 
   )
    }

export default LandingPage;
