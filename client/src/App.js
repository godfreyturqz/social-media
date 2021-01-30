import './App.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './ApolloProvider'

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        Apollo Client
      </div>
    </ApolloProvider>
  )
}

export default App
