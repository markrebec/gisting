import { gql } from 'apollo-boost'

export default gql`
  query Gists {
    gists {
      id
      description
      privacy
      createdAt
      updatedAt
      user {
        username
      }
      blobs {
        id
        filename
        body
        createdAt
        updatedAt
      }
    }
  }
`
