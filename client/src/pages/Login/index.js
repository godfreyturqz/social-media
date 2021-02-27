import React from 'react'
import { Form } from 'semantic-ui-react'
import useLogin from './useLogin'

const Login = (props) => {

    const {
        loading,
        errors,
        userData,
        handleInputs,
        handleSubmit
    } = useLogin(props)

    const inputLabels = {
        email: 'Email Address',
        password: 'Password',
    }

    return (
        <Form onSubmit={handleSubmit} className={loading ? 'loading' : ''} autoComplete="off">
            <h1>Log In</h1>
            { Object.entries(inputLabels).map(([key, value]) =>
                <Form.Input
                    key={key}
                    label={value}
                    name={key}
                    value={userData.key}
                    onChange={handleInputs}
                    error={errors?.key}
                    type={key === 'password' ? 'password' : 'text'}
                />
            )}
            <Form.Button primary>Continue</Form.Button>
        </Form> 
    )
}

export default Login
