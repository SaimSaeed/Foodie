import React from 'react'
import { Container, Image } from 'react-bootstrap'
import Carousel from '../components/Carousel'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductSection from '../components/ProductSection'
import { useParams } from 'react-router-dom'
function Home() {
  const {search} = useParams()
  return (
    <>

      {search ? <ProductSection /> : <>
        <Header />
        <ProductSection/>
        <Footer />
      </>}





    </>
  )
}

export default Home