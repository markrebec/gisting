import React, { Component } from 'react'
import Gist from './Gist'
import Form from './Form'

export default class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = { editing: false }
  }

  render() {
    if (this.state.editing) {
      return <Form gist={this.props.gist} />
    } else {
      return <Gist gist={this.props.gist} />
    }
  }
}

