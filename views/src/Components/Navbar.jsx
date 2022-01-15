import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import "./Navbar.scss"

function Navbar () {
    const [navMenuItems] = useState([
        {
            id: 1,
            label: "Home",
            path: "/"
        },
        {
            id: 3,
            label: "Login",
            path: "/login"
        },
        {
            id: 4,
            label: "Sign Up",
            path: "/signup"
        }
    ])
    const [authNavMenuItems] = useState([
        {
            id: 1,
            label: "Home",
            path: "/"
        },
        {
            id: 2,
            label: "Create",
            path: "/create"
        },
    ])

    const { user } = useContext(UserContext)

    const renderAuthMenu = () => {
        return (
            <React.Fragment>
                { authNavMenuItems && authNavMenuItems.map(item => (
                    <div className="navbar-item" key={item.id}>
                        <NavLink className="navbar-link" to={item.path}>{item.label}</NavLink>
                    </div>
                ))}
            </React.Fragment>
        )
    }

    const renderMenu = () => {
        return (
            <React.Fragment>
                { navMenuItems && navMenuItems.map(item => (
                    <div className="navbar-item" key={item.id}>
                        <NavLink className="navbar-link" to={item.path}>{item.label}</NavLink>
                    </div>
                ))}
            </React.Fragment>
        )
    }

    return (
        <nav className='navbar'>
            <div className="navbar--wrapper">
                <div className="navbar-menu">
                    { user ? renderAuthMenu() : renderMenu() }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
