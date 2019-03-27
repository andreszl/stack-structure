import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch'

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

export const client = new ApolloClient({
    link,
    cache,
});