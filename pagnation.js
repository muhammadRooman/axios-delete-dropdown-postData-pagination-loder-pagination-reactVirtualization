/* eslint-disable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert"; // Import
import Table from "react-bootstrap/Table";
import { Navigate, useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate'
import Loader from "views/Loader/Loader";
import "../../assets/css/styles.css";
import MyComponent from "./MyComponent";
const ListCampaign = () => {
  //pagination state start
  const [page,setPage]=useState()
  const [pagination, setPagination] = useState({
    page: "1",
  });
  
  const [loading, setLoading] = useState(false);
  //pagination state end
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const [allCampaigns, setAllCampaigns] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/admin/campaign/get")
  //     .then((res) => {
  //       setAllCampaigns(res.data.AllCampaigns);
  //     })
  //     .catch((error) => {
  //       console.log("errors", error);
  //     });
  // }, []);

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


  //pagination
  useEffect(() => {
    setLoading(true)
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMailCount();
  }, [pagination?.page]);
  const handlePageChange = (e) => {
    setPagination({ ...pagination, page: e.selected + 1 });
  };
 
  const fetchMailCount = () => {
    // setLoading(true)
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin/campaign/get?page=${pagination.page ?? ""}`
        
      )
      .then((response) => {
        setAllCampaigns(response.data.AllCampaigns);
        console.log(response.data.pagination.total)
        setPage(response.data.pagination.pages)
    setLoading(false)
      })
      .catch(() => {
        setLoading(false);
        console.log("Something went wrong...");
      });
  };

  return (
    <div>
      <Container>
        <Card>
          <h2 style={{ textAlign: "center" }}>List Campaigns</h2>
          <Button className="createNewCompaigns" onClick={clickHandle}>
            Create New Campaigns
          </Button>
          <div className="table-responsive">
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
                      <tr>
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
                <p>Recourd not found</p>
              )}
            </Table>
          </div>
//install npm i react-paginate
          <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        pageCount={page ?? ""}
        marginPagesDisplayed={2}
        previousLabel="< Previous"
        renderOnZeroPageCount={null}
        containerClassName={'pagination justify-content-center'}
        pageLinkClassName={'page-link'}
        previousClassName={'page-item'}
        previousLinkClassName={'page-link'}
        nextClassName={'page-item'}
        nextLinkClassName={'page-link'}
        breakClassName={'page-item'}
        breakLinkClassName={'page-link'}
        activeClassName={'active'}
      />
        </Card>
      </Container>
    </div>
  );
};

export default ListCampaign;










