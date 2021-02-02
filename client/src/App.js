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


function App() {
  return (
    <div className="ui container">
    <ApolloProvider client={client}>
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
    </div>
  )
}

export default App