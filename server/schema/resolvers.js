const { User } = require("../models");
const { signToken } = require("../utils/auth");
const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.fineOne({ _id: context.user._id });
        return userData;
        //return with () is in front end
      }
      throw new Error("Not logged in:(");
    },
  },
};
