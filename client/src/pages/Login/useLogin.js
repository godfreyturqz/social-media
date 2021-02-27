import { useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { useHistory } from 'react-router-dom'
// graphql
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../gql/user_GQL'


const useLogin = () => {

    const history = useHistory()

    const initialUserData = {
        email: 'gt@gmail.com',
        password: 'asd',
    }
    
    const context = useContext(AuthContext)
    const [userData, setUserData] = useState(initialUserData)
    const [errors, setErrors] = useState()
    
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        variables: userData,
        onError(res){
            console.log(res)
            setErrors(res.graphQLErrors[0].extensions.errors)
        },
        onCompleted(userData){
            context.login(userData.login)
            setUserData(initialUserData)
            history.push('/')
        }
    })

    const handleInputs = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginUser()
    }

    return {
        loading,
        errors,
        userData,
        handleInputs,
        handleSubmit
    }
}

export default useLogin
