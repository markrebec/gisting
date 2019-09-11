import { gql } from 'apollo-boost'

export default gql`
  mutation CreateGist($description: String, $privacy: String, $blobs: [BlobInput!]!) {
    createGist(description: $description, privacy: $privacy, blobs: $blobs) {
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
