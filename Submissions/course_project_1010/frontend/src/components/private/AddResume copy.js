<Container>
  {/* INFO SECTION */}
  <Form className="my-5">
    <h1>Personal Information</h1>
    <InputGroup row className="py-5" key={info}>
      <Col sm={4}>
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
        />
      </Col>
      <Col sm={4}>
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
      </Col>
      <Col sm={4}>
        <TextField
          type="text"
          inputProps={{ className: "text-white" }}
          InputLabelProps={{ className: "text-white" }}
          label="Role"
          name="Role"
          id="role"
          variant="outlined"
          defaultValue={info.role}
          required
          onChange={(e) => changeInfoHandler(e)}
        />
      </Col>
    </InputGroup>
    <InputGroup row>
      <Col sm={4}>
        <TextField
          type="text"
          inputProps={{ className: "text-white" }}
          InputLabelProps={{ className: "text-white" }}
          label="Email"
          name="Email"
          id="Email"
          variant="outlined"
          defaultValue={info.email}
          required
          onChange={(e) => changeInfoHandler(e)}
        />
      </Col>
      <Col sm={4}>
        <TextField
          type="text"
          inputProps={{ className: "text-white" }}
          InputLabelProps={{ className: "text-white" }}
          label="Phone"
          name="Phone"
          id="Phone"
          variant="outlined"
          defaultValue={info.phone}
          required
          onChange={(e) => changeInfoHandler(e)}
        />
      </Col>
      <Col sm={4}>
        <TextField
          type="text"
          inputProps={{ className: "text-white" }}
          InputLabelProps={{ className: "text-white" }}
          label="LinkedIn"
          name="LinkedIn"
          id="LinkedIn"
          variant="outlined"
          defaultValue={info.linkedin}
          required
          onChange={(e) => changeInfoHandler(e)}
        />
      </Col>
    </InputGroup>
    {!!!info && isAuthenticated() && (
      <InputGroup row className="text-right py-5">
        <Col sm={12}>
          <Button color="success" onClick={(event) => handleInfoSubmit(event)}>
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
          <Button color="danger" onClick={(event) => handleInfoDelete(event)}>
            Delete
          </Button>
        </Col>
      </InputGroup>
    )}
  </Form>
  {/* <h1>First Name: {info}</h1> */}
  {/* SUMMARY SECTION */}
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
  {/* EXPERIENCE */}
  <Form className="my-5">
    <h1>Experience</h1>
    {/* {!!experience[0] ? experience[0].from_to : ""} */}

    {/* {experience.map((exp) => (
        <div key={exp.experience_id}>
          <p>{exp.experience_id}</p>
          <p>{exp.company_and_role}</p>
          <p>{exp.from_to}</p>
        </div>
      ))} */}

    {experience.map((exp) => (
      <InputGroup row className="py-5" key={exp.experience_id}>
        {/* <Col sm={1}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="pr-5">Company & Role</InputGroupText>
            </InputGroupAddon>
          </Col> */}
        <Col sm={3}>
          <TextField
            type="text"
            inputProps={{ className: "text-white" }}
            InputLabelProps={{ className: "text-white" }}
            name="company_and_role"
            label="Company and Role"
            id="company_and_role"
            placeholder="Enter company and role"
            variant="outlined"
            defaultValue={exp.company_and_role}
            required
            onChange={(e) => changeExperienceHandler(e, exp.experience_id)}
          />
          <p></p>
        </Col>
        {/* <Col sm={1}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="pr-5">From - Until</InputGroupText>
            </InputGroupAddon>
          </Col> */}
        <Col sm={3}>
          <TextField
            type="text"
            variant="outlined"
            name="from_to"
            label="from - until"
            id="from_to"
            placeholder="Enter tenure"
            defaultValue={exp.from_to}
            required
            onChange={(e) => changeExperienceHandler(e, exp.experience_id)}
          />
        </Col>
      </InputGroup>
    ))}

    {!!!info && isAuthenticated() && (
      <InputGroup row className="text-right py-5">
        <Col sm={12}>
          <Button color="success" onClick={(event) => handleInfoSubmit(event)}>
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
          <Button color="danger" onClick={(event) => handleInfoDelete(event)}>
            Delete
          </Button>
        </Col>
      </InputGroup>
      // <InputGroup row className="py-5">
      //   <Col sm={1}>
      //     <InputGroupAddon addonType="prepend">
      //       <InputGroupText className="pr-5">Company & Role</InputGroupText>
      //     </InputGroupAddon>
      //   </Col>
      //   <Col sm={3}>
      //     <Input
      //       type="text"
      //       name="company_and_role"
      //       id="company_and_role"
      //       placeholder="Enter company and role"
      //       defaultValue={!!experience ? experience.company_and_role : ""}
      //       required
      //       onChange={(e) => changeExperienceHandler(e)}
      //     />
      //   </Col>
      //   <Col sm={1}>
      //     <InputGroupAddon addonType="prepend">
      //       <InputGroupText className="pr-5">Last Name</InputGroupText>
      //     </InputGroupAddon>
      //   </Col>
      //   <Col sm={3}>
      //     <Input
      //       type="text"
      //       name="from_to"
      //       id="from_to"
      //       placeholder="Enter tenure"
      //       defaultValue={!!experience ? experience.from_to : ""}
      //       required
      //       onChange={(e) => changeExperienceHandler(e)}
      //     />
      //   </Col>
      // </InputGroup>
      // {!!!info && isAuthenticated() && (
      //   <InputGroup row className="text-right py-5">
      //     <Col sm={12}>
      //       <Button
      //         color="success"
      //         onClick={(event) => handleInfoSubmit(event)}
      //       >
      //         Add
      //       </Button>
      //     </Col>
      //   </InputGroup>
      // )}
      // {!!info && isAuthenticated() && (
      //   <InputGroup row className="text-right py-5">
      //     <Col sm={11}>
      //       <Button color="success" onClick={(e) => handleInfoUpdate(e)}>
      //         Update
      //       </Button>
      //     </Col>
      //     <Col sm={1}>
      //       <Button
      //         color="danger"
      //         onClick={(event) => handleInfoDelete(event)}
      //       >
      //         Delete
      //       </Button>
      //     </Col>
      //   </InputGroup>
    )}
  </Form>
</Container>;
