import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import { addPaymentMethod } from '../features/cartSlice '

function Payment() {
    const [payment, setPayment] = useState("COD")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addPaymentMethod(payment))
        navigate("/placeorder")
    }

    return (
        <Container>
            <Row>
                <Col>
                    <FormContainer>
                        <h2 className='my-3'>Payment</h2>
                        <CheckoutSteps step1 step2 step3/>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label as={"legend"}>
                                    Select Method
                                </Form.Label>

                                <div className='d-flex  py-2 '>
                                    <Form.Check
                                        type='radio'
                                        name='payment'
                                        className='mx-2'
                                        value="COD"
                                        onChange={e => setPayment(e.target.value)}
                                        checked
                                    />
                                    Cash On Delivery
                                </div>

                            </Form.Group>
                            <Form.Group>
                                <div className='d-flex py-2 '>
                                    <Form.Check
                                        type='radio'
                                        name='payment'
                                        className='mx-2'
                                        value="Credit"
                                        onChange={e => setPayment(e.target.value)}
                                    />
                                    Credit Card
                                </div>

                            </Form.Group>
                            <Button type='submit' variant='dark' className='my-3'>Continue</Button>

                        </Form>

                    </FormContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default Payment