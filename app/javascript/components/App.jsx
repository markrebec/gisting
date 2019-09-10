import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import { ApolloProvider } from '@apollo/react-hooks'
import apollo from 'utilities/apollo'
import { Container, Row, Col } from 'reactstrap'
import NavBar from 'components/NavBar'
import Home from 'components/Home'
import Gists from 'components/Gists'
import { GistRoute as Gist } from 'components/Gist'
import { BlobRoute as Blob } from 'components/Blob'

export default props => <ApolloProvider client={apollo}>
  <Router>
    <NavBar />

    <Container>
      <Row>
        <Col>
          <Route path="/" exact component={Home} />
          <Route path="/gists" exact component={Gists} />

          <Route path="/:owner/:id" exact component={Gist} />
          <Route path="/:owner/:gist_id/:id" exact component={Blob} />
        </Col>
      </Row>
    </Container>
  </Router>
</ApolloProvider>
