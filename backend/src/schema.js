const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    role: Int!
    date: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, role: Int!, date: String!): User!
  }
`;

module.exports = typeDefs;
