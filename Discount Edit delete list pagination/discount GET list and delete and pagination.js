import React, { useEffect, useState } from "react";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import FullPageLoader from "components/FullPageLoader/FullPageLoader";
import moment from "moment";
import axios from "axios";
import { ENV } from "../../config/config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {
  Table,
  OverlayTrigger,
  Row,
  Button,
  Col,
  Card,
  Tooltip,
  Modal,
  Form,
} from "react-bootstrap";

const DiscountManagement = () => {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [loader, setLoader] = useState(true);
  const [discount, setDiscount] = useState([]);
  const [delId, selDelId] = useState(null);
  const [delModalCheck, setDelModalCheck] = useState(false);

  // Get method
  async function getDiscountData(qs) {
    let url = `${ENV.url}discount`;
    url += `?page=${page}`;
    const response = await axios.get(`${url}`);
    setDiscount(response.data.data);
    setPagination(response?.data?.pagination);
  }

  useEffect(() => {
    getDiscountData(page);
  }, [page]);

  const PageHandle = async (page) => {
    setPage(page);
    setLoader(true);
  };

  // Delete Method
  const deleteDiscount = async () => {
    setDelModalCheck(false);
    try {
      await axios.delete(`${ENV.url}discount/${delId}`);
      toast.success("Discount deleted");
      setLoader(true);
      const updatedDiscount = discount.filter((user) => user._id !== delId);
      setDiscount(updatedDiscount);
      if (updatedDiscount.length === 0 && page > 1) {
        setPage(page - 1);
      } else {
        getDiscountData(page);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
 {loader ? (
        <FullPageLoader />
      ) : (
      <div className="container-fluid">
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={"/dashboard"}>Dashboard / </Link>
            <Link to={"/discount"}>Discount /</Link>{" "}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Row>
          <Col md="12">
            <Card className="table-big-boy discount_management">
              <Card.Body className="table-full-width">
                <div className="d-block  d-sm-flex justify-content-between align-items-center add-categories">
                  <Card.Title as="h4">Discount</Card.Title>
                  <Link to={`/discount/addNewDiscount`}>
                    <Button className="yellow-bg m-0 custom_line_height">
                      <span>Add Discount</span>
                    </Button>
                  </Link>
                </div>
                <div className=" table-responsive">
                  <Table className="table-striped table-hover w-full">
                    <thead>
                      <tr>
                        <th className="td-start text-center">Sr#</th>
                        <th className="user_management_min_wid">Name</th>
                        {/* <th className="user_management_min_wid">Description</th> */}
                        {/* <th>Discount Type</th> */}
                        <th className="user_management_min_wid">Percentage</th>
                        <th className="user_management_min_wid">Start Date</th>
                        <th className="user_management_min_wid">End Date</th>
                        <th className="user_management_min_wid">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {discount && discount.length ? (
                        discount.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td className="td-start text-center">
                                {pagination &&
                                  pagination.limit * pagination.page -
                                    pagination.limit +
                                    index +
                                    1}
                              </td>

                              <td className="td-name">{item?.name}</td>

                              {/* <td className="td-description">
                                    {item?.description.length > 50
                                      ? `${item.description.substring(
                                          0,
                                          50
                                        )} ....`
                                      : item.description}
                                  </td> */}
                              {/* <td className="td-discountType">
                              {item.discountType}
                            </td> */}
                              <td className="td-resident">{item.value}</td>
                              {/* <td className="td-status">
                                <span className={`text-white  ${user.status ? `bg-success` : `bg-danger`}`}>
                                    {user.status ? "active" : "inactive"}
                                </span>
                            </td> */}
                              <td className="td-date">
                                {moment(item.startDate).format("MM-DD-YYYY")}
                              </td>
                              <td className="td-date">
                                {moment(item.endDate).format("MM-DD-YYYY")}
                              </td>
                              <td className="td-actions">
                                <div className="d-flex">
                                  {/* {userAuthenticData?.permissionId?.adminEdit ===
                                true ? ( */}
                                  <OverlayTrigger
                                    overlay={
                                      <Tooltip id="tooltip-436082023">
                                        Update
                                      </Tooltip>
                                    }
                                    // placement="left"
                                  >
                                    <Link to={`/discount/edit/${item._id}`}>
                                      <Button
                                        className="btn-link btn-xs"
                                        type="button"
                                        variant="warning"
                                        //   onClick={() => handleEdit(item)}
                                        // onClick={() => {
                                        //     setEditForm({
                                        //         ...editForm,
                                        //         profileImage: user.profileImage,
                                        //         username: user.username,
                                        //         email: user.email,
                                        //         phone: user.phone,
                                        //         address: user.address,
                                        //         status: user.status,
                                        //         _id: user._id,
                                        //         permissionId: user?.permissionData?._id,
                                        //     })
                                        //     setEditShow(true)
                                        // }}
                                      >
                                        <i className="fas fa-edit"></i>
                                      </Button>
                                    </Link>
                                  </OverlayTrigger>
                                  {/* ) : (
                                ""
                            )} */}
                                  {/* {userAuthenticData?.permissionId?.adminDelete ===
                                true ? ( */}
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
                                        selDelId(item._id);
                                      }}
                                      // onClick={() => {
                                      //     setDelModalCheck(true)
                                      //     selDelId(user._id)
                                      // }}
                                      variant="danger"
                                    >
                                      <i className="fas fa-times"></i>
                                    </Button>
                                  </OverlayTrigger>
                                  {/* ) : (
                                        ""
                                    )} */}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            <span className="no-data-found d-block">
                              No discounts found
                            </span>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
                {pagination && discount.length > 0 && (
                  <Pagination
                    className="m-3"
                    defaultCurrent={1}
                    pageSize={pagination.limit} // Use pagination.totalPages as the pageSize value
                    current={pagination.page} // current active page
                    total={pagination.totalCount} // total count
                    onChange={PageHandle}
                    locale={localeInfo}
                  />
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      )}
      {delModalCheck && (
        <Modal show={delModalCheck} onHide={() => setDelModalCheck(false)}>
          <Modal.Header closeButton>
            <Modal.Title className="yellow-color delete-tag mb-4">
              Are you sure you want to delete this discount?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              className="save-btn yellow-bg mr-3"
              variant="primary"
              onClick={() => setDelModalCheck(false)}
            >
              No
            </Button>
            <Button
              variant="danger"
              onClick={deleteDiscount}
              className="save-btn "
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default DiscountManagement;
