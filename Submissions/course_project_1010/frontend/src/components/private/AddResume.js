import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Col,
  Input,
  Button,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import isAuthenticated from "../../helpers/authHelper";

const AddResume = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const username = isAuthenticated().username;
  const [info, setInfo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(fname, role, lname, email, phone, linkedin, username);

    const token = sessionStorage.getItem("token");
    try {
      var response = await fetch("http://localhost:3001/resume/info", {
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
      console.log(payload);
      console.log(error);
      alert(error.sqlMessage);
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

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_SERVERPORT}/resume/info/${username}`,
        {
          method: "GET",
        }
      );
      const payload = await response.json();
      setInfo(...payload);
    };
    getData();
  }, []);

  alert(info.username);

  return (
    <Container>
      <Form className="my-5" onSubmit={handleSubmit}>
        <h1>Personal Information</h1>
        <InputGroup row className="py-5">
          <Col sm={1}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="pr-5">First Name</InputGroupText>
            </InputGroupAddon>
          </Col>
          <Col sm={3}>
            <Input
              type="text"
              name="fname"
              id="fname"
              placeholder="Enter first name"
              defaultValue={info.fname}
              required
              onChange={(e) => setFname(e.target.value)}
            />
          </Col>
          <Col sm={1}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="pr-5">Last Name</InputGroupText>
            </InputGroupAddon>
          </Col>
          <Col sm={3}>
            <Input
              type="text"
              name="lname"
              id="lname"
              placeholder="Enter last name"
              defaultValue={info.lname}
              required
              onChange={(e) => setLname(e.target.value)}
            />
          </Col>
          <Col sm={1}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="pr-5">Role</InputGroupText>
            </InputGroupAddon>
          </Col>
          <Col sm={3}>
            <Input
              type="text"
              name="role"
              id="role"
              placeholder="Enter role"
              defaultValue={info.role}
              required
              onChange={(e) => setRole(e.target.value)}
            />
          </Col>
        </InputGroup>

        <InputGroup row>
          <Col sm={1}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="pr-5">Email</InputGroupText>
            </InputGroupAddon>
          </Col>
          <Col sm={3}>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Enter email"
              defaultValue={info.email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
          <Col sm={1}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="pr-5">Phone</InputGroupText>
            </InputGroupAddon>
          </Col>
          <Col sm={3}>
            <Input
              type="text"
              name="phone"
              id="phone"
              placeholder="Enter phone"
              defaultValue={info.phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </Col>
          <Col sm={1}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="pr-5">LinkedIn</InputGroupText>
            </InputGroupAddon>
          </Col>
          <Col sm={3}>
            <Input
              type="text"
              name="linkedin"
              id="linkedin"
              placeholder="Enter linkedin url"
              defaultValue={info.linkedin}
              required
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </Col>
        </InputGroup>

        {/* <FormGroup row>
          <Label for="fname" sm={2}>
            First Name
          </Label>
          <Col sm={2}>
            <Input
              type="text"
              name="fname"
              id="fname"
              placeholder="Enter first name"
              required
              onChange={(e) => setFname(e.target.value)}
            />
          </Col>
          <Label for="lname" sm={2}>
            Last Name
          </Label>
          <Col sm={2}>
            <Input
              type="text"
              name="lname"
              id="lname"
              placeholder="Enter last name"
              required
              onChange={(e) => setLname(e.target.value)}
            />
          </Col>
          <Label for="role" sm={2}>
            Role
          </Label>
          <Col sm={2}>
            <Input
              type="text"
              name="role"
              id="role"
              placeholder="Enter role"
              required
              onChange={(e) => setRole(e.target.value)}
            />
          </Col>
        </FormGroup>
        <FormGroup row></FormGroup>
        <FormGroup row></FormGroup> */}

        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button color="success" type="submit">
              Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </Container>
  );
};

export default AddResume;
