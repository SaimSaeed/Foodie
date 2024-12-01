import React from 'react'
import { Nav, Navbar, NavDropdown, Container, Image, Badge } from "react-bootstrap"
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogOutMutation } from '../features/userApiSlice'
import { logOut } from '../features/authSlice'
import { toast } from 'react-toastify'
function NavbarMain({ theme }) {
    const { cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.auth)
    const [LogOut, { isLoading }] = useLogOutMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogOut = async () => {
        try {
            await LogOut().unwrap()
            dispatch(logOut())
            navigate("/login")
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }
    return (
        <Navbar expand="lg" variant={theme} style={{ backgroundColor: 'transparent' }}>
            <Container>
                <Navbar.Brand href="#home" className='d-flex align-items-center'><Image src="https://cdn.pixabay.com/photo/2022/05/03/03/41/burger-7170760_960_720.png" width={"8%"} fluid />Foodies</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* <Nav.Link href="#home" >Home</Nav.Link> */}

                        <Nav.Link className='mx-4 position-relative'> <NavLink to={"/cart"} className='text-white'><FaShoppingCart/></NavLink><Badge className='bg-dark rounded-circle position-absolute' >{cartItems?.length}</Badge></Nav.Link>

                        {user ? (<>
                            <NavDropdown title={`${user.username}`} id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <NavLink to={"/profile"} className="text-decoration-none text-dark">
                                        Profile
                                    </NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogOut}>LogOut</NavDropdown.Item>

                            </NavDropdown>
                        </>) : (<>
                            <Nav.Link href="#link">SignIn</Nav.Link>
                        </>)}

                        {user?.isAdmin &&  <NavDropdown title={`Admin`} id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    <NavLink to={"/admin/userlist"} className="text-decoration-none text-dark">
                                        Users
                                    </NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink to={"/admin/orderlist"} className="text-decoration-none text-dark">
                                        Orders
                                    </NavLink>
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <NavLink to={"/admin/productlist"} className="text-decoration-none text-dark">
                                        Products
                                    </NavLink>
                                </NavDropdown.Item>

                            </NavDropdown>}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMain