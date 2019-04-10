import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'

interface Props {
   login: Function
}

interface State {
  
}

class Login extends Component<Props, State>{

    constructor(props) {
        super(props);
        this.state = {        
          username: '',
          password: ''          
        };
    
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this)
    }
    
  onSubmit(e) {
    e.preventDefault();
    let credentials = this.state
    console.log(credentials)
    this.props.login(credentials)    
  }

  onChange(event: any, field: string) : any {
    this.setState({[field]: event.target.value})
  }

  render() {

    return (
    <form onSubmit={this.onSubmit}>
        <h1>Login</h1>
        <input
            name="username" placeholder="username" 
            onChange={ (event) => this.onChange(event, 'username')}
            type="text"
        />
        <input
            name="password" placeholder="password" 
            onChange={ (event) => this.onChange(event, 'password')}
            type="password"
        />
        <button>Login</button>
    </form>
    );
  }
}

let login = actions.authActions.login


export default connect(null, { login })(Login)