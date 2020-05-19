import {
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_REMOVE_ITEMS, CART_ADD_SHIPPING,
     CART_ADD_PAYMENT, DECREMENTQUANTITY, INCREMENTQUANTITY
} from '../constants/cart-constants';

const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type){
        case CART_ADD_ITEM: 
        {
            return { 
                ...state,
                cartItems: [...state.cartItems, action.payload]};
        }

        case CART_REMOVE_ITEM: 
            return { cartItems: state.cartItems.filter(cartItem => cartItem.product !== action.payload)};
        
        case CART_REMOVE_ITEMS:
            return {cartItems: [], shipping: {}, payment: {} };
        
        case CART_ADD_SHIPPING:
            return {...state, shipping: action.payload};
        
        case CART_ADD_PAYMENT:
            return { ...state, payment: action.payload};
        
        case DECREMENTQUANTITY: {
        const itemAdd = action.payload;
         const tempCartItems = [...state.cartItems];
        const item = tempCartItems.find(cartIitem => cartIitem.product === itemAdd.product);
        item.quantity = item.quantity - 1;
        return {
            ...state, cartItems: [...tempCartItems]
        }
        }

        case INCREMENTQUANTITY: {
            const itemAdd = action.payload;
             const tempCartItems = [...state.cartItems];
            const item = tempCartItems.find(cartIitem => cartIitem.product === itemAdd.product);
            item.quantity = item.quantity + 1;
            return {
                ...state, cartItems: [...tempCartItems]
            }
            }
            default: return state;
    }
};

export { cartReducer };