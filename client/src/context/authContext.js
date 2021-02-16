import { createContext, useReducer } from 'react'
import { LocalStorage } from '../utils/LocalStorage'


const AuthContext = createContext()

const AuthReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state

    }
}

const AuthProvider = (props) => {

    const initialState = {
        user: null
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const userState = new LocalStorage().loadState()
    if(userState) initialState.user = userState

    const login = (userData) => {
        new LocalStorage().saveState(userData)
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    const logout = () => {
        localStorage.removeItem('userState')
        dispatch({
            type: 'LOGOUT'
        })
    }
    
    return (
        <AuthContext.Provider value={{user: state.user, login, logout}} {...props}/>
    )
}

export { AuthContext, AuthProvider }
