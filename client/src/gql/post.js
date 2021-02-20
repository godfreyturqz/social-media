import { gql } from '@apollo/client'

export const GET_POSTS = gql`
    query {
        getPosts {
            id
            userID
            post
            firstname
            lastname
            createdAt
        }
    }
`

export const CREATE_POST = gql`
    mutation createPost($post: String!){
        createPost(post: $post){
            id
            userID
            createdAt
            firstname
            lastname
        }
    }
`