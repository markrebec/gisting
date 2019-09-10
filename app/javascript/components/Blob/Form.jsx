import React from 'react'
import styled from 'styled-components'
import { Header, Title, Body, StyledBlock } from './Elements'

const BodyText = styled.div`
  padding-top: 5px;
`

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  padding: 10px 5px;
`

export default ({gist, blob, preview}) => <div>
  <Header className="border-left border-top border-right border-light bg-light">
    <Title>
      <input type="text" defaultValue={blob.filename} />
    </Title>
  </Header>

  <Body className="border-left border-bottom border-right border-light">
    <BodyText><TextArea defaultValue={blob.body} /></BodyText>
  </Body>
</div>
