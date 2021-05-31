import React, { useState, useEffect } from "react";
import {
  Form,
  Col,
  // Input,np
  Button,
  Container,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
} from "reactstrap";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
// import TextField from "@material-ui/core/TextField";
import isAuthenticated from "../../helpers/authHelper";
import Grid from "@material-ui/core/Grid";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(0, 0, 0, 20),
    // textAlign: "center",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  textarea: {
    flexGrow: 0.83,
    background: "white",
  },
}));

var token = isAuthenticated();

const AddResume = () => {
  // INFO SECTION
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [info, setInfo] = useState([]);
  const [data, setData] = useState({
    email: "",
    fname: "",
    linkedin: "",
    lname: "",
    phone: "",
    role: "",
    username: "",
  });
  const [infopayload, setInfopayload] = useState("");
  const [infopayloadchanged, setInfopayloadchanged] = useState("");
  var username = isAuthenticated().username;
  // SUMMARY SECTION
  const [summary, setSummary] = useState("");
  const [summarypayload, setSummarypayload] = useState("");
  const [summarypayloadchanged, setSummarypayloadchanged] = useState("");
  // EXPERIENCE SECTION
  const [company_and_role, setCompany_and_role] = useState("");
  const [from_to, setFrom_to] = useState("");
  const [job_resp, setJob_resp] = useState("");
  const [experience, setExperience] = useState([]);
  const [experiencepayload, setExperiencepayload] = useState("");
  // -----------
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
    } catch (error) {
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
      console.log(payload);
      setInfo(...payload);
    };
    getData();
    return () => {
      console.log("return");
      // alert("return");
    };
  }, [username]);

  const changeInfoHandler = async (event, index, id) => {
    event.persist();
    setInfopayload((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));

    console.log(infopayload);
  };

  useEffect(() => {
    const updatedInfoEntries = Object.keys(infopayload)
      .filter((key) => infopayload[key] !== info[key])
      .reduce((obj, key) => {
        obj[key] = infopayload[key];
        return obj;
      }, {});

    setInfopayloadchanged(updatedInfoEntries);
    console.log(infopayloadchanged);
  }, [infopayload]);

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
      setInfopayloadchanged("");
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

  // console.log(isValueChanged());
  // isValueChanged();

  // SUMMARY SECTION

  const handleSummarySubmit = async (event) => {
    event.preventDefault();

    const token = sessionStorage.getItem("token");
    try {
      var response = await fetch(
        `http://localhost:${process.env.REACT_APP_SERVERPORT}/resume/summary/${username}`,
        {
          method: "POST",
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
      console.log(summary);
    };
    getData();
  }, []);

  const changeSummaryHandler = async (event) => {
    event.persist();
    setSummarypayload((prevState) => ({
      ...prevState,
      // username: `${username.toString()}`,
      [event.target.name]: event.target.value,
    }));
  };

  useEffect(() => {
    if (summarypayload !== undefined && summary !== undefined) {
      const summaryUpdatedEntries = Object.keys(summarypayload)
        .filter((key) => summarypayload[key] !== summary[key])
        .reduce((obj, key) => {
          obj[key] = summarypayload[key];
          return obj;
        }, {});

      setSummarypayloadchanged(summaryUpdatedEntries);
      console.log(summarypayloadchanged);
      console.log(Object.keys(infopayloadchanged).length);
    }
  }, [summarypayload]);

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

  // EXPERIENCE SECTION

  const handleExperienceSubmit = async (event) => {
    event.preventDefault();
    console.log(fname, role, lname, email, phone, linkedin, username);

    const token = sessionStorage.getItem("token");
    try {
      var response = await fetch("http://localhost:3001/resume/experience", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experiencepayload),
      });
      setExperience("");
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

    // setFname("");
    // setLname("");
    // setRole("");
    // setEmail("");
    // setPhone("");
    // setLinkedin("");
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        `http://localhost:${process.env.REACT_APP_SERVERPORT}/resume/experience/${username}`,
        {
          method: "GET",
        }
      );
      const payload = await response.json();
      setExperience(payload);
    };
    getData();
  }, []);

  const changeExperienceHandler = async (event, index, id) => {
    event.persist();
    setExperiencepayload((prevState) => ({
      ...prevState,
      username: `${username.toString()}`,
      [event.target.name]: event.target.value,
    }));
  };

  const handleExperienceUpdate = async (index, id) => {
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_SERVERPORT}/resume/experience/${username}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(experiencepayload),
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

  const handleExperienceDelete = async (index, id) => {
    const response = await fetch(
      `http://localhost:${process.env.REACT_APP_SERVERPORT}/resume/experience/${username}`,
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

    setExperience("");

    const res = await response.json();
    if (response.status >= 400) {
      alert(`Oops! Error ${response.status}:  ${res.message}`);
    } else {
      alert(`${res}`);
    }
  };

  const classes = useStyles();

  const summaryAddBtnMarkup = isAuthenticated() ? (
    <Button color="success" onClick={(event) => handleSummarySubmit(event)}>
      Add
    </Button>
  ) : (
    <React.Fragment>""</React.Fragment>
  );

  const summaryDelBtnMarkup = isAuthenticated() ? (
    <Button color="danger" onClick={(event) => handleSummaryDelete(event)}>
      Delete
    </Button>
  ) : (
    <React.Fragment>""</React.Fragment>
  );

  const summaryUpdBtnMarkup =
    isAuthenticated() && Object.keys(summarypayloadchanged).length !== 0 ? (
      <Button color="success" onClick={(e) => handleSummaryUpdate(e)}>
        Update
      </Button>
    ) : (
      <React.Fragment></React.Fragment>
    );

  const summaryInputMarkup = (
    <TextField
      aria-label="empty textarea"
      rowsMin={5}
      type="text"
      className={classes.textarea}
      name="summary"
      id="summary"
      placeholder="Enter summary"
      multiline
      defaultValue={!!summary ? summary.summary : ""}
      required
      onChange={(e) => changeSummaryHandler(e)}
      InputProps={{
        readOnly: isAuthenticated() ? false : true,
      }}
    />
  );

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        {/* INFO SECTION */}
        <Form key={info} className={classes.root}>
          <h1 className="py-5">Personal Information</h1>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <TextField
                type="text"
                inputProps={{ className: "text-white" }}
                InputLabelProps={{ className: "text-white" }}
                label="First Name"
                name="fname"
                id="fname"
                variant="outlined"
                defaultValue={info.fname}
                required
                onChange={(e) => changeInfoHandler(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="text"
                inputProps={{ className: "text-white" }}
                InputLabelProps={{ className: "text-white" }}
                label="Last Name"
                name="lname"
                id=";name"
                variant="outlined"
                defaultValue={info.lname}
                required
                onChange={(e) => changeInfoHandler(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="text"
                inputProps={{ className: "text-white" }}
                InputLabelProps={{ className: "text-white" }}
                label="Role"
                name="role"
                id="role"
                variant="outlined"
                defaultValue={info.role}
                required
                onChange={(e) => changeInfoHandler(e)}
              />
            </Grid>
          </Grid>
          <Grid container item xs={12} spacing={3}>
            <Grid item xs={4}>
              <TextField
                type="text"
                inputProps={{ className: "text-white" }}
                InputLabelProps={{ className: "text-white" }}
                label="Email"
                name="email"
                id="Email"
                variant="outlined"
                defaultValue={info.email}
                required
                onChange={(e) => changeInfoHandler(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="text"
                inputProps={{ className: "text-white" }}
                InputLabelProps={{ className: "text-white" }}
                label="Phone"
                name="phone"
                id="Phone"
                variant="outlined"
                defaultValue={info.phone}
                required
                onChange={(e) => changeInfoHandler(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="text"
                inputProps={{ className: "text-white" }}
                InputLabelProps={{ className: "text-white" }}
                label="LinkedIn"
                name="linkedIn"
                id="LinkedIn"
                variant="outlined"
                defaultValue={info.linkedin}
                required
                onChange={(e) => changeInfoHandler(e)}
              />
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={3}>
            <Grid item xs={12}>
              {info && isAuthenticated() && (
                <React.Fragment>
                  <Button
                    color="success"
                    onClick={(event) => handleInfoSubmit(event)}
                  >
                    Add
                  </Button>
                  {Object.keys(infopayloadchanged).length !== 0 && (
                    <Button
                      color="success"
                      onClick={(e) => handleInfoUpdate(e)}
                    >
                      Update
                    </Button>
                  )}
                  <Button
                    color="danger"
                    onClick={(event) => handleInfoDelete(event)}
                  >
                    Delete
                  </Button>
                </React.Fragment>
              )}
            </Grid>
          </Grid>
        </Form>
      </Grid>
      <Grid container spacing={1}>
        <Form key={summary} className={classes.root}>
          <Grid container item xs={12} spacing={3}>
            <h1 className="py-5">Summary</h1>
            {Object.keys(summarypayloadchanged).length !== 0 ? "TRUE" : "FALSE"}

            {summary
              ? "TRUE SUMMARY" && (
                  <Grid container item xs={12} md={12} spacing={3}>
                    {summaryInputMarkup}
                    {summaryUpdBtnMarkup}
                    {summaryDelBtnMarkup}
                  </Grid>
                )
              : "FALSE SUMMARY" && (
                  <React.Fragment>
                    {summaryInputMarkup}
                    {summaryAddBtnMarkup}
                  </React.Fragment>
                )}

            {/* OLD CODE */}

            {isAuthenticated() && !summary && (
              <Grid container item xs={12} md={12} spacing={3}>
                <TextareaAutosize
                  aria-label="empty textarea"
                  rowsMin={5}
                  type="text"
                  className={classes.textarea}
                  name="summary"
                  id="summary"
                  placeholder="Enter summary"
                  defaultValue={!!summary ? summary.summary : ""}
                  required
                  onChange={(e) => changeSummaryHandler(e)}
                />
                <Button
                  color="success"
                  onClick={(event) => handleSummarySubmit(event)}
                >
                  Add
                </Button>
              </Grid>
            )}
            {summary && (
              <React.Fragment>
                <Grid container item xs={12} md={12} spacing={3}>
                  <TextareaAutosize
                    aria-label="empty textarea"
                    rowsMin={5}
                    className={classes.textarea}
                    type="text"
                    name="summary"
                    id="summary"
                    placeholder="Enter summary"
                    // defaultValue={!!summary ? summary.summary : ""}
                    defaultValue={summary.summary}
                    required
                    onChange={(e) => changeSummaryHandler(e)}
                  />
                </Grid>
                {/* <Button color="success" onClick={(e) => handleSummaryUpdate(e)}>
                  Update
                </Button>
                <Button
                  color="danger"
                  onClick={(event) => handleSummaryDelete(event)}
                >
                  Delete
                </Button> */}
              </React.Fragment>
            )}
          </Grid>
        </Form>
      </Grid>
    </div>
  );
};

export default AddResume;
