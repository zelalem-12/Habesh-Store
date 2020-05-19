import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ErrorBox, LoadingBox, Rating, CustomButton} from '../../components';
import { detailsProduct, addProductReview} from '../../actions/product-actions';
import { PRODUCT_REVIEW_ADD_RESET } from '../../constants/product-constants';

import styles from './ProductDetailPage.module.css';

const ProductDetailPage = props => {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;
  
  const inCartItem = productId =>  cartItems.find(cartIitem => cartIitem.product === productId);
  const addToCart = () => {
    if(inCartItem(props.match.params.id)){ 
      window.alert( `This product is already added to your cart`)
      }else
      props.history.push(`/checkout/${props.match.params.id}?qty=${quantity}`);
  };
  const dispatch = useDispatch();


  const productReviewAdd = useSelector((state) => state.productReviewAdd);
  const { loading: loadingSaveReview, error: errorSaveReview, success: successSaveReview } = productReviewAdd;
  useEffect(() => {
    if (successSaveReview) {
      setComment('');
      setRating('');
      alert('Review Submitted');
     dispatch({ type: PRODUCT_REVIEW_ADD_RESET });
    } else {
      dispatch(detailsProduct(props.match.params.id));
    }
    return () => {
      //
    };
  }, [successSaveReview]);
  const submitHandler = e => {
    e.preventDefault();
    dispatch(addProductReview(props.match.params.id, { comment, rating }));
  };
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;
  return (
    loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
      : (
        <div className= {styles.product_detail}>
          <span className= {styles.path}>Store>products>{product.category}>{product.name}</span>
          <div className= {styles.back_to_results}>
            <Link to="/"> ‹Back to store</Link>
          </div>
          <div className={styles.details}>
            <div className={styles.details_image}>
              <img src={`${process.env.PUBLIC_URL}/${product.imageUrl}`} alt="product" />
            </div>
            <div className={styles.details_info}>
              <ul>
                <li>
                  <h3>{product.name}</h3>
                </li>
                <li>
                  <Rating value={product.rating} />
                  (
                  {product.numReviews}
                  {' '}
                  Customer reviews
                  )
                </li>
                <li>
                  Price:
                  {' '}
                  <span className={styles.price}>
                    {' '}
                    $
                    {product.price}
                  </span>
                </li>

                <li>
                  Description:
                  <div>{product.description}</div>
                </li>
              </ul>
            </div>
            <div className={styles.details_actions}>
              <ul>
                <li>
                  Price: $
                  {product.price}
                </li>
                <li>
                  State:
                  {' '}
                  {product.countInStock > 0 ? 'InStock' : 'Unavailable'}
                </li>
                {
                  product.countInStock && (
                    <li>
                      Quantity:
                      <select style = {{border: 'none'}} value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </li>
                  )
                }
                {
                  product.countInStock && (
                    <li>
                      <CustomButton type="button" onClick={addToCart} >
                        Add to Cart
                      </CustomButton>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
          <div className={styles.content_margined}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 && <div>There is no review.</div>}
            <ul className={styles.review}>
              {
                product.reviews.map(review => (
                  <li key={review._id}>
                    <div><b>{review.name}</b></div>
                    <div className={styles.rating_container}>
                      <Rating value={review.rating} />
                      <div>
                        {review.createdAt.substring(0, 10)}
                      </div>
                    </div>
                    <div>
                      {review.comment}
                    </div>
                  </li>
                ))
              }
              <li>
                <h3>Write a customer reviews</h3>

                {window.isAuth
                  ? (
                    <form onSubmit={submitHandler}>
                      <ul className={styles.form_container}>
                        <li>
                          <label htmlFor="rating">Rating</label>
                          <select required value={rating} name="rating" id="rating" onChange={e => setRating(e.target.value)}>
                            <option value="">Select</option>
                            <option value="1">1 = Poor</option>
                            <option value="2">2 = Fair</option>
                            <option value="3">3 = Good</option>
                            <option value="4">4 = Very Good</option>
                            <option value="5">5 = Excellent</option>
                          </select>
                        </li>
                        <li>
                          <label htmlFor="comment">Comment</label>

                          <textarea required value={comment} name="comment" id="comment" onChange={e => setComment(e.target.value)} />

                        </li>
                        <li>
                          <CustomButton type="submit">Submit</CustomButton>
                        </li>
                      </ul>
                    </form>
                  )
                  : (
                    <div className = {styles.auth_redirect}>Please {' '}
                      <Link to={`/login?redirect=/product/${props.match.params.id}`}>Signin</Link>
                      {' '}to write a review.
                    </div>

                  ) }

              </li>
            </ul>
          </div>
        </div>
      )
  );
}
export default ProductDetailPage;
