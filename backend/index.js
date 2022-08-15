// const { ApolloServer, gql } = require("apollo-server");
// import { graphiqlExpress } from "apollo-server-express";
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { graphiqlExpress } = require("apollo-server-express");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolver");

const PORT = 4000;
const app = express();
let server = null;
// const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });
}

startServer();
// server.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
