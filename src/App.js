import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from 'react-apollo';

import createClient from 'ApolloAPI/client';
import store, { persistor } from 'store';
import AppRoutes from 'navigation';

export default class App extends React.Component {
  state = { client: null, loaded: false }

  async componentDidMount() {
    const client = await createClient();
    this.setState({ client, loaded: true })
  }
  render() {
    const { client, loaded } = this.state;
    if (!loaded) return <div>Loading ...</div>;
    return (
      <Provider store={store} >
        <PersistGate persistor={persistor}>
          <ApolloProvider client={client}>
            <AppRoutes />
          </ApolloProvider>
        </PersistGate>
      </Provider>
    );
  }
}