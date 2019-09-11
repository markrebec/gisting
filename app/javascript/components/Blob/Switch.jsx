import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import updateBlob from 'mutations/updateBlob'
import Gist from 'components/Gist'
import Blob from './Blob'
import Form from './Form'

const Switch = ({gist, blob}) => {
  const [editing, setEditing] = useState(false)
  const [filename, setFilename] = useState(blob.filename)
  const [body, setBody] = useState(blob.body)
  const [saveBlob, { savedBlob }] = useMutation(updateBlob, {
    onCompleted: (data) => setEditing(false)
  })

  const toggleMode = () => {
    setFilename(blob.filename)
    setBody(blob.body)
    setEditing(!editing)
  }

  const submitBlob = () => {
    saveBlob({
      variables: {
        id: blob.id,
        filename: filename,
        body: body
      }
    })
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
        <button onClick={submitBlob} className="btn btn-success">Save</button>
      </div>
    </Gist>
  } else {
    return <Gist gist={gist}>
      <Blob gist={gist} blob={blob} toggleMode={toggleMode} />
    </Gist>
  }
}

export default Switch
