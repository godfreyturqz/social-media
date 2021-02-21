import { useContext, useState } from 'react'
import { AuthContext } from '../../context/authContext'
// graphql
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../../gql/user_GQL'

const useRegister = (props) => {

    const initialUserData = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const context = useContext(AuthContext)
    const [userData, setUserData] = useState(initialUserData)
    const [errors, setErrors] = useState()
    
    const [createUser, { loading }] = useMutation(REGISTER_USER, {
        variables: userData,
        onError(res){
            setErrors(res.graphQLErrors[0].extensions.errors)
        },
        onCompleted(){
            context.login(userData.register)
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
