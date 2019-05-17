import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';

import ApolloClient from 'ApolloAPI/client';
import store, { persistor } from 'store';
import AppRoutes from 'navigation';

function App() {
  return (
    <Provider store={store} >
      <PersistGate persistor={persistor}>
        <ApolloProvider client={ApolloClient}>
          <AppRoutes />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
