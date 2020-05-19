import React from 'react';

import styles from './FormInput.module.css';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className= {styles.group} >
    <input className={styles.form_input} onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${
          !!otherProps.value ? styles.shrink : ''
        } ${styles.form_input_label}`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormInput;
