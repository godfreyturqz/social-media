const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Query {
        getUsers: [User]
        getPosts: [Post]
        getPost(postID: ID): Post
    }
    type Mutation {
        register(registerInput: RegisterInput): User
        login(loginInput: LoginInput): User
        createPost(post: String): Post
        deletePost(postID: ID): Post
        createComment(postID: ID, comment: String): Post
        deleteComment(postID: ID, commentID: ID): Post
        likePost(postID: ID): Post
    }
    type Comment {
        id: ID
        userID: ID
        comment: String
        firstname: String
        lastname: String
        createdAt: String
    }
    type Like {
        id: ID
        userID: ID
        firstname: String
        lastname: String
        createdAt: String
    }
    type User {
        id: ID
        firstname: String
        lastname: String
        email: String
        createdAt: String
        token: String
    }
    type Post {
        id: ID
        userID: ID
        post: String
        createdAt: String
        firstname: String
        lastname: String
        comments: [Comment]
        likes: [Like]
    }
    input RegisterInput {
        firstname: String
        lastname: String
        email: String
        password: String
        confirmPassword: String
    }
    input LoginInput {
        email: String
        password: String
    }
`

module.exports = typeDefs