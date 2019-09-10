import React from 'react'
import { Container, Row, Col, Badge } from 'reactstrap'
import Blob from 'components/Blob'

export default ({gist}) => (
  <Container>
    <Row>
      <Col>
        <h2>
          <code>{gist.description}</code>
          &nbsp;
          <Badge color="secondary">{gist.privacy}</Badge>
        </h2>
        <p className="text-muted">{gist.createdAt}</p>
        {gist.blobs.map(blob => <Blob key={blob.id} blob={blob} />)}
      </Col>
    </Row>
  </Container>
)
