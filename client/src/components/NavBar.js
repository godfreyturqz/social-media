import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const NavBar = () => {
    const context = useContext(AuthContext)
    const location = useLocation()
    const path = location.pathname === '/' ? 'home' : location.pathname.substr(1)
    const [activeItem, setActiveItem] = useState(path)
    const handleItemClick = (e, {name}) => setActiveItem(name)

    const menuItemUser = ['profile', 'logout']
    const menuItemPublic = ['register', 'login']

    return (
        <Menu pointing secondary size="huge">
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to="/"
            />
            <Menu.Menu position='right'>
                { context.user ? 
                    menuItemUser.map(menuItem =>
                        <Menu.Item
                            name={menuItem === 'profile' ? context.user.firstname : menuItem}
                            active={activeItem === menuItem}
                            onClick={menuItem === 'logout' ? context.logout : handleItemClick}
                            as={Link}
                            to={menuItem}
                        />
                    ) :
                    menuItemPublic.map(menuItem =>
                        <Menu.Item
                            name={menuItem}
                            active={activeItem === menuItem}
                            onClick={handleItemClick}
                            as={Link}
                            to={menuItem}
                        />
                    )
                }
            </Menu.Menu>
        </Menu>
    )
}

export default NavBar
