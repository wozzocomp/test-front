/* eslint-disable no-console */
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';

import { LOCAL_STORAGE_CONST } from './constants';
import store from '../store';
import { COMMON } from './dispatchTypes';

const graphqlUri = `${process.env.REACT_APP_PROXY}graphql` || 'http://localhost:5000/graphql';

const getToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_CONST.TOKEN);

  if (token) {
    return `Bearer ${token}`;
  }
  return null;
};

const uploadLink = createUploadLink({ uri: graphqlUri });

const authLink = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: getToken(),
    },
  }));

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  // Change console logs
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    );
  }
  if (networkError && -1 < networkError.message.indexOf('Failed to fetch')) {
    store.dispatch({ type: COMMON.NO_CONNECTION, noConnection: true });
  } else if (networkError) {
    console.warn(`[Network error]: ${networkError}`);
  }
});

const link = ApolloLink.from([ authLink, errorLink, uploadLink ]);

const cache = new InMemoryCache({
  addTypename: false,
});

const apolloClient = new ApolloClient({
  link,
  cache,
  // Remove this options for adding cache
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
