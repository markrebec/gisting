import { gql } from 'apollo-boost'

export default gql`
  query Gists {
    gists {
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
