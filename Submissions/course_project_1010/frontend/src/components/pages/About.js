import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'

const About = () => {
    return (
        <Container>
        <Row className="my-5">
            <Col lg="7">
                <img className="img-fluid rounded mb-4 mb-lg-0" src={"/img/laxon_arts_logo.jpg"} alt="" />
            </Col>
            <Col lg="5">
                <h1 className="font-weight-light">About Me</h1>
                <p>I have passionate programmer, graphic designer, and a business professional with over 6 years of experience in Marketing.<p>I have founded Laxon Arts to provide top quality, yet affordable solution to both large corporation and SMEs alike.</p>  </p>
                <div class="btn-group-vertical">
                <button type="button" class="btn btn-primary">HTML5</button>
                <button type="button" class="btn btn-primary">CSS</button>
                <button type="button" class="btn btn-primary">jQuery</button>
                </div>
                <div class="btn-group-vertical">
                <button type="button" class="btn btn-primary">Node JS</button>
                <button type="button" class="btn btn-primary">MySQL</button>
                <button type="button" class="btn btn-primary">Mongo DB</button>
                </div>
                <div class="btn-group-vertical">
                <button type="button" class="btn btn-primary">Logo Design</button>
                <button type="button" class="btn btn-primary">UI Design</button>
                <button type="button" class="btn btn-primary">React JS</button>
                </div>
                <br></br><br></br>
                <Button color="primary" href="/contact">Contact Me</Button>
            </Col>
        </Row>
    </Container>
    )
}

export default About