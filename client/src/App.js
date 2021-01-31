import './App.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/config'
<<<<<<< Updated upstream
=======
// pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'

>>>>>>> Stashed changes

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
