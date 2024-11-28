import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Product from './Product'
import { useGetproductsQuery } from '../features/productApiSlice'
import Loader from './Loader'

function ProductSection() {

    // const products = [
    //     {
    //         id: 1,
    //         title: "Zinger Burger",
    //         desc: "  Yummy and Delicious Zinger Burger. Super Crispy and Crunchy",
    //         price: "$35",
    //         imageSrc: "https://cdn.pixabay.com/photo/2024/04/27/12/41/ai-generated-8723664_960_720.png",
    //         imageAlt: "Burger Image",
    //         rating: 3,
    //         reviewNum: 12,
    //           countInStock:"3"
    //     },
    //     {
    //         id: 2,
    //         title: "Zinger Burger",
    //         desc: "  Yummy and Delicious Zinger Burger. Super Crispy and Crunchy",
    //         price: "$35",
    //         imageSrc: "https://cdn.pixabay.com/photo/2024/04/27/12/41/ai-generated-8723664_960_720.png",
    //         imageAlt: "Burger Image",
    //         rating: 3,
    //         reviewNum: 12,
    //           countInStock:"3"
    //     },
    //     {
    //         id: 3,
    //         title: "Zinger Burger",
    //         desc: "  Yummy and Delicious Zinger Burger. Super Crispy and Crunchy",
    //         price: "$35",
    //         imageSrc: "https://cdn.pixabay.com/photo/2024/04/27/12/41/ai-generated-8723664_960_720.png",
    //         imageAlt: "Burger Image",
    //         rating: 3,
    //         reviewNum: 12,
    //           countInStock:"3"
    //     },
    //     {
    //         id: 4,
    //         title: "Zinger Burger",
    //         desc: "  Yummy and Delicious Zinger Burger. Super Crispy and Crunchy",
    //         price: "$35",
    //         imageSrc: "https://cdn.pixabay.com/photo/2024/04/27/12/41/ai-generated-8723664_960_720.png",
    //         imageAlt: "Burger Image",
    //         rating: 3,
    //         reviewNum: 12,
    //           countInStock:"3"
    //     },



    // ]


    const { data: products, isLoading, error } = useGetproductsQuery()
    console.log(products)
    return (
        <Container>
            {isLoading ? <Loader /> : error ? error?.data?.message || error.error : (<>  <div className="headingContainer d-flex justify-content-center align-items-center flex-column py-3">
                <p style={{ fontSize: "2.5rem", fontWeight: "700" }} className='text-center my-1'>We Serve</p>
                <div style={{ width: "20vw", height: "8px" }} className='my-2 rounded bg-danger'></div>
            </div>
                {/* <div className="productCards d-flex align-items-center justify-content-between my-3"> */}
                    <Row>
                        {products.map((item) => {
                            return <Col sm={12} md={6} lg={3}  className='d-flex align-items-center justify-content-center my-3' key={item._id} >
                                <Product item={item} />
                            </Col>

                        })}
                    </Row>
                {/* </div> */}
            </>)}

        </Container>


    )
}

export default ProductSection