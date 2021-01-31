import './App.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/config'

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
