import React, { Component } from 'react'
import Cookies from 'js-cookie'

class Login extends Component{

    constructor(props){
        super(props)
        this.state ={

        }
    }
    componentDidMount(){
        Cookies.set('user', 'value')
    }
    render(){
        return(
            <div>Login</div>
        )
    }
}


export default Login