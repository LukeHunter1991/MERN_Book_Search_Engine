import { gql } from '@apollo/client';

export const GET_ME = gql`
query me($getSingleUserId: ID, $username: String) {
  getSingleUser(id: $getSingleUserId, username: $username) {
    _id
    email
    password
    savedBooks {
      _id
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
`