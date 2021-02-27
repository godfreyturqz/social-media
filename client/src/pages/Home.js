import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../gql/post_GQL'
// components
import NavBar from '../components/NavBar'
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'

const Home = () => {
    
    const { loading, error, data } = useQuery(GET_POSTS)

    return (
        <>
            <NavBar/>
            <PostForm/>
            {
                loading ? <div>Loading</div> :
                error ? <div>Error</div> :
                data?.getPosts.map(post => <PostCard key={post.id} {...post} />)
            }
        </>
    )
}

export default Home
