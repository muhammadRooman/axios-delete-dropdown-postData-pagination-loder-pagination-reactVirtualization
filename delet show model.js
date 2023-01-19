/* eslint-disable */
import React from "react";
import Table from "react-bootstrap/Table";
// import  {confirmAlert} from "react-confirm-alert";

import Modal from 'react-bootstrap/Modal';
import { Container, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const ListTemplate = () => {
  const [show, setShow] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (item,index) =>{
     setDeleteIndex(index)
     setShow(true)
    };
  const [listTemplate, setListTemplate] = useState([])
  useEffect(() => {
    const fetchListTemplate = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/template/list`
        );
        setListTemplate(res.data.data.data);
        console.log(listTemplate);
      } catch (error) {
        console.log(error, "error");
      }
    };
    fetchListTemplate();
  }, []);

  //Delete one campaign data in list
  const handleDelete = async () => {

   try {
      const resp = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/admin/template/${listTemplate[deleteIndex].name}`
        
      );
      let templates = listTemplate.filter((item,index)=>deleteIndex!=index)
      setListTemplate([...templates])
      handleClose()
    } catch (error) {
      console.log("error", error.message);
    }

  
  
    // confirmAlert({
    //   title: "Confirm to Delete",
    //   message: "Are you sure to do this.",
    //   buttons: [
    //     {
    //       label: "Yes",
    //       onClick: async () => {
    //         try {
    //           const resp = await axios.delete(
    //             `${process.env.REACT_APP_BASE_URL}/admin/template/${items.name}`
                
    //           );
    //           setAllCampaigns((data) => {
    //             return data.filter((user) => user.template !== index);
    //           });
    //           console.log(resp)
    //         } catch (error) {
    //           console.log("error", error.message);
    //         }
    //       },
    //     },
    //     {
    //       label: "No",
    //     },
    //   ],
    // });
  };

  return (
    <div>
       <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          I will not close if you click outside me. Don't even try to press
          escape key.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>Understood</Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Card className="list_template">
          <h2 style={{ textAlign: "center" }} className="mb-4">List Template</h2>
          <div>
          
          </div>
          <Table striped bordered hover>
          <thead>
              <tr>
                <th>Name</th>
                <th>category</th>
                <th>status</th>
                <th>Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {listTemplate?.map((items,index) => {
                return (
                  <>
                    <tr>
                      <td>{items.name}</td>
                      <td>{items.category}</td>
                      <td>{items.status}</td>
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
                          onClick={() =>handleShow(items,index)}
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
                  </>
                );
              })}
            </tbody>
            
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default ListTemplate;
