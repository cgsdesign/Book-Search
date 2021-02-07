import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($username: String!, $email: String!, $password: String!) {
    saveBook(username: $username, email: $email, password: $password) {
        username
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(savedBooks: $bookId) {
        username
        savedBooks {
            bookId
            authors
            description
            image
            link
            title
        }
    }
  }
`;