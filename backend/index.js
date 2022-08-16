// const { ApolloServer, gql } = require("apollo-server");
// import { graphiqlExpress } from "apollo-server-express";
// last push here
const cors = require("cors");
const { sequelize } = require("./models/index");

const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { graphiqlExpress } = require("apollo-server-express");
const typeDefs = require("./src/schema");
const resolvers = require("./src/resolver");

const PORT = 4000;
const app = express();
app.use(cors());

let server = null;
// const server = new ApolloServer({ typeDefs, resolvers });

async function startServer() {
  server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  server.applyMiddleware({ app });
}

startServer();
// server.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen({ port: PORT }, async () => {
  await sequelize.authenticate();
  // in case i needed to dumb and reset the database
  //  await sequelize.sync({ force: true });
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
});
