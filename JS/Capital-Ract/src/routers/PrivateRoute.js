import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'


export const PrivateRoute = ({isAuthenticated, redirec, component: Component, ...rest}) => {
    console.log(rest);
    //localStorage.setItem('lastPath', rest.location.pathname+rest.location.search);
    return (
       <Route {...rest}
        component = { (props) => (
            (isAuthenticated)
            ? <Component {...props}/>
            : <Redirect to={redirec} />
        )}


       />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
    redirec: PropTypes.string.isRequired
}




export default PrivateRoute
