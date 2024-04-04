import { gql } from "@apollo/client";

const ADD_BOOK = gql`
  mutation addBook(
    $name: String!
    $year: Int!
    $genre: String!
    $author: String!
  ) {
    addBook(name: $name, year: $year, genre: $genre, author: $author) {
      id
      name
      year
      genre
      author
    }
  }
`;

const UPDATE_BOOK = gql`
  mutation UpdateBook(
    $id: ID!
    $name: String!
    $year: Int!
    $genre: String!
    $author: String!
  ) {
    updateBook(
      id: $id
      name: $name
      year: $year
      genre: $genre
      author: $author
    ) {
      id
      name
      year
      genre
      author
    }
  }
`;

const DELETE_BOOKS = gql`
  mutation deleteBooks($ids: [ID]!) {
    deleteBooks(ids: $ids) {
      id
      name
      year
      genre
      author
    }
  }
`;

export { DELETE_BOOKS, ADD_BOOK, UPDATE_BOOK };
