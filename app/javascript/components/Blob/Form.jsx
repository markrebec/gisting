import React from 'react'
import styled from 'styled-components'
import { Header, Title, Body, StyledBlock } from './Elements'

const BodyText = styled.div`
  padding-top: 5px;
`

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  padding: 5px;
  font-family: SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace;
  font-size: .9em;
`

export default ({filename, body, toggleMode, onChangeFilename, onChangeBody}) => {
  const bodyLines = body && body.split("\n")
  const bodyRows = (bodyLines && bodyLines.length > 20 && bodyLines.length) || 20
  return <div>
    <Header className="border-left border-top border-right border-light bg-light">
      <Title>
        <input type="text" defaultValue={filename} onChange={onChangeFilename}/>
      </Title>
    </Header>

    <Body className="border-left border-bottom border-right border-light">
      <BodyText><TextArea defaultValue={body} onChange={onChangeBody} rows={bodyRows} /></BodyText>
    </Body>
  </div>
}
