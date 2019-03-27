import React, { Component } from 'react';
import { Query} from 'react-apollo';
import gql from 'graphql-tag';
import User from './searchUsers.component'
import { usersActions } from '../actions'
import { connect } from 'react-redux'

const USERS_QUERY = gql`
    {
        users {
            name,
            role

        }
    }
`;


interface Props {
   users: any
}

interface State {
}

class Users extends Component<Props, State> {
    constructor(props){
        super(props)    
        this.saveUsers = this.saveUsers.bind(this)
    }

    saveUsers(users){
        console.log(users)
        this.setState({users: users})
    }
    
    render(){
        return (
            <div>
                <h1>Users</h1>
                <Query query={USERS_QUERY}>
                    {
                        ({loading, error, data}) => {
                            if(loading) return <h4>loading...</h4>
                            if(error) console.log(error)  
                            this.saveUsers(data.users)
                            return (
                                <div>
                                    {                                                                                
                                        data.users.map( (user, key) => {
                                            return <div key={key}>
                                                <p>{user.name} - {user.role}</p>                                                
                                            </div>
                                        })
                                    }
                                </div>
                            )  
                                            
                        }
                    }
                </Query>             
                <User />
            </div>
        )
    }
}

let users : any = usersActions.users

function mapStateToProps(state){
	return {
		users: state.users
	}
}

export default connect( mapStateToProps, { users })(Users)