import React from 'react'
import { Col, Container, Row,Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGetAllOrdersQuery } from '../../features/orderApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
function OrderList() {

    const {data:orders,isLoading,error} = useGetAllOrdersQuery()
  return (
    <Container className='p-4'>
    <Link to="/" className="btn btn-sm btn-danger">Go Back</Link>
    <h2 className='my-4'>Order List</h2>
    <Row>
      <Col>
      {isLoading ? <Loader/> : error ? <Message variant={"danger"}>{error?.data?.message || error.error}</Message>:
     
     <Table  responsive hover  className='my-2'>
     <thead>
    <th>ID</th>
    <th className='text-center'>Items Price</th>
    <th  className='text-center'>Total Price</th>
    <th className='text-center'>Paid</th>
    <th className='text-center'>Delivered</th>
    <th></th>

     </thead>
     <tbody>
     {orders.map((order)=>(
          <tr>
          <td>{order._id}</td>
          <td className='text-center'>${order.itemsPrice}</td>
          <td className='text-center'>${order.totalPrice}</td>
          <td className='text-center'>{order.isPaid ? order.paidAt.substring(0,10) : "Not Paid"}</td>
          <td className='text-center'>{order.isDelivered ? order.deliveredAt.substring(0,10) : "Not Delivered"}</td>
          <td><Link to={`/order/${order._id}`} className='btn btn-sm btn-danger'>Details</Link></td>
          </tr>




       
     )) }
    
    </tbody>
    


 </Table>}
      </Col>
    </Row>
  </Container>
  )
}

export default OrderList