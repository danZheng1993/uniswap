import { gql } from 'apollo-boost';

export const UpdateUser = gql`
  fragment user on User {
    txs
  }
`;

export const UpdateExchangeBalance = gql`
  fragment exchangeBalance on ExchangeBalance {
    ethBought
    ethSold
  }
`