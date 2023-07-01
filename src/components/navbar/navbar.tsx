import React from 'react'
import type RoutesType from '@models/routes-type'
import { Link, useLocation } from 'react-router-dom'
import './navbar.scss'

interface NavbarProps {
    routes: RoutesType[]
}

function Navbar({ routes }: NavbarProps): React.ReactNode {
    const location = useLocation()
    const currentPage = location.pathname

    return (
        <nav className="navbar">
            <ul>
                {routes.map(({ path, label }) => (
                    <li key={path}>
                        <Link
                            className={currentPage === path ? 'active' : ''}
                            to={path}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navbar
