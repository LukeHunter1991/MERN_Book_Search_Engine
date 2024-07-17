const { Book, User } = require('../models');

const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async () => {
            return await User.find({})
        },
        me: async (parent, args, context) => {
            try {
              const foundUser = await User.findOne({
                _id: context.user._id
              });
              console.log(foundUser)
              if (!foundUser) {
                throw AuthenticationError;
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
                throw AuthenticationError;
              }
      
              const token = signToken(user);
              return { token, user };
            } catch (error) {
              throw AuthenticationError;
            }
          },
          login: async (parent, { email, password }, context) => {
            const user = await User.findOne({  email: email  });

            if (!user) {
                throw AuthenticationError;
            }
        
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }
            const token = signToken(user);
            return { token, user };
          },
          saveBook: async (parent, { bookData }, context) => {
            try {
              console.log("BOOK DATA", bookData)
              const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: bookData } },
                { new: true, runValidators: true }
              );

              console.log("USER", updatedUser)
              
              if (!updatedUser) {
                throw AuthenticationError;
              }

              return updatedUser
            } catch (err) {
              throw AuthenticationError;
            }
          },
          deleteBook: async (parent, { bookId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: bookId } } },
              { new: true }
            );
            if (!updatedUser) {
                throw AuthenticationError;
            }
            return updatedUser;
          },
    },
}

module.exports = resolvers;