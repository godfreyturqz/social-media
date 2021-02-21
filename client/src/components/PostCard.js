import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { GET_POSTS, LIKE_POST } from '../gql/post_GQL'
import { useMutation } from '@apollo/client'

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
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                as={Link}
                to={`/${firstname}.${lastname}`}
                />
                <Card.Header>{firstname} {lastname}</Card.Header>
                <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
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
                    <Button color='blue' basic>
                        <Icon name='comment' />
                    </Button>
                    <Label basic color='blue' pointing='left'>{comments.length}</Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard
