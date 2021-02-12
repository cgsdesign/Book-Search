export const GET_ME = gql`
  {
    me {
        _id: ID
        username: String
        email: String
        bookCount: Int
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