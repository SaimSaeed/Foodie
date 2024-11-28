import React from 'react'
import { Row, Col } from 'react-bootstrap'

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <>
      <Row>
        <Col>
          {step1 ? <p style={{ textDecoration: "underline" }}>Sign In</p> : <p>Sign In</p>}
        </Col>
        <Col>
          {step2 ? <p style={{ textDecoration: "underline" }}>Shipping</p> : <p>Shipping</p>}
        </Col>
        <Col>
          {step3 ? <p style={{ textDecoration: "underline" }}>Payment</p> : <p>Payment</p>}
        </Col>
        <Col>
          {step4 ? <p style={{ textDecoration: "underline" }}>Place Order</p> : <p>Place Order</p>}
        </Col>

      </Row>



    </>
  )
}

export default CheckoutSteps