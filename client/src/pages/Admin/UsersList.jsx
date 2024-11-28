import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function UsersList() {
  return (
    <Container className='p-4'>
      <Link to="/" className="btn btn-sm btn-danger">Go Back</Link>
      <h2 className='my-4'>User List</h2>
      <Row>
        <Col>

        </Col>
      </Row>
    </Container>
  )
}

export default UsersList