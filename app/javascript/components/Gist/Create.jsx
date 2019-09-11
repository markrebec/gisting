import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import createGist from 'mutations/createGist'
import Form from './Form'

const Create = (props) => {
  const [description, setDescription] = useState(null)
  const [privacy, setPrivacy] = useState('hidden')
  const [blobs, setBlobs] = useState([{filename: null, body: null}])
  const [saveGist, { savedGist }] = useMutation(createGist, {
    onCompleted: ({createGist: gist}) => {
      props.history.push(`/${gist.owner.username}/${gist.id}`)
    }
  })

  const updateBlob = (idx, fieldname) => {
    return (evt) => {
      const updated = blobs.slice()
      updated[idx] = Object.assign(updated[idx], {[fieldname]: evt.currentTarget.value})
      setBlobs(updated)
    }
  }

  const submitGist = () => {
    saveGist({
      variables: {
        description: description,
        privacy: privacy,
        blobs: blobs
      }
    })
  }

  return <div>
    <Form
      privacy={privacy}
      description={description}
      blobs={blobs}
      onChangePrivacy={(evt) => setPrivacy(evt.currentTarget.value)}
      onChangeDescription={(evt) => setDescription(evt.currentTarget.value)}
      onChangeBlob={updateBlob} />
    <div className="float-right">
      <button onClick={submitGist} className="btn btn-success">Save</button>
    </div>
    <div>
      <button className="btn btn-secondary">Add File</button>
    </div>
  </div>
}

export default withRouter(Create)
