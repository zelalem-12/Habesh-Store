import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route} from 'react-router-dom';

import styles from './App.module.css';

import Covid19 from './covid-19';
// import components 
import { Header, PrivateRoute, AdminRoute} from './components';
// Import pages
 import {LoginPage, RegisterPage, LandingPage, ContactPage, DefaultPage,
  ShippingPage, PaymentPage, PlaceOrder, ProfilePage, CheckoutPage,
   ProductDetailPage, OrderDetailPage, ProductsPage, ContactsPage, OrdersPage}from './pages';



const App = () => {
  
  const loggedUser = useSelector(state => state.loggedUser);
  const { user} = loggedUser;
  window.isAuth = !!user;
  window.isAdmin = !!user? user.isAdmin : false;
  
  return (
    <div className= {styles.app_container}>
         <Header />
         <Switch>
         <Route  exact path='/' component={ LandingPage } />
         <Route  exact path='/login' component={ LoginPage } />
         <Route  exact path='/register' component={ RegisterPage } />
         <Route  exact path='/category/:id' component={ LandingPage } />
         <Route path="/product/:id" component={ ProductDetailPage } />
         <Route  path='/covid-19' component={ Covid19 } />
         <PrivateRoute path= '/shipping' component = { ShippingPage }/>
         <PrivateRoute path = '/payment' component = { PaymentPage } />
         <PrivateRoute path = '/placeorder' component = { PlaceOrder } />
         <PrivateRoute path = '/order/:id' component = { OrderDetailPage } />
         <PrivateRoute exact path = '/order' component = { OrderDetailPage } />
         <PrivateRoute path = '/profile' component = { ProfilePage } />
         <AdminRoute path = '/products' component = { ProductsPage }/>
         <AdminRoute path = '/orders' component = {OrdersPage} />
         <AdminRoute path = '/contacts' component = {ContactsPage} />
         <Route path = '/checkout/:id' component = { CheckoutPage } />
         <Route exact path = '/checkout' component = { CheckoutPage } />
         <Route path = '/contact-us' component = {ContactPage} />
         <Route  component={ DefaultPage } />
         </Switch>
    </div>
  );
}

export default App;
