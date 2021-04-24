import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <NavLink to="./" className="navbar-brand">Navbar</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">                  
                <ul className="navbar-nav">
                    <li className="nav-item ">
                        <NavLink className="nav-link" exact activeClassName="active" to="./home">Home</NavLink>
                    </li>
                    <li className="nav-item">                    
                        <NavLink className="nav-link" exact activeClassName="active" to="./login">Login</NavLink>
                    </li>
                    <li className="nav-item">                    
                        <NavLink className="nav-link" exact activeClassName="active" to="./about">About</NavLink>
                    </li>
                    <li className="nav-item">                    
                        <NavLink className="nav-link" exact activeClassName="active" to="./hooks">Hooks</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
