const { Book, User } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async () => {
            return await User.find({})
        },
        async getSingleUser(parent, { id, username }, context) {
            try {
              const foundUser = await User.findOne({
                $or: [{ _id: id }, { username: username }],
              });
      
              if (!foundUser) {
                throw new Error('Cannot find a user with this id!');
              }
      
              return foundUser;
            } catch (error) {
              throw AuthenticationError;
            }
          }

    },
    Mutation: {
        createUser: async (parent, {username, email, password }, context) => {
            try {
              const user = await User.create({username, email, password});
      
              if (!user) {
                throw new Error('Something is wrong!');
              }
      
              const token = signToken(user);
              return { token, user };
            } catch (error) {
              throw AuthenticationError;
            }
          },
          login: async (parent, { username, email, password }, context) => {
            const user = await User.findOne({ $or: [{ username: username }, { email: email }] });
            if (!user) {
              throw new Error("Can't find this user");
            }
        
            const correctPw = await user.isCorrectPassword(password);
        
            if (!correctPw) {
              throw new Error('Wrong password!');
            }
            const token = signToken(user);
            return { token, user };
          },
          saveBook: async (parent, { bookData }, context) => {
            try {
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true, runValidators: true }
              );
              
              if (!updatedUser) {
                throw new Error("Can't find this user");
              }

              return updatedUser
            } catch (err) {
              throw AuthenticationError;
            }
          },
          deleteBook: async (parent, { bookId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { _id: bookId } } },
              { new: true }
            );
            if (!updatedUser) {
              throw new Error("Couldn't find user with this id!");
            }
            return updatedUser;
          },
    },
}

module.exports = resolvers;