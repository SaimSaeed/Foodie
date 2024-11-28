import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Image, ListGroup, Card, Button } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from "../components/Navbar"
import Rating from '../components/Rating'
import { useGetproductQuery } from '../features/productApiSlice'
import Loader from '../components/Loader'
import { useDispatch } from 'react-redux'
import { addCartItems } from '../features/cartSlice '
import { FaMinus ,FaPlus} from 'react-icons/fa'
function ProductDetail() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [qty,setQty] = useState(1)
    const { id } = useParams()
 const {data:product,isLoading,error} = useGetproductQuery(id)
  const handleAddtoCart = ()=>{
    dispatch(addCartItems({...product,qty}))
    navigate("/cart")
  }

  const handleQty = (param)=>{
    if(param === "INC" && qty < product.countInStock){
        setQty(qty+1)
    }
    else if(param === "DEC" && qty !== 1){
        setQty(qty-1)
    }
  }



    return (
        <Container>

            {isLoading ? <Loader/> : error ? error?.data?.message || error.error : (<>
                <Navbar theme={"light"} />
            <Link to={"/"} className='btn btn-danger my-3'>Go Back</Link>
            <Row>
                <Col sm={12} md={5}>
                    <Image src={product.imageSrc} alt={product.imageAlt} fluid />

                </Col>
                <Col sm={12} md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>{product.title}</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h3><Rating value={product.rating} text={product.reviewNum} /></h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: {product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product.desc}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col sm={12} md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                Price: {product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <FaPlus className=' mx-2 ' onClick={()=>handleQty("INC")}/>{qty}<FaMinus className='mx-2' onClick={()=>handleQty("DEC")}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Available: {product.countInStock > 0 ? "Yes" : "No"}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button disabled={product.countInStock === 0} className='btn btn-danger' onClick={handleAddtoCart}>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>

            </Row>
            
            
            </>)}
          
        </Container>
    )
}

export default ProductDetail