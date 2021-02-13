const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks:[Book]
}

type Book {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
}

input BookInput {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, password: String!, email: String!): Auth
    saveBook(bookInfo: BookInput): User
    deleteBook(bookId: String!): User
}

`;
//book mutations above refernce user because they are effecting the savedBooks category in the type User 
//May add extra queries for testing purposes
        // users: [User]
        // user(username: String!): User
        // books(username: String): [Book]
        // book(_id: ID!): Book
module.exports = typeDefs;