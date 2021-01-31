import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../queries/post'

const Home = () => {

    const { loading, error, data } = useQuery(GET_POSTS)

    return (
        loading ? <div>Loading</div> :
        error ? <div>Error</div> :
        data?.getPosts.map(post => 
            <div key={post.id}>
                {post.post}
            </div>    
        )
    )
}

export default Home
