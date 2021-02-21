import React, { useState } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { useMutation } from '@apollo/client'
import { CREATE_POST, GET_POSTS } from '../gql/post_GQL'

const PostForm = () => {

    const [post, setPost] = useState('')

    const [createPost, {error}] = useMutation(CREATE_POST, {
        variables: {post},
        onError(res){
            console.log(res)
        },
        onCompleted(res){
            console.log(res)
            setPost('')
        },
        refetchQueries: [{query: GET_POSTS}],
        awaitRefetchQueries: true
    })

    const handleInputs = (e) => {
        setPost(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createPost()
    }

    return (
        <>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <h2>Create a post</h2>
                <Form.Input
                    placeholder = "Share some post"
                    onChange={handleInputs}
                    value={post}
                    error={error ? true : false}
                />
                <Button color="blue">Submit</Button>
            </Form>
            {error && 
                <div className="ui error message">
                    {error.graphQLErrors[0].message}
                </div>
            }
        </>
    )
}

export default PostForm
