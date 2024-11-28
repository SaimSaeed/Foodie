import React from 'react'
import { Col, Container, ListGroup, Row ,Image,Button,Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { decrementQty, incrementQty, removeFromCart } from '../features/cartSlice '
function Cart() {
    const { cartItems } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const removeItem = (id)=>{
        dispatch(removeFromCart(id))
    }

    
    
    return (
        <Container >
            <Row>
                <Col md={8}>
                    <h2 className='my-3'>Shopping Cart</h2>
                    <Link to={`/`} className='btn btn-danger my-3'>Go Back</Link>
                    {
                        cartItems.length === 0 ?
                            <Message>
                                Your Cart is Empty
                            </Message> : <ListGroup variant='flush'>
                                {
                                    cartItems.map((item) => {
                                        return <ListGroup.Item key={item._id}>
                                            <Row>
                                                <Col md={2} >
                                                <Image src={item.imageSrc} alt={item.imageALt} fluid/>
                                                </Col>
                                                <Col md={3} >
                                                
                                                <Link to={`/products/${item._id}`} style={{textDecoration:"none",color:"black"}}>{item.title}</Link>
                                                </Col>
                                                <Col md={2} >
                                               ${item.price * item.qty} 
                    
                                                </Col>
                                                <Col md={2}>
                                                <FaPlus className='mx-2' onClick={()=>dispatch(incrementQty(item._id))}/>  {item.qty} <FaMinus className='mx-2' onClick={()=>dispatch(decrementQty(item._id))}/>
                                                </Col>
                                                <Col md={2} >
                                                <Button variant='danger' onClick={()=>{removeItem(item._id)}}><FaTrash /></Button>
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup.Item>
                                    })
                                }


                            </ListGroup>

                    }
                </Col>
                <Col md={4} >
                <Card className='my-5'>
                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                   <h2>Sub Total ({cartItems.reduce((acc,item)=>acc+=item.qty,0)}) items</h2>
                   ${cartItems.reduce((acc,item)=> acc +=item.price * item.qty,0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Link to={"/shipping"} className='btn-sm btn btn-danger'>Buy Now</Link>
                        </ListGroup.Item>
                        
                    </ListGroup>
                </Card>
                </Col>
            </Row>

        </Container>
    )
}

export default Cart