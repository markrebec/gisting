import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import gistQuery from 'queries/gist'
import Switch from './Switch'

export default (props) => {
  const { loading, error, data } = useQuery(gistQuery, {
    variables: {
      id: props.match.params.id
    }
  })

  if (loading) return null
  if (error) return <p>Error!</p>

  return <Switch gist={data.gist} />
}
