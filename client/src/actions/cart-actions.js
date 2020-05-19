import axios from 'axios';
import Cookies from 'js-cookie';

import {
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_REMOVE_ITEMS, CART_ADD_SHIPPING,
    CART_ADD_PAYMENT, DECREMENTQUANTITY, INCREMENTQUANTITY
} from '../constants/cart-constants';


const addToCart = (product_id, quantity)=> async (dispatch, getState) => {
    const { data: product } = await axios.get(`http://localhost:8000/api/products/${product_id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: product._id,
        imageUrl: product.imageUrl,
        name: product.name,
        price: product.price,
        countInStock: product.countInStock,
        quantity
      },
    });
    const {cart: { cartItems }} = getState();
    Cookies.set('cartItems', JSON.stringify(cartItems));
};

const removeFromCart = product_id => (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: product_id});
    const {cart: { cartItems }} = getState();
    Cookies.set('cartItems', JSON.stringify(cartItems));
}

const removeCartItmes = _ => dispatch =>{
    dispatch({type: CART_REMOVE_ITEMS});
    Cookies.remove('cartItems');
};

const addShipping = shipping_data => dispatch => {
    dispatch({type: CART_ADD_SHIPPING, payload: shipping_data});
};

const addPayment = payment_data => dispatch => {
    dispatch({type: CART_ADD_PAYMENT, payload: payment_data});
};
const decrementQuantity = product => (dispatch, getState) => {
    dispatch({type: DECREMENTQUANTITY, payload:product });
    const {cart: { cartItems }} = getState();
    Cookies.set('cartItems', JSON.stringify(cartItems));
}

const incrementQuantity = product => (dispatch, getState) => {
    dispatch({type: INCREMENTQUANTITY, payload: product });
    const {cart: { cartItems }} = getState();
    Cookies.set('cartItems', JSON.stringify(cartItems));
    
}

export {
    addToCart, removeFromCart, removeCartItmes, addShipping,
     addPayment, decrementQuantity, incrementQuantity
};