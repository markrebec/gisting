import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import meQuery from 'queries/me'

export default () => {
  const { loading, error, data } = useQuery(meQuery)

  if (loading || error)
    return { loading: loading, error: error, user: null }

  return { loading: loading, error: error, user: data.me }
}
