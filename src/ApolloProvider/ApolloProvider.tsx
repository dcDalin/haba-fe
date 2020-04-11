import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { ApolloProvider } from '@apollo/react-hooks';
import App from '../App';
import { jwtTitle } from '../constants';

const uploadLink = createUploadLink({
  uri: `${process.env.REACT_APP_HABAHABA_URL}/graphql`,
});

// Pass token in every instance required individually
// Problem was when I abstracted it into a variable
// It would retain the old token
// E.g. if a user logs out and a new one logs in,
// The previous token would still be active untill a page refresh happens
// Having them retreived from local storage just before they are used solved the above problem
const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_HABAHABA_SUBSCRIPTION_URL}/graphql`,
  options: {
    reconnect: true,
    connectionParams: (): any => ({
      req: {
        headers: {
          authorization: `Bearer ${localStorage.getItem(jwtTitle)}`,
        },
      },
    }),
  },
});

const terminatingLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  uploadLink,
);

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(jwtTitle);

  // return the headers to the context so uploadLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      // Case token has expired or is invalid
      // Remove it from local storage
      // Refresh page so as to refresh auth context
      if (message === 'UNAUTHENTICATED') {
        localStorage.removeItem(jwtTitle);
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
    });
  }
});

const link = ApolloLink.from([authLink, errorLink, terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
