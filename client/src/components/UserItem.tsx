import React, { Component } from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const FIND_USER_BY_NAME = gql`
     query user($name: String!) {
        findUsersByName(name: $name){
            id,
            name,
            role,
            status,
            createdAt
        }
    }
`;


interface Props{
    name: String
}

interface State{

}

class UserItem extends Component<Props, State> {
    constructor(props){
        super(props)
        this.state = {
        }
    }

    render(){
        return(
            <div>
                {

                this.props.name != '' ? 
                    <Query query={FIND_USER_BY_NAME} variables={{name: this.props.name}}>
                        {
                            ({loading, error, data}) => {
                                if(loading) return <h4>loading...</h4>
                                if(error) console.log(error)
                                console.log(data)
                                return (                               
                                    <div>
                                        {
                                            data.findUsersByName.length  >= 1 ? 
                                                data.findUsersByName.map( (u, key) => {
                                                    return <div key={key}>
                                                        <hr/>
                                                        <p>id: {u.id}</p>
                                                        <p>name: {u.name}</p>
                                                        <p>role: {u.role}</p>
                                                        <p>status: {u.status}</p>
                                                        <p>create at: {u.createdAt}</p>
                                                    </div>
                                                })
                                                : <p>No se econtraron registros </p>
                                        }
                                        <hr/>
                                    </div>
                                )                        
                            }
                        }
                    </Query>
                    : null

                }
               
            </div>
        )
    }
}


export default UserItem




