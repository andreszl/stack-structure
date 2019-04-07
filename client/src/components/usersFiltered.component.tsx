import React, { Component } from 'react'
import { connect }  from 'react-redux'

interface Props{
    error: any,
    loading: boolean,
    usersFiltered: [
        {
            id: string,
            name: string,
            role:string,
            status: string,
            createdAt: Date,
            updatedAt: Date,
        }
    ]
    
}

interface State{

}

class UsersFiltered extends Component<Props, State> {
    constructor(props){
        super(props)       
    }

    render(){
        const { error, loading, usersFiltered} = this.props
        if (error) {
            return <div>Error! {error.message}</div>
        }
        if (loading) {
            return <div>Loading...</div>;
        }

        return(
            <div>
                <ul>
                    {usersFiltered.map((user, key) => {
                        return (
                            <div key={key}>
                                <p>id: {user.id} </p>
                                <p>name: {user.name} </p>
                                <p>role: {user.role}</p>
                                <p>status: {user.status}</p>                             
                                <hr/>
                            </div>
                        )
                    })}
                </ul>
        </div>
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users.users,
        loading: state.users.loading,
        error: state.users.error,
        usersFiltered: state.users.usersFiltered
	}
}

export default connect(mapStateToProps, null )(UsersFiltered)



