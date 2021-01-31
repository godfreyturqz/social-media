import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development'
})