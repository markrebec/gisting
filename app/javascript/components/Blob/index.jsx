import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import blobQuery from 'queries/blob'
import Gist from 'components/Gist'

const Header = styled.div`
  padding: 5px 10px;
`

const Title = styled.h4`
  margin: 0;
  padding: 0;
`

const Body = styled.div`
  padding: 10px;
  margin-bottom: 10px;
`

const Code = styled.pre`
  margin: 0;
  padding: 0;
`

export const Blob = ({gist, blob}) => <div>
  <Header className="border-left border-top border-right border-light bg-light">
    <Title>
      <Link to={`/gists/${gist.id}/${blob.id}`}>
        <code>{blob.filename}</code>
      </Link>
    </Title>
  </Header>

  <Body className="border-left border-bottom border-right border-light">
    <Code>{blob.body}</Code>
  </Body>
</div>

export const BlobRoute = ({match}) => {
  const { loading, error, data } = useQuery(blobQuery, {
    variables: {
      gist_id: match.params.gist_id,
      id: match.params.id
    }
  })

  if (loading) return null
  if (error) return <p>Error!</p>

  return <Gist gist={data.gist}><Blob gist={data.gist} blob={data.gist.blob} /></Gist>
}

export default Blob
