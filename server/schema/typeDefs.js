const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    bookId: ID!
    authors: [String]
    image: String
    description: String
    title: String
    link: String
  }
  type Auth {
    token: ID!
    user: User
  }
  input BookInput {
    authors: [String]
    image: String
    description: String
    title: String
    link: String
  }
  type Query {
    me: User
  }
  type Mutation {
    login(email: String, password: String): Auth
    addUser(email: String, password: String): Auth
    saveBook(bookData: BookInput): User
    removeBook(bookId: ID): User
  }
`;
module.exports = typeDefs;
