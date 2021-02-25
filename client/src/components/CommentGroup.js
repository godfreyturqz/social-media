import React from 'react'
import { Comment } from 'semantic-ui-react'

const CommentGroup = (props) => {

    const {
        comment,
        firstname,
        lastname,
        createdAt
    } = props

    return (
        <Comment.Group>
            <Comment>
                <Comment.Avatar src='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png' />
                <Comment.Content>
                    <Comment.Author as='a'>{firstname} {lastname}</Comment.Author>
                    <Comment.Metadata>
                        <div>{createdAt}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment}</Comment.Text>
                    <Comment.Actions>
                        <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                </Comment.Content>
            </Comment>
        </Comment.Group>
    )
}

export default CommentGroup
