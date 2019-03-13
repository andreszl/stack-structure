import React, { Component } from 'react';
import {gql, Query} from 'react-apollo';

const USERS_QUERY = gql`
    {
        users {
            name
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
                            return <h1>test</h1>
                        }
                    }
                </Query>
            </div>
        )
    }
}

export default Users