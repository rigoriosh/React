import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'


export const PublicRout = ({isAuthenticated, redirec, component: Component, ...rest}) => {
    console.log({isAuthenticated})
    return (
       <Route {...rest}
        component = { (props) => (
            (isAuthenticated)
            ? <Redirect to={redirec} />
            : <Component {...props} />
        )}


       />
    )
}

PublicRout.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired,
    redirec: PropTypes.string.isRequired
}




export default PublicRout
