import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Col,
  Input,
  Label,
  Button,
  Container,
  CardBody,
  Card,
  CardText,
} from "reactstrap";
import isAuthenticated from "../../helpers/authHelper";

const AddResume = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const username = () => isAuthenticated().username;

  const formSubmit = async (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("token");
    try {
      var response = await fetch("http://localhost:9000/patient/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fname,
          lname,
          role,
          email,
          phone,
          linkedin,
          username,
        }),
      });

      var payload = await response.json();
      console.log(payload);
    } catch (error) {
      console.log(error);
      alert(error);
    }

    if (response.status >= 400) {
      alert(`Oops! Error ${response.status}:  ${payload}`);
    } else {
      alert(payload);
    }

    setFname("");
    setLname("");
    setRole("");
    setEmail("");
    setPhone("");
    setLinkedin("");
  };

  return (
    <Container>
      <Form className="my-5" onSubmit={formSubmit}>
        <FormGroup row>
          <Label for="fname" sm={2}>
            First Name
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="fname"
              id="fname"
              placeholder="Enter first name"
              required
              onChange={(e) => setFname(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="phoneEntry" sm={2}>
            Phone Number
          </Label>
          <Col sm={10}>
            <Input
              type="tel"
              name="phone"
              id="phoneEntry"
              placeholder="Enter phone number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="nameEntry" sm={2}>
            Full Name
          </Label>
          <Col sm={10}>
            <Input
              type="name"
              name="name"
              id="nameEntry"
              placeholder="Enter your full name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="messageEntry" sm={2}>
            Message
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="text"
              id="messageEntry"
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button color="success">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default AddResume;
