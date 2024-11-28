import React from 'react'
import Navbar from './Navbar'
import { FaHamburger,FaPizzaSlice } from 'react-icons/fa'
function Header() {
    return (
        <header className='imageContainer '>
            <div className="overlay"></div>
           <Navbar theme={"dark"}/>
            <div className="textContainer">
                {/* <p style={{fontSize:"2rem",fontWeight:"600",color:"red",backgroundColor:"rgba(0,0,0,0.7)"}} className='px-2'>Enjoy Hygienic and Delicious</p> */}
                {/* <p className="textHeading text-center d-flex align-items-center justify-content-between px-2" style={{backgroundColor:"rgba(0,0,0,0.7)"}}>
              <FaHamburger/>  Fast Food <FaPizzaSlice />
                </p> */}
            </div>
           

        </header>
    )
}

export default Header