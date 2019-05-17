import React from 'react';
import { connect } from 'react-redux';
import { set } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Slider } from 'material-ui-slider';

import { getSelectableUsers } from 'store/selectors/users';
import { getSelectableBalance, getBalanceInfo } from 'store/selectors/balance';

const styles = {
  formControl: {
    width: '100%',
    marginBottom: 20,
  },

};

class NewTransactionModal extends React.Component {
  state = {buyerId: '', amount: 0, buyerAddress: '' };
  onChange = option => event => {
    const updateObject = {};
    set(updateObject, option, event.target.value);
    this.setState(updateObject);
  }

  onChangeAmout = val => {
    this.setState({ amount: val });
  }

  onSubmit = () => {
    const { buyerId, amount, buyerAddress } = this.state;
    this.props.submit(buyerId, amount, buyerAddress);
  }

  getBalanceInfo = () => {
    const { getBalanceInfo, balanceId } = this.props;
    return getBalanceInfo(balanceId);
  }

  renderDialogText = () => {
    const balanceInfo = this.getBalanceInfo();
    const currentBalance = balanceInfo.ethBought - balanceInfo.ethSold;
    return currentBalance > 0 ? (
      <DialogContentText>
        Please select user and exchange balance to send token
      </DialogContentText>
    ) : (
      <DialogContentText>
        Insufficient fund to transfer!
      </DialogContentText>
    )
  }

  renderUserSelector = () => {
    const { userId, getSelectableUsers, classes } = this.props;
    const balanceInfo = this.getBalanceInfo();
    const currentBalance = balanceInfo.ethBought - balanceInfo.ethSold;
    if (currentBalance <= 0) {
      return false;
    }
    const userOptions = getSelectableUsers(userId);
    const { buyerId } = this.state;
    return (
      <FormControl className={classes.formControl}>
        <Select
          value={buyerId}
          onChange={this.onChange('buyerId')}
          displayEmpty
          name="buyerId"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {userOptions.map(option => (
            <MenuItem value={option.id} key={`user_option_${option.id}`}>
              {option.id} - ETH {(option.ethBought - option.ethSold).toFixed(2)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select user to receive funds</FormHelperText>
      </FormControl>
    );
  }

  renderBalanceSelector = () => {
    const { getSelectableBalance, classes } = this.props;
    const { buyerId, buyerAddress } = this.state;
    const balanceInfo = this.getBalanceInfo();
    const currentBalance = balanceInfo.ethBought - balanceInfo.ethSold;
    if (currentBalance <= 0 || buyerId === '') {
      return false;
    }
    const balanceOptions = getSelectableBalance(buyerId);
    return (
      <FormControl className={classes.formControl}>
        <Select
          value={buyerAddress}
          onChange={this.onChange('buyerAddress')}
          displayEmpty
          name="buyerAddress"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {balanceOptions.map(option => (
            <MenuItem value={option.id} key={`balance_option_${option.id}`}>
              {option.id} - ETH {(option.ethBought - option.ethSold).toFixed(2)}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select balance to receive funds</FormHelperText>
      </FormControl>
    );
  }

  renderAmountSelector = () => {
    const { classes } = this.props;
    const { buyerId, buyerAddress, amount } = this.state;
    const balanceInfo = this.getBalanceInfo();
    const currentBalance = balanceInfo.ethBought - balanceInfo.ethSold;
    if (currentBalance <= 0 || buyerId === '' || buyerAddress === '') {
      return false;
    }
    return (
      <FormControl className={classes.formControl}>
        <Slider min={0} max={currentBalance} value={amount} onChange={this.onChangeAmout} />
        <FormHelperText>{amount}</FormHelperText>
      </FormControl>
    )
  }

  renderDialogActions = () => {
    const { buyerId, buyerAddress, amount } = this.state;
    return (
      <DialogActions>
        <Button onClick={this.props.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={this.onSubmit}
          color="primary"
          disabled={buyerId === '' || buyerAddress === '' || amount <= 0}
        >
          Send Funds
        </Button>
      </DialogActions>
    )
  }

  render() {
    const { showDlg, handleClose } = this.props;
    return (
      <Dialog
        open={showDlg}
        onClose={handleClose}
      >
        <DialogTitle id="form-dialog-title">Send Funds</DialogTitle>
        <DialogContent>
          {this.renderDialogText()}
          {this.renderUserSelector()}
          {this.renderBalanceSelector()}
          {this.renderAmountSelector()}
        </DialogContent>
        {this.renderDialogActions()}
      </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  getBalanceInfo: getBalanceInfo(state),
  getSelectableUsers: getSelectableUsers(state),
  getSelectableBalance: getSelectableBalance(state),
});

export default withStyles(styles)(connect(mapStateToProps)(NewTransactionModal));