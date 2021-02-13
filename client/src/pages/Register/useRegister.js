import { useState } from 'react'
// graphql
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../../gql/user'

const useRegister = (props) => {

    const initialUserData = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const [userData, setUserData] = useState(initialUserData)
    const [errors, setErrors] = useState()
    
    const [createUser, { loading }] = useMutation(REGISTER_USER, {
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
        createUser()
    }

    return {
        loading,
        errors,
        userData,
        handleInputs,
        handleSubmit
    }
}

export default useRegister
