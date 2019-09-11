import React, { Component } from 'react'
import Gist from './Gist'
import Form from './Form'

export default class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      privacy: props.gist.privacy,
      description: props.gist.description,
      blobs: props.gist.blobs.map((blob) => ({id: blob.id, filename: blob.filename, body: blob.body}))
    }
    this.toggleMode = this.toggleMode.bind(this)
    this.onChangePrivacy = this.onChangePrivacy.bind(this)
    this.onChangeDescription = this.onChangeDescription.bind(this)
    this.onChangeBlob = this.onChangeBlob.bind(this)
  }

  toggleMode() {
    this.setState({
      editing: !this.state.editing,
      privacy: this.props.gist.privacy,
      description: this.props.gist.description,
      blobs: this.props.gist.blobs.map((blob) => ({id: blob.id, filename: blob.filename, body: blob.body}))
    })
  }

  onChangePrivacy(evt) {
    this.setState({privacy: evt.currentTarget.value})
  }

  onChangeDescription(evt) {
    this.setState({description: evt.currentTarget.value})
  }

  onChangeBlob(idx, fieldname) {
    return (evt) => {
      const blobs = this.state.blobs
      blobs[idx][fieldname] = evt.currentTarget.value
      this.setState({blobs: blobs})
    }
  }

  render() {
    if (this.state.editing) {
      return <Form {...this.props.gist}
        id={this.props.gist.id}
        owner={this.props.gist.owner}
        title={this.props.gist.title}
        privacy={this.state.privacy}
        description={this.state.description}
        blobs={this.state.blobs}
        toggleMode={this.toggleMode}
        onChangePrivacy={this.onChangePrivacy}
        onChangeDescription={this.onChangeDescription}
        onChangeBlob={this.onChangeBlob} />
    } else {
      return <Gist gist={this.props.gist} toggleMode={this.toggleMode} />
    }
  }
}

