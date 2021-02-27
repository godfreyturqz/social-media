import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const NavBar = () => {
    const context = useContext(AuthContext)

    const location = useLocation()
    const path = '/' || location.pathname.substr(1)

    return (
        <Menu pointing secondary size="huge">
            <Menu.Item
                name='home'
                active={path === '/'}
                as={Link}
                to="/"
            />
            <Menu.Menu position='right'>
                <Menu.Item
                    name={context.user.firstname}
                    active={path === 'profile'}
                    as={Link}
                    to={'/profile'}
                />
                <Menu.Item
                    name={'Logout'}
                    active={path === 'logout'}
                    as={Link}
                    to={'/'}
                    onClick={context.logout}
                />
            </Menu.Menu>
        </Menu>
    )
}

export default NavBar
