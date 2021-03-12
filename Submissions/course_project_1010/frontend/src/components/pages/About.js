import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'

const About = () => {
    return (
        <Container>
        <Row className="my-5">
            <Col lg="7">
                <img className="img-fluid rounded mb-4 mb-lg-0" src="http://placehold.it/900x400" alt="" />
            </Col>
            <Col lg="5">
                <h1 className="font-weight-light">About Me</h1>
                <p>Some interesting stuff about me. More things, maybe a bit more here. </p>
                <Button color="primary" href="/contact">Contact Me</Button>
            </Col>
        </Row>
    </Container>
    )
}

export default About