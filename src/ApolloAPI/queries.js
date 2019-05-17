import { gql } from 'apollo-boost';

export const QUERY_USER = gql`
query ($id: String!){
  users(first: 20, where: { id_gt: $id }) {
    id,
    exchangeBalances {
      id
      userAddress
      exchangeAddress
      ethDeposited
      tokensDeposited
      ethWithdrawn
      tokensWithdrawn
      uniTokenBalance
      ethBought
      ethSold
      ethBought
      ethSold
      ethFeesPaid
    	tokenFeesPaid
      ethFeesInUSD
      tokenFeesInUSD
    }
    txs {
      id
      tx
      event
      block
      timestamp
      exchangeAddress
      tokenAddress
      tokenSymbol
      user
      ethAmount
      tokenAmount
      fee
    }
  }
}
`;