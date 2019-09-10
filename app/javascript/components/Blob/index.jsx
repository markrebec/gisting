import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import blobQuery from 'queries/blob'
import Gist from 'components/Gist'
import CodeBlock from 'components/CodeBlock'

const Header = styled.div`
  padding: 5px 10px;
`

const Title = styled.h4`
  margin: 0;
  padding: 0;
  font-size: 1.1em;
  font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
`

const Body = styled.div`
  margin-bottom: 25px;
`

const StyledBlock = styled(CodeBlock)`
  max-height: ${({preview}) => preview ? "15.5em" : "auto"};
  overflow: hidden;
`

export const Blob = ({gist, blob, preview}) => <div>
  <Header className="border-left border-top border-right border-light bg-light">
    <Title>
      <Link to={`/${gist.owner.username}/${gist.id}/${blob.id}`}>
        {blob.filename}
      </Link>
    </Title>
  </Header>

  <Body className="border-left border-bottom border-right border-light">
    <StyledBlock filename={blob.filename} preview={preview}>{blob.body}</StyledBlock>
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
