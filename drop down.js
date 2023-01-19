/ eslint-disable /
import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import { Form, Card, DropdownButton } from 'react-bootstrap';
import "./../../assets/css/styles.css"

const NewCampaign = () => {
  const [select, setSelect] = useState({
    numbers: "",
    templates: "",
    leads: "",
  })
  const handleSelect = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target
    setSelect({
      ...select,
      [name]: value,
    });
  }
  const handleSubmit = ()=>{
    console.log(select);
  }
  return (
    <div>
      <h2>Add Campaign</h2>
      <label>Number</label>
      <div>
        <select className="" onChange={handleSelect} name="numbers">
          <option value="" disabled hidden >Select Number</option>
          <option value="03069638414">03069638414</option>
          <option value="03069638415">03069638415</option>
          <option value="03069638416">03069638416</option>
        </select>
      </div>
      <label>Template</label>
      <div>
        <select className="" onChange={handleSelect} name="templates">
          <option value="" disabled hidden >Select Template</option>
          <option value="React">React</option>
          <option value="Vue">Vue</option>
          <option value="Angular">Angular</option>
        </select>
      </div>
      <label>Lead</label>
      <div>
        <select className="" onChange={handleSelect} name="leads">
          <option value="" disabled hidden >Select Lead</option>
          <option value="Lead 1">Lead 1</option>
          <option value="Lead 2">Lead 2</option>
          <option value="Lead 3">Lead 3</option>
          <option value="Lead 4">Lead 4</option>
        </select>
      </div>
      <button className=''onClick={handleSubmit}>Start Campaign</button>
    </div>
    // <div>
    //     <h2>Add Campaign</h2>
    //     <div className=''>
    //     <h6>Add Numbers</h6>
    // <DropdownButton id="dropdown-basic-button" title={select.numbers}>
    //   <Dropdown.Item onClick={handleSelect} title="Number 1" name="numbers">Number 1</Dropdown.Item>
    //   <Dropdown.Item onClick={handleSelect} title="Number 2" name="numbers">Number 2</Dropdown.Item>
    //   <Dropdown.Item onClick={handleSelect} title="Number 3" name="numbers">Number 3</Dropdown.Item>
    // </DropdownButton>


    //   {/* <Dropdown title="numbers" onSelect={handleSelect}>
    //     <Dropdown.Toggle variant="success" id="dropdown-basic"> Numbers </Dropdown.Toggle>
    //     <Dropdown.Menu>
    //       <Dropdown.Item title="1" eventKey='Number 1'>Number 1</Dropdown.Item>
    //       <Dropdown.Item title="2" eventKey='Number 2'>Number 2</Dropdown.Item>
    //       <Dropdown.Item title="3" eventKey='Number 3'>Number 3</Dropdown.Item>
    //     </Dropdown.Menu>
    //   </Dropdown> */}
    //   {/ <p>{select.numbers}</p> /}
    //     <h6>Add Templates</h6>
    // <DropdownButton id="dropdown-basic-button" title={select.templates}>
    //   <Dropdown.Item onClick={handleSelect} title="Template 1" name="templates">Template 1</Dropdown.Item>
    //   <Dropdown.Item onClick={handleSelect} title="Template 2" name="templates">Template 2</Dropdown.Item>
    //   <Dropdown.Item onClick={handleSelect} title="Template 3" name="templates">Template 3</Dropdown.Item>
    // </DropdownButton>
    //   {/ <p>{select.templates}</p> /}
    //   <div className='leads'>
    //     <h6>Add Leads</h6>
    // <DropdownButton id="dropdown-basic-button" title={select.leads}>
    //   <Dropdown.Item onClick={handleSelect} title="Lead 1" name="leads">Lead 1</Dropdown.Item>
    //   <Dropdown.Item onClick={handleSelect} title="Lead 2" name="leads">Lead 2</Dropdown.Item>
    //   <Dropdown.Item onClick={handleSelect} title="Lead 3" name="leads">Lead 3</Dropdown.Item>
    // </DropdownButton>
    //   {/ <p>{select.leads}</p> /}
    //   </div>
    // </div>
    //   <button className="btn category_btn">Start Campaign</button>
    // </div>
  )
}

export default NewCampaign