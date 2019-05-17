import React from 'react';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { get } from 'lodash';

import { QUERY_USER } from 'ApolloAPI/queries';

import { AddBalanceData } from 'store/actions/balance';
import { AddTransactionData } from 'store/actions/transaction';
import { AddData } from 'store/actions/users';
import { parseUserData } from 'utils/data';

import UserTable from './UserTable';

class ListView extends React.Component {
  updateStore = (data) => {
    const {
      AddBalanceData,
      AddTransactionData,
      AddData,
    } = this.props;
    const { usersData, balanceData, transactionData } = parseUserData(data.users || []);
    AddData(usersData);
    AddBalanceData(balanceData);
    AddTransactionData(transactionData);
  }

  loadMore = (fetchMore, data) => () => {
    const users = data.users || [];
    const lastId = get(users, `[${users.length - 1}].id`, '0');
    fetchMore({
      variables: {
        id: lastId,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        this.updateStore(fetchMoreResult);
        return Object.assign({}, prev, {
          feed: [...prev.users, ...fetchMoreResult.users]
        });
      }
    })
  }

  render() {
    return (
      <Query
        query={QUERY_USER}
        variables={{ id: '0' }}
        fetchPolicy="cache-and-network"
        onCompleted={this.updateStore}
      >
        {({ loading, data, fetchMore }) => (
          <UserTable loadMore={this.loadMore(fetchMore, data)} loading={loading} />
        )}
      </Query>
    );
  }
}

const mapDispatchToProps = {
  AddBalanceData,
  AddTransactionData,
  AddData
};

export default connect(null, mapDispatchToProps)(ListView);