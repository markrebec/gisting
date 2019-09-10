import { gql } from 'apollo-boost'

export default gql`
  query Gists {
    gists {
      id
      description
      privacy
      isOwner
      blobCount
      auditCount
      createdAt
      updatedAt
      user {
        username
      }
      blobs(limit: 1) {
        id
        filename
        body
        createdAt
        updatedAt
      }
    }
  }
`
