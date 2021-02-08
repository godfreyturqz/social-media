import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
// graphql
import { useMutation } from '@apollo/client'
import { REGISTER_USER } from '../queries/user'

const Register = () => {

    const initialState = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const [user, setUser] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [registerUser, {loading, data, error}] = useMutation(REGISTER_USER)

    const handleInputs = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        registerUser({
            variables: user
        })
        setUser(initialState)
    }

    return (
        <div>
            <Form onSubmit={handleRegister} className={loading ? 'loading' : ''} noValidate>
                <h1>Register</h1>
                <Form.Input
                    label="Firstname"
                    name="firstname"
                    value={user.firstname}
                    onChange={handleInputs}
                />
                <Form.Input
                    label="Lastname"
                    name="lastname"
                    value={user.lastname}
                    onChange={handleInputs}
                />
                <Form.Input
                    label="Email Address"
                    name="email"
                    value={user.email}
                    onChange={handleInputs}
                />
                <Form.Input
                    label="Password"
                    name="password"
                    value={user.password}
                    type="password"
                    onChange={handleInputs}
                />
                <Form.Input
                    label="Confirm Password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    type="password"
                    onChange={handleInputs}
                />
                <Button primary>Register</Button>
            </Form>
        </div>
    )
}

export default Register
