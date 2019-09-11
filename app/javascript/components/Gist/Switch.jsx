import React, { Component } from 'react'
import Gist from './Gist'
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
    if (this.state.editing) {
      return <Form {...this.props.gist} toggleMode={this.toggleMode} />
    } else {
      return <Gist gist={this.props.gist} toggleMode={this.toggleMode} />
    }
  }
}

