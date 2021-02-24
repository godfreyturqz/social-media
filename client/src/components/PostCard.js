import React, { useContext, useState } from 'react'
import { Card, Icon, Label, Image, Button, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { GET_POSTS, LIKE_POST } from '../gql/post_GQL'
import { CREATE_COMMENT } from '../gql/comment_GQL'
import { useMutation } from '@apollo/client'

import { AuthContext } from '../context/authContext'

const PostCard = (props) => {

    const {
        id,
        //userid of author
        // userID,
        post,
        firstname,
        lastname,
        createdAt,
        comments,
        likes
    } = props

    const { user } = useContext(AuthContext)

    const [toggleCommentForm, setToggleCommentForm] = useState(false)
    const [comment, setComment] = useState('')

    const [likePost] = useMutation(LIKE_POST, {
        variables: {postID: id},
        onError(res){
            console.log(res)
        },
        onCompleted(res){
            console.log(res)
        },
        refetchQueries: [{query: GET_POSTS}],
        awaitRefetchQueries: true
    })

    const [createComment] = useMutation(CREATE_COMMENT, {
        variables: {postID: id, comment},
        onError(res){
            console.log(res)
        },
        onCompleted(res){
            console.log(res)
        },
        refetchQueries: [{query: GET_POSTS}],
        awaitRefetchQueries: true
    })

    const handleLike = (e) => {
        e.preventDefault()
        likePost()
    }

    const handleSubmitComment = (e) => {
        e.preventDefault()
        createComment()
    }
    
    return (
        <Card>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-512.png'
                as={Link}
                to={`/${firstname}.${lastname}`}
                />
                <Card.Header as={Link} to={`/${firstname}.${lastname}`}>{firstname} {lastname}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)} ago</Card.Meta>
                <Card.Description>{post}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as='div' labelPosition='right' onClick={handleLike}>
                    <Button color='blue' basic >
                        <Icon name='heart' />Like
                    </Button>
                    <Label basic color='blue' pointing='left'>{likes.length}</Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={() => setToggleCommentForm(!toggleCommentForm)}>
                    <Button color='blue'  basic>
                        <Icon name='comment' />
                    </Button>
                    <Label basic color='blue' pointing='left'>{comments.length}</Label>
                </Button>
            </Card.Content >
            {
                toggleCommentForm &&
                <Card.Content extra>
                    <Input 
                        placeholder="Add a comment..."
                        icon={{ name: 'send', circular: true, link: true }}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </Card.Content>
            }
        </Card>
    )
}

export default PostCard
