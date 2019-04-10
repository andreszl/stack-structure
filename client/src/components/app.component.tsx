import React, { Component } from 'react';
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import routes from '../routes';
import Cookies from 'js-cookie';
import '../stylesheet/login/app.less';

class App extends Component<any, any> {
    constructor(props){
        super(props)
        this.state = {
            title: 'Server Side Rendering React...',
            content: 'implementation of server-side-rendering',   
            url: '',
            verify: false,
            show: false
        }
        this.auth = this.auth.bind(this)
    }

    auth(){       
      this.setState({url: this.props.history.location, verify: true})     
      if(Cookies.get('user') == null ){
        console.log('redirecting to login...')
        this.props.history.push('/login')
      }  
    }

    componentDidMount(){
      console.log('verifying logging in componentDidMount...')
      console.log(Cookies.get('user'))
       this.auth()
       this.setState({show: true})
    }

    componentWillReceiveProps(){
      this.setState({show: false})
      console.log('verifying logging in componentWillReceiveProps....')
      console.log(this.props.history.location)
      console.log(Cookies.get('user'))
      console.log(this.state)

      if(this.props.history.location != this.state.url){
        console.log('routes', this.props.history.location)
        console.log('route in state', this.state.url)
        this.setState({url: this.props.history.location, verify:false})
      }

      if(this.state.verify == false){        
        this.auth()
      }

      this.setState({show: true})
    }

    render() {
        return (  
          <div>
            {
              this.state.show ? (
                <div>            
                <ul>
                  <li><Link to="/">home</Link></li>
                  <li><Link to="/users">users</Link></li>
                  <li><Link to="/login">login</Link></li>
                  <li><Link to="/asdasd">Not Found</Link></li>
                </ul>          
                <h2 className='title1'>{this.state.title}</h2>
                <p className='content'>{this.state.content}</p>                   
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
              ): (<p>loading...</p>)
            }                   
          </div>                  
        )
    }
}

export default withRouter(App)

