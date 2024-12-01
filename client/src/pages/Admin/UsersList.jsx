import React from 'react'
import { Col, Container, Row, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDeleteUsersMutation, useGetUsersQuery } from '../../features/userApiSlice'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { FaTrash, FaPenToSquare } from 'react-icons/fa6'
import { toast } from 'react-toastify'
function UsersList() {

  const { data: users, isLoading, error,refetch } = useGetUsersQuery()
  const [deleteUser, { isLoading: loadingDelete, error: errorDelete }] = useDeleteUsersMutation()

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are You Sure You Want To Delete?")
    if (confirm) {
      try {
        await deleteUser(id)
        toast.success("User Delete SuccessFully!")
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }

  }
  return (
    <Container className='p-4'>
      <Link to="/" className="btn btn-sm btn-danger">Go Back</Link>
      <h2 className='my-4'>User List</h2>
      <Row>
        <Col>
          {isLoading ? <Loader /> : error ? <Message variant={"danger"}>{error?.data?.message || error.error}</Message> :

            <Table responsive hover className='my-2'>
              <thead>
                <th>ID</th>
                <th className='text-center'>Username</th>
                <th className='text-center'>Email</th>
                <th className='text-center'>Admin</th>
                <th></th>

              </thead>
              <tbody>
                {users.map((user) => (
                  <tr>
                    <td>{user._id}</td>
                    <td className='text-center'>{user.username}</td>
                    <td className='text-center'>{user.email}</td>
                    <td className='text-center'>{user.isAdmin ? "Yes" : 'No'}</td>
                    <td><Link to={`/admin/user/${user._id}/edit`} className='btn btn-sm btn-danger'><FaPenToSquare /></Link> <Button variant='dark' className='btn-sm ' onClick={() => handleDelete(user._id)}><FaTrash /></Button></td>
                  </tr>





                ))}

              </tbody>



            </Table>}
        </Col>
      </Row>
    </Container>
  )
}

export default UsersList