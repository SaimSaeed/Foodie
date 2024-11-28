import React from 'react'
import { Card,Button } from 'react-bootstrap'
import Rating from './Rating'
import {Link} from "react-router-dom"
function Product({item}) {
  return (
    <Card style={{ width: '15rem' }}>
        <Link to={`/products/${item._id}`} style={{textDecoration:"none",color:"black"}}>
    <Card.Img variant="top" src={item.imageSrc} fluid style={{height:"40vh"}} />
    <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
            {item.desc}
        </Card.Text>
        <Card.Text>
            <Rating value={item.rating} text={item.reviewNum}/>
        </Card.Text>
        <Card.Text>
            {item.price}
        </Card.Text>
<Button variant="danger">Add to Cart</Button>

    </Card.Body>
    </Link>
</Card>
  )
}

export default Product