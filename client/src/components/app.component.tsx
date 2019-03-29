import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import routes from '../routes'

interface Props {
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
            <div>
              <ul>
                <li><Link to="/">home</Link></li>
                <li><Link to="/users">users</Link></li>
              </ul>          
              <h2 className='text-center'>{this.state.title}</h2>
              <p className='text-center'>{this.state.content}</p>                   
              <Switch>                            
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
        )
    }
}

export default App

