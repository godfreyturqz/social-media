import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { CREATE_POST } from '../gql/post'

const PostForm = () => {

    const [post, setPost] = useState('')

    const [createPost] = useMutation(CREATE_POST, {
        variables: {post},
        onError(res){
            console.log(res)
        },
        onCompleted(userData){
            console.log(userData)
            setPost('')
        }
    })

    const handleInputs = (e) => {
        setPost(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createPost()
    }

    return (
        <Form onSubmit={handleSubmit} autoComplete="off">
            <h2>Create a post</h2>
            <Form.Input
                placeholder = "Share some post"
                onChange={handleInputs}
                value={post}
            />
            <Button color="blue">Submit</Button>
        </Form>
    )
}

export default PostForm
