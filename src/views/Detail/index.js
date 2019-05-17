import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

  getUserDetails = () => {
    const { userId, getUserDetails } = this.props;
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
    const { userId: sellerId } = this.props;
    this.props.ExchangeToken({
      sellerBalanceId: selectedBalanceId, buyerBalanceId, exchangeAmount, buyerId, sellerId,
    });
    this.setState({ showDlg: false });
  }

  render() {
    const { id, ethBought = 0, ethSold = 0, balances = [], transactions = [] } = this.getUserDetails();
    const { classes, userId, open, handleClose } = this.props;
    const { showDlg, selectedBalanceId } = this.state;
    return (
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={handleClose} aria-label="Close">
              <CloseIcon />
            </IconButton>
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
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => ({
  getUserDetails: getUserDetailsSelector(state),
});

const mapDispatchToProps = { ExchangeToken };

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetail)));
