import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import meQuery from 'queries/me'
import { Jumbotron, Button } from 'reactstrap'
import CreateGist from 'components/Gist/Create'

export default props => {
  const { loading, error, data } = useQuery(meQuery)

  if (loading) return null

  if (error || data.me == null) {
    return <Jumbotron>
      <h1>Welcome!</h1>
      <p className="lead">Use the buttons below to sign in or sign up and start creating gists.</p>
      <hr className="my-2" />
      <p className="lead text-center">
        <Button color="primary" tag="a" href="/users/sign_in">Sign in</Button>
        <span className="text-muted"> or </span>
        <Button color="primary" tag="a" href="/users/sign_up">Sign up</Button>
      </p>
    </Jumbotron>
  } else {
    return <CreateGist />
  }
}
