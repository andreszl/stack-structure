import React, { Component } from 'react'
import UsersFiltered from './usersFiltered.component'
import { connect } from 'react-redux'
import actions from '../actions'

interface Props {
    findUsersByName: Function
}

interface State {
}

class SearchUsers extends Component<Props, State>  {
    constructor(props){
        super(props)
        this.searchUser = this.searchUser.bind(this)
    }

    searchUser(event, type) : any {
        if(type == 'press'){
            if (event.key == 'Enter') {
                this.props.findUsersByName(event.target.value)
            }
        }else{
            this.props.findUsersByName(event.target.value)
        }
    }

    render(){
        return (
            <div>
                <form onSubmit={event => event.preventDefault()}>
                    <div>
                        <input
                            onChange={ (event) => this.searchUser(event, 'change')}
                            onKeyPress={(event) => this.searchUser(event, 'press')}
                            type="text"
                        />
                    </div>
                </form>   
                <UsersFiltered />            
            </div>
        )
    }
}


const findUsersByName = actions.usersActions.findUsersByName

export default connect(null, {  findUsersByName } )(SearchUsers)
