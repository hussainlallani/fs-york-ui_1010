import React, { useState } from 'react'
import { Form, FormGroup, Col, Input, Label, Button, Container, CardBody, Card, CardText } from 'reactstrap'



const Contact = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [content, setContent] = useState("")

    const formSubmit = async event => {
        event.preventDefault()
        const response = await fetch('http://localhost:4000/contact_form/entries', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({name, email, phoneNumber, content})
        })
        const payload = await response.json()
        if (response.status >= 400) {
            alert(`Oops! Error: ${payload.message} for fields: ${payload.invalid.join(",")}`)
        } else {
            alert(`Congrats! Submission submitted with id: ${payload.id}`)
        }
    }

    return (
        <Container>
            <Card className="text-white bg-secondary my-5 py-4 text-center">
                <CardBody>
                    <CardText className="text-white m-0">Use form to reach me, I'll get back to you within 24 hours!</CardText>
                </CardBody>
            </Card>
            <Form className="my-5" onSubmit={formSubmit}>
                <FormGroup row>
                    <Label for="emailEntry" sm={2}>Email</Label>
                    <Col sm={10}>
                    <Input type="email" name="email" id="emailEntry" placeholder="Enter email to contact"  required value={email} onChange={e => setEmail(e.target.value) }/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="phoneEntry" sm={2}>Phone Number</Label>
                    <Col sm={10}>
                    <Input type="phone" name="phone" id="phoneEntry" placeholder="Enter phone number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="nameEntry" sm={2}>Full Name</Label>
                    <Col sm={10}>
                    <Input type="name" name="name" id="nameEntry" placeholder="Enter your full name" required value={name} onChange={e => setName(e.target.value)}/>
                    </Col>
                </FormGroup>

                <FormGroup row>
                    <Label for="messageEntry" sm={2}>Message</Label>
                    <Col sm={10}>
                    <Input type="textarea" name="text" id="messageEntry" required value={content} onChange={e => setContent(e.target.value)}/>
                    </Col>
                </FormGroup>
                <FormGroup check row>
                    <Col sm={{ size: 10, offset: 2 }}>
                    <Button color="success">Submit</Button>
                    </Col>
                </FormGroup>
            </Form>
        </Container>
      )
    }

    export default Contact