import React, { useContext } from 'react'
import { useQuery } from '@apollo/client'
import { GET_POSTS } from '../gql/post_GQL'
// components
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { AuthContext } from '../context/authContext'

const Home = () => {
    const { user } = useContext(AuthContext)
    const { loading, error, data } = useQuery(GET_POSTS)

    return (
        <div>
            { user && <PostForm/> }
            {
                loading ? <div>Loading</div> :
                error ? <div>Error</div> :
                data?.getPosts.map(post => <PostCard key={post.id} {...post} />)
            }
        </div>
    )
}

export default Home
