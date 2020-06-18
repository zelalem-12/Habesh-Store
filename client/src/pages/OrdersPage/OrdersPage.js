import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoadingBox, ErrorBox} from '../../components';
import { listOrders, deleteOrder } from '../../actions/order-actions';

import styles from './OrdersPage.module.css';

const OrdersPage = props => {
  const dispatch = useDispatch();

  const deleteHandler = order => {
    dispatch(deleteOrder(order));
  };
  const orderList = useSelector(state => state.orderList);
  const orderUpdate = useSelector(state => state.orderUpdate);
  const orderDelete = useSelector(state => state.orderDelete);
  const data  = orderDelete.orders;
!!data && window.alert(data.message);

  const { loading, orders, error } = orderList;
 const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

 useEffect(() => {
  dispatch(listOrders());
  return () => {
    //
  };
},[dispatch]);
return(
  loading
    ? <LoadingBox /> : error ? <ErrorBox message={error} />
    : (
    <div className={`${styles.content} content-margined`}>
      <h3>Orders</h3>
      {orders.length === 0 ? (
          <div className={`${styles.empty_list}`}>
            There is no orders.
          </div>
        )
          : (
            <table className ={`${styles.table}`}>
              <thead className ={`${styles.table_head}`}>
                <tr>
                  <th>
                    ID
                  </th>
                  <th>
                    CUSTOMER
                  </th>
                  <th>
                   ORDER DATE
                  </th>
                  <th>
                    TOTAL
                  </th>
                  <th>
                    PAID
                  </th>
                  <th>
                    DELIVERED
                  </th>
                  <th>
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className ={`${styles.table_body}`}>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order._id}
                    </td>
                    <td>
                      {[order.user.first_name, order.user.last_name].join(' ')}
                    </td>
                    <td>
                      {
                        `
                        ${new Date(order.createdAt).toLocaleDateString()} at ${new Date(order.createdAt).toLocaleTimeString()}`
                      }
                    </td>
                    <td>
                      {order.totalPrice}
                    </td>
                    <td>
                      {order.isPaid.toString()}
                    </td>
                    <td>
                      {order.isDelivered.toString()}
                    </td>
                    <td>
                      <Link className="button" to={`/order/${order._id}?ref=/orders`}>Details</Link>
                      {' '}
                      <button type="button" onClick={() => deleteHandler(order)} className="button">Delete</button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
)
)

}
export default OrdersPage;