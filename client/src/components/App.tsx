import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch'

import Users from "./Users";


const httpLink = new HttpLink({
    uri: 'http://localhost:3001/graphql',
    fetch: fetch
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }
  
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const link = ApolloLink.from([errorLink, httpLink]);


  const cache = new InMemoryCache();

    const client = new ApolloClient({
    link,
    cache,
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
              <h2 className='text-center'>{this.state.title}</h2>
              <p className='text-center'>{this.state.content}</p>
              <Users />                
            </ApolloProvider>         
        )
    }
}

export default App

