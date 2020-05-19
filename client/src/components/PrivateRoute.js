import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      window.isAuth === true
        ? <Component {...props} />
        : <Redirect to="/auth" />
    )}
  />
);

export default PrivateRoute;

// window auth is located? 