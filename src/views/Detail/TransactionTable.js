import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const styles = {
  wrapper: {
    flex: 1,
  },
  head: {
    backgroundColor: "#fff",
    position: "sticky",
    top: 0
  }
};

class TransactionTable extends React.Component {
  render() {
    const { transactions, classes } = this.props;
    return (
      <div className={classes.wrapper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Transaction ID</TableCell>
              <TableCell className={classes.head}>User ID</TableCell>
              <TableCell className={classes.head}>Exchange Address</TableCell>
              <TableCell className={classes.head}>Token Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map(tx => (
              <TableRow key={tx.id}>
                <TableCell component="th" scope="row">
                  {tx.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {tx.user}
                </TableCell>
                <TableCell component="th" scope="row">
                  {tx.exchangeAddress}
                </TableCell>
                <TableCell component="th" scope="row">
                  {tx.tokenAmount}
                </TableCell>
              </TableRow>
            ))}
            {transactions.length === 0 && (
              <TableRow>
                <TableCell>
                  <Typography align="center" variant="display3" > No transactions yet </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withStyles(styles)(TransactionTable);
