import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch} from 'react-redux';
import { LoadingBox, ErrorBox, PaypalButton  } from '../../components';
import { orderDetail, payOrder, deliverOrder } from '../../actions/order-actions';
import { ORDER_PAY_RESET } from '../../constants/order-constants';
import styles from './OrderDetailPage.module.css';

const OrderDetailPage = props =>{
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.loggedUser);
  const { user } = loggedUser;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;
  //const orderDeliver = useSelector((state) => state.orderDeliver);
  // const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver;
    
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/profile';
    useEffect(() => {
      if (successPay) {
        dispatch({ type: ORDER_PAY_RESET });
        props.history.push('/profile');
      } else {
        dispatch(orderDetail(props.match.params.id));
      }
      return () => {
        // resource cleanup codes
      };
    }, [dispatch, successPay, props]);

    const handleSuccessPayment = (paymentResult) => {
      dispatch(payOrder(order, paymentResult));
    };
    const handleDeliverOrder = () => {
      dispatch(deliverOrder(order));
    };
        return(
          loading ? <LoadingBox /> : error ? <ErrorBox message={error} />
          : (
            <div>
              <div className={styles.back_to_results}>
                <Link to={redirect}> ‹Back to list</Link>
                <br />
                <h3 className = {styles.title}>
                  Order
                  {' '}
                  {order._id}
                </h3>
              </div>
    
              <div className= {styles.placeorder}>
    
                <div className={styles.placeorder_info}>
                  <div>
                    <h3>Shipping Address</h3>
                    <div>
                      {order.shipping.address}
                      ,
                      {' '}
                      {order.shipping.city}
                      ,
                      {' '}
                      {order.shipping.country}
                      ,
                      {' '}
                      {order.shipping.postalCode}
                    </div>
                    <h3>
                      {order.isDelivered ? `Delivered At ${order.deliveredAt}` : 'Not Delivered'}
    
                    </h3>
                  </div>
                  <div>
                    <h3>Payment Method</h3>
                    <div>
                      {order.payment.paymentMethod}
                    </div>
                    <h3>
    
                      {order.isPaid ? `Paid At ${order.paidAt}` : 'Not Paid'}
                    </h3>
                  </div>


            <h1 className = {styles.orderItems}>Order Items</h1>
                <div className ={styles.order_items}>
                  <div className={styles.product_header}>
                    <div className={styles.header_block} style ={{width: '25%'}}>
                      <span>Product</span>
                    </div>
                    <div className={styles.header_block}>
                      <span>name</span>
                    </div>
                    <div className={styles.header_block}>
                      <span>quantity</span>
                    </div>
                    <div className={styles.header_block}>
                      <span>Price</span>
                    </div>
                  </div>

                  {order.orderItems.map(item =>
                          <div key ={item._id}  className={styles.product_item}>
                          <div className={styles.image_container}>
                            <img className ={styles.product_img_list} src={`${process.env.PUBLIC_URL}/${item.imageUrl}`} alt='item' />
                          </div>
                          <span className={styles.name}>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                          </span>
                          <span className={styles.quantity}>{item.quantity}</span>
                          <span className={styles.price}>$ {item.price}</span>
                        </div>
                      ) }
                  </div>
                </div>
                <div className={styles.placeorder_actions}>
    
                  <ul>
                    {user.isAdmin && order.isPaid && !order.isDelivered && (
                      <li>
    
                        <button onClick={handleDeliverOrder} type="button" className="button primary">
                          Deliver Order
                        </button>
    
                      </li>
                    )}
    
                    {!order.isPaid
                      && (
                        <li>
                          <PaypalButton
                            amount="1.00"
                            onError={() => console.log('error')}
                            onSuccess={() => handleSuccessPayment}
                            onCancel={() => console.log('cancel')}
                          />
                        </li>
                      )}
    
                    <li>
                      <h3>Order Summary</h3>
                    </li>
                    <li>
                      <div>Items:</div>
                      <div>
                        $
                        {order.itemsPrice}
                      </div>
                    </li>
                    <li>
                      <div>Shipping:</div>
                      <div>{order.shippingPrice ? `$${order.shippingPrice}` : 'Free'}</div>
                    </li>
                    <li>
                      <div>Tax:</div>
                      <div>
                        $
                        {order.taxPrice}
                      </div>
                    </li>
                    <li>
                      <div>Order Total:</div>
                      <div>
                        $
                        {order.totalPrice}
    
                      </div>
                    </li>
                  </ul>
    
    
                </div>
              </div>
            </div>
          )
      );
}



export default OrderDetailPage ;