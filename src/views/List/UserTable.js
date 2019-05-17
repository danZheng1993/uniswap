import React from 'react';
import { connect } from 'react-redux';
import InfiniteLoader from 'react-infinite-loader';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import DetailView from 'views/Detail';

import { parseUserData } from 'store/selectors/users';

const styles = {
  wrapper: { margin: 20 },
  loader: { marginBottom: 20 },
  tableRow: { cursor: 'pointer' },
};

class UserTable extends React.Component {
  state = { userId: '', showDlg: false }
  loadMore = () => {
    const { loading, loadMore } = this.props;
    if (!loading) {
      loadMore();
    }
  }

  selectUser = id => () => {
    this.setState({ userId: id, showDlg: true });
  }

  closeModal = () => {
    this.setState({ showDlg: false });
  }

  render() {
    const { users, classes, loading } = this.props;
    const { userId, showDlg } = this.state;
    return (
      <Paper className={classes.wrapper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>ETH Bought</TableCell>
              <TableCell>ETH Sold</TableCell>
              <TableCell>Current Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow className={classes.tableRow} key={user.id} onClick={this.selectUser(user.id)}>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.ethBought}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.ethSold}
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.balance}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <InfiniteLoader onVisited={this.loadMore} />
        {loading && (
          <Typography className={classes.loader} align="center" variant="display1">Loading ...</Typography>
        )}
        <DetailView
          userId={userId}
          open={showDlg}
          handleClose={this.closeModal}
        />
      </Paper>
    )
  }
}

const mapStateToProps = (state) => ({
  users: parseUserData(state),
  status: state.users.status,
});

export default withStyles(styles)(withRouter(connect(mapStateToProps)(UserTable)));
