import React, { useEffect } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { Container, Row, Col, ListGroup,Image, Card,Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { useCreateOrderMutation } from '../features/orderApiSlice'
import { toast } from 'react-toastify'
import { clearallCart } from '../features/cartSlice '
import Loader from '../components/Loader'

function PlaceOrder() {
    const cart = useSelector(state => state.cart)
    const [createOrder,{isLoading}]= useCreateOrderMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!cart.shippingDetails) {
            navigate("/shipping")
        } else if (!cart.paymentMethod) {
            navigate("/payment")
        }
    }, [cart])


    const createOrderHandler = async ()=>{
        try {
            const data = {
                orderItems:cart.cartItems,
                shippingDetails:cart.shippingDetails,
                paymentMethod:cart.paymentMethod,
                itemsPrice:cart.itemsPrice,
                shippingPrice:cart.shippingPrice,
                taxPrice:cart.taxPrice,
                totalPrice:cart.totalPrice,
            }
           const res =  await createOrder(data).unwrap()
           dispatch(clearallCart())
           navigate(`/order/${res._id}`)
        } catch (error) {
             toast.error(error?.data?.message || error.error)
        }
    }

    return (

        <Container>
            <Row>
                <Col className='text-center' md={12}>
                    <CheckoutSteps step1 step2 step3 step4 />

                </Col>
            </Row>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping Address</h2>
                            <p>{cart.shippingDetails.address} {cart.shippingDetails.city} {cart.shippingDetails.postalCode} {cart.shippingDetails.country}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>{cart.paymentMethod}</p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your Cart is Empty</Message>: <ListGroup variant='flush'>
                                {cart.cartItems.map((item, index)=>{
                                    return <ListGroup.Item key={index}>
                                        <Row className='align-items-center'>
                                        <Col>
                                            <Image src={item.imageSrc} fluid/>
                                            </Col>
                                            <Col>
                                            {item.title}
                                            </Col>
                                            <Col>
                                            {item.price}
                                            </Col>
                                            <Col>
                                            {item.qty}
                                            </Col>
                                            <Col>
                                             {`${item.price} * ${item.qty} = ${item.qty * item.price}`}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                })}
                                
                                
                                </ListGroup>}
                           

                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                         <ListGroup.Item>
                            <h2>Order Summary</h2>
                         </ListGroup.Item>
                         <ListGroup.Item>
                            <Row>
                                <Col>
                                Items:
                                </Col>
                                <Col>
                                {cart.itemsPrice}
                                </Col>
                            </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                            <Row>
                                <Col>
                                Shipping:
                                </Col>
                                <Col>
                                {cart.shippingPrice}
                                </Col>
                            </Row>
                         </ListGroup.Item> 
                         <ListGroup.Item>
                            <Row>
                                <Col>
                                Tax:
                                </Col>
                                <Col>
                                {cart.taxPrice}
                                </Col>
                            </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                            <Row>
                                <Col>
                                Total:
                                </Col>
                                <Col>
                                {cart.totalPrice}
                                </Col>
                            </Row>
                         </ListGroup.Item>
                         <ListGroup.Item className='mx-auto'>
                            <Button variant='dark' onClick={createOrderHandler}>
                                Place Order
                            </Button>
                            {isLoading && <Loader/>}
                         </ListGroup.Item>
                    </ListGroup>
                </Card>
                </Col>
            </Row>

        </Container>

    )
}

export default PlaceOrder