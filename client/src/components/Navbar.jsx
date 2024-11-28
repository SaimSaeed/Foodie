import React from 'react'
import { Nav, Navbar, NavDropdown, Container, Image, Badge } from "react-bootstrap"
import { FaShoppingCart } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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

                        <Nav.Link> <Link to={"/cart"}><FaShoppingCart /><Badge>{cartItems?.length}</Badge></Link></Nav.Link>

                        {user ? (<>
                            <NavDropdown title={`${user.username}`} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.2">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3" onClick={handleLogOut}>LogOut</NavDropdown.Item>

                            </NavDropdown>
                        </>) : (<>
                            <Nav.Link href="#link">SignIn</Nav.Link>
                        </>)}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMain