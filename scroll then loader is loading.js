/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Container, Table, Modal } from "react-bootstrap";

// __ Helper/Components __ //
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs";

// __ Third party components __ //
import ReactPaginate from "react-paginate";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import Notifications, { notify } from "react-notify-toast";
import axios from "axios";

//====Campaigns list======
const List = () => {
  const [show, setShow] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();
  const handleClose = () => setShow(false);
  const handleShow = (item, index) => {
    setDeleteIndex(index);
    setShow(true);
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [allCampaigns, setAllCampaigns] = useState([]);
  const [launchData, setLaunchData] = useState([]);
  //Loader pagination states
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [wasLastList, setWasLastList] = useState(false);
  const listInnerRef = useRef();

  //=== Delete one campaign data in list ===
  const handleDelete = async () => {
    try {
      const resp = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/admin/template/${allCampaigns[deleteIndex]._id}`
      );
      let Campaigns = allCampaigns.filter(
        (item, index) => deleteIndex != index
      );
      setAllCampaigns([...Campaigns]);
      handleClose();
    } catch (error) {
      console.log("error", error.message);
    }
  };

  //==loader==
  useEffect(() => {
    setLoading(true);
  }, []);

  //=== Function Get data through API  ===
  const campaignList = async () => {
    try {
      currPage == 1 && setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/campaign/list?page=${currPage}`
      );
      if (!response.data.AllCampaigns) {
        setWasLastList(true);
        console.log("no further campaigns ", response.data.message);
        toast.success(response.data.message);
        return;
      }
      setPrevPage(currPage);
      setAllCampaigns([...allCampaigns, ...response.data.AllCampaigns]);
      console.log("Response Campaign get Data", response.data.AllCampaigns);
      console.log("total pages", response.data.pages);
      console.log("last message", response.data.message);
      setLoading(false);
      notify.show("Campaigns has been retrieved successfully", "success", 3500);
    } catch (error) {
      console.log(error);
      console.log(error.message);
      setLoading(false);
    }
  };

  //== launch Campaigns
  const launchHandler = async (item, index) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/campaign/launch/${item._id}`
      );
      setLaunchData(res.data.data);
      setLoading(false);
      console.log("campaign Data", res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error, "error");
    }
  };

  //=== scroll the loader will be run  ===//
  const onScroll = () => {
    console.log("scroll");
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      console.log("scrollTop", scrollTop);
      console.log("scrollHeight", scrollTop);
      console.log("clientHeight", scrollTop);
      if (
        scrollTop + clientHeight === scrollHeight ||
        scrollTop + clientHeight + 0.5 === scrollHeight ||
        scrollTop + clientHeight - 0.5 === scrollHeight
      ) {
        setCurrPage(currPage + 1);
      }
      console.log("page", currPage);
    }
  };

  useEffect(() => {
    if (!wasLastList && prevPage !== currPage) {
      campaignList();
    }
  }, [currPage, wasLastList, prevPage, launchData, allCampaigns]);

  return (
    <div>
      <Notifications />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Campaign</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete this campaign?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Breadcrumbs campaign={"Campaigns"} />
        <Card className="list_campaign">
          <Card.Title as="h2">List Campaigns </Card.Title>
          <Button
            className="createNewCompaigns new_create_campaign"
            onClick={() => navigate(`/admin/campaign/new`)}
          >
            New
          </Button>
          <div
            onScroll={onScroll}
            ref={listInnerRef}
            className="table-responsive list_campaign_table"
          >
            <Table striped bordered hover className="phone_number_scetion">
              <thead>
                <tr className="phone_number_credential">
                  <th>#</th>
                  <th>Name</th>
                  <th>Numbers</th>
                  <th>Questionnaires</th>
                  <th>Leads</th>
                  <th>Created At</th>
                  <th>Launch</th>
                </tr>
              </thead>
              {loading ? (
                <div className="loader campaign_list_loader"></div>
              ) : allCampaigns?.length ? (
                <tbody>
                  {allCampaigns?.map((ele, index) => {
                    return (
                      <tr key={ele.id}>
                        <td>{index + 1}</td>
                        <td>{ele?.name ? ele?.name.toUpperCase() : "-"}</td>
                        <td>
                          {ele?.numbers ? ele?.numbers.toUpperCase() : "-"}
                        </td>
                        <td>
                          {ele?.questionnaire?.name
                            ? ele?.questionnaire?.name.toUpperCase()
                            : "-"}
                        </td>
                        <td>
                          {ele?.leads?.name
                            ? ele?.leads?.name.toUpperCase()
                            : "-"}
                        </td>
                        <td>{moment(ele?.createdAt).format("DD-MM-YYYY")}</td>

                        <td>
                          {/* {nav && <Navigate to={`/admin/edituser/${id}`} />} */}
                          {/* <button
                            //  onClick={() => handleEdit(user._id)}
                            className="mr-1 editButton"
                            style={{
                              border: "solid 2px green",
                            }}
                          >
                            <i
                              className="fas fa-edit"
                              style={{ color: "blue" }}
                            ></i>
                          </button>

                          <button
                            className="trashbin"
                            onClick={() => handleShow(ele, index)}
                            style={{
                              border: "solid 2px red",
                            }}
                          >
                            <i
                              className="fas fa-trash"
                              style={{ color: "red" }}
                            ></i>
                          </button> */}
                          {/* Launch Campaigns button */}
                          {/* {buttonLoad?"pro": <Button  onClick={() => launchHandler(ele, index)}>Launch</Button>

                          } */}
                          <div onClick={() => launchHandler(ele, index)}>
                            <i class="fa-sharp fa-solid fa-paper-plane"></i>
                          </div>

                          {/* <i class="fa-solid fa-rocket-launch"></i> */}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <td colSpan={7}>
                  <p className="no_record">Record not found</p>
                </td>
              )}
            </Table>
          </div>
        </Card>
      </Container>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default List;
