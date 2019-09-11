import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Header, Title, Body, StyledBlock } from './Elements'

export default ({gist, blob, preview, toggleMode}) => <div>
  <Header className="border-left border-top border-right border-light bg-light">
    { toggleMode && <a className="float-right" onClick={toggleMode}>edit</a> }

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
