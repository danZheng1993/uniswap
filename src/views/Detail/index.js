import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { ExchangeToken } from 'store/actions/balance';
import { getUserDetailsSelector } from 'store/selectors/users';

import BalanceTable from './BalanceTable';
import TransactionTable from './TransactionTable';
import NewTransactionModal from './NewTransactionModal';

const styles = {
  wrapper: { flex: 1 },
  tableWrapper: {
    maxHeight: 400,
    margin: 20,
    overflowY: 'scroll',
  },
  idWrapper: { flex: 2 },
  balanceInfoWrapper: { flex: 1 },
};

class UserDetail extends React.Component {
  state = { selectedBalanceId: '', showDlg: false };

  getUserId = () => {
    const { location } = this.props;
    const query = queryString.parse(location.search);
    return query.user;
  }

  getUserDetails = () => {
    const { location, getUserDetails } = this.props;
    const query = queryString.parse(location.search);
    const userId = query.user;
    return getUserDetails(userId);
  }

  selectBalance = (selectedBalanceId) => {
    this.setState({ selectedBalanceId, showDlg: true });
  }

  handleClose = () => {
    this.setState({ showDlg: false });
  }

  submitTransfer = (buyerId, exchangeAmount, buyerBalanceId) => {
    const { selectedBalanceId } = this.state;
    const sellerId = this.getUserId();
    this.props.ExchangeToken({
      sellerBalanceId: selectedBalanceId, buyerBalanceId, exchangeAmount, buyerId, sellerId,
    });
    this.setState({ showDlg: false });
  }

  render() {
    const { id, ethBought, ethSold, balances, transactions } = this.getUserDetails();
    const { classes } = this.props;
    const { showDlg, selectedBalanceId } = this.state;
    const userId = this.getUserId();
    return (
      <div className={classes.wrapper}>
        <AppBar position="static">
          <Toolbar>
            <div className={classes.idWrapper}>
              <Typography variant="h6" color="inherit">
                User ID: {id}
              </Typography>
            </div>
            <div className={classes.balanceInfoWrapper}>
              <Typography variant="h6" color="inherit">
                ETH Bought: {ethBought.toFixed(2)}
              </Typography>
            </div>
            <div className={classes.balanceInfoWrapper}>
              <Typography variant="h6" color="inherit">
                ETH Sold: {ethSold.toFixed(2)}
              </Typography>
            </div>
            <div className={classes.balanceInfoWrapper}>
              <Typography variant="h6" color="inherit">
                ETH Balance: {(ethBought - ethSold).toFixed(2)}
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
        <Paper className={classes.tableWrapper}>
          <BalanceTable balances={balances} onSelectBalance={this.selectBalance} />
        </Paper>
        <Paper className={classes.tableWrapper}>
          <TransactionTable transactions={transactions} />
        </Paper>
        <NewTransactionModal
          userId={userId}
          balanceId={selectedBalanceId}
          showDlg={showDlg}
          submit={this.submitTransfer}
          handleClose={this.handleClose}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  getUserDetails: getUserDetailsSelector(state),
});

const mapDispatchToProps = { ExchangeToken };

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetail)));
