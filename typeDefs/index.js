const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        getPosts: [Post]
        getPost(postId: ID): Post
    }
    type Mutation {
        register(registerInput: RegisterInput): User
        login(loginInput: LoginInput): User
        createPost(body: String): Post
        deletePost(postId: ID): Post
    }
    type User {
        id: ID,
        email: String,
        createdAt: String,
        token: String
    }
    type Post {
        id: ID,
        body: String,
        createdAt: String,
        username: String
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
`

module.exports = typeDefs