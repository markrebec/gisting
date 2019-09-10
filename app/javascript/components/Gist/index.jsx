import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import gistQuery from 'queries/gist'
import Blob from 'components/Blob'

const Title = styled.h2`
  font-size: 1.3em;
`

const Wrapper = styled.div`
  padding: 15px;
  margin-bottom: 30px;
`

export const Gist = ({gist, children}) => (
  <Wrapper className="border border-light">
    <Title>
      <Link to={`/${gist.owner.username}`}>
        <code>{gist.owner.username}</code>
      </Link>
      <span className="text-black-50">/</span>
      <Link to={`/${gist.owner.username}/${gist.id}`}>
        <code>{gist.title}</code>
      </Link>
    </Title>

    <p>{gist.description || <em className="text-muted">No description provided.</em>}</p>

    <p className="text-muted">
      <strong>{gist.blobCount} files</strong>
      &nbsp;
      <Badge color="secondary">{gist.privacy}</Badge>
      &nbsp;
      <span>{moment(gist.updatedAt).fromNow()}</span>
    </p>

    {
      ( gist.blobs &&
        gist.blobs.map(blob => <Blob key={blob.id} gist={gist} blob={blob} preview />) ) ||
      children
    }

    {
      ((gist.blobs && gist.blobs.length < gist.blobCount) || (children && React.Children.count(children) < gist.blobCount)) &&
      <div className="text-center">
        <Link to={`/${gist.owner.username}/${gist.id}`}>
          And {(gist.blobs && gist.blobCount - gist.blobs.length) || (children && gist.blobCount - React.Children.count(children))} more files
        </Link>
      </div>
    }
  </Wrapper>
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
