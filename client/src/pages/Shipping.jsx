import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addShippingDetails } from '../features/cartSlice '
import { toast } from 'react-toastify'
import CheckoutSteps from '../components/CheckoutSteps'

function Shipping() {
    const {shippingDetails} = useSelector(state=>state.cart)
    const [address, setAddress] = useState("" || shippingDetails.address)
    const [city, setCity] = useState("" || shippingDetails.city)
    const [country, setCountry] = useState("" || shippingDetails.country)
    const [postalCode, setPostalCode] = useState("" || shippingDetails.postalCode)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!address|| !city || !country || !postalCode){
            toast.error("Fill all Fields!")
            return
        }else{
            dispatch(addShippingDetails({ address, city, country, postalCode }))
            navigate("/payment")
        }
       
    }

   
    

    return (
        <Container>
            <Row>
                <Col>
                    <FormContainer>
                        <h2 className='my-3'>Shipping</h2>
                        <CheckoutSteps step1 step2/>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>
                                    Address
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Address...'
                                    value={address}
                                    onChange={(e => setAddress(e.target.value))}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    City
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter City...'
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Postal Code
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Postal Code...'
                                    value={postalCode}
                                    onChange={e => setPostalCode(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Country
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter Country...'
                                    value={country}
                                    onChange={(e => setCountry(e.target.value))}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Button type='submit' variant='dark' className='my-3'>Continue</Button>
                        </Form>
                    </FormContainer>
                </Col>
            </Row>
        </Container>
    )
}

export default Shipping