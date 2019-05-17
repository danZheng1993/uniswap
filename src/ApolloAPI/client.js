import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

export const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

export default async () => {
  await persistCache({
    cache,
    storage: window.localStorage
  })
  
  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/graphprotocol/uniswap",
    cache,
  });
  return client;
};