import React from 'react';
import { connect } from 'react-redux';
import InfiniteLoader from 'react-infinite-loader';
import { withRouter } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import { actionTypes, FetchData } from 'store/actions/users';
import { parseUserData } from 'store/selectors/users';

class UserTable extends React.Component {
  componentDidMount() {
    const { client, FetchData } = this.props;
    FetchData(client);
  }

  loadMore = () => {
    const { status, client, FetchData } = this.props;
    if (status !== actionTypes.FETCH_DATA) {
      FetchData(client);
    }
  }

  selectUser = id => () => {
    this.props.history.push(`/user-details/?user=${id}`);
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Tokens Bought</TableCell>
              <TableCell>Tokens Sold</TableCell>
              <TableCell>Current Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id} style={{ cursor: 'pointer' }} onClick={this.selectUser(user.id)}>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.tokensBought}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.tokensSold}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.balance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <InfiniteLoader onVisited={this.loadMore} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: parseUserData(state),
  status: state.users.status,
});

const mapDispatchToProps = { FetchData };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserTable));
