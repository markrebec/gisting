import { gql } from 'apollo-boost'

export default gql`
  mutation UpdateBlob($id: ID!, $filename: String, $body: String) {
    updateBlob(id: $id, filename: $filename, body: $body) {
      id
      filename
      body
      auditCount
      createdAt
      updatedAt
      gist {
        id
        title
      }
    }
  }
`
