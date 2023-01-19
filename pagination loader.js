/* eslint-disable */
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import Table from "react-bootstrap/Table";
import { Navigate, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Loader from "views/Loader/Loader";
import "../../assets/css/styles.css";
import MyComponent from "./MyComponent";
const ListCampaign = () => {
  //pagination state start
  const [total, setTotal] = useState();
  const [pagination, setPagination] = useState({
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  //pagination state end
  const navigate = useNavigate();
  const [allCampaigns, setAllCampaigns] = useState([]);
  const listInnerRef = useRef();

  //Delete one campaign data in list
  const handleDelete = (ele, index) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const resp = await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/admin/template/${ele.templates}`
              );
              setAllCampaigns((data) => {
                return data.filter((user) => user.template !== index);
              });
            } catch (error) {
              console.log("error", error.message);
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };
  const clickHandle = () => {
    navigate(`/admin/New_Campaign`);
  };

  const fetchMailCount = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin//campaign/list?page=${
          pagination?.page ?? 1
        }`
      )
      .then((response) => {
        setAllCampaigns([...allCampaigns, ...response.data.AllCampaigns]);
        setTotal(response.data.pagination.pages);
        console.log(total);
        console.log("total pages", response.data.pagination.pages);
      })
      .catch(() => {
        console.log("Something went wrong...");
      });
  };
  //pagination scroll start
  const handleScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        console.log("scrolling down");
       setPagination({ ...pagination, page: pagination.page + 1 });
      }
    }
  };
  useEffect(() => {
    fetchMailCount();
  }, [pagination?.page]);
  //pagination scroll end
  return (
    <div>
      <Container>
        <Card className="list_campaign">
          <h2 style={{ textAlign: "center" }}>List Campaigns</h2>
          <Button className="createNewCompaigns" onClick={clickHandle}>
            Create New Campaigns
          </Button>
          <div
            className="table-responsive list_campaign_table"
            onScroll={handleScroll}
            ref={listInnerRef}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Numbers</th>
                  <th>Templates</th>
                  <th>Leads</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {allCampaigns.length ? (
                <tbody>
                  {allCampaigns?.map((ele, index) => {
                    return (
                      <tr key={ele.id}>
                        <td>{index + 1}</td>
                        <td>{ele?.numbers}</td>
                        <td>{ele?.templates}</td>
                        <td>{ele?.leads}</td>

                        <td>
                          {/* {nav && <Navigate to={`/admin/edituser/${id}`} />} */}
                          <button
                            // onClick={() => handleEdit(user._id)}
                            className="mr-1 editButton"
                            style={{
                              border: "solid 2px green",
                            }}
                          >
                            <i
                              className="fas fa-edit"
                              style={{ color: "green" }}
                            ></i>
                          </button>

                          <button
                            onClick={() => handleDelete(ele)}
                            style={{
                              border: "solid 2px red",
                            }}
                          >
                            <i
                              className="fas fa-trash"
                              style={{ color: "red" }}
                            ></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : (
                <td colSpan={5}>
                  <p className="no_record">Record not found</p>
                </td>
              )}
            </Table>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default ListCampaign;
