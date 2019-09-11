import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Form as Blob } from 'components/Blob'
import { Title, Wrapper, Description } from './Elements'

const TextInput = styled.input`
  display: inline-block;
  width: 100%;
`

export default ({gist, children, preview, toggleMode}) => <Wrapper className="border border-light">
  <select className="float-right" defaultValue={gist.privacy}>
    <option value="hidden">hidden</option>
    <option value="unlisted">unlisted</option>
    <option value="listed">listed</option>
  </select>
  <a className="float-right" onClick={toggleMode}>cancel</a>

  <Title>
    <Link to={`/${gist.owner.username}`}>
      {gist.owner.username}
    </Link>
    <span className="text-black-50">/</span>
    <Link to={`/${gist.owner.username}/${gist.id}`}>
      {gist.title}
    </Link>
  </Title>

  <Description>
    <TextInput type="text" defaultValue={gist.description} />
  </Description>

  {
    ( gist.blobs &&
      gist.blobs.map(blob => <Blob key={blob.id} gist={gist} blob={blob} />) ) ||
    children
  }
</Wrapper>
