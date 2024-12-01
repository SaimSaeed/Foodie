import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateUserMutation } from '../features/userApiSlice'
import {toast} from "react-toastify"
import { setCredentials } from '../features/authSlice'
import { useGetMyOrdersQuery } from '../features/orderApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {FaPlug, FaTimes} from "react-icons/fa"
function Profile() {
    const {user} = useSelector(state=>state.auth)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCPassword] = useState('')
    const [updateUser,{isLoading,error}] = useUpdateUserMutation()
    const {data:orders,isLoading:loadingOrders,error:errorOrders} = useGetMyOrdersQuery()
    const dispatch = useDispatch()

    useEffect(()=>{
     if(user){
        setUsername(user.username)
        setEmail(user.email)
     }
    },[user])

   



    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password !== cpassword){
          toast.error("Passwords Do Not Match!")
        }
        try {
         const res = await updateUser({username,email,password})
         dispatch(setCredentials(res.data))
         toast.success("Updated Successfully!")
        } catch (error) {
        toast.error(error?.data?.message || error.error)
        }
    }
    return (
        <Container className='p-4'>
          
            <Link to={"/"} className='btn btn-danger btn-sm mx-2 my-3'>
                       Go to Home
                    </Link>
            <Row>
                <Col xs={12} md={4}>
                    <h2>Profile</h2>
                    <Form className='w-75' onSubmit={handleSubmit}>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control type='text' name='username' placeholder='Username...' value={username} onChange={e => setUsername(e.target.value)} />
                        <Form.Label>
                            Email
                        </Form.Label>
                        <Form.Control type='text' name='username' placeholder='Email...' value={email} onChange={e => setEmail(e.target.value)} />
                        <Form.Label>
                            Password
                        </Form.Label>
                        <Form.Control type='text' name='username' placeholder='Password...' value={password} onChange={e => setPassword(e.target.value)} />
                        <Form.Label>
                            Confirm Password
                        </Form.Label>
                        <Form.Control type='text' name='username' placeholder='Confirm Password...' value={cpassword} onChange={e => setCPassword(e.target.value)} />
                        <Button variant='danger' className='my-3' type='submit'>Update</Button>
                    </Form>
                </Col>
                <Col xs={12} md={8}>
                    <h2>My Orders</h2>

                    {loadingOrders ? <Loader/> : errorOrders ? <Message>{errorOrders?.data?.message || errorOrders.error}</Message>:
     
                    <Table  responsive hover  className='my-2'>
                    <thead>
                   <th>ID</th>
                   <th colSpan={2}>Total Price</th>
                   <th className='text-center'>Paid</th>
                   <th className='text-center'>Delivered</th>
                   <th></th>

                    </thead>
                    <tbody>
                    {orders.map((order)=>(
                         <tr>
                         <td>{order._id}</td>
                         <td colSpan={2} className='text-center'>${order.totalPrice}</td>
                         <td className='text-center'>{order.isPaid ? order.paidAt.substring(0,10) : "Not Paid"}</td>
                         <td className='text-center'>{order.isDelivered ? order.deliveredAt.substring(0,10) : "Not Delivered"}</td>
                         <td><Link to={`/order/${order._id}`} className='btn btn-sm btn-danger'>Details</Link></td>
                         </tr>




                      
                    )) }
                   
                   </tbody>
                   


                </Table>
                    
                    }
                  
                </Col>
            </Row>
        </Container>

    )
}

export default Profile