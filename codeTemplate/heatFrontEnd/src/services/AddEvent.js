import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AddEvent.css';


export default function AddEvent() {
  let navigate = useNavigate();

  const [calendarEvents, setCalendarEvent] = useState({
    programName:"",
    unitName: "",
    unitCode: "",
    unitCredit: "",
    academicYear: "",
    term: "",
    weight: "",
    title: "",
    type: "",
    start: "",
    end: "",
    feedback:"",
    summary:"",
    location:"",
  });


  const { programName,unitName, unitCode, unitCredit,academicYear,term,  weight, title, type, start, end, feedback,summary,location } = calendarEvents;

  const onInputChange = (e) => {
    setCalendarEvent({ ...calendarEvents, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents`, calendarEvents);
    navigate("/");
  };

  const weightOptions=[];
  for (let i = 0 ; i <= 100 ; i += 5){
    weightOptions.push(i);
  }


  return (
    <div className="container">
      <h3>Add an assessment </h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <label htmlFor="programName">
              Program Name <span class="red-asterisk">*</span>
            </label>
            <select
                className="form-control"
                name="programName"
                value={programName}
                onChange={(e) => onInputChange(e)}
                id ="program-name"
                required
              >
                <option value="">Please select a program</option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Aerospace Engineering">Aerospace Engineering</option>
                <option value="Electrical & Electronic Engineering">Electrical & Electronic Engineering</option>
                <option value="Engineering Mathematics">Engineering Mathematics</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
              </select>
          </div>
          <div className="row">
            <div className="col">
            <label htmlFor="unitName">
              Unit Name <span class="red-asterisk">*</span>
            </label>
            <input
              id="unit-name"
              type="text"
              className="form-control"
              placeholder="Enter unit name"
              name="unitName"
              value={unitName}
              onChange={(e) => onInputChange(e)}
              required
            />
            </div>
            <div className="col">
              <label htmlFor="unitCode">
                Unit Code
              </label>
              <input
                id="unit-code"
                type="text"
                className="form-control"
                placeholder="Enter unit code"
                name="unitCode"
                value={unitCode}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col">
              <label htmlFor="unitCredit">
                Credit Points
              </label>
              <input
                id="unit-credit"
                type="text"
                className="form-control"
                placeholder="Enter unit credit points"
                name="unitCredit"
                value={unitCredit}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="academicYear">
                Academic Year <span class="red-asterisk">*</span>
              </label>
              <select 
                id="year-input"
                name="academicYear" 
                value={academicYear}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
                >
                <option value="">Select a year</option>
                <option value="1">Year 1</option>
                <option value="2">Year 2</option>
                <option value="3">Year 3</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="term">
                Term <span class="red-asterisk">*</span>
              </label>
              <select 
                id="term-input"
                name="term" 
                value={term}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
                >
                <option value="">Select a term</option>
                <option value="1">Term 1</option>
                <option value="2">Term 2</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="Title" >
                Assessment Title <span class="red-asterisk">*</span>
              </label>
              <input
                id="assessment-title"
                type="text"
                className="form-control"
                placeholder="Enter assessment title"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="Type">
                Assessment Type <span class="red-asterisk">*</span>
              </label>
              <select
                id="assessment-type"
                className="form-control"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option value="">Select a type</option>
                <option value="FORMATIVE">FORMATIVE</option>
                <option value="SUMMATIVE">SUMMATIVE</option>
                <option value="CAPSTONESUMMATIVE">CAPSTONESUMMATIVE</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="weight" >
                Weight (%) <span class="red-asterisk">*</span>
              </label>
              <select 
                id="weight"
                name="weight" 
                value={weight}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
                >
                {
                  weightOptions.map((value)=>(
                    <option key={value} value = {value}>
                      {value}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="Start" >
                Start Date <span class="red-asterisk">*</span>
              </label>
              <input
                id="start"
                type="date"
                className="form-control"
                name="start"
                value={start}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="End" >
                End Date <span class="red-asterisk">*</span>
              </label>
              <input
                id="end"
                type="date"
                className="form-control"
                name="end"
                value={end}
                onChange={(e) => onInputChange(e)}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="location" >
                Location
              </label>
              <input
                id="location"
                type="text"
                className="form-control"
                placeholder="please select assessment location"
                name="location"
                value={location}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="row">
          <label htmlFor="summary" >
                Assessment Summary
              </label>
              <input
                id="summary"
                type="text"
                className="form-control summary"
                placeholder="Write assessment summary here"
                name="summary"
                value={summary}
                onChange={(e) => onInputChange(e)}
              />
          </div>
          <div className="buttons">
          <button type="submit" className="btn btn-outline-primary" id = "submit-event-button" id="submit-event">
            Submit
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/" id='cancel-btn'>
            Cancel
          </Link>
          </div>
        </form>
    </div>
  );
}
