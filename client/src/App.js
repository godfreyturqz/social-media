import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/config'
import 'semantic-ui-css/semantic.min.css'
// pages
import Home from './pages/Home'
import Register from './pages/Register'
// context
import { AuthProvider } from './context/authContext'
import AuthRoute from './utils/AuthRoute'

const App = () => {

  return (
    <div className="ui container">
      <AuthProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Switch>
              <AuthRoute exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </AuthProvider>
    </div>
  )
}

export default App