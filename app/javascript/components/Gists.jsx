import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Gist from 'components/Gist'

export default props => {
  const { loading, error, data } = useQuery(gql`
    {
      gists {
        id
        description
        privacy
        createdAt
        updatedAt
        user {
          username
        }
        blobs {
          id
          filename
          body
          createdAt
          updatedAt
        }
      }
    }
  `)

  if (loading) return null
  if (error) return <p>Error!</p>

  return data.gists.map(gist => <Gist key={gist.id} gist={gist} />)
}
