import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Header, Title, Body, StyledBlock } from './Elements'

export default ({gist, blob, preview, toggleMode}) => <div>
  <Header className="border-left border-top border-right border-light bg-light">
    <p className="float-right text-muted">{moment(blob.updatedAt).fromNow()}</p>

    <Title>
      <Link to={`/${gist.owner.username}/${gist.id}/${blob.id}`}>
        {blob.filename}
      </Link>
      { gist.isOwner && toggleMode && <button onClick={toggleMode} className="btn btn-sm"><span className="fa fa-pen" /></button> }
    </Title>
  </Header>

  <Body className="border-left border-bottom border-right border-light">
    <StyledBlock filename={blob.filename} preview={preview}>{blob.body}</StyledBlock>
  </Body>
</div>
