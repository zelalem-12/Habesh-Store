import { 
    ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
    ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
    ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS, ORDER_UPDATE_FAIL,
    ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
    ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL,
    ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET,
    ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
    MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL
} from '../constants/order-constants';

const orderCreateReducer = (state = { orderItems: [] }, action) => {
    switch(action.type){
        case ORDER_CREATE_REQUEST:
            return {loading: false};
         case ORDER_CREATE_SUCCESS:
             return { loading: false, success: true, data: action.payload};
          case ORDER_CREATE_FAIL:
              return {loading: false, error: action.payload};
            default: return state;
    }
};

 const orderListReducer = (state = {orders: [] }, action) => {
     switch(action.type){
         case ORDER_LIST_REQUEST:
             return {
              ...state, 
              loading: true};
         case ORDER_LIST_SUCCESS:
             return {
               ...state,
               loading: false, orders: action.payload};
         case ORDER_LIST_FAIL:
             return {
              ...state, 
              loading:false, error: action.payload};
         default: return state;
             }
     };

const orderUpdateRedcer = (state = {}, action) => {
    switch(action.type){
        case ORDER_UPDATE_REQUEST:
            return { loading: true};
        case ORDER_UPDATE_SUCCESS:
            return {loading: false, success: true, data: action.payload};
        case ORDER_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        default: return state;
    }
};

const orderDeleteReducer= (state = {}, action) => {
    switch (action.type) {
      case ORDER_DELETE_REQUEST:
        return { loading: true };
      case ORDER_DELETE_SUCCESS:
        return { loading: false, success: true, orders: action.payload };
      case ORDER_DELETE_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  };

 const  orderDeliverReducer= (state = {}, action) => {
    switch (action.type) {
      case ORDER_DELIVER_REQUEST:
        return { loading: true };
      case ORDER_DELIVER_SUCCESS:
        return { loading: false, success: true, data: action.payload };
      case ORDER_DELIVER_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  };
  const orderPayReducer = (state = {}, action) =>{
    switch (action.type) {
      case ORDER_PAY_REQUEST:
        return { loading: true };
      case ORDER_PAY_SUCCESS:
        return { loading: false, success: true, data: action.payload };
      case ORDER_PAY_FAIL:
        return { loading: false, error: action.payload };
        case ORDER_PAY_RESET:
          return {};
      default: return state;
    }
  };

  const orderDetailsReducer = (state = {
        order: {
        isPaid: false,
        isDelivered: false,
        orderItems: [],
        shipping: {},
        payment: {},
        },
    }, action) => {
    switch (action.type) {
      case ORDER_DETAILS_REQUEST:
        return {
          loading: true,
        };
      case ORDER_DETAILS_SUCCESS:
        return { loading: false, order: action.payload };
      case ORDER_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  };

 const myOrderListReducer = (state = { orders: [] }, action)=> {
    switch (action.type) {
      case MY_ORDER_LIST_REQUEST:
        return { loading: true };
      case MY_ORDER_LIST_SUCCESS:
        return { loading: false, orders: action.payload };
      case MY_ORDER_LIST_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  };

  export {
    orderCreateReducer, orderListReducer, orderUpdateRedcer, orderDeleteReducer, 
    orderDeliverReducer, orderPayReducer, orderDetailsReducer, myOrderListReducer
  }
  