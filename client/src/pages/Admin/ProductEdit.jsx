import React, { useEffect, useState } from 'react'
import {Form,Container,Row,Col,Button} from "react-bootstrap"
import { useGetproductQuery, useUpdateproductMutation, useUploadImageMutation } from '../../features/productApiSlice'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
function ProductEdit() {
    const {id} = useParams()
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [category,setCategory] = useState("")
    const [price,setPrice] = useState(0)
    const [countInStock,setCountInStock] = useState(0)
    const [imageSrc,setImageSrc] = useState("")
    const [updateProduct] = useUpdateproductMutation()
    const {data:product,isLoading,error,refetch} = useGetproductQuery(id)
    const [uploadProductImage] = useUploadImageMutation()




    useEffect(()=>{
        if(product){
          setTitle(product.title)
          setDesc(product.desc)
          setCategory(product.category)
          setPrice(product.price)
          setCountInStock(product.countInStock)
        }
    },[product])
    const handleSubmit = async (e)=>{
      e.preventDefault()
      try {
         const data = {
            title,
            desc,
            category,
            price,
            countInStock,
            imageSrc
         }
         await updateProduct({data,id})
         toast.success("Updated")
         refetch()
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }

    const uploadImageHandler =async (e)=>{
   const formData = new FormData()
    formData.append("image", e.target.files[0])
    try {
    const res = await uploadProductImage(formData) 
    toast.success(res?.data?.message)
    setImageSrc(res?.data?.image)
    } catch (error) {
     toast.error(error?.data?.message || error.error)
    }
    }

   
  return (
    <Container>
    <Row className='p-4'>
        <Col>
            <h2 className='text-center'>Edit Product</h2>
            <Form className='w-50 mx-auto' onSubmit={handleSubmit} encType='multipart/form-data'>
                <Form.Label>
                    Upload Image
                </Form.Label>
                <Form.Control type='file' name='image' onChange={uploadImageHandler}/>
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
                <Form.Control type='text' name='desc' placeholder='Description...' value={desc} onChange={e => setDesc(e.target.value)} />
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