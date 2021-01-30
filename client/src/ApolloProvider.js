import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

export const client = new ApolloClient({
    link: createHttpLink({uri: 'http://localhost:5000/graphql'}),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development'
})