import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { ENV } from "../../config/config";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const EditTestimonial = () => {
  const history = useHistory();
  const [editTestimonial, setEditTestimonial] = useState(null);
  const { id } = useParams();

  // Get Method used
  useEffect(() => {
    async function FetchData() {
      let url = `${ENV.url}testimonial/${id}`;
      const response = await axios.get(`${url}`);
      setEditTestimonial(response.data.data);
    }
    FetchData();
  }, []);

  // New Updated list
  var editData = {
    _id: editTestimonial?._id,
    name: editTestimonial?.name,
    message: editTestimonial?.message,
    rating: editTestimonial?.rating,
    status: editTestimonial?.status,
  };

  // Put Method
  const UpdateData = async () => {
    try {
      const res = await axios.put(`${ENV.url}testimonial/${id}`, editData);
      if (res.data.success) {
        toast.success(res.data.message);
        history.push(`/testimonial`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const submitEditTestimonial = (e) => {
    e.preventDefault();
    UpdateData();
  };

  const BackButton = () => {
    history.push(`/testimonial`);
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={"/testimonial"}>Testimonial</Link>{" "}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Update Testimonial</Breadcrumb.Item>
      </Breadcrumb>
      <div className="update_testimonial_wraper">
        <div className="update_testimonial card">
          <div className="">
            <Form
              onSubmit={(e) => {
                submitEditTestimonial(e);
              }}
            >
              {/* <Modal.Header closeButton> */}
              <h5 className="card-title  generic_title">Update Testimonial</h5>
              <div className="generic_padding">
                <div className="row">
                  <div className="col-lg-6">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        {" "}
                        Name<sup className="text-danger">*</sup>
                      </Form.Label>
                      <Form.Control
                        autoComplete="off"
                        type="text"
                        name="name"
                        value={editTestimonial?.name}
                        onChange={(e) => {
                          setEditTestimonial({
                            ...editTestimonial,
                            name: e.target.value,
                          });
                        }}
                        pattern="^.{3,}$"
                        title="At least 3 letters are required"
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-lg-6">
                    <div class="form-group">
                      <label for="rating">
                        Rating<sup className="text-danger">*</sup>
                      </label>
                      <select
                        id="rating"
                        className="form-control"
                        value={editTestimonial?.rating}
                        onChange={(e) => {
                          setEditTestimonial({
                            ...editTestimonial,
                            rating: e.target.value,
                          });
                        }}
                        name="rating"
                        required
                        onchange="handleRatingChange(event)"
                      >
                        <option value="">Select Rating</option>
                        <sup className="text-danger">*</sup>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                      <span
                        class="text-muted validation"
                        id="ratingError"
                      ></span>
                    </div>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Message<sup className="text-danger">*</sup>
                  </Form.Label>
                  <textarea
                    className="form-control"
                    type="text"
                    name="short_name"
                    value={editTestimonial?.message}
                    onChange={(e) => {
                      setEditTestimonial({
                        ...editTestimonial,
                        message: e.target.value,
                      });
                    }}
                    required
                  />
                </Form.Group>
                <Form.Group className="switch-wrapper mb-3">
                  <span className="d-block mb-2">Status</span>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="status"
                      checked={editTestimonial?.status ? true : false}
                      onChange={(e) => {
                        setEditTestimonial({
                          ...editTestimonial,
                          status: e.target.checked,
                        });
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                </Form.Group>
                <div className="update_testimonial_btns">
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
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTestimonial;
