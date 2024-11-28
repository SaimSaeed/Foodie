import React from 'react'
import { Carousel, Container, Image } from 'react-bootstrap'


function CarouselSection() {
    return (
        <Container>
            <Carousel
                controls={false}
                fade={true}
                className='my-3'

            >
                <Carousel.Item>
                    <Image src="https://cdn.pixabay.com/photo/2017/09/18/16/54/links-2762389_960_720.png" fluid style={{width:"100%"}} />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src="https://cdn.pixabay.com/photo/2017/09/18/16/54/links-2762389_960_720.png" fluid style={{width:"100%"}}/>
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </Container>
    )
}

export default CarouselSection