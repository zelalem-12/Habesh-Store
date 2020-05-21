import React, { useState ,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
   CustomButton, SuccessBox, LoadingBox, ErrorBox, FormInput 
  } from  '../../components';
import { update, logout } from '../../actions/user-actions';
import { listMyOrder } from '../../actions/order-actions';
import styles from './ProfilePage.module.css';



const ProfilePage = props => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispath = useDispatch();

  const loggedUser = useSelector(state => state.loggedUser);
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success} = userUpdate;
  const { user } = loggedUser;
  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
const handleSubmit = event => {
        event.preventDefault();
        dispath(update(user._id, first_name, last_name, email, password));
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
    }
  const  logoutHandler = _ => {
        dispath(logout());
        props.history.push('/login');
    }
    useEffect(() => {
      if (user) {
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setPassword(user.password);
      }
      dispath(listMyOrder());
  
      return () => {
        // Clean up code 
      };
    }, [user, dispath]);
        return (
            <div className= {styles.profile}>
            <div className= { styles.profile_section}>
              <span className={styles.span}>Profile</span>
              {error && (
                <div className = {styles.errorBox}>
                  <ErrorBox message={error} />
                </div>
              )}
               {success && (
                  <div className = {styles.successBox}>
                    <SuccessBox message={`Your Profile is Updated succes`} />
                  </div>
                )}
                {loading && (
                  <div className = {styles.loadingBox}>
                    <LoadingBox />
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                    <FormInput
                    type='text'
                    name='first_name'
                    value={first_name}
                    onChange={e => setFirstName(e.target.value)}
                    label='First Name'
                    required
                  />                    
                    <FormInput
                    type='text'
                    name='last_name'
                    value={last_name}
                    onChange={e => setLastName(e.target.value)}
                    label='Last Name'
                    required
                  />                    
                    <FormInput
                          type='email'  
                          name='email'
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          label='Email'
                          required
                        />
                          <FormInput 
                              type='password'
                              name='password'
                              value={password}
                              onChange={e => setPassword(e.target.value)}
                              label='Password'
                              required
                          />
                    <div className = {styles.button_container}>
                    <CustomButton type='submit' style={{background: '#f08a05', width: '100%'}} >
                         update Profile
                    </CustomButton>
                    </div>
                    <div className = {styles.button_container} >
                    <CustomButton style={{background: '#eee', width: '100%', color: 'black'}} 
                        type='button' onClick = {logoutHandler}>
                         logout
                    </CustomButton>
                    </div>
                </form>
            </div>
            <div className={styles.order_section}>
              {loadingOrders
                ? <LoadingBox /> : errorOrders ? <ErrorBox message={errorOrders} /> : 
                  <div className = {styles.order_container}>
                    <h2 className = {styles.span}>Your Orders</h2>
                    {orders.length === 0 ? (
                      <div className={styles.empty_list}>
                        <span>There is no orders.</span>
                      </div>
                    )
                      : (
                        <table className= {styles.table_container}>
                          <thead>
                            <tr className = {styles.order}>
                              <th>
                                ID
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
                              <tr key={order._id} className = {styles.order}>
                                <td>
                                  {order._id}
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
                                  <Link to={`/order/${order._id}`}>Details</Link>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                  </div>}
            </div>
          </div>
        )
    }

export default ProfilePage; 