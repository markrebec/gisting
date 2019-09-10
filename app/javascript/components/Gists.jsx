import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import gistsQuery from 'queries/gists'
import Gist from 'components/Gist'

export default props => {
  const { loading, error, data } = useQuery(gistsQuery)

  if (loading) return null
  if (error) return <p>Error!</p>

  return data.gists.map(gist => <Gist key={gist.id} gist={gist} />)
}
