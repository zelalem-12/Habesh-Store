import {
    createStore, combineReducers, applyMiddleware, compose 
} from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';

import {
    userSigninReducer, userRegisterReducer, userUpdateReducer
} from './reducers/user-reducers';

import {
    productListReducer, productDetailsReducer, productAddReducer,
    productCategoryListReducer, productReviewAddReducer, productDeleteReducer
} from './reducers/product-reducers';

import {
orderCreateReducer, orderListReducer, orderDetailsReducer, orderDeleteReducer,
orderPayReducer, orderDeliverReducer, orderUpdateRedcer, myOrderListReducer
} from './reducers/order-reducers';

import { cartReducer } from './reducers/cart-reducers';
import {visitorContactReducer, getContactReducer} from './reducers/visitor-reducers';

const rootReducer = combineReducers({

    loggedUser: userSigninReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,

    productList: productListReducer,
    productDetails: productDetailsReducer,
    productAdd: productAddReducer,
    productCategoryList: productCategoryListReducer,
    productReviewAdd: productReviewAddReducer,
    productDelete: productDeleteReducer,

    orderCreate: orderCreateReducer,
    orderList: orderListReducer,
    orderUpdate: orderUpdateRedcer,
    orderDelete: orderDeleteReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderDetails: orderDetailsReducer,
    myOrderList: myOrderListReducer,

    cart: cartReducer,

    visitorContact: visitorContactReducer,
   contactMessages: getContactReducer 

});

const initialState = {
    cart: {
        cartItems: Cookies.getJSON('cartItems') || [],
        shipping: {
            address: 'infront of Hossana cafee and restaurant,, Tana Subcity ', city: 'Bahir Dar', country: 'Ethiopai', postalCode: '220',
        },
        payment: { paymentMethod: 'paypal' }
    },
    loggedUser: { user: Cookies.getJSON('user') },
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;