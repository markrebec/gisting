import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Form as Blob } from 'components/Blob'
import { Title, Wrapper, Description } from './Elements'

const TextInput = styled.input`
  display: inline-block;
  width: 100%;
`

const FormTitle = ({id, owner, title}) => {
  if (id) {
    return (
      <Title>
        <Link to={`/${owner.username}`}>
          {owner.username}
        </Link>
        <span className="text-black-50">/</span>
        <Link to={`/${owner.username}/${id}`}>
          {title}
        </Link>
      </Title>
    )
  } else {
    return (
      <Title>
        New Gist
      </Title>
    )
  }
}

export default ({id, privacy, owner, title, description, blobs, children, toggleMode}) => <Wrapper className="border border-light">
  <select className="float-right" defaultValue={privacy}>
    <option value="hidden">hidden</option>
    <option value="unlisted">unlisted</option>
    <option value="listed">listed</option>
  </select>
  { toggleMode && <a className="float-right" onClick={toggleMode}>cancel</a> }

  <FormTitle id={id} owner={owner} title={title} />

  <Description>
    <TextInput type="text" defaultValue={description} />
  </Description>

  {
    ( blobs &&
      blobs.map(blob => <Blob key={blob.id} {...blob} />) ) ||
    children
  }
</Wrapper>
