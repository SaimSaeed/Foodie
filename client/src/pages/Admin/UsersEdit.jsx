import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useGetUserQuery, useUpdateUserByIdMutation } from '../../features/userApiSlice'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function UsersEdit() {
    const { id } = useParams()
    const { data: user,refetch } = useGetUserQuery(id)
    const [updateUserById,{isLoading:loadingUpdate,error:errorUpdate}] = useUpdateUserByIdMutation()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
    }, [user])

const handleSubmit = async (e) => {
e.preventDefault()
try {
    const data = {
        username,
        email,
        password,
        isAdmin
    }
    await updateUserById({data,id})
    toast.success("Update Successfully!")
    refetch()
} catch (error) {
    toast.error(error?.data?.message || error.error)
}
}
return (
    <Container>
        <Row className='p-4'>
            <Col>
                <h2 className='text-center'>Edit User</h2>
                <Form className='w-50 mx-auto' onSubmit={handleSubmit}>
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
                        Admin
                    </Form.Label>
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label={isAdmin ? 'Yes' : 'No'}
                        checked={isAdmin}
                        onChange={e => setIsAdmin(e.target.checked)}
                    />
                    <Button variant='danger' className='my-3' type='submit'>Update</Button>
                </Form>

            </Col>
        </Row>
    </Container>
)
}

export default UsersEdit