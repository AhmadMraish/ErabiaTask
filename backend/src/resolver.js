const { sequelize, Users } = require("../models/index");

const resolvers = {
  Query: {
    // async allUsers(root) {},

    // a query that returns all users
    async allUsers(root, args, context) {
      const users = await Users.findAll();
      return users;
    },
  },

  Mutation: {
    async createUser(root, { name, email, role, date }, { models }) {
      return models.User.create({ name, email, role, date });
    },
  },
};

// users: async (parent, args, { models }) => {
//     return await models.User.findAll();
// }

module.exports = resolvers;
