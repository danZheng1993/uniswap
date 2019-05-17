import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const styles = {
  wrapper: { flex: 1 },
  head: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0
  },
  tableRow: { cursor: 'pointer' },
};

class BalanceTable extends React.Component {
  onClickRow = id => () => {
    this.props.onSelectBalance(id);
  }
  render() {
    const { balances, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Balance ID</TableCell>
              <TableCell className={classes.head}>ETH Bought</TableCell>
              <TableCell className={classes.head}>ETH Sold</TableCell>
              <TableCell className={classes.head}>Current Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {balances.map(balance => (
              <TableRow className={classes.tableRow} key={balance.id} onClick={this.onClickRow(balance.id)}>
                <TableCell component="th" scope="row">
                  {balance.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {balance.ethBought}
                </TableCell>
                <TableCell component="th" scope="row">
                  {balance.ethSold}
                </TableCell>
                <TableCell component="th" scope="row">
                  {balance.ethBought - balance.ethSold}
                </TableCell>
              </TableRow>
            ))}
            {balances.length === 0 && (
              <TableRow>
                <TableCell>
                  <Typography align="center" variant="display3" > No wallets yet </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(BalanceTable);
