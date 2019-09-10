import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import blobQuery from 'queries/blob'
import Gist from 'components/Gist'
import Blob from './Blob'

export default ({match}) => {
  const { loading, error, data } = useQuery(blobQuery, {
    variables: {
      gist_id: match.params.gist_id,
      id: match.params.id
    }
  })

  if (loading) return null
  if (error) return <p>Error!</p>

  return <Gist gist={data.gist}><Blob gist={data.gist} blob={data.gist.blob} /></Gist>
}
