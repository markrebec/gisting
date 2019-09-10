import { gql } from 'apollo-boost'

export default gql`
  query Blob($gist_id: ID!, $id: ID!) {
    gist(id: $gist_id) {
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
      blob(id: $id) {
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
