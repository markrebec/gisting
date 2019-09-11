import React, { Component } from 'react'
import Gist from 'components/Gist'
import Blob from './Blob'
import Form from './Form'

export default class Switch extends Component {
  constructor(props) {
    super(props)
    this.state = { editing: false }
  }

  render() {
    const { gist, blob } = this.props

    if (this.state.editing) {
      return <Gist gist={gist}><Form gist={gist} blob={blob} /></Gist>
    } else {
      return <Gist gist={gist}><Blob gist={gist} blob={blob} /></Gist>
    }
  }
}
