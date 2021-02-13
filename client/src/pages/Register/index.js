import React from 'react'
import { Form } from 'semantic-ui-react'
import useRegister from './useRegister'

const Register = (props) => {

    const {
        loading,
        errors,
        userData,
        handleInputs,
        handleSubmit
    } = useRegister(props)

    const inputLabels = {
        firstname: 'Firstname',
        lastname: 'Lastname',
        email: 'Email Address',
        password: 'Password',
        confirmPassword: 'Confirm Password'
    }

    return (
        <Form onSubmit={handleSubmit} className={loading ? 'loading' : ''} autoComplete="off">
            <h1>Register</h1>
            { Object.entries(inputLabels).map(([key, value]) =>
                <Form.Input
                    key={key}
                    label={value}
                    name={key}
                    value={userData.key}
                    onChange={handleInputs}
                    error={errors?.key}
                    type={key === 'password' || key === 'confirmPassword' ? 'password' : 'text'}
                />
            )}
            <Form.Button primary>Sign - up</Form.Button>
            <div className="ui error message">
                {JSON.stringify(errors)}
            </div>
        </Form> 
    )
}

export default Register
