import { gql } from 'apollo-boost'

export default gql`
  query Gist($id: ID!) {
    gist(id: $id) {
      id
      description
      privacy
      isOwner
      blobCount
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
