import React from 'react'
import styled from 'styled-components'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'
import moment from 'moment'
import Blob from 'components/Blob'
import { Title, Wrapper, Description } from './Elements'

export default ({gist, children, preview, toggleMode}) => {
  const previewLimit = preview ? 3 : ((children && React.Children.count(children)) || (gist.blobs && gist.blobs.length))
  return (
    <Wrapper className="border border-light">
      <Badge color="secondary" className="float-right">{gist.privacy}</Badge>

      <Title>
        <Link to={`/${gist.owner.username}`}>
          {gist.owner.username}
        </Link>
        <span className="text-black-50">/</span>
        <Link to={`/${gist.owner.username}/${gist.id}`}>
          {gist.title}
        </Link>
        { gist.isOwner && toggleMode && <button onClick={toggleMode} className="btn btn-sm"><span className="fa fa-pen" /></button> }
      </Title>

      <p className="text-muted float-right">
        <Link to={`/${gist.owner.username}/${gist.id}`}><strong>{gist.blobCount} files</strong></Link>
        &nbsp;/&nbsp;
        <span>{moment(gist.updatedAt).fromNow()}</span>
      </p>

      <Description>{gist.description || <em className="text-muted">No description provided.</em>}</Description>

      {
        children && React.Children.toArray(children).slice(0,previewLimit) ||
        ( gist.blobs &&
          gist.blobs.slice(0,previewLimit).map(blob => <Blob key={blob.id} gist={gist} blob={blob} preview={preview} />) )
      }

      {
        preview && ((gist.blobs && gist.blobs.length > previewLimit) || (children && React.Children.count(children) > previewLimit)) &&
        <div className="text-center">
          <Link to={`/${gist.owner.username}/${gist.id}`}>
            And {(gist.blobs && gist.blobCount - previewLimit) || (children && gist.blobCount - previewLimit)} more files
          </Link>
        </div>
      }
    </Wrapper>
  )
}
