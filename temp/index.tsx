import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "apollo-link-context";
import { Link, Switch, Route } from "react-router-dom";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";

let Navigator : any= () => (
  <ul>
    <li>
      <Link to={"/"}>Home</Link>
    </li>
    <li>
      <Link to={"/search"}>Search</Link>
    </li>
  </ul>
);
Navigator = withRouter(Navigator);

const MainComponent = () => <h1>Main Component</h1>;
let SearchComponent : any = () => <h1>Search Component</h1>;
SearchComponent = withApollo(SearchComponent);

const App = () => (
  <div className="App">
    <Navigator />
    <Switch>
      <Route exact path="/" component={MainComponent} />
      <Route exact path="/search" component={SearchComponent} />
    </Switch>
  </div>
);

const AUTH_TOKEN = "auth-token";

const httpLink = createHttpLink({
  uri: "http://localhost:3001"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  if (!token) {
    return {
      headers
    };
  }

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <App />
      </ApolloHooksProvider>
    </ApolloProvider>
  </BrowserRouter>
);

// This is a buggy version of Root. This uses the ApolloProvider
// imported from react-apollo-hooks in a standalone manner.
// This will generate a following error:
//   Invariant Violation
//     Could not find "client" in the context of ApolloConsumer.Wrap
//     the root component in an < ApolloProvider >
const BuggyRoot = () => (
  <BrowserRouter>
    <ApolloHooksProvider client={client}>
      <App />
    </ApolloHooksProvider>
  </BrowserRouter>
);

const rootElement = document.getElementById("app");
ReactDOM.render(<Root />, rootElement);