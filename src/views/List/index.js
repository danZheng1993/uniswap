import React from 'react';
import { ApolloConsumer } from 'react-apollo';

import UserTable from './UserTable';

export default class ListView extends React.Component {
  render() {
    return (
      <ApolloConsumer>
        {(client) => (
          <UserTable client={client} />
        )}
      </ApolloConsumer>
    );
  }
}
