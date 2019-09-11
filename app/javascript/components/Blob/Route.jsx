import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import blobQuery from 'queries/blob'
import Switch from './Switch'

export default (props) => {
  const { loading, error, data } = useQuery(blobQuery, {
    variables: {
      gist_id: props.match.params.gist_id,
      id: props.match.params.id
    }
  })

  if (loading) return null
  if (error) return <p>Error!</p>

  return <Switch gist={data.gist} blob={data.gist.blob} />
}
