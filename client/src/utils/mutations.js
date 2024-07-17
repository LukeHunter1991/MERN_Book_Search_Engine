import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      email
      password
      savedBooks {
        bookId
        authors
        bookId
        description
        image
        link
        title
      }
      username
    }
  }
}
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
        _id
        email
        password
        username
        }
    }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookData: bookData) {
    saveBook(bookData: $bookData) {
        _id
        email
        password
        username
        savedBooks {
        bookId
        authors
        bookId
        description
        image
        link
        title
        }
    }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
        _id
        email
        password
        savedBooks {
        bookId
        authors
        bookId
        description
        image
        link
        title
        }
        username
    }
    }
`;

