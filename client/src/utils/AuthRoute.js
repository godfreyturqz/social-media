import Login from '../pages/Login'
import { useContext } from 'react'
import { Route } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const AuthRoute = ({component: Component, ...rest}) => {

    const { user } = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render = { props => user ? <Component {...props}/> : <Login/> }
        />
    )
}

export default AuthRoute