import React, { Component } from 'react'
import Gist from 'components/Gist'
import Blob from './Blob'
import Form from './Form'

export default class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,
      filename: props.blob.filename,
      body: props.blob.body
    }
    this.toggleMode = this.toggleMode.bind(this)
    this.onChangeFilename = this.onChangeFilename.bind(this)
    this.onChangeBody = this.onChangeBody.bind(this)
  }

  toggleMode() {
    this.setState({
      editing: !this.state.editing,
      filename: this.props.blob.filename,
      body: this.props.blob.body
    })
  }

  onChangeFilename(evt) {
    const filename = evt.currentTarget.value
    this.setState({filename: filename})
  }

  onChangeBody(evt) {
    const body = evt.currentTarget.value
    this.setState({body: body})
  }

  render() {
    const { gist, blob } = this.props

    if (this.state.editing) {
      return <Gist gist={gist}>
        <Form
          filename={this.state.filename}
          body={this.state.body}
          toggleMode={this.toggleMode}
          onChangeFilename={this.onChangeFilename}
          onChangeBody={this.onChangeBody} />
      </Gist>
    } else {
      return <Gist gist={gist}>
        <Blob gist={gist} blob={blob} toggleMode={this.toggleMode} />
      </Gist>
    }
  }
}
