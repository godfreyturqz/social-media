const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        getPosts: [Post]
    }
    type Post {
        id: ID,
        body: String,
        createdAt: String,
        username: String
    }
    type Mutation {
        register(registerInput: RegisterInput): User,
        login(loginInput: LoginInput): User
    }
    input RegisterInput {
        email: String,
        password: String,
        confirmPassword: String
    }
    input LoginInput {
        email: String,
        password: String,
        confirmPassword: String
    }
    type User {
        id: ID,
        email: String,
        createdAt: String,
        token: String
    }
`

module.exports = typeDefs