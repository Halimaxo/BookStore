const { User } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    //Context only exists if the user is logged in
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.fineOne({ _id: context.user._id });
        return userData;
        //return with () is in front end
      }
      throw new Error("Not logged in:(");
    },
  },
  Mutation: {
    //if the user is not logged in you don't need the context
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Incorrect email:(");
      }
      const checkPassword = await user.isCorrectPassword(password);
      if (!checkPassword) {
        throw new Error("Incorrect password:(");
      }
      const token = signToken(user);
      return { user, token };
    },
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const userData = await User.fineOneAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true }
        );
        return userData;
      }
      throw new Error("You are not logged in:(");
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const userData = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return userData;
      }
      throw new Error("You are not logged in!");
    },
  },
};

module.exports = resolvers;
