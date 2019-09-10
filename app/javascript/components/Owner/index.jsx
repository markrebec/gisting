import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gistsQuery from 'queries/owner'
import Gist from 'components/Gist'

export default ({match}) => {
  const { loading, error, data } = useQuery(gistsQuery, { variables: { username: match.params.owner } })

  if (loading) return null
  if (error) return <p>Error!</p>

  return data.user.gists.map(gist => <Gist key={gist.id} gist={gist} />)
}
