import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const LINK = createHttpLink({
<<<<<<< Updated upstream
    uri: 'http://localhost:5000/graphql'
=======
    uri: "http://localhost:5000/graphql"
>>>>>>> Stashed changes
})

export const client = new ApolloClient({
    link: LINK,
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development'
})