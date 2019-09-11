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

  if (editing) {
    return <Gist gist={gist}>
      <Form
        filename={filename}
        body={body}
        toggleMode={toggleMode}
        onChangeFilename={(evt) => setFilename(evt.currentTarget.value)}
        onChangeBody={(evt) => setBody(evt.currentTarget.value)} />
    </Gist>
  } else {
    return <Gist gist={gist}>
      <Blob gist={gist} blob={blob} toggleMode={toggleMode} />
    </Gist>
  }
}

export default Switch