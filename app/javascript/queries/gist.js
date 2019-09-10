import { gql } from 'apollo-boost'

export default gql`
  query Gist($id: ID!) {
    gist(id: $id) {
      id
      title
      description
      privacy
      isOwner
      blobCount
      auditCount
      createdAt
      updatedAt
      owner {
        username
      }
      blobs {
        id
        filename
        body
        auditCount
        createdAt
        updatedAt
      }
    }
  }
`
