import { gql } from 'apollo-boost'

export default gql`
  query Blob($gist_id: ID!, $id: ID!) {
    gist(id: $gist_id) {
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
      blob(id: $id) {
        id
        filename
        body
        createdAt
        updatedAt
      }
    }
  }
`
