import { gql } from 'apollo-boost';

export const UPDATE_BALANCE = gql`
  mutation UpdateBalance($id: ID!, $ethBought: BigDecimal!, $ethSold: BigDecimal!) {
    updateUserExchangeData(userExchangeDataId: $id, ethBought: $ethBought, ethSold: $ethSold) {
      ethBought
      ethSold
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $txs: [Transaction!]!) {
    updateUser(userId: $id, txs: $txs) {
      txs
    }
  }
`;