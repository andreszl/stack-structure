import React, { Component } from 'react'
import UserItem from './userItem.component'


interface Props {
}

interface State {
  user: String
}

class User extends Component<Props, State>  {
    constructor(props){
        super(props)
        this.state = {
            user: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onKeyPress = this.onKeyPress.bind(this)
    }

    onKeyPress(event){
        if (event.key == 'Enter') {
            this.setState({user: event.target.value})
            console.log(this.state.user)
        }
    }

    onChange(event){
        this.setState({user: event.target.value})
        console.log(this.state.user)
    }

    render(){
        return (
            <div>
                <form onSubmit={event => event.preventDefault()}>
                    <div>
                        <input
                            onChange={this.onChange}
                            onKeyPress={this.onKeyPress}
                            type="text"
                        />
                    </div>
                </form>   
                <UserItem name={this.state.user}  />            
            </div>
        )
    }
}

export default User
