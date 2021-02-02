import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'

const NavBar = () => {
    const location = useLocation()
    const path = location.pathname === '/' ? 'home' : location.pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path)
    const handleItemClick = (e, {name}) => setActiveItem(name)

    return (
        <Menu pointing secondary size="huge">
            <Link to="/">
                <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                />
            </Link>
            <Menu.Menu position='right'>
                <Link to="/register">
                    <Menu.Item
                    name='register'
                    active={activeItem === 'register'}
                    onClick={handleItemClick}
                    />
                </Link>
                <Link to="/login">
                    <Menu.Item
                    name='login'
                    active={activeItem === 'login'}
                    onClick={handleItemClick}
                    />
                </Link>
            </Menu.Menu>
        </Menu>
    )
}

export default NavBar