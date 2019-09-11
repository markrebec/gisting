import React, { useState } from 'react'
import Gist from 'components/Gist'
import Blob from './Blob'
import Form from './Form'

const Switch = ({gist, blob}) => {
  const [editing, setEditing] = useState(false)
  const [filename, setFilename] = useState(blob.filename)
  const [body, setBody] = useState(blob.body)

  const toggleMode = () => {
    setFilename(blob.filename)
    setBody(blob.body)
    setEditing(!editing)
  }

  if (gist.isOwner && editing) {
    return <Gist gist={gist}>
      <Form
        filename={filename}
        body={body}
        onChangeFilename={(evt) => setFilename(evt.currentTarget.value)}
        onChangeBody={(evt) => setBody(evt.currentTarget.value)} />
      <div className="float-right">
        <button onClick={toggleMode} className="btn btn-outline-danger">Cancel</button>
        &nbsp;
        <button className="btn btn-success">Save</button>
      </div>
    </Gist>
  } else {
    return <Gist gist={gist}>
      <Blob gist={gist} blob={blob} toggleMode={toggleMode} />
    </Gist>
  }
}

export default Switch
