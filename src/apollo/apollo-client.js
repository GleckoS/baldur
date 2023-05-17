import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `https://baldur.headlesshub.com/graphql`,
  cache: new InMemoryCache()
});

export default client;