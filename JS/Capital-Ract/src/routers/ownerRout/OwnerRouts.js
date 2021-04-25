import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { tipos } from '../../types/tipos'

const OwnerRouts = ({rol, component: Component, ...rest}) => {
  
    return (
        <Route {...rest}
            component = {(props) => (
                (rol === tipos.rolOwner)
                ? <Component {...props}/>
                : <Redirect to="/" />
            )}
        />
    )
}

OwnerRouts.propTypes = {
    rol: PropTypes.string.isRequired,
    component: PropTypes.func.isRequired,
}

export default OwnerRouts
