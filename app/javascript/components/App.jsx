import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { ApolloProvider } from '@apollo/react-hooks'
import apollo from 'utilities/apollo'
import NavBar from 'components/NavBar'
import Home from 'components/Home'

export default props => <ApolloProvider client={apollo}>
  <Router>
    <NavBar />

    <Route path="/" exact component={Home} />
  </Router>
</ApolloProvider>
