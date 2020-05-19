import React from 'react';

import styles from './CustomButton.module.css';

const CustomButton = ({
  children,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button
    className={`${inverted ? styles.inverted : ''} ${
      isGoogleSignIn ? styles.google_signIn : ''
    } ${styles.custom_button}`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
