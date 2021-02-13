import { useState } from 'react'
// graphql
import { useMutation } from '@apollo/client'
import { LOGIN_USER } from '../../gql/user'

const useLogin = (props) => {

    const initialUserData = {
        email: '',
        password: '',
    }

    const [userData, setUserData] = useState(initialUserData)
    const [errors, setErrors] = useState()
    
    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        variables: userData,
        onError(res){
            setErrors(res.graphQLErrors[0].extensions.errors)
        },
        onCompleted(){
            setUserData(initialUserData)
            props.history.push('/')
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
