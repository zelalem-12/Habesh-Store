import axios from 'axios';
import Cookies from 'js-cookie';
import {
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
  } from '../constants/user-constants';
  import { getErrorMessage } from '../utils';

const signin = (email, password) => async (dispatch) => {
    try{
    dispatch({type: USER_SIGNIN_REQUEST});
    const result = await axios.post('/api/users/signin', {email, password});
    dispatch({type: USER_SIGNIN_SUCCESS, payload: result.data});
    Cookies.set('user', JSON.stringify(result.data));
} catch (error) {
    dispatch({type: USER_SIGNIN_FAIL, payload: getErrorMessage(Error)})
  }
};

const logout = () => async (dispatch) => {
    Cookies.remove('user');
    dispatch({type: USER_LOGOUT});
}

const register = ( first_name, last_name, email, password, confirm_password ) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST});
    try{
        if(password !== confirm_password){
            dispatch({type: USER_REGISTER_FAIL, payload: 'Password Mismatch'});
         }
    const result = await axios.post('/api/users/register', {first_name, last_name, email, password});
    dispatch({type: USER_REGISTER_SUCCESS, payload: result.data});
    Cookies.set(JSON.stringify(result.data))
    }catch (error){
        dispatch({type: USER_REGISTER_FAIL, payload:getErrorMessage(error)})
    }
}
const update = (userId, first_name, last_name, email, password ) => async (dispatch, getState) => {
    try{
        dispatch({type: USER_UPDATE_REQUEST});
        const {loggedUser: { user: {token}}} = getState();
        const  result = await axios.put(`/api/users/${userId}`, {first_name, last_name, email, password}, {
            headers: {
                Authorization: `Bearer ${token}`, 
            }
        })
        dispatch({type: USER_UPDATE_SUCCESS, payload: result.data});
        Cookies.set('user', JSON.stringify(result.data))
    }catch(err){
        dispatch({type: USER_UPDATE_FAIL, payload: getErrorMessage(err)})
    }
}
export {
    signin, register, logout, update,
  };
  