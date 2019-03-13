import React, { Component } from 'react';
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import fetch from 'node-fetch';

import Users from "./Users";

const link = createHttpLink({
    uri: "http://localhost:3001/graphql",
    fetch: fetch
  });
  
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });

interface Props {
    initialState: object
}

interface State {
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
            <ApolloProvider client={client}>
                <div>
                    <h2 className='text-center'>{this.state.title}</h2>
                    <p className='text-center'>{this.state.content}</p>
                    <Users />
                </div>
            </ApolloProvider>         
        )
    }
}

export default App

