import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap",
  cache,
});

export default client;