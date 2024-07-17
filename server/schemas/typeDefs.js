const typeDefs = `
    type Book {
        authors: [String!]!
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Auth {
    token: String!
    user: User
    }

    input bookData {
        authors: [String!]!
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Query {
        book: [Book]
        user: [User]
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: bookData): User
        deleteBook(bookId: String!): User
        login(email: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;