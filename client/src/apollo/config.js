import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const LINK = createHttpLink({
    uri: 'http://localhost:5000/graphql'
})

export const client = new ApolloClient({
    link: LINK,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development'
})