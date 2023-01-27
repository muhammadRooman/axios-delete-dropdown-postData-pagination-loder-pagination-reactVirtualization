/* eslint-disable */
// __ common components __ //
import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Container, Table, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "views/Breadcrumbs/Breadcrumbs";

// __ Third party components __ //
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// __ ListQuestionnaire __ //
const ListQuestionnaire = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [modelName, setModelName] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState();
  const [questionnaireList, setQuestionnaireList] = useState([]);
  const [editDetail, setEditDetail] = useState({});
  const [questionnaireName, setQuestionnaireName] = useState({});
  const [changeNameEdit, setChangeNameEdit] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  //PATCH / EDIT  Questionnaire Name
  const saveChangesHandler = async (item) => {
    try {
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/admin/questionnaire`,
        {
          id: questionnaireName._id,
          update: {
            name: changeNameEdit,
          },
        }
      );
      getQuestionnaireList();
      setShowEdit(false);
      console.log("success");
    } catch (error) {
      setShowEdit(false);
    }
  };

  const editQuestionnaireHandler = (item) => {
    setEditDetail(item);
    console.log("items", item);
    setQuestionnaireName(item);
    console.log("questionnaireName ID", questionnaireName._id);
    setShowEdit(true);
  };

  //axios GET Method
  const getQuestionnaireList = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/admin/questionnaire/list`
      );
      setQuestionnaireList(res.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getQuestionnaireList();
  }, []);

  //axios Delete Method , Delete Questionnaire  with id
  const deleteQuestionnaire = async () => {
    try {
      const resp = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/admin/questionnaire/${questionnaireList[deleteIndex]._id}`
      );
      let questionnaire = questionnaireList.filter(
        (item, index) => deleteIndex != index
      );
      setQuestionnaireList([...questionnaire]);
      toast.error(resp.data.message);
      setShow(false);
    } catch (e) {
      console.log("e", e.message);
    }
  };

  //loader pagination
  // const handleScroll = () => {
  //   if (listInnerRef.current) {
  //     const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
  //     if (scrollTop + clientHeight === scrollHeight) {
  //       console.log("scrolling down");
  //       setPagination({ ...pagination, page: pagination.page + 1 });
  //     }
  //   }
  // };

  return (
    <div>
      {/* Delete Questionnaire Modal  */}
      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Questioner</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete {modelName} ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteQuestionnaire}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* EDIT / PATCH MODAL  */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Questionnaire Name </Modal.Title>
        </Modal.Header>
        <div className="editModel">
          <Form.Label>Questionnaire Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={editDetail.name}
            onChange={(e) => setChangeNameEdit(e.target.value)}
          />
        </div>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChangesHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Breadcrumbs questionnaire={"Questionnaires"} />
        <Card className="list_campaign">
          <Card.Title as="h2">List Questionnaire </Card.Title>
          <Button
            className="createNewCompaigns"
            onClick={() => navigate(`/admin/questionnaires/new`)}
          >
            New
          </Button>
          <div
            className="table-responsive list_campaign_table"
            // onScroll={handleScroll}
            // ref={listInnerRef}
          >
            <Table striped bordered hover className="phone_number_scetion">
              <thead>
                <tr className="phone_number_credential">
                  <th className="">id</th>
                  <th className="w-50">Questionnaire Name</th>
                  <th className="">Created at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {questionnaireList.length ? (
                <tbody>
                  {questionnaireList?.map((ele, index) => {
                    return (
                      <tr key={ele.id}>
                        <td>{index + 1}</td>
                        <td>{ele?.name}</td>
                        <td>{moment(ele?.createdAt).format("DD-MM-YYYY")}</td>
                        <td>
                          <button
                            onClick={() => editQuestionnaireHandler(ele)}
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
                            onClick={() => {
                              setDeleteIndex(index);
                              setShow(true);
                              setModelName(ele?.name);
                            }}
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
                <td colSpan={4}>
                  <p className="no_record">"Record not found"</p>
                </td>
              )}
            </Table>
          </div>
        </Card>
        <ToastContainer
          autoClose={1200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    </div>
  );
};

export default ListQuestionnaire;
