const resolvers = {
  Query: {
    async allUsers(root) {},
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
