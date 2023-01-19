import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import Row from "react-bootstrap/Row";
import { Navigate, useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import { validations } from "views/ValidationCode/Validation";
import "../../assets/css/styles.css";
import axios from "axios";


const NewQuestionnaire = () => {
  const navigate = useNavigate();
  const [allData, setAllData] = useState({});
  const [data, setData] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [disableBtnn, setDisableBtnn] = useState(false);
  const [questionName, setQuestionName] = useState("");
  const [selectTemplateArray, setSelectTemplateArray] = useState([]);
  const [templates, setTemplate] = useState([]);
  const [selectInputTemplateArr, setSelectInputTemplateArr] = useState([]);
  const [error, setError] = useState({
    selectTemplateArray:"",
   
  });
  const [selectTemplate, setSelectTemplate] = useState([
    "Home Template",
    "School Template",
    "University Template",
    "local Template ",
    "Collage Template",
  ]);

  //add new field on below
  const addInput = () => {
    // setDisableBtn(false);
    templates.push({
      type: "text",
      templateName: "",
      validations: {
        emailCheck: false,
        yes: false,
        optional: false,
        number: false,
        varchar: false,
        onlyAlphabet: false,
      },
    });
    selectInputTemplateArr.push({
      type: "text",
      templateName: "",
    });
    setSelectTemplateArray([...selectInputTemplateArr]);
if(questionName){

}

  };

  //validation on templates
  const clickHandling = (e, idx) => {
    const { name, checked } = e.target;
    templates[idx].validations[name] = checked;
    setTemplate([...templates]);
    setAllData({ name: questionName, templates });
    console.log("templates :::", templates);
  };

  //validation on templates end

  //Remove field on below
  const removeInput = (indx) => {
    const filteredArr = templates.filter((item, id) => indx !== id);
    setTemplate([...filteredArr]);
  };

  //Select Template
  const handleSelectTemplate = (i, event) => {
    templates[i].templateName = event.target.value;
    setTemplate([...templates]);

    // if(templates?.[templates?.length - 1]?.templateName){
    //   setDisableBtnn(false);
    // }
  };

  //submitButton or saveButton
  // const submitHandlerClick = async (e) => {
  //   console.log("add templ")
  //   setError({ ...validations(allData) });
  //   console.log("eeeeeee",error)
    
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/admin/questionnaire/create",
  //       allData
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const submitHandlerClick = async (e) => {
    setError({ ...validations(allData) });

    if (selectTemplateArray.length>0) {
      try {
        const response = await axios.post(
                "http://localhost:8080/admin/questionnaire/create",
                allData
              );

        if (response.status === 200) {
    //  toast.success("Successfully")
         console.log(response.status);
         navigate(`/admin/List_Questionnaire`);
        }
      } catch (error) {
        //  toast.error(error.message);
        console.log("error", error);
      }
    } else {
      // toast.error("Please Add Template");
      console.log("add templat")
    }
  };


  useEffect(()=>{

if(questionName.trim()){
  setDisableBtn(false)
}
  },[questionName,templates])

  useEffect(()=>{

    if(!questionName){
      setDisableBtnn(true)
    }
    else if(!templates?.[templates?.length - 1]?.templateName){
      setDisableBtnn(true)
      setDisableBtn(true)
    }
    else if(questionName){
      setDisableBtnn(false)
      setDisableBtn(false)
    }
      },[templates?.[templates?.length - 1]?.templateName])


  return (
    <div>
      <Container>
        {/* MODAL */}
        <Card className="custom_overall_card">
          <div style={{ textAlign: "center" }}>
            <h2 style={{ textAlign: "center" }} className="new_questionare">
              New Questionnaire
            </h2>
            <Form className="newQuestionnaireForm">
              <Dropdown className="main_questionaire">
                <div className="Questionnaire_Label add_questionaire">
                  <Form.Label>Questionnaire Name</Form.Label>
                </div>
                <div className="form_wrpaer lang_select_wraper">
                  <input
                    placeholder="Please add questionnaire"
                    autoFocus
                    autoComplete="off"
                    type="text"
                    name="name"
                    value={questionName}
                    className="dropDownSelect"
                    onChange={(e) => setQuestionName(e.target.value)}
                  />
                </div>
              </Dropdown>{" "}
              {templates.map((item, i) => {
                return (
                  <div key={i} className="mainNewQuestion">
                    <Dropdown>
                      <div className="Questionnaire_Label add_questionaire questionaire_template">
                        <Form.Label>{i + 1}: Add New Template</Form.Label>
                      </div>
                      <div className="form_wrpaer lang_select_wraper custom_select-wraper">
                        <select
                          name="name"
                          className="dropDownSelect custom_select_"
                          onChange={(event) => {
                            handleSelectTemplate(i, event);
                          }}
                          value={item.templateName}
                        >
                          <option className="bb" value="" hidden>
                            ---Select Template--
                          </option>

                          {selectTemplate.map((items, i) => (
                            <option key={i} value={items}>
                              {items}
                            </option>
                            
                          ))}
                        </select>{" "}  
                        <Button
                          variant="danger removeButton"
                          onClick={() => removeInput(i)}
                        >
                          Remove <i class="fa-solid fa-trash"></i>
                        </Button>
                      </div>
                    </Dropdown>{" "}
                    {/* validation on templates */}
                    {/* <ValidationOnTemplate  /> */}
                    <div className="custom_all_checkboxes">
                      <span className="validationOnTemplateHeading custom_vali_template">
                        Validation On Template:
                      </span>
                      <div className="rowValidation1">
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-4 col-6 yes_no_">
                            <input
                              type="checkbox"
                              id="vehicle2"
                              name="varchar"
                              checked={item?.validations?.varchar}
                              onClick={(e) => clickHandling(e, i)}
                            />
                            <label
                              htmlFor="vehicle2"
                              className="padding_left_6"
                            >
                              {" "}
                              varchar
                            </label>
                          </div>

                          <div className="col-lg-4 col-md-4 col-sm-4 col-6 yes_no_">
                            <input
                              type="checkbox"
                              id="vehicle3"
                              name="onlyAlphabet"
                              checked={item?.validations?.onlyAlphabet}
                              onClick={(e) => clickHandling(e, i)}
                            />
                            <label
                              htmlFor="vehicle3"
                              className="padding_left_6"
                            >
                              {" "}
                              onlyAlphabet
                            </label>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-6 yes_no_">
                            <input
                              type="checkbox"
                              id="vehicle4"
                              name="emailCheck"
                              checked={item?.validations?.emailCheck}
                              onClick={(e) => clickHandling(e, i)}
                            />
                            <label
                              htmlFor="vehicle4"
                              className="padding_left_6"
                            >
                              {" "}
                              Number
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4 col-md-4 col-sm-4 col-6 yes_no_">
                            <input
                              type="checkbox"
                              id="vehicle5"
                              name="number"
                              checked={item?.validations?.number}
                              onClick={(e) => clickHandling(e, i)}
                            />
                            <label
                              htmlFor="vehicle5"
                              className="padding_left_6"
                            >
                              {" "}
                              Email Check
                            </label>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-6 yes_no_">
                            <input
                              type="checkbox"
                              id="vehicle6"
                              name="yes"
                              checked={item?.validations?.yes}
                              onClick={(e) => clickHandling(e, i)}
                            />
                            <label
                              htmlFor="vehicle6"
                              className="padding_left_6"
                            >
                              {" "}
                              yes
                            </label>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-6 cus_optional">
                            <input
                              type="checkbox"
                              id="vehicle7"
                              name="optional"
                              checked={item?.validations?.optional}
                              onClick={(e) => clickHandling(e, i)}
                            />
                            <label
                              htmlFor="vehicle7"
                              className="padding_left_6"
                            >
                              {" "}
                              optional
                            </label>
                          </div>
                        </div>
                      </div>
                      <hr className="smallHr"></hr>
                    </div>
                    {/* end validation */}
                  </div>
                );
              })}
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
              ></Form.Group>
              <Button
                disabled={disableBtn}
                className=" ml_12 questionaire_template_new"
                style={{ color: "black" }}
                onClick={addInput}
              >
                Add Template <i class="fa-solid fa-pen-to-square "></i>
              </Button>
              <Button
                variant="primary"
                disabled={disableBtnn}
                className="primaryButton submit_template"
                // style={{ color: "black" }}
                onClick={submitHandlerClick}
              >
                Submit Questionnaire
              </Button>
            </Form>
          </div>
        </Card>
      </Container>
      <ToastContainer/>
    </div>
  );
};

export default NewQuestionnaire;
