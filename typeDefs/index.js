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
        createComment(postId: ID, body: String): Post
        deleteComment(postId: ID, commentId: ID): Post
        likePost(postId: ID): Post
    }
    type Comment {
        id: ID
        createdAt: String
        username: String
        body: String
    }
    type Like {
        id: ID
        createdAt: String
        username: String
    }
    type User {
        id: ID
        email: String
        createdAt: String
        token: String
    }
    type Post {
        id: ID
        body: String
        createdAt: String
        username: String
        comments: [Comment]
        likes: [Like]
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