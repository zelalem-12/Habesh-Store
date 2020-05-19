import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST,
    PRODUCT_CATEGORY_LIST_SUCCESS,
    PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_ADD_REVIEW_REQUEST,
    PRODUCT_ADD_REVIEW_SUCCESS,
    PRODUCT_ADD_REVIEW_FAIL,
    PRODUCT_ADD_REQUEST,
    PRODUCT_ADD_SUCCESS,
    PRODUCT_ADD_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
} from '../constants/product-constants'; 

import { getErrorMessage } from '../utils';

const listProducts = (category = '', search = '') => async (dispatch) => {
    dispatch({type: PRODUCT_LIST_REQUEST});
    try{
        const result =  await axios.get(`http://localhost:8000/api/products?category=${category}&search=${search}`);
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: result.data})
    }catch(error){
        dispatch({type: PRODUCT_LIST_FAIL, payload: getErrorMessage(error)})
    }
};

const listProductCategories = () => async (dispatch) => {
    dispatch({type: PRODUCT_CATEGORY_LIST_REQUEST});
    try{
        const result = await axios.get('http://localhost:8000/api/products/categories');
        dispatch({type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: result.data})
    }catch(error){
        dispatch({type: PRODUCT_CATEGORY_LIST_FAIL, payload: getErrorMessage(error)})
    }
};

const detailsProduct = product_id => async (dispatch) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST});
    try{
        const result = await axios.get(`http://localhost:8000/api/products/${product_id}`);
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: result.data});
    } catch(error){
        dispatch({type: PRODUCT_DETAILS_FAIL, payload: getErrorMessage(error)})
    }
};

const addProductReview = (product_id, review) => async (dispatch, getState) => {
    dispatch({type: PRODUCT_ADD_REVIEW_REQUEST, payload: review});
    try{
        const { loggedUser: { user: { token } } } = getState();
        const { data: savedReview } = await axios.post(`http://localhost:8000/api/products/${product_id}/reviews`, review, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({type: PRODUCT_ADD_REVIEW_SUCCESS, payload: savedReview});
    } catch(error) {
        dispatch({type: PRODUCT_ADD_REVIEW_FAIL, payload: getErrorMessage(error)});
    }
};

const addProduct = product => async (dispatch, getState) => {
    dispatch({type: PRODUCT_ADD_REQUEST, payload: product});
    try{
        const { loggedUser: { user: { token } } } = getState();
        if (product._id) {
        const { data: savedProduct } = await axios.put(`http://localhost:8000/api/products/${product._id}`, product, {
        headers: {
                Authorization: `Bearer ${token}`,
              },
            });
      dispatch({type:PRODUCT_ADD_SUCCESS, payload: savedProduct});
    } else{
        const { data: savedProduct } = await axios.post('http://localhost:8000/api/products', product, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          dispatch({ type: PRODUCT_ADD_SUCCESS, payload: savedProduct });
    }
} catch(error){
        dispatch({type: PRODUCT_ADD_FAIL, payload: getErrorMessage(error)});
    }
}
const deleteProduct = productId => async (dispatch, getState) => {
    dispatch({type: PRODUCT_DELETE_REQUEST});
    try{
        console.log(productId);
        const { loggedUser: {user: { token }}} = getState();
        const { data: deleteProduct } = await axios.delete(`http://localhost:8000/api/products/${productId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(deleteProduct);
          dispatch({type: PRODUCT_DELETE_SUCCESS, payload: deleteProduct})
    } catch(error){
        dispatch({type: PRODUCT_DELETE_FAIL, payload: getErrorMessage(error)})
    }
}

export {
     listProducts, listProductCategories, detailsProduct,
    addProductReview, addProduct, deleteProduct 
};