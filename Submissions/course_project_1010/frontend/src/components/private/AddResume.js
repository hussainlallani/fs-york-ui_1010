import React, { useState, useEffect } from "react";
import {
  Form,
  Col,
  Input,
  Button,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import isAuthenticated from "../../helpers/authHelper";

var token = isAuthenticated();

const AddResume = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [info, setInfo] = useState();
  const [infopayload, setInfopayload] = useState("");
  var username = isAuthenticated().username;

  const [summary, setSummary] = useState("");
  const [summarypayload, setSummarypayload] = useState("");

  // INFO SECTION
  const handleInfoSubmit = async (event) => {
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
        body: JSON.stringify(infopayload),
      });
      setInfo("");
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
      // alert(payload);
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
  }, [info]);

  const changeInfoHandler = async (event, index, id) => {
    event.persist();
    setInfopayload((prevState) => ({
      ...prevState,
      username: `${username.toString()}`,
      [event.target.name]: event.target.value,
    }));
  };

  const handleInfoUpdate = async (index, id) => {
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_SERVERPORT}/resume/info/${username}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(infopayload),
      }
    );

    const res = await response.json();
    // alert(JSON.stringify(infopayload));
    if (response.status >= 400) {
      alert(`Oops! Error ${response.status}:  ${res.message}`);
    } else {
      alert(`Successfully Submitted!`);
    }
  };

  const handleInfoDelete = async (index, id) => {
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_SERVERPORT}/resume/info/${username}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setInfo("");

    const res = await response.json();
    if (response.status >= 400) {
      alert(`Oops! Error ${response.status}:  ${res.message}`);
    } else {
      alert(`${res}`);
    }
  };

  // SUMMARY SECTION

  const handleSummarySubmit = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("token");
    try {
      var response = await fetch("http://localhost:3001/resume/summary", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(summarypayload),
      });
      setSummary("");
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
      // alert(payload);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_SERVERPORT}/resume/summary/${username}`,
        {
          method: "GET",
        }
      );
      const payload = await response.json();
      setSummary(...payload);
    };
    getData();
  }, [summary]);

  const changeSummaryHandler = async (event) => {
    event.persist();
    setSummarypayload((prevState) => ({
      ...prevState,
      username: `${username.toString()}`,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSummaryUpdate = async (index, id) => {
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_SERVERPORT}/resume/summary/${username}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(summarypayload),
      }
    );

    const res = await response.json();
    // alert(JSON.stringify(infopayload));
    if (response.status >= 400) {
      alert(`Oops! Error ${response.status}:  ${res.message}`);
    } else {
      alert(`Successfully Submitted!`);
    }
  };

  const handleSummaryDelete = async (index, id) => {
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_SERVERPORT}/resume/summary/${username}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setSummary("");

    const res = await response.json();
    if (response.status >= 400) {
      alert(`Oops! Error ${response.status}:  ${res.message}`);
    } else {
      alert(`${res}`);
    }
  };
  return (
    <Container>
      <Form className="my-5">
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
              defaultValue={!!info ? info.fname : ""}
              required
              onChange={(e) => changeInfoHandler(e)}
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
              defaultValue={!!info ? info.lname : ""}
              required
              onChange={(e) => changeInfoHandler(e)}
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
              defaultValue={!!info ? info.role : ""}
              required
              onChange={(e) => changeInfoHandler(e)}
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
              defaultValue={!!info ? info.email : ""}
              required
              onChange={(e) => changeInfoHandler(e)}
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
              defaultValue={!!info ? info.phone : ""}
              required
              onChange={(e) => changeInfoHandler(e)}
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
              defaultValue={!!info ? info.linkedin : ""}
              required
              onChange={(e) => changeInfoHandler(e)}
            />
          </Col>
        </InputGroup>
        {!!!info && isAuthenticated() && (
          <InputGroup row className="text-right py-5">
            <Col sm={12}>
              <Button
                color="success"
                onClick={(event) => handleInfoSubmit(event)}
              >
                Add
              </Button>
            </Col>
          </InputGroup>
        )}
        {!!info && isAuthenticated() && (
          <InputGroup row className="text-right py-5">
            <Col sm={11}>
              <Button color="success" onClick={(e) => handleInfoUpdate(e)}>
                Update
              </Button>
            </Col>
            <Col sm={1}>
              <Button
                color="danger"
                onClick={(event) => handleInfoDelete(event)}
              >
                Delete
              </Button>
            </Col>
          </InputGroup>
        )}
      </Form>

      <Form className="my-5">
        <h1>Summary</h1>
        <InputGroup row className="py-5">
          <Col sm={12}>
            <textarea
              className="w-100"
              type="text"
              name="summary"
              id="summary"
              placeholder="Enter summary"
              defaultValue={!!summary ? summary.summary : ""}
              required
              onChange={(e) => changeSummaryHandler(e)}
            />
          </Col>
        </InputGroup>
        {!!!summary && isAuthenticated() && (
          <InputGroup row className="text-right">
            <Col sm={12}>
              <Button
                color="success"
                onClick={(event) => handleSummarySubmit(event)}
              >
                Add
              </Button>
            </Col>
          </InputGroup>
        )}
        {!!summary && isAuthenticated() && (
          <InputGroup row className="text-right">
            <Col sm={11}>
              <Button color="success" onClick={(e) => handleSummaryUpdate(e)}>
                Update
              </Button>
            </Col>
            <Col sm={1}>
              <Button
                color="danger"
                onClick={(event) => handleSummaryDelete(event)}
              >
                Delete
              </Button>
            </Col>
          </InputGroup>
        )}
      </Form>
    </Container>
  );
};

export default AddResume;
