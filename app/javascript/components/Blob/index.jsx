import React from 'react'
import Filename from './Filename'
import Editor from './Editor'

export default ({blob}) => <div>
  <Filename filename={blob.filename} />
  <Editor body={blob.body} />
</div>
