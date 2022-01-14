import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./Navbar.scss"

function Navbar () {
    const [navMenuItems] = useState([
        {
            id: 1,
            label: "Home",
            path: "/"
        },
        {
            id: 2,
            label: "Create",
            path: "/create"
        }
    ])

    return (
        <nav className='navbar'>
            <div className="navbar--wrapper">
                <div className="navbar-menu">
                    { navMenuItems && navMenuItems.map(item => (
                        <div className="navbar-item" key={item.id}>
                            <NavLink className="navbar-link" to={item.path}>{item.label}</NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
