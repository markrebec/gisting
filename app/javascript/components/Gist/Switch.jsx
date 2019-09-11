import React, { useState } from 'react'
import Gist from './Gist'
import Form from './Form'

const Switch = ({gist}) => {
  const [editing, setEditing] = useState(false)
  const [description, setDescription] = useState(gist.description)
  const [privacy, setPrivacy] = useState(gist.privacy)
  const [blobs, setBlobs] = useState(gist.blobs.map((blob) => ({id: blob.id, filename: blob.filename, body: blob.body})))

  const toggleMode = () => {
    setDescription(gist.description)
    setPrivacy(gist.privacy)
    setEditing(!editing)
    setBlobs(gist.blobs.map((blob) => ({id: blob.id, filename: blob.filename, body: blob.body})))
  }

  const updateBlob = (idx, fieldname) => {
    return (evt) => {
      const updated = blobs.slice()
      updated[idx] = Object.assign(updated[idx], {[fieldname]: evt.currentTarget.value})
      setBlobs(updated)
    }
  }

  if (editing) {
    return <div>
      <Form {...gist}
        privacy={privacy}
        description={description}
        blobs={blobs}
        onChangePrivacy={(evt) => setPrivacy(evt.currentTarget.value)}
        onChangeDescription={(evt) => setDescription(evt.currentTarget.value)}
        onChangeBlob={updateBlob} />
      <div className="float-right">
        <button onClick={toggleMode} className="btn btn-outline-danger">Cancel</button>
        &nbsp;
        <button className="btn btn-success">Save</button>
      </div>
      <div>
        <button className="btn btn-secondary">Add File</button>
      </div>
    </div>
  } else {
    return <Gist gist={gist} toggleMode={toggleMode} />
  }
}

export default Switch
