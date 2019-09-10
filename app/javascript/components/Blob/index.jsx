import React, { Component } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import styled from 'styled-components'
import hljs from 'highlight.js'
import { Link } from 'react-router-dom'
import blobQuery from 'queries/blob'
import Gist from 'components/Gist'

const Header = styled.div`
  padding: 5px 10px;
`

const Title = styled.h4`
  margin: 0;
  padding: 0;
`

const Body = styled.div`
  margin-bottom: 10px;
`

const Pre = styled.pre`
  margin: 0;
  padding: 0;
`

// TODO extract the body/pre/code into it's own little component that can detect type and initializes highlighting
class Blob extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    hljs.highlightBlock(this.refs.codeblock)
  }

  render() {
    const { gist, blob } = this.props

    return (
      <div>
        <Header className="border-left border-top border-right border-light bg-light">
          <Title>
            <Link to={`/gists/${gist.id}/${blob.id}`}>
              <code>{blob.filename}</code>
            </Link>
          </Title>
        </Header>

        <Body className="border-left border-bottom border-right border-light">
          <Pre><code ref="codeblock" className="ruby">{blob.body}</code></Pre>
        </Body>
      </div>
    )
  }
}

export const BlobRoute = ({match}) => {
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

export default Blob
