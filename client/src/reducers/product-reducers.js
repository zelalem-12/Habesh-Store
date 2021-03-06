import {
    PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
    PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_CATEGORY_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL,
    PRODUCT_ADD_REVIEW_REQUEST, PRODUCT_ADD_REVIEW_SUCCESS, PRODUCT_ADD_REVIEW_FAIL,
    PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_ADD_FAIL,
    PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_REVIEW_ADD_RESET
} from '../constants/product-constants';

const productListReducer = ( state = { products: [] }, action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_LIST_SUCCESS: 
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
            }
    }

const productCategoryListReducer = (state = { categories: [] }, action ) => {
    switch(action.type){
        case PRODUCT_CATEGORY_LIST_REQUEST:
            return { loading: true};
        case PRODUCT_CATEGORY_LIST_SUCCESS:
            return { loading: false, categories: action.payload};
        case PRODUCT_CATEGORY_LIST_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
};
const productDetailsReducer = (state = { product: { reviews: [] } }, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default: return state;
    }
};

const productReviewAddReducer = (state = {}, action) => {
        switch(action.type){
            case PRODUCT_ADD_REVIEW_REQUEST:
                return { loading: false };
            case PRODUCT_ADD_REVIEW_SUCCESS:
                return {loading: false, success: true, products: action.payload};
            case PRODUCT_ADD_REVIEW_FAIL:
                return { loading: false, error: action.payload };
            case PRODUCT_REVIEW_ADD_RESET:
                return { };
            default: return state;
        }
}

const productAddReducer = ( state = {}, action) => {
        switch(action.type){
            case PRODUCT_ADD_REQUEST:
                return { loading: true };
            case PRODUCT_ADD_SUCCESS:
                return { loading: false, success: true, products: action.payload };
             case PRODUCT_ADD_FAIL:
                 return { loading: false, error: action.payload };
             default: return state;
        }
};

const productDeleteReducer = ( state ={}, action) => {
        switch(action.type){
            case PRODUCT_DELETE_REQUEST:
                return {
                    ...state,
                    loading: true 
                };
            case PRODUCT_DELETE_SUCCESS:
                return {
                    ...state,
                    loading: false, delete: action.payload }
            case PRODUCT_DELETE_FAIL:
                return {
                    ...state,
                    loading: false, error: action.payload};
            default: return state;
        }
};

    export {
        productListReducer, productCategoryListReducer, productDetailsReducer,
        productReviewAddReducer, productAddReducer, productDeleteReducer 
    };