import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import gistQuery from 'queries/gist'
import Blob from 'components/Blob'

export const Gist = ({gist, children}) => (
  <div>
    <h2>
      <Link to={`/gists/${gist.id}`}>
        <code>{gist.description}</code>
      </Link>
    </h2>
    <p className="text-muted">
      <span>{gist.user.username}</span>
      &nbsp;/&nbsp;
      <strong>{gist.blobCount} files</strong>
      &nbsp;
      <Badge color="secondary">{gist.privacy}</Badge>
      &nbsp;
      <span>{moment(gist.updatedAt).fromNow()}</span>
    </p>
    {
      ( gist.blobs &&
        gist.blobs.map(blob => <Blob key={blob.id} gist={gist} blob={blob} />) ) ||
      children
    }
  </div>
)

export const GistRoute = ({match}) => {
  const { loading, error, data } = useQuery(gistQuery, {
    variables: {
      id: match.params.id
    }
  })

  if (loading) return null
  if (error) return <p>Error!</p>

  return <Gist gist={data.gist} />
}

export default Gist
