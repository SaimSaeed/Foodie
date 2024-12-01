import React, { useEffect, useState } from 'react'
import { Row, Col, ListGroup, Image, Card, Container, Button } from "react-bootstrap"
import { useGetOrderDetailsQuery, useUpdateOrderToDeliveredMutation, useUpdatePaidMutation } from '../features/orderApiSlice'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
// Importing stripe elements and load stripe
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import PaymentForm from '../components/PaymentForm'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

// Creating stripe Promise
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_PUBLISHABLE_KEY)

function OrderDetail() {
const {user} = useSelector(state=>state.auth)
  const { id } = useParams()
  const { data: order,refetch} = useGetOrderDetailsQuery(id)
  const [updateDelivered] = useUpdateOrderToDeliveredMutation()
  const [updatePaid] = useUpdatePaidMutation()
  // const {data:pKey,isLoading:loadingPKEY,error:errorPKEY} = useGetPublishableKeyQuery()
  // const [stripePromise,setStripePromise] = useState(null)
  //  useEffect(()=>{
  //   setStripePromise(loadStripe(pKey.publishableKey))
  //  },[pKey])

  //  console.log(stripePromise)

  

  


  // Setting up the options for the payment
  const options = order ?{
    mode: 'payment',
    amount: order.totalPrice * 100,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {/*...*/ } ,
  } : {
    mode: 'payment',
    amount: 1000,
    currency: 'usd',
    // Fully customizable with appearance API.
    appearance: {/*...*/ }
  }

  
const updateDeliveredHandler = async (id)=>{
  try {
    const data = {
      isDelivered: true
    }
     await updateDelivered({data,id})
     refetch()
  } catch (error) {
    toast.error(error?.data?.message || error.error)
  }
}
  
const updatePaidHandler = async (id)=>{
  try {
    await updatePaid(id)
    refetch()    
  } catch (error) {
    toast.error(error?.data?.message || error.error)
  }
}
  
  
  return (
    <Container>


      <Row className='my-3'>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping Details</h2>
              <p>{order?.shippingDetails?.address} {order?.shippingDetails?.city} {order?.shippingDetails?.postalCode} {order?.shippingDetails?.country}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Delivery</h2>
              {order?.isDelivered ? <Message>{order?.deliveredAt}</Message> : <Message variant={"danger"}>Not Delivered</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              {order?.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              {order?.isPaid ? <Message>{order.paidAt}</Message> : <Message variant={"danger"}>Not Paid</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order?.orderItems.length === 0 ? <Message>Error Loading Orders</Message> : <ListGroup variant='flush'>
                {order?.orderItems.map((item) => {
                  return <ListGroup.Item>
                    <Row className='align-items-center'>
                      <Col>
                        <Image src={item.imageSrc} fluid />
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
                        {`${item.qty} x  ${item.price} = ${item.price * item.qty}`}
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
            <ListGroup variant='flush' className=''>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Items Price:
                  </Col>
                  <Col>
                    {order?.itemsPrice}
                  </Col>
                </Row>

              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Shipping Price:
                  </Col>
                  <Col>
                    {order?.shippingPrice}
                  </Col>
                </Row>

              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Tax Price:
                  </Col>
                  <Col>
                    {order?.taxPrice}
                  </Col>
                </Row>

              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Total Price:
                  </Col>
                  <Col>
                    {order?.totalPrice}
                  </Col>
                </Row>

              </ListGroup.Item>
              
                <ListGroup.Item className='text-center'>
                  {order?.paymentMethod === "COD" ? <Link className='btn btn-dark btn-sm' to={"/"}>Go to Home</Link> :
                  <Elements stripe={stripePromise} options={options}>
                    <PaymentForm id={id} order={order}/>
                  </Elements>
                  }
                </ListGroup.Item>
                <ListGroup.Item className='text-center'>
                 {user?.isAdmin && order?.isDelivered ? <p>Order is Delivered</p> : <Button variant='danger' className='btn-sm' onClick={()=>updateDeliveredHandler(order._id)}>Update to Delivered</Button>}
                </ListGroup.Item>
                {
                  order?.paymentMethod === "COD" &&
                  <ListGroup.Item className='text-center'>
                  {user?.isAdmin && order?.isPaid ? <p>Order is Paid</p> : <Button variant='dark' className='btn-sm' onClick={()=>updatePaidHandler(order._id)}>Update to Paid</Button>}
                </ListGroup.Item>
                }
              
                
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderDetail