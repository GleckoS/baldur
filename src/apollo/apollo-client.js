import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `https://baldur.headlesshub.com/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          feed: {
            keyArgs: ["type"],
            merge(existing, incoming, { readField }) {
              const merged = { ...existing };
              incoming.forEach(item => {
                merged[readField("id", item)] = item;
              });
              return merged;
            },
            read(existing) {
              return existing && Object.values(existing);
            },
          },
        },
      },
    },
  })
});

export default client;