import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoadingBox, ErrorBox} from '../../components';
import { listOrders, deleteOrder } from '../../actions/order-actions';

const OrdersPage = props => {
  const dispatch = useDispatch();

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order));
  };

  const orderList = useSelector((state) => state.orderList);
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const orderDelete = useSelector((state) => state.orderDelete);

  const { loading, orders, error } = orderList;
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
  console.log('dispatch List orders');
  dispatch(listOrders());
  useEffect(() => {
    console.log('dispatch List orders');
    dispatch(listOrders());
    return () => {
      //
    };
  });
  return loading
    ? <LoadingBox /> : error ? <ErrorBox message={error} /> : (
      <div className="content content-margined">
        <h3>Orders</h3>
        {orders.length === 0 ? (
          <div className="empty-list">
            There is no orders.
          </div>
        )
          : (
            <table>
              <thead>
                <tr>
                  <th>
                    ID
                  </th>
                  <th>
                    USER
                  </th>
                  <th>
                    DATE
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
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>
                      {order._id}
                    </td>
                    <td>
                      {order.user.name}
                    </td>
                    <td>
                      {order.createdAt}
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
    );
}
export default OrdersPage;
