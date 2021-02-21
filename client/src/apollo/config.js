import { ApolloClient, InMemoryCache } from '@apollo/client'

const LOCAL_URI = 'http://localhost:5000/graphql'
// const DEPLOYMENT_URI = 'https://herokuapp...../graphql'

const isUserStateStored = localStorage.getItem('userState') || null

export const client = new ApolloClient({
    uri: LOCAL_URI,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
    headers: {
        authorization: `Bearer ${isUserStateStored && JSON.parse(localStorage.getItem('userState')).value.token}`
    }
})