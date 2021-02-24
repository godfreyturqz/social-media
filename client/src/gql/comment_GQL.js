import { gql } from '@apollo/client'

export const CREATE_COMMENT = gql`
    mutation createComment($postID: ID! $comment: String!){
        createComment(postID: $postID, comment: $comment){
            id
        }
    }

`