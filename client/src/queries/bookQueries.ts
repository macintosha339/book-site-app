import { gql } from '@apollo/client';

const GET_BOOKS = gql`
  query getBooks {
    books {
      id
      name
      year
      genre
      author
    }
  }
`;

export { GET_BOOKS };