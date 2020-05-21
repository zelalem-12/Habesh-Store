import React, { useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { NavLink } from 'react-router-dom';

import { listProductCategories} from '../../actions/product-actions';
import { getVisitorContactMessage } from '../../actions/visitor-actions';
import CartIcon from '../CartIcon';
import ErrorBox from '../ErrorBox'
import LoadingBox from '../LoadingBox';

import styles from './Header.module.css';

const Header = props => {

    const dispatch = useDispatch();
    const categoryList = useSelector((state) => state.productCategoryList);
    useEffect(() => {
      dispatch(listProductCategories());
      dispatch(getVisitorContactMessage());
      return () => {
        //
      };
    }, [dispatch]);
    const { loading, categories, error } = categoryList;
  
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0)  
 const loggedUser = useSelector(state => state.loggedUser);
  const { user } = loggedUser

  const contactMessages = useSelector(state => state.contactMessages);
  const {messages} = contactMessages;
  const num_messages = messages? messages.length: ''

    return(
    <div className ={styles.Header}>
      <div className ={styles.basic_nav}>
      {!user && <NavLink activeStyle={{color:'#07d5e4'}}  className ={styles.login} to='/login'> Login</NavLink>}
       {!user && <NavLink  activeStyle={{color:'#07d5e4'}}  to='/register'> Register</NavLink>}
      {!!user && <NavLink  activeStyle={{color:'#07d5e4'}} to ='/profile' style ={{textTransform: "capitalize", color:"#000000"}}>{user.first_name}</NavLink>}
      {((!!user && !user.isAdmin) || !user) && <NavLink  activeStyle={{color:'#07d5e4'}}  to='/checkout'> <CartIcon cartCount = {cartCount}/></NavLink>}
      </div>
      <div className ={styles.main_nav}>
       <NavLink className={styles.logo} exact  activeStyle={{color:'#07d5e4'}} to='/'>Habesha Store</NavLink>
        <NavLink className={styles.covid_19}  activeStyle={{color:'#07d5e4'}} to='/covid-19'> corronavirus</NavLink>
        {(!!user && !!user.isAdmin) && <NavLink  activeStyle={{color:'#07d5e4'}} to ='/products'>products</NavLink>}
        {(!!user && !!user.isAdmin) && <NavLink  activeStyle={{color:'#07d5e4'}} to ='/orders'>Orders</NavLink>}
        {(!!user && !!user.isAdmin) && <NavLink  activeStyle={{color:'#07d5e4'}} to ='/contacts'>contacts({num_messages})</NavLink>}
       {((!!user && !user.isAdmin) || !user) && <NavLink activeStyle={{color:'#07d5e4'}} to='/contact-us'> contact-us</NavLink> } 
      </div>
      <div className ={styles.product_category_nav}>
      {loading &&  <LoadingBox/>}
      {error && <ErrorBox  messages ={error}/>}
      {categories &&  categories.map((category, index )=> <NavLink key={index} activeStyle={{color:'#07d5e4'}}  to={`/category/${category}`}> {category}</NavLink>)}
      </div>

    </div>
    )
}

export default Header;