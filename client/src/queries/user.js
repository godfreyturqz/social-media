import { gql } from '@apollo/client'

export const REGISTER_USER = gql`
    mutation register(
        $firstname: String!
        $lastname: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                firstname: $firstname
                lastname: $lastname
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id
            firstname
            lastname
            email
            createdAt
            token
        }
    }
`