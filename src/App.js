import React from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';

import ApolloClient from 'ApolloAPI/client';
import store from 'store';
import AppRoutes from 'navigation';

function App() {
  return (
    <Provider store={store} >
      <ApolloProvider client={ApolloClient}>
        <AppRoutes />
      </ApolloProvider>
    </Provider>
  );
}

export default App;
