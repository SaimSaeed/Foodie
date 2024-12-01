import React, { useState } from 'react'
import {Form,Container,Row,Col,Button} from "react-bootstrap"
function ProductEdit() {

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [category,setCategory] = useState("")
    const [price,setPrice] = useState(0)
    const [countInStock,setCountInStock] = useState(0)
    const [imageSrc,setImageSrc] = useState("")




    const handleSubmit = async ()=>{

    }
  return (
    <Container>
    <Row className='p-4'>
        <Col>
            <h2 className='text-center'>Edit Product</h2>
            <Form className='w-50 mx-auto' onSubmit={handleSubmit}>
                <Form.Label>
                    Upload Image
                </Form.Label>
                <Form.Control type='file'/>
                <Form.Label>
                    Image Src
                </Form.Label>
                <Form.Control type='text' name='imagesrc' placeholder='Image Src...' value={imageSrc} onChange={e=>setImageSrc(e.target.value)}/>
                <Form.Label>
                    Title
                </Form.Label>
                <Form.Control type='text' name='title' placeholder='Title...' value={title} onChange={e => setTitle(e.target.value)} />
                <Form.Label>
                    Description
                </Form.Label>
                <Form.Control type='text' name='desc' placeholder='Description...' value={description} onChange={e => setDescription(e.target.value)} />
                <Form.Label>
                    Category
                </Form.Label>
                <Form.Control type='text' name='category' placeholder='Category...' value={category} onChange={e => setCategory(e.target.value)} />
                <Form.Label>
                    Price
                </Form.Label>
                <Form.Control type='numbe' name='price' placeholder='Price...' value={price} onChange={e => setPrice(e.target.value)} />
                <Form.Label>
                    Count In Stock
                </Form.Label>
                <Form.Control type='number' name='count' placeholder='Count...' value={countInStock} onChange={e => setCountInStock(e.target.value)} />
                <Button variant='danger' className='my-3' type='submit'>Update</Button>
            </Form>

        </Col>
    </Row>
</Container>
  )
}

export default ProductEdit