import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import blobQuery from 'queries/blob'
import Gist from 'components/Gist'
import Blob from './Blob'
import BlobForm from './Form'

class Wrapper extends Component {
  constructor(props) {
    super(props)
    this.state = { editing: false }
  }

  render() {
    if (this.state.editing) {
      return <Gist gist={this.props.data.gist}><BlobForm gist={this.props.data.gist} blob={this.props.data.gist.blob} /></Gist>
    } else {
      return <Gist gist={this.props.data.gist}><Blob gist={this.props.data.gist} blob={this.props.data.gist.blob} /></Gist>
    }
  }
}

export default (props) => {
  const { loading, error, data } = useQuery(blobQuery, {
    variables: {
      gist_id: props.match.params.gist_id,
      id: props.match.params.id
    }
  })

  if (loading) return null
  if (error) return <p>Error!</p>

  return <Wrapper {...props} data={data} />
}
