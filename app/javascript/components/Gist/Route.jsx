import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import gistQuery from 'queries/gist'
import Gist from './Gist'
import Form from './Form'

class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { editing: false }
  }

  render() {
    if (this.state.editing) {
      return <Form gist={this.props.data.gist} />
    } else {
      return <Gist gist={this.props.data.gist} />
    }
  }
}

export default (props) => {
  const { loading, error, data } = useQuery(gistQuery, {
    variables: {
      id: props.match.params.id
    }
  })

  if (loading) return null
  if (error) return <p>Error!</p>

  return <Wrapper {...props} data={data} />
}
