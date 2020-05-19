import React, {useEffect} from'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVisitorContactMessage } from '../../actions/visitor-actions';
import styles from './GetVisitorContactMessage.module.css';
import { LoadingBox, ErrorBox } from '../../components';

const GetVisitorContactMessage = props => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getVisitorContactMessage());
        return () => {
          //
        };
      }, []);

      const contactMessages = useSelector( state => state.contactMessages);

      const {loading , error, success, messages} = contactMessages

return (
    <div className={styles.contacts}>
        {loading && <LoadingBox />}
        {error && <ErrorBox message ={error}/>
        }
      {success && messages.map(message =>
            <div key = {message._id} className ={styles.contact}>
                <span> Full Name : <h2>{[message.first_name, message.last_name].join(' ')}</h2> </span>
                <span> Email: <h2>{message.email}</h2></span>
                <span className = {styles.message}> Message: <h5>{message.message}</h5></span>
            </div>
         )}
         </div>
)
}


export default GetVisitorContactMessage ;