import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { tipos } from '../../types/tipos'

const UserRouts = ({rol="", component: Component, ...rest}) => {
    
    return (
        <Route {...rest}
         component = { (props) => (
             (rol === tipos.rolUser)
             ? <Component {...props}/>
             : <Redirect to="/" />
         )}
 
 
        />
     )
}

UserRouts.propTypes = {
    rol: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
}

export default UserRouts
