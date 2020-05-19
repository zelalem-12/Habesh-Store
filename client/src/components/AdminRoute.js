import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      window.isAdmin === true
        ? <Component {...props} />
        : <Redirect to="/auth" />
    )}
  />
);

export default AdminRoute;
