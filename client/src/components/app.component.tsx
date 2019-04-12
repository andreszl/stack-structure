import React, { Component } from 'react';
import { withRouter, Route, Link, Switch } from 'react-router-dom'
import routes from '../routes'
import { connect } from 'react-redux'
import actions from '../actions';
import api from '../api'
import jwt from 'jsonwebtoken'

interface Props {
  logout: Function,
  history: any,
  auth: any,
  setCurrentUser: Function
}

interface State {
  show: boolean,
  url: string,
  title: string
  content: string,
  verify: boolean,
  access: boolean
}

class App extends Component<Props, State> {
    constructor(props){
        super(props)
        this.state = {
            title: 'Server Side Rendering React',
            content: 'implementation of server-side-rendering',   
            url: '',
            verify: false,
            show: false,
            access: false
        }
        this.auth = this.auth.bind(this)
        this.logout = this.logout.bind(this)
        this.verify = this.verify.bind(this)
    }

    verify(){
      if(localStorage.token){
        api.usersAPi.verify(localStorage.token).then((response) =>{
            if(response){
              console.log('Response', response)
              this.props.setCurrentUser(jwt.decode(localStorage.token))
            }else{
              this.props.history.push('/login')             
            }
        })
      }else{        
        this.props.history.push('/login')
      }
    }

    auth(){   

      // if(this.state.access){
        console.log('llegue aqui')
        // }

      this.setState({url: this.props.history.location, verify: true, access: true})        
      if(!this.props.auth.isAutenticated){
        console.log('redirecting to login...')
        this.setState({access: false}) 
        this.props.history.push('/login')
      }
    }

    logout(){
      this.props.history.push('/login')
      this.props.logout()
    }

    async componentDidMount(){     
      await this.verify()
      this.setState({show: true})
    }

    componentWillMount(){
      this.setState({url: this.props.history.location, verify: true})
    }

    async componentWillReceiveProps(){      
      this.setState({show: false})

      if(this.props.history.location != this.state.url){        
        this.setState({url: this.props.history.location, verify:false})
      }

      if(!this.state.verify){        
        await this.auth()
      }

      this.setState({show: true})
    }

    render() {
        let { isAutenticated } = this.props.auth 
        return (  
          <div>
            {
              this.state.show ? (
                <div>            
                <ul>
                  <li><Link to="/">home</Link></li>
                  <li><Link to="/users">users</Link></li>
                  {
                     isAutenticated ?  <li><label onClick={ () => this.logout() } style={{cursor:'pointer', color: 'blue'}}>Log Out</label></li> : null
                  }
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
              ): (<p>loading...</p>)
            }                   
          </div>                  
        )
    }
}

function mapStateToProps(state){
  return {
      auth: state.auth,    
  }
}

let logout = actions.authActions.logout;
let setCurrentUser = actions.authActions.setCurrentUser;

export default withRouter(connect(mapStateToProps, { logout, setCurrentUser })(App) as any)

