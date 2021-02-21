import { gql } from '@apollo/client'

export const GET_POSTS = gql`
    query {
        getPosts {
            id
            userID
            post
            createdAt
            firstname
            lastname
            comments {
                id
                userID
                comment
                firstname
                lastname
                createdAt
            }
            likes {
                id
                userID
                firstname
                lastname
                createdAt
            }
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

export const LIKE_POST = gql`
    mutation likePost($postID: ID!){
        likePost(postID: $postID){
            id
        }
    }
`