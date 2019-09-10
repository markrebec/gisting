import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Form as Blob } from 'components/Blob'
import { Title, Wrapper, Description } from './Elements'

const TextInput = styled.input`
  display: inline-block;
  width: 100%;
`

export default ({gist, children, preview}) => <Wrapper className="border border-light">
  <select className="float-right">
    <option value="hidden" selected={gist.privacy == 'hidden'}>hidden</option>
    <option value="unlisted" selected={gist.privacy == 'unlisted'}>unlisted</option>
    <option value="listed" selected={gist.privacy == 'listed'}>listed</option>
  </select>

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
