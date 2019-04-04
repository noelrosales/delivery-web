import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//task: about to create a lifecycle method for authentication

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        // Check if user is logged in
        localStorage.getItem('token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export default PrivateRoute;