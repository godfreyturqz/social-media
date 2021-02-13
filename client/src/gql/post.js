import { gql } from '@apollo/client'

export const GET_POSTS = gql`
    query{
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