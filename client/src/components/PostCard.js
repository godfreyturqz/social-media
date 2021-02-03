import React from 'react'
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const PostCard = (props) => {

    const {
        id,
        userID,
        post,
        firstname,
        lastname,
        createdAt
    } = props

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
                    <Button color='blue'>
                        <Icon name='heart' />Like
                    </Button>
                    <Label basic color='blue' pointing='left'>2,048</Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard
