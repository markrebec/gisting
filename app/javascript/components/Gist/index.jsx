import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import Blob from 'components/Blob'

export const Gist = ({gist, children}) => (
  <div>
    <h2>
      <Link to={`/gists/${gist.id}`}>
        <code>{gist.description}</code>
      </Link>
      &nbsp;
      <Badge color="secondary">{gist.privacy}</Badge>
    </h2>
    <p className="text-muted">{gist.createdAt}</p>
    {
      (gist.blobs && gist.blobs.map(blob => <Blob key={blob.id} gist={gist} blob={blob} />)) ||
      children
    }
  </div>
)

// TODO move graphql queries into their own files
export const GistRoute = ({match}) => {
  const { loading, error, data } = useQuery(gql`
    query Gist($id: ID!) {
      gist(id: $id) {
        id
        description
        privacy
        isOwner
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
  `,
  { variables: { id: match.params.id} })

  if (loading) return null
  if (error) return <p>Error!</p>

  return <Gist gist={data.gist} />
}

export default Gist
