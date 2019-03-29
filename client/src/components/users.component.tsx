import React, { Component } from 'react';
import SearchUsers from './searchUsers.component'
import { connect } from 'react-redux'
import actions from '../actions'

interface Props {
    dispatch: Function,
    error: any,
    loading: boolean,
    users: any
}

interface State {

}

class Users extends Component<Props, State> {
    constructor(props){
        super(props)            

    }

    async componentDidMount() {
        this.props.dispatch(await actions.usersActions.fetchUsers());
    }    

    render(){
        const { error, loading, users} = this.props
        if (error) {
            return <div>Error! {error.message}</div>
        }
        if (loading) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <ul>
                    {users.map((user, key) => {
                        return (<li key={key}>{user.name} - {user.role} </li>)
                    })}
                </ul>
                <SearchUsers />
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        users: state.users.users,
        loading: state.users.loading,
        error: state.users.error
	}
}


export default connect(mapStateToProps, null )(Users)