const visitorContactReducer = ( state = {}, action) => {
    switch(action.type){
        case 'CONTACT_POST_REQUIST':
            return { 
                ...state,
                loading: true, success: false };
        case 'CONTACT_POST_SUCCESS':
            return { 
                ...state,
                loading: false, success: true, message: action.payload };
         case 'CONTACT_POST_FAIL':
             return {
                ...state, 
                loading: false, error: action.payload };
         default: return state;
    }
};

const getContactReducer = ( state = {}, action) => {
    switch(action.type){
        case 'CONTACT_GET_REQUIST':
            return { 
                ...state,
                loading: true};
        case 'CONTACT_GET_SUCCESS':
            return { 
                ...state,
                loading: false, success: true, messages: action.payload };
         case 'CONTACT_GET_FAIL':
             return {
                ...state, 
                loading: false, success: false, error: action.payload };
         default: return state;
    }
};


export {
    visitorContactReducer, getContactReducer
}