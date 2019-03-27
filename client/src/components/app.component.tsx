import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { Route, Link, Switch } from 'react-router-dom'
import routes from '../routes'
import { client } from '../lib/apolloClient.lib'


interface Props {
    initialState: object
}

interface State {
  title: string,
  content: string
}

class App extends Component<Props, State> {
    constructor(props){
        super(props)
        this.state = {
            title: 'Server Side Rendering React',
            content: 'implementation of server-side-rendering',           
        }
    }

    render() {
        return (             
          <ApolloProvider client={client}>    
            <div>
              <ul>
                <li><Link to="/">home</Link></li>
                <li><Link to="/users">users</Link></li>
              </ul>          
              <h2 className='text-center'>{this.state.title}</h2>
              <p className='text-center'>{this.state.content}</p>                   
              <Switch>             
                {routes.map((route) => (console.log(route)))}
                  {routes.map((route) => (
                    <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    />                    
                    ))}
              </Switch>       
            </div>          
          </ApolloProvider>             
        )
    }
}

export default App

