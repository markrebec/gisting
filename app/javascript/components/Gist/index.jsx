import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import Blob from 'components/Blob'

export const Gist = ({gist}) => (
  <div>
    <h2>
      <Link to={`/gists/${gist.id}`}>
        <code>{gist.description}</code>
      </Link>
      &nbsp;
      <Badge color="secondary">{gist.privacy}</Badge>
    </h2>
    <p className="text-muted">{gist.createdAt}</p>
    {gist.blobs.map(blob => <Blob key={blob.id} gist={gist} blob={blob} />)}
  </div>
)

export const GistRoute = ({match}) => {
  const { loading, error, data } = useQuery(gql`
    query Gist($id: ID!) {
      gist(id: $id) {
        id
        description
        privacy
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
