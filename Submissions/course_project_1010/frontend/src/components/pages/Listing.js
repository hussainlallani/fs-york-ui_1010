import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Table,
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
} from "reactstrap";
import parseJwt from "../../helpers/authHelper";
import { useHistory } from "react-router-dom";

const Listings = () => {
  let history = useHistory();
  const token = sessionStorage.getItem("token");
  const user = parseJwt(token).username;
  const [listing, setListing] = useState([]);
  const logout = (event) => {
    event.preventDefault();
    sessionStorage.removeItem("token");
    history.push("/login");
  };

  const handleEdit = (event, index) => {
    console.log(event.currentTarget);
    // console.log("Edit pressed!", index);
  };

  const handleDelete = (index) => {
    console.log("Delete pressed!", index);
    const listingCopy = [...listing];
    listingCopy.splice(index, 1);
    setListing([...listingCopy]);
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
  }, [token]);
  return (
    <Container>
      <Row>
        <h1>Listings for user: {user}</h1>
      </Row>
      <Table responsive className="text-white">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Message</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listing.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                <i>No listings found</i>
              </td>
            </tr>
          )}
          {listing.length > 0 &&
            listing.map((entry, index) => (
              <tr key={entry.entry_id}>
                <td>{entry.entry_id}</td>
                <td>{entry.name}</td>
                <td>{entry.phoneNumber}</td>
                <td>{entry.email}</td>
                {/* <td>{entry.content}</td> */}
                <td>
                  {" "}
                  <InputGroup>
                    <InputGroupAddon addonType="prepend"></InputGroupAddon>
                    <Input
                      placeholder="username"
                      readonly="readonly"
                      value={entry.content}
                    />
                  </InputGroup>
                </td>
                <td>
                  <Button
                    color="primary"
                    onClick={(event) => handleEdit(event, index)}
                  >
                    &#9998;
                  </Button>
                </td>
                <td>
                  <Button color="danger" onClick={() => handleDelete(index)}>
                    X
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Row className="my-5">
        <Button onClick={logout} color="primary">
          Logout
        </Button>
      </Row>
    </Container>
  );
};

export default Listings;
