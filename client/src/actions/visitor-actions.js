import axios from 'axios';
import { getErrorMessage } from '../utils'

const postVisitorContactMessage = contact => async dispatch => {
    dispatch({type: 'CONTACT_POST_REQUIST', payload: contact});
    try{
        const { data: {message}}  = await axios.post('/api/contacts', contact)
          dispatch({ type: 'CONTACT_POST_SUCCESS', payload: message });
    } catch(error){
        dispatch({type: 'CONTACT_POST_FAIL', payload: getErrorMessage(error)});
    }
}

const getVisitorContactMessage = _ => async (dispatch, getState)=> {
    dispatch({type: 'CONTACT_GET_REQUIST'});
    try{
        const { loggedUser: { user: { token } } } = getState();
        const  {data } = await axios.get('/api/contacts',{
            headers: {
                Authorization: `Bearer ${token}`,
              },
            });
          dispatch({ type: 'CONTACT_GET_SUCCESS', payload: data});
    } catch(error){
        dispatch({type: 'CONTACT_GET_FAIL', payload: getErrorMessage(error)});
    }
}


export {
    postVisitorContactMessage, getVisitorContactMessage
}