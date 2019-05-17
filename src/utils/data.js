import { set, get } from 'lodash';

export const parseUserData = users => {
  const usersData = {};
  const balanceData = {};
  const transactionData = {};
  users.forEach(user => {
    const { id, exchangeBalances, txs } = user;
    let ethBought = 0;
    let ethSold = 0;
    const balances = [];
    const transactions = [];
    exchangeBalances.forEach(balance => {
      balances.push(balance.id);
      set(balanceData, balance.id, {
        ...balance,
        ethBought: parseFloat(get(balance, 'ethBought', '0')),
        ethSold: parseFloat(get(balance, 'ethSold', '0')),
      });
      ethBought += parseFloat(get(balance, 'ethBought', '0'));
      ethSold += parseFloat(get(balance, 'ethSold', '0'));
    });
    txs.forEach(tx => {
      transactions.push(tx.id);
      set(transactionData, tx.id, tx);
    })
    set(usersData, id, { id, ethBought, ethSold, balances, transactions });
  });
  return { usersData, balanceData, transactionData };
}