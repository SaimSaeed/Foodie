import React, { useState } from 'react'
import { Button, Form } from "react-bootstrap"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { useNavigate, useParams } from 'react-router-dom'
function SearchForm() {
    const navigate = useNavigate()
    const [keyword,setKeyword] = useState("")
    const handleSubmit = (e) => {
        e.preventDefault()
         if(keyword.trim()){
            navigate(`/search/${keyword}`)
         }else{
             navigate("/")
         }
    }
    return (
        <Form className='position-relative' onSubmit={handleSubmit}>
            <Form.Control type='search' placeholder='Search...' value={keyword}  onChange={e=>setKeyword(e.target.value)}/>
            <Button className='position-absolute top-0 end-0 d-flex justify-content-center align-items-center mt-1 mx-1 bg-danger border-0' type='submit' ><FaMagnifyingGlass /></Button>
        </Form>
    )
}

export default SearchForm
