import React from 'react'
import styled from 'styled-components'
import { useQuery } from '@apollo/react-hooks'
import { Row, Col } from 'reactstrap'
import gistsQuery from 'queries/owner'
import Gist from 'components/Gist'

const ImageWrapper = styled.div`
  text-align: center;
`

const Image = styled.img`
  width: 100%;
  height: auto;
  max-width: 200px;
  max-height: 200px;
`

export default ({match}) => {
  const { loading, error, data } = useQuery(gistsQuery, { variables: { username: match.params.owner } })

  if (loading) return null
  if (error) return <p>Error!</p>

  return (
    <div>
      <Row>
        <Col xs="4" sm="3" md="2">
          <ImageWrapper>
            <Image src="https://via.placeholder.com/200" />
          </ImageWrapper>
        </Col>
        <Col xs="8" sm="9" md="10">
          <h1>{data.user.username}</h1>
          <div className="d-none d-lg-block">{data.user.gists.map(gist => <Gist key={gist.id} gist={gist} />)}</div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="d-block d-lg-none">{data.user.gists.map(gist => <Gist key={gist.id} gist={gist} />)}</div>
        </Col>
      </Row>
    </div>
  )
}
