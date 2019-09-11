import React, { Component } from 'react'
import Gist from 'components/Gist'
import Blob from './Blob'
import Form from './Form'

export default class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = { editing: false }
    this.toggleMode = this.toggleMode.bind(this)
  }

  toggleMode() {
    this.setState({editing: !this.state.editing})
  }

  render() {
    const { gist, blob } = this.props

    if (this.state.editing) {
      return <Gist gist={gist}>
        <Form {...blob} toggleMode={this.toggleMode} />
      </Gist>
    } else {
      return <Gist gist={gist}>
        <Blob gist={gist} blob={blob} toggleMode={this.toggleMode} />
      </Gist>
    }
  }
}
