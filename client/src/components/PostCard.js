import React, { useContext } from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { GET_POSTS, LIKE_POST } from '../gql/post_GQL'
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

    const handleLike = () => {
        likePost()
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
                <Button as='div' labelPosition='right'>
                    <Button color='blue' basic onClick={handleLike}>
                        <Icon name='heart' />Like
                    </Button>
                    <Label basic color='blue' pointing='left'>{likes.length}</Label>
                </Button>
                <Button as='div' labelPosition='right'>
                    <Button color='blue' basic as={Link} to={`/post/${id}`}>
                        <Icon name='comment' />
                    </Button>
                    <Label basic color='blue' pointing='left'>{comments.length}</Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard
