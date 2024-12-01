import React from 'react'
import { Col, Container, Row, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { FaTrash, FaPenToSquare } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import { useCreateproductMutation, useDeleteproductMutation, useGetproductsQuery } from '../../features/productApiSlice'
function ProductList() {

  const { data: products, isLoading, error,refetch } = useGetproductsQuery()
  const [createProduct] = useCreateproductMutation()
  const [deleteProduct] = useDeleteproductMutation()

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are You Sure You Want To Delete?")
    if (confirm) {
      try {
        await deleteProduct(id)
        toast.success("User Delete SuccessFully!")
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }

  }

  const handleCreate = async()=>{
   try {
      await createProduct()
      toast.success("Product Created Successfully!")
      refetch()
   } catch (error) {
     toast.error(error?.data?.message || error.error)
   }
  }

  return (
    <Container className='p-4'>
       
      <Link to="/" className="btn btn-sm btn-danger">Go Back</Link>
      <Row>
         
         <Col>
       <h2 className='my-4'>Product List</h2>
         </Col>
         <Col className='d-flex align-items-center justify-content-end'>
       <Button onClick={handleCreate} className='btn-sm btn-dark'>Create Product</Button>
 
         </Col>
         </Row>
      <Row>
        <Col>
          {isLoading ? <Loader /> : error ? <Message variant={"danger"}>{error?.data?.message || error.error}</Message> :

            <Table responsive hover className='my-2'>
              <thead>
                <th>ID</th>
                <th className='text-center'>TITLE</th>
                <th className='text-center'>PRICE</th>
                <th className='text-center'>STOCK</th>
                <th className='text-center'>REVIEWS</th>
                <th className='text-center'>CATEGORY</th>
                <th></th>

              </thead>
              <tbody>
                {products.map((product) => (
                  <tr>
                    <td>{product._id}</td>
                    <td className='text-center'>{product.title}</td>
                    <td className='text-center'>${product.price}</td>
                    <td className='text-center'>{product.countInStock}</td>
                    <td className='text-center'>{product.reviewNum}</td>
                    <td className='text-center'>{product.category}</td>
                    <td><Link to={`/admin/product/${product._id}/edit`} className='btn btn-sm btn-danger'><FaPenToSquare /></Link> <Button variant='dark' className='btn-sm ' onClick={() => handleDelete(product._id)}><FaTrash /></Button></td>
                  </tr>





                ))}

              </tbody>



            </Table>}
        </Col>
      </Row>
    </Container>
  )
}

export default ProductList