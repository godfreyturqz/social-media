import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { client } from './apollo/config'
import 'semantic-ui-css/semantic.min.css'
// components
import NavBar from './components/NavBar'
// pages
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
// context
import { AuthProvider } from './context/authContext'
import AuthRoute from './utils/AuthRoute'

const App = () => {
  return (
    <div className="ui container">
      <AuthProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/register" component={Register} />
              <AuthRoute exact path="/login" component={Login} />
            </Switch>
          </BrowserRouter>
        </ApolloProvider>
      </AuthProvider>
    </div>
  )
}

export default App