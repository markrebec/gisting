import React from 'react'
import useCurrentUser from 'hooks/useCurrentUser'
import { Jumbotron, Button } from 'reactstrap'
import CreateGist from 'components/Gist/Create'

export default props => {
  const { loading, error, user } = useCurrentUser()

  if (loading) return null

  if (user) {
    return <CreateGist />
  } else {
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
  }
}
