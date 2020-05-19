import React from "react";
import { withRouter } from 'react-router-dom';
import styles from './DefaultPage.module.css';


const DefaultPage = ({location}) => {
    return(
        <div className = {styles.default_page}>
                <h1 className ={styles.title}> 404</h1>
                <h1 className ={styles.title}>error</h1>
                <h1 className ={styles.title}>page not found </h1>
                <h3 className ={styles.title}>the requested url 
                 <span className= {styles.text_danger}>{location.pathname}</span> was not found
               </h3>
        </div>
    )
  }

export default withRouter(DefaultPage);
