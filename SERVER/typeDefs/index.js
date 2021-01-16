const { gql } = require('apollo-server-express')

const typeDefs = gql`
    type Post {
        id: ID,
        body: String,
        createdAt: String,
        username: String
    }
    type Query {
        getPosts: [Post]
    }
`

module.exports = typeDefs