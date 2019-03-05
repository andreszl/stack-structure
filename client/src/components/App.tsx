import React, { Component } from 'react'



export interface Props {
    initialState: object
}

export interface State {
  title: string,
  content: string
}

class App extends Component<Props, State> {
    constructor(props){
        super(props)
        this.state = {
            title: 'Server Side Rendering React',
            content: 'implementation of server-side-rendering',           
        }
    }

    render() {
        return (
            <div>
                <h2 className='text-center'>{this.state.title}</h2>
                <p className='text-center'>{this.state.content}</p>
            </div>
        )
    }
}

export default App