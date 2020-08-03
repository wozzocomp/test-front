import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import { ToastProvider } from '@wozzocomp/base-comps';

import Main from './containers/general';
import store from './store';
import apolloClient from './utils/apollo';

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <ToastProvider>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </ToastProvider>
    </Provider>
  </ApolloProvider>
);

export default App;
