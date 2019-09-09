import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import apollo from 'utilities/apollo'
import Home from 'components/Home'

export default props => <ApolloProvider client={apollo}>
  <Home />
</ApolloProvider>
