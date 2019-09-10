import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import gistQuery from 'queries/gist'
import Gist from './Gist'

export default ({match}) => {
  const { loading, error, data } = useQuery(gistQuery, {
    variables: {
      id: match.params.id
    }
  })

  if (loading) return null
  if (error) return <p>Error!</p>

  return <Gist gist={data.gist} />
}
