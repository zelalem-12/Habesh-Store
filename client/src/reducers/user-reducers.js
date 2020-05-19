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

const userSigninReducer = (state = {}, action) => {
        switch(action.type){
            case USER_SIGNIN_REQUEST:
                return {loading: true};
            case USER_SIGNIN_SUCCESS: 
                return {loading: false, success: true, user: action.payload };
            case USER_SIGNIN_FAIL:
                    return { loading: false, success: false,error: action.payload };
            case USER_LOGOUT: 
                    return {}
            default: return state;
        }
}
const userRegisterReducer = (state = {}, action)=> {
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return { loading: true};
        case USER_REGISTER_SUCCESS:
            return { loading: false,success: true, user: action.payload}
        case USER_REGISTER_FAIL:
             return { loading: false, success: false, error: action.payload}
     default: return state;
    }
}
  const userUpdateReducer = (state = {}, action) => {
      switch(action.type){
            case USER_UPDATE_REQUEST:
                return { 
                    ...state,
                    loading: true
                  };
            case USER_UPDATE_SUCCESS:
               return {
                   ...state,
                   loading: false, success: true, updatedUser: action.payload
                };
            case USER_UPDATE_FAIL: 
                return { 
                    ...state,
                    loading: false, success: false, error: action.payload 
                };
            default: return state;
        }
  }

  export {userSigninReducer, userRegisterReducer, userUpdateReducer };