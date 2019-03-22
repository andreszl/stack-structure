import React, { Component } from 'react';
import { Query} from 'react-apollo';
import gql from 'graphql-tag';
import User from './SearchUsers'
const USERS_QUERY = gql`
    {
        users {
            name,
            role

        }
    }
`;
class Users extends Component {
    render(){
        return (
            <div>
                <h1>Users</h1>
                <Query query={USERS_QUERY}>
                    {
                        ({loading, error, data}) => {
                            if(loading) return <h4>loading...</h4>
                            if(error) console.log(error)
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

export default Users