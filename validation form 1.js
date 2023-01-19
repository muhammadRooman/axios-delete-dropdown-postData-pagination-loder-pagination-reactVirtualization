import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap-v5";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { validations } from "./indexJavaScript"; //import Validation function form indexJavaScript

const FormValidation = () => {
  const [month, setMonth] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "Jun",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [number, setNumber] = useState([]); //Date state
  const [year, setyear] = useState([]); //Year state
  console.log("month", month);
  //Automatically Date number generated for loop ,store For state Number
  useEffect(() => {
    for (let i = 1; i <= 31; i++) {
      number.push(i);
    }
  }, []);
  //Automatically Year  generated for loop ,store For state Year
  useEffect(() => {
    for (let i = 1996; i <= 2024; i++) {
      year.push(i);
    }
  }, []);
  //Month   generated for loop ,store For state Year

  const [error, setError] = useState({
    names: "",
    lname: "",
    email: "",
    phone: "",
    date: "",
    month: "",
    year: "",
    gender: "",
    password: "",
    conformPassword: "",
  });

  console.log("error", error); //error

  const [formData, setFormData] = useState([]);
  const [data, setData] = useState({
    names: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    conformPassword: "",
    date: "",
    month: "",
    year: "",
    gender: "",
  });

  console.log("ALL DATAAAAAAAAAAAAAAAAAaaa", data);
  const loginhandle = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    console.log("yes");
    console.log("data", data);
  };

  const Validation = (event) => {
    event.preventDefault();
    setFormData(data);

    setError({ ...validations(data) });
  };

  useEffect(() => {
    setFormData(data);
  });
  console.log("ALL DATA IS HERE", data);

  return (
    <div className="mt-5">
      <h1 style={{ textAlign: "center" }}>FORM VALIDATION</h1>
      <Container>
        <Form onSubmit={Validation}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className={
                error.names ? "boder" : !data.names ? "" : "bordergreen"
              }
              type="names"
              placeholder="Name"
              name="names"
              value={data.names}
              onChange={loginhandle}
            />
            <Form.Text className={`text errorCss `}>{error.names}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className={
                error.lname ? "boder" : !data.lname ? "" : "bordergreen"
              }
              type="lname"
              placeholder="Last Name"
              name="lname"
              value={data.lname}
              onChange={loginhandle}
            />
            <Form.Text className="text errorCss">{error.lname}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className={
                error.email ? "boder" : !data.email ? "" : "bordergreen"
              }
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={loginhandle}
            />{" "}
            <Form.Text className="text errorCss">{error.email}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              className={
                error.phone ? "boder" : !data.phone ? "" : "bordergreen"
              }
              type="phone"
              placeholder="Phone"
              name="phone"
              value={data.phone}
              onChange={loginhandle}
            />{" "}
            <Form.Text className="text errorCss">{error.phone}</Form.Text>
          </Form.Group>
          {/* Age   */}

          <Form.Group>
            <Form.Label>Age</Form.Label>
            <Row>
              <Col md={2}>
                <select
                  className={`Select ${
                    error.date ? "boder" : !data.date ? "" : "bordergreen"
                  }`}
                  onChange={(e) => {
                    data.date = e.target.value;
                  }}
                >
                  <option disabled selected value="" id="options" hidden>
                    Date
                  </option>

                  {number.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </select>
                <Form.Text className="text errorCss">{error.date}</Form.Text>
              </Col>
              <Col md={2}>
                <select
                  className={`Select ${
                    error.month ? "boder" : !data.month ? "" : "bordergreen"
                  }`}
                  onChange={(e) => {
                    data.month = e.target.value;
                  }}
                >
                  <option selected value="" hidden disabled>
                    Month
                  </option>
                  {month.map((items) => {
                    return <option value={items}>{items}</option>;
                  })}
                </select>
                <Form.Text className="text errorCss">{error.month}</Form.Text>
              </Col>
              <Col md={2}>
                <select
                  className={`Select ${
                    error.year ? "boder" : !data.year ? "" : "bordergreen"
                  }`}
                  onChange={(e) => {
                    data.year = e.target.value;
                  }}
                >
                  <option selected disabled value="" hidden>
                    Year
                  </option>
                  {year.map((items) => {
                    return <option value={items}>{items}</option>;
                  })}
                </select>
                <Form.Text className="text errorCss">{error.year}</Form.Text>
              </Col>
            </Row>

            {/* Gender   */}
            <Form.Label className="mt-4">Gender</Form.Label>
            <div class="form-check">
              <input
                onChange={(e) => (data.gender = e.currentTarget.value)}
                value="male"
                className={`form-check-input  ${
                  error.gender ? "boder" : !data.gender ? "" : ""
                }`}
                type="radio"
                name="gender"
                id="flexRadioDefault1"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                Male
              </label>
            </div>
            <div class="form-check">
              <input
                onChange={(e) => (data.gender = e.currentTarget.value)}
                value="female"
                className={`form-check-input  ${
                  error.gender ? "boder" : !data.gender ? "" : ""
                }`}
                type="radio"
                name="gender"
                id="flexRadioDefault2"
              />
              <label class="form-check-label" for="flexRadioDefault2">
                Female
              </label>
            </div>
            <Form.Text className="text errorCss">{error.gender}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3 mt-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className={
                error.password ? "boder" : !data.password ? "" : "bordergreen"
              }
              type="text"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={loginhandle}
            />{" "}
            <Form.Text className="text errorCss">{error.password}</Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Conform Password</Form.Label>
            <Form.Control
              className={
                error.conformPassword
                  ? "boder"
                  : !data.conformPassword
                  ? ""
                  : "bordergreen"
              }
              type="text"
              placeholder="Conform Password"
              name="conformPassword"
              value={data.conformPassword}
              onChange={loginhandle}
            />{" "}
            <Form.Text className="text errorCss">
              {error.conformPassword}
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default FormValidation;