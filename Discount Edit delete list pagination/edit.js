import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { ENV } from "../../config/config";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import moment from "moment";

const EditDiscountModal = () => {
  const history = useHistory();
  const [editDiscount, setEditDiscount] = useState(null);
  const [formErrors, setFormErrors] = useState({
    startDateError: "",
    endDateError: "",
  });

  const { id } = useParams();
  useEffect(() => {
    async function FetchData() {
      let url = `${ENV.url}discount/${id}`;
      const response = await axios.get(`${url}`);
      setEditDiscount(response.data.data);
    }
    FetchData();
  }, []);

  // New Updated list
  var editData = {
    _id: editDiscount?._id,
    name: editDiscount?.name,
    description: editDiscount?.description,
    startDate: editDiscount?.startDate,
    endDate: editDiscount?.endDate,
    value: editDiscount?.value,
  };
  
  async function UpdateData() {
    try {
      const res = await axios.put(`${ENV.url}discount/${id}`, editData);
      setFormErrors({
        startDateError: "",
        endDateError: "",
      });
      if (res.data.success) {
        toast.success(res.data.message);
        history.push("/discount");
        setEditDiscount(res.data.data);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setFormErrors({
          ...formErrors,
          nameError: "Discount name already exists",
        });
      } else {
        console.error("Error:", error);
      }
    }
  }

  const submitEdit = (e) => {
    e.preventDefault();
    let isValid = true;
    const errors = {
      startDateError: "",
      endDateError: "",
    };

    if (!editDiscount.endDate) {
      errors.endDateError = "End Date should not be empty";
      isValid = false;
    } else if (
      editDiscount.startDate &&
      editDiscount.endDate &&
      moment(editDiscount.endDate).isBefore(editDiscount.startDate)
    ) {
      errors.endDateError = "End Date cannot be earlier than Start Date";
      isValid = false;
    }

    if (!editDiscount.value) {
      errors.valueError = "Value should not be empty (excluding 'e' or 'E')";
      isValid = false;
    }

    const currentDate = new Date();
    const startDate = new Date(editDiscount.startDate);

    if (startDate < currentDate) {
      errors.startDateError =
        "Start Date cannot be earlier than the current date";
      isValid = false;
    }

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    UpdateData();
  };

  const BackButton = () => {
    history.push(`/discount`);
  };
  return (
    <div>
      {" "}
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/discount"}>Discount</Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Update Discount</Breadcrumb.Item>
      </Breadcrumb>
      <div className="">
        <Form
          onSubmit={(e) => {
            submitEdit(e);
          }}
        >
          {/* <Modal.Header closeButton> */}
          <div className="new_discount_wraper">
            <div className="update_discount_screen card">
              <h5 className="card-title generic_title">Update Discount</h5>
              <div className="generic_padding">
                <div className="row">
                  <div className="col-lg-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Name<sup className="text-danger">*</sup>
                      </Form.Label>
                      <Form.Control
                        autoComplete="off"
                        type="text"
                        name="name"
                        value={editDiscount?.name}
                        onChange={(e) => {
                          setEditDiscount({
                            ...editDiscount,
                            name: e.target.value,
                          });
                        }}
                        pattern="^.{3,}$"
                        title="At least 3 letters are required"
                        required
                      />
                      <Form.Text className="text-muted validation ">
                        {formErrors.nameError}
                      </Form.Text>
                    </Form.Group>
                  </div>

                  {/* <Form.Group className="mb-3">
              <Form.Label>Discount Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Discount Type"
                name="Nationality"
                value={editDiscount?.discountType}
                // disabled={true}
                onChange={(e) => {
                  setEditDiscount({
                    ...editDiscount,
                    discountType: e.target.value,
                  });
                }}
              />
              <Form.Text className="text-muted validation ">
                {formErrors.discountTypeError}
              </Form.Text>
            </Form.Group> */}
                  <div className="col-lg-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        Percentage<sup className="text-danger">*</sup>
                      </Form.Label>
                      <Form.Control
                        autoComplete="off"
                        type="number"
                        name="value"
                        value={editDiscount?.value}
                        // disabled={true}
                        onChange={(e) => {
                          setEditDiscount({
                            ...editDiscount,
                            value: e.target.value,
                          });
                        }}
                        min={0}
                        required
                      />{" "}
                      <Form.Text className="text-muted validation ">
                        {formErrors.valueError}
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Form.Group className="mb-3 ">
                      <Form.Label>
                        Start Date<sup className="text-danger">*</sup>
                      </Form.Label>
                      <DatePicker
                        selected={
                          editDiscount?.startDate
                            ? moment(editDiscount?.startDate).toDate()
                            : null
                        }
                        placeholderText="Enter the Start date"
                        name="startDate"
                        className="form-control"
                        onChange={(date) => {
                          setEditDiscount({
                            ...editDiscount,
                            startDate: date
                              ? moment(date).format("YYYY-MM-DD")
                              : null,
                          });
                        }}
                        required
                      />
                      <Form.Text className="text-muted validation ">
                        {formErrors.startDateError}
                      </Form.Text>
                    </Form.Group>
                  </div>
                  <div className="col-lg-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        End Date<sup className="text-danger">*</sup>
                      </Form.Label>
                      <DatePicker
                        selected={
                          editDiscount?.endDate
                            ? moment(editDiscount?.endDate).toDate()
                            : null
                        }
                        placeholderText="Enter the End date"
                        name="endDate"
                        className="form-control"
                        onChange={(date) => {
                          setEditDiscount({
                            ...editDiscount,
                            endDate: date
                              ? moment(date).format("YYYY-MM-DD")
                              : null,
                          });
                        }}
                        required
                      />
                      <Form.Text className="text-muted validation ">
                        {formErrors.endDateError}
                      </Form.Text>
                    </Form.Group>
                  </div>
                </div>

                <div>
                  <label class="form-label">
                    Description<sup className="text-danger">*</sup>
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    name="short_name"
                    // disabled={true}
                    value={editDiscount?.description}
                    onChange={(e) => {
                      setEditDiscount({
                        ...editDiscount,
                        description: e.target.value,
                      });
                    }}
                    required
                  ></textarea>
                </div>
                <div className="edit_discount_btns">
                  <Button
                    className="backButton"
                    variant="primary"
                    onClick={BackButton}
                  >
                    Back
                  </Button>

                  <Button
                    variant="primary"
                    type="submit"
                    className="yellow-bg submit_btn"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditDiscountModal;
