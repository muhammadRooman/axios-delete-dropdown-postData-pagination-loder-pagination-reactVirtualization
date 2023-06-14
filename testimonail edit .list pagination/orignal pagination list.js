import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { deleteMember } from "./TestimonialManagement.action";
import FullPageLoader from "components/FullPageLoader/FullPageLoader";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import localeInfo from "rc-pagination/lib/locale/en_US";
import moment from "moment";
import { ENV } from "../../config/config";
import axios from "axios";
import { Link } from "react-router-dom";
import Notifications from "react-notify-toast";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Modal,
} from "react-bootstrap";

const TestimonialManagement = (props) => {
  const [selectedMessage, setSelectedMessage] = useState("");
  const [testimonial, setTestimonial] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [userAuthenticData, setUserAuthenticData] = useState(null);
  const [delModalCheck, setDelModalCheck] = useState(false);
  const [delId, selDelId] = useState(null);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(true);
  const handleClose = () => setShow(false);

  //GET Method used
  async function FetchData(qs) {
    let url = `${ENV.url}testimonial`;
    url += `?page=${page}`;
    const response = await axios.get(`${url}`);
    setTestimonial(response.data.data);
    setPagination(response?.data?.pagination);
  }

  useEffect(() => {
    FetchData(page);
  }, [page]);

  const PageHandle = async (page) => {
    // const params = {};
    setPage(page);
    setLoader(true);
    // const qs = ENV.objectToQueryString({ ...params, page });
  };

  //If admin Want to show message
  const handleShow = (member) => {
    setSelectedMessage(member.message);
    setShow(true);
  };

  useEffect(() => {
    if (ENV.getUserKeys("encuse")) {
      let obj = ENV.getUserKeys();
      setUserAuthenticData(obj);
    }
  }, []);

  useEffect(() => {
    if (userAuthenticData) {
      setLoader(false);
    }
  }, [userAuthenticData]);

  useEffect(() => {
    if (testimonial) {
      setLoader(false);
    }
  }, [testimonial]);

  //Delete Testimonial
  const deleteTestimonial = async () => {
    setDelModalCheck(false);
    try {
      await props.deleteMember(delId);
      setLoader(true);
      const updatedTestimonial = testimonial.filter(
        (member) => member._id !== delId
      );
      setTestimonial(updatedTestimonial);
      if (updatedTestimonial.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        FetchData(page);
      }
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  return (
    <>
      {loader ? (
        <FullPageLoader />
      ) : (
        <div>
          <Container fluid>
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to={"/dashboard"}>Dashboard / </Link>
                <Link to={"/testimonial-management"}>Testimonial / </Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Notifications />
            <Row>
              <Col md="12" className="p_0">
                <Card className="table-big-boy">
                  <div className="d-block  d-sm-flex justify-content-between align-items-center register-users">
                    <Card.Title as="h4">Testimonial</Card.Title>
                    <Link to={`/testimonial/addNewTestimonial`}>
                      <Button className="yellow-bg m-0 custom_line_height">
                        <span>Add Testimonial</span>
                      </Button>
                    </Link>
                  </div>
                  <Card.Body className="table-full-width">
                    <div className=" table-responsive">
                      <Table className="table-striped w-full">
                        <thead className="testimonail_table_head">
                          <tr>
                            <th className="text-center td-start">Sr#</th>
                            <th className="td-name  edit_testimonia_min">
                              Name
                            </th>
                            <th className="td-email edit_testimonia_min">
                              Message
                            </th>
                            <th className="td-email edit_testimonia_min">
                              Rating
                            </th>
                            {/* {/* <th className="td-created">Created At</th> */}
                            <th className="td-created edit_testimonia_min">
                              Status
                            </th>
                            <th className="td-actions edit_testimonia_min">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {testimonial && testimonial.length ? (
                            testimonial.map((member, index) => {
                              return (
                                <tr key={index}>
                                  <td className="td-start text-center">
                                    {" "}
                                    {pagination &&
                                      pagination.limit * pagination.page -
                                        pagination.limit +
                                        index +
                                        1}
                                  </td>
                                  <td className="td-name">{member?.name}</td>
                                  <td className="td-name">
                                    {member?.message.length > 30
                                      ? `${member.message.substring(
                                          0,
                                          30
                                        )} ....`
                                      : member.message}
                                  </td>
                                  <td className="td-name">{member?.rating}</td>
                                  {/* <td className="td-created">
                                    {member.createdAt
                                      ? moment(member.createdAt).format(
                                          "DD-MM-YYYY "
                                        )
                                      : "N/A"}
                                  </td> */}
                                  <td className="td-status">
                                    <span
                                      className={`text-white ${
                                        member.status
                                          ? `bg-success custom_success`
                                          : `bg-danger `
                                      }`}
                                    >
                                      {member.status ? "Active" : "Inactive"}
                                    </span>
                                  </td>
                                  <td className="d-flex testimonial_actions_border">
                                    {/* <Button
                                      className={
                                        member?.status
                                          ? "btn-dangerone mr-3"
                                          : "btn-successone mr-3"
                                      }
                                      onClick={() =>
                                        handleStatusChange(
                                          !member?.status,
                                          member._id,
                                          index
                                        )
                                      }
                                    >
                                      {member?.status ? "Inactive" : "Active"}
                                    </Button> */}
                                    {/* <Button
                                      variant="primary"
                                      onClick={() => handleShow(member)}
                                    >
                                      Details
                                    </Button> */}
                                    <div className="td-actions d-flex edit_testimonial_action ">
                                      <OverlayTrigger
                                        overlay={
                                          <Tooltip id="tooltip-436082023 ">
                                            Update
                                          </Tooltip>
                                        }
                                      >
                                        <Link
                                          to={`/testimonial/edit/${member._id}`}
                                        >
                                          <Button
                                            className="btn-link btn-xs mr-3"
                                            type="button"
                                            variant="warning"
                                          >
                                            <i className="fas fa-edit"></i>
                                          </Button>
                                        </Link>
                                      </OverlayTrigger>

                                      <OverlayTrigger
                                        overlay={
                                          <Tooltip id="tooltip-481441726">
                                            Remove
                                          </Tooltip>
                                        }
                                      >
                                        <Button
                                          className="btn-link btn-xs"
                                          onClick={() => {
                                            setDelModalCheck(true);
                                            selDelId(member._id);
                                          }}
                                          variant="danger"
                                        >
                                          <i className="fas fa-times"></i>
                                        </Button>
                                      </OverlayTrigger>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="9" className="text-center">
                                <span className="no-data-found d-block">
                                  No testimonial found
                                </span>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header
                          className="TestimonialMessageDetails"
                          closeButton
                        >
                          <Modal.Title>Message Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{selectedMessage}</Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    {pagination && testimonial.length > 0 && (
                      <Pagination
                        className="m-3"
                        defaultCurrent={1}
                        pageSize={pagination.limit} // Use pagination.totalPages as the pageSize value
                        current={pagination.page} // current active page
                        total={pagination.totalCount}
                        onChange={PageHandle}
                        locale={localeInfo}
                      />
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}

      {delModalCheck && (
        <Modal show={delModalCheck} onHide={() => setDelModalCheck(false)}>
          <Modal.Header closeButton className="cross_btn">
            <Modal.Title className="yellow-color delete-tag mb-4 delete_btn_tag">
              Are you sure you want to delete this Testimonial?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              className="yellow-bg save-btn mr-3"
              variant="primary"
              onClick={() => setDelModalCheck(false)}
            >
              No
            </Button>
            <Button
              variant="danger"
              onClick={deleteTestimonial}
              className="save-btn"
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  error: state.error,
  memberships: state.memberships,
});
export default connect(mapStateToProps, {
  deleteMember,
})(TestimonialManagement);
