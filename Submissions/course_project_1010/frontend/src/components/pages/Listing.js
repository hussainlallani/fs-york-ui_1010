import React, { useEffect, useState } from "react";
import { Container, Row, Button, Col, Form } from "reactstrap";
import parseJwt from "../../helpers/authHelper";
import { useHistory } from "react-router-dom";

var token = sessionStorage.getItem("token");

const Listings = () => {
  let history = useHistory();
  const user = parseJwt(token).username;
  const [listing, setListing] = useState([]);
  const [payload, setPayload] = useState({});

  const logout = (event) => {
    event.preventDefault();
    sessionStorage.removeItem("token");
    history.push("/login");
  };

  const handleEdit = (index) => {
    const listingCopy = [...listing];
    listingCopy[index]["readonly"] = true;
    setListing([...listingCopy]);
  };

  const handleBlur = (index) => {
    const listingCopy = [...listing];
    listingCopy[index]["readonly"] = false;
    setListing([...listingCopy]);
  };

  const handleDelete = async (index, id) => {
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_SERVERPORT}/contact_form/entries/${id}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const res = await response.json();
    if (response.status >= 400) {
      alert(`Oops! Error ${response.status}:  ${res.message}`);
    } else {
      // alert(`Congratulations! Submission submitted with id: ${id}`);
      const listingCopy = [...listing];
      listingCopy.splice(index, 1);
      setListing([...listingCopy]);
    }
  };

  const changeInputHandler = async (event, index, id) => {
    event.persist();
    setPayload((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    console.log(payload);

    // if (listingCopy !== listing) {
    //   setListing([...listingCopy]);
    // }
    // event.preventDefault();
    // setListing((prevState) => ({
    //   ...prevState,
    //   ...(prevState[index][event.target.name] = event.target.value),
    // }));
    // console.log(listing);
  };

  const handleSubmit = async (event, index, id) => {
    event.preventDefault();
    // if (!listing[index]["readonly"]) {
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_SERVERPORT}/contact_form/entries/${id}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    alert(JSON.stringify(payload));

    const res = await response.json();
    if (response.status >= 400) {
      alert(`Oops! Error ${response.status}:  ${res.message}`);
    } else {
      alert(`Congratulations! Submission submitted with id: ${id}`);
      setPayload("");
      handleBlur(index);
    }

    // }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_SERVERPORT}/contact_form/entries`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setListing(data);
    };
    getData();
  }, []);

  return (
    <Container>
      <Row>
        <h1>Listings for user: {user}</h1>
      </Row>
      <Row>
        <Col md={1} className="m-1">
          Date
        </Col>
        <Col md={2} className="m-1">
          Name
        </Col>
        <Col md={1} className="m-1">
          Phone
        </Col>
        <Col md={2} className="m-1">
          Email
        </Col>
        <Col md={4} className="m-1">
          Message
        </Col>
        <Col md={1} className="m-1"></Col>
        <Col md={1} className="m-1"></Col>
      </Row>
      {listing.length === 0 && (
        <tr>
          <td colSpan="4" className="text-center">
            <i>No listings found</i>
          </td>
        </tr>
      )}
      {listing.length >= 0 &&
        listing.map((entry, index) => (
          <Form key={entry.entry_id}>
            <Row>
              <Col md={1} className="m-1 text-break">
                {entry.timestamp}
              </Col>
              <Col md={2} className="m-1 text-break">
                <textarea
                  className="w-100 h-100"
                  name="name"
                  type="text"
                  defaultValue={entry.name}
                  onChange={(event) =>
                    changeInputHandler(event, index, entry.entry_id)
                  }
                  readOnly={!!entry.readonly ? false : true}
                  // onBlur={() => handleBlur(index)}
                />
              </Col>
              <Col md={1} className="m-1 text-break">
                <textarea
                  className="w-100 h-100"
                  name="phone"
                  type="tel"
                  defaultValue={entry.phone}
                  onChange={(event) => changeInputHandler(event, index)}
                  readOnly={!!entry.readonly ? false : true}
                  // onBlur={() => handleBlur(index)}
                />
              </Col>
              <Col md={2} className="m-1 text-break">
                <textarea
                  className="w-100 h-100"
                  name="email"
                  type="email"
                  defaultValue={entry.email}
                  onChange={(event) => changeInputHandler(event, index)}
                  readOnly={!!entry.readonly ? false : true}
                  // onBlur={() => handleBlur(index)}
                />
              </Col>
              <Col md={4} className="m-1 text-break">
                <textarea
                  className="w-100 h-100"
                  type="text"
                  name="content"
                  defaultValue={entry.content}
                  onChange={(event) => changeInputHandler(event, index)}
                  readOnly={!!entry.readonly ? false : true}
                  // onBlur={() => handleBlur(index)}
                />
              </Col>
              <Col className="m-auto">
                {!entry.readonly && (
                  <Button
                    color="primary"
                    onClick={(event) => handleEdit(index)}
                  >
                    &#9998;
                  </Button>
                )}
                {!!entry.readonly && (
                  <Button
                    type="submit"
                    color="primary"
                    className="p-1"
                    disabled={!payload ? true : false}
                    onClick={(event) =>
                      handleSubmit(event, index, entry.entry_id)
                    }
                  >
                    Submit
                  </Button>
                )}
              </Col>
              <Col className="m-auto">
                {!entry.readonly && (
                  <Button
                    color="danger"
                    onClick={() => handleDelete(index, entry.entry_id)}
                  >
                    X
                  </Button>
                )}
                {!!entry.readonly && (
                  <Button
                    color="primary"
                    className="p-1"
                    onClick={() => handleBlur(index)}
                  >
                    Cancel
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        ))}
      <Row className="my-5">
        <Button onClick={logout} color="primary">
          Logout
        </Button>
      </Row>
    </Container>
  );
};

export default Listings;
