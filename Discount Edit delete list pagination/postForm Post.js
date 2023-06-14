import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ENV } from "../../config/config";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
const AddNewDiscount = () => {
  const history = useHistory();
  const [addNewDiscount, setAddNewDiscount] = useState({
    name: "",
    description: "",
    value: "",
    startDate: "",
    endDate: "",
  });
  const [formErrors, setFormErrors] = useState({
    startDateError: "",
    endDateError: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Perform form validation
    let isValid = true;
    const errors = {
      endDateError: "",
    };

    // Validate end date
    if (addNewDiscount.endDate !== "" && addNewDiscount.startDate !== "") {
      const endDate = new Date(addNewDiscount.endDate);
      const startDate = new Date(addNewDiscount.startDate);

      if (endDate < startDate) {
        errors.endDateError = "End Date cannot be earlier than Start Date";
        isValid = false;
      }
    }

    const currentDate = new Date();
    const startDate = new Date(addNewDiscount.startDate);
    if (startDate < currentDate) {
      errors.startDateError =
        "Start Date cannot be earlier than the current date";
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    const url = `${ENV.url}discount`;
    try {
      const res = await axios.post(url, addNewDiscount);
      toast.success(res.data.message);
      history.push("/discount");
      // Clear the form after submission
      setAddNewDiscount({
        name: "",
        description: "",
        value: "",
        startDate: "",
        endDate: "",
      });
      setFormErrors({
        endDateError: "",
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setFormErrors({
          ...formErrors,
          nameError: "This name already exists",
        });
      } else {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    console.log("addNewDiscount", addNewDiscount);
  }, [addNewDiscount]);

  const BackButton = () => {
    history.push(`/discount`);
  };

  return (
    <div>
      <Form
        onSubmit={(e) => {
          handleFormSubmit(e);
        }}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={"/discount"}>Discount</Link>{" "}
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Add Discount</Breadcrumb.Item>
        </Breadcrumb>
        <div className="new_discount_wraper">
          <div className="add_new_discount card">
            <h1 className="card-title generic_title">Add New Discount </h1>
            <div className="generic_padding">
              <div className="row">
                <div className="col-lg-6">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>
                      Name<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={addNewDiscount.name}
                      autoComplete="off"
                      minLength={3}
                      onChange={(e) => {
                        setAddNewDiscount({
                          ...addNewDiscount,
                          name: e.target.value,
                        });
                      }}
                      pattern="^.{3,}$"
                      title="At least 3 letters are required"
                      required
                      name="name"
                    />
                  </Form.Group>
                </div>
                <div className="col-lg-6">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      Percentage<sup className="text-danger">*</sup>
                    </Form.Label>
                    <Form.Control
                      autoComplete="off"
                      type="number"
                      value={addNewDiscount.value}
                      required
                      onChange={(e) => {
                        setAddNewDiscount({
                          ...addNewDiscount,
                          value: e.target.value,
                        });
                      }}
                      min={0}
                      name="value"
                    />
                  </Form.Group>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      Start Date<sup className="text-danger">*</sup>
                    </Form.Label>
                    <DatePicker
                      selected={addNewDiscount.startDate}
                      name="startDate"
                      className="form-control"
                      onChange={(date) => {
                        const selectedDate = date.toISOString().split("T")[0];
                        const currentDate = new Date()
                          .toISOString()
                          .split("T")[0];
                        if (selectedDate >= currentDate) {
                          setAddNewDiscount({
                            ...addNewDiscount,
                            startDate: date,
                          });
                        }
                      }}
                      required
                    />
                    <Form.Text className="text-muted validation">
                      {formErrors.startDateError}
                    </Form.Text>
                  </Form.Group>
                </div>
                <div className="col-lg-6">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>
                      End Date<sup className="text-danger">*</sup>
                    </Form.Label>
                    <DatePicker
                      selected={addNewDiscount.endDate}
                      name="endDate"
                      className="form-control"
                      onChange={(date) => {
                        const selectedDate = date.toISOString().split("T")[0];
                        const currentDate = new Date()
                          .toISOString()
                          .split("T")[0];
                        if (selectedDate >= currentDate) {
                          setAddNewDiscount({
                            ...addNewDiscount,
                            endDate: date,
                          });
                        }
                      }}
                      required
                    />

                    <Form.Text className="text-muted validation">
                      {formErrors.endDateError}
                    </Form.Text>
                  </Form.Group>
                </div>
              </div>

              <div>
                <Form.Label>
                  Description<sup className="text-danger">*</sup>
                </Form.Label>
                <textarea
                  className="form-control"
                  value={addNewDiscount.description}
                  onChange={(e) => {
                    setAddNewDiscount({
                      ...addNewDiscount,
                      description: e.target.value,
                    });
                  }}
                  minLength={50}
                  maxLength={250}
                  title="Short description should be between 50 and 250 characters"
                  required
                ></textarea>
              </div>
              <div className="new_discount_btns">
                <Button
                  variant="primary"
                  onClick={BackButton}
                  className="back_btn"
                >
                  Back
                </Button>
                <Button variant="primary" type="submit" className="submit_btn">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddNewDiscount;
