import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../features/userApiSlice'
import Loader from '../components/Loader'
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../features/authSlice'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state=>state.auth)
    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || "/"


    useEffect(() => {
      if(user){
        navigate(redirect)
      }
    }, [user,redirect,navigate])
    


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await login({ email, password }).unwrap()
            dispatch(setCredentials(res))
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form className='my-3' onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email...'
                        onChange={(e => setEmail(e.target.value))}
                    >

                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password...'
                        onChange={e => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                <Button className='btn-danger my-3 ' type='submit'>Login</Button>
                {isLoading && <Loader />}

            </Form>
            <Row className='py-3'>
                <Col>
                    <Link to={redirect ? `/register?redirect=${redirect}`: "/register"} className='mx-2'>Don't Have an Account?</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default Login