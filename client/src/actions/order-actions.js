import axios from 'axios';
import {
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
     ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
    ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS, ORDER_UPDATE_FAIL,
    ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
    ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL
} from '../constants/order-constants';
import { getErrorMessage } from '../utils';

const createOrder = data => async (dispatch, getState) => {
    dispatch({type: ORDER_CREATE_REQUEST});
    try{
        console.log(data);
        const { loggedUser: {user: { token }}} = getState();
    const { data: {data: order }} = await axios.post('/api/orders', data, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          dispatch({ type: ORDER_CREATE_SUCCESS, payload: order});
    } catch(error){
        dispatch({type: ORDER_CREATE_FAIL, payload: getErrorMessage(error)});
    }
}

const updateOrder = order => async (dispatch, getState) => {
    dispatch({ type: ORDER_UPDATE_REQUEST});
    try{
        const { loggedUser: { user: {token}} } = getState();
        const { data: updatedOrder} = await axios.put(`/api/orders/${order._id}`, order, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    dispatch({type: ORDER_UPDATE_SUCCESS, payload: updatedOrder});
    } catch(error){
        dispatch({type: ORDER_UPDATE_FAIL, payload: getErrorMessage(error)})
    }
}

const orderDetail = order_id => async (dispatch) => {
    dispatch({type: ORDER_DETAILS_REQUEST});
    try{
        const result = await axios.get(`/api/orders/${order_id}`);
        dispatch({type: ORDER_DETAILS_SUCCESS, payload: result.data})
    } catch(error){
        dispatch({type: ORDER_DETAILS_FAIL, payload: getErrorMessage(error)})
    }
}

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
    dispatch({type: ORDER_PAY_REQUEST});
    try{
        const { loggedUser: { user: {token}} } = getState();
        const { data: paidOrder } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({type: ORDER_PAY_SUCCESS, payload: paidOrder});
    } catch(error){
        dispatch({ type:ORDER_PAY_FAIL, payload: getErrorMessage(error)})
    }
};

const deliverOrder = order => async (dispatch, getState) => {
    dispatch({type: ORDER_DELIVER_REQUEST});
    try{
        const { loggedUser: { user: {token}} } = getState();
        const { data: deliveredOrder } = await axios.put(`/api/orders/${order._id}/deliver`, {}, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({ type: ORDER_DELIVER_SUCCESS, payload: deliveredOrder});
    } catch(error){
        dispatch({type: ORDER_DELIVER_FAIL, payload: getErrorMessage(error)})
    }
};

const listOrders = () => async (dispatch, getState) => {
    dispatch({type: ORDER_LIST_REQUEST});
    try{
        console.log(' Before calling api order data')
        const { loggedUser: { user: {token}}} = getState();
        const result = await axios.get('/api/orders', {
             headers: { 
                 Authorization:`Bearer ${token}`
                }
            });
            console.log(' After calling api order data')
            console.log(result.data);
        dispatch({type: ORDER_LIST_SUCCESS, payload: result.data});
    } catch(error){
        dispatch({type: ORDER_LIST_FAIL, payload: getErrorMessage(error)});
    }
}

const deleteOrder = order => async (dispatch, getState) => {
    dispatch({type: ORDER_DELETE_REQUEST});
    try{
        const { loggedUser: { user: { token }}} = getState();
        const { data: deletedOrder } = await axios.delete(`/api/orders/${order._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({ type: ORDER_DELETE_SUCCESS, payload: deletedOrder});
    } catch(error){
        dispatch({ype: ORDER_DELETE_FAIL, payload: getErrorMessage(error)});
    }
};

const listMyOrder = () => async (dispatch, getState) => {
    dispatch({type: MY_ORDER_LIST_REQUEST});
    try{
        const { loggedUser: { user: { token }}} = getState();
        const result = await axios.get('/api/orders/myOrder', { headers: { Authorization: `Bearer ${token}` } });
        dispatch({type: MY_ORDER_LIST_SUCCESS, payload: result.data});
    } catch(error){
        dispatch({ type: MY_ORDER_LIST_FAIL, payload: getErrorMessage(error)});
    }
}

export{
    createOrder, updateOrder, orderDetail, payOrder, 
    deliverOrder, listOrders, deleteOrder, listMyOrder
}