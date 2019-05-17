import { set, get } from 'lodash';

export const parseUserData = users => {
  const usersData = {};
  const balanceData = {};
  const transactionData = {};
  users.forEach(user => {
    const { id, exchangeBalances, txs } = user;
    let tokensBought = 0;
    let tokensSold = 0;
    const balances = [];
    const transactions = [];
    exchangeBalances.forEach(balance => {
      balances.push(balance.id);
      set(balanceData, balance.id, {
        ...balance,
        tokensBought: parseFloat(get(balance, 'tokensBought', '0')),
        tokensSold: parseFloat(get(balance, 'tokensSold', '0')),
      });
      tokensBought += parseFloat(get(balance, 'tokensBought', '0'));
      tokensSold += parseFloat(get(balance, 'tokensSold', '0'));
    });
    txs.forEach(tx => {
      transactions.push(tx.id);
      set(transactionData, tx.id, tx);
    })
    set(usersData, id, { id, tokensBought, tokensSold, balances, transactions });
  });
  return { usersData, balanceData, transactionData };
}