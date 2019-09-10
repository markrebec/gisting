import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Link } from 'react-router-dom'

export const Blob = ({gist, blob}) => <div>
  <h4>
    <Link to={`/gists/${gist.id}/${blob.id}`}>
      <code>{blob.filename}</code>
    </Link>
  </h4>
  <pre>{blob.body}</pre>
</div>

// TODO move graphql queries into their own files
export const BlobRoute = ({match}) => {
  const { loading, error, data } = useQuery(gql`
    query Blob($gist_id: ID!, $id: ID!) {
      gist(id: $gist_id) {
        id
        description
        privacy
        isOwner
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
  `,
  { variables: { gist_id: match.params.gist_id, id: match.params.id } })

  if (loading) return null
  if (error) return <p>Error!</p>

  return <Blob gist={data.gist} blob={data.gist.blob} />
}

export default Blob
