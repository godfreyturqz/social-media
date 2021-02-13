import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../gql/post'
// components
import PostCard from '../components/PostCard'

const Home = () => {

    const { loading, error, data } = useQuery(GET_POSTS)

    return (
        loading ? <div>Loading</div> :
        error ? <div>Error</div> :
        data?.getPosts.map(post => <PostCard key={post.id} {...post} /> )
    )
}

export default Home
