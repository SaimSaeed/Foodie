import React from 'react'
import { Container, Spinner } from 'react-bootstrap'
function Loader() {
  return (
    <Container>
        <div className='text-center my-3'>
        <Spinner style={{width:"200px",height:"200px"}}/>
        </div>

    </Container>
  )
}

export default Loader