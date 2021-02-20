const {User, Book} = require('../models');
const {AuthenticationError} = require('apollo-server-express');
const {signToken} = require('../utils/auth');
const { collection } = require('../config/connection');



const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({_id: context.user._id})
                    .select('-__v -password')
                    .populate('books');
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect Credentials');
            }

            const token = signToken(user);
            return { token, user };
        },

        createUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },

        saveBook: async (parent, {bookInfo}, context) => {
            if(context.user) {
                try{
                const book = await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    { $addToSet: { savedBooks: bookInfo}},
                    { new: true}
                )
                return book
                } catch(err){
                }

            }
            throw new AuthenticationError('Not logged in here')
        },

        deleteBook: async (parent, {bookId}, context) => {
            console.log('backend', bookId)
            if(context.user) {
                const updatedBookList = await User.findOneAndUpdate(
                    {_id: context.user._id },
                    {$pull: {savedBooks: {bookId}}},
                    {new: true}
                )
                
                return updatedBookList
                } 
            
            throw new AuthenticationError('Not logged in')
        }

    }


};


//NOTE: saveBook- may need to try swapping savedBooks for BookInput, may need or not need validators  
module.exports = resolvers;