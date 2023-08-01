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
    term: "",
    academicYear: "",
    weight: "",
    title: "",
    type: "",
    start: "",
    end: "",
    feedback:"",
    summary:"",
    location:"",
  });

  const { programName,unitName, unitCode, unitCredit, term, academicYear, weight, title, type, start, end, feedback,summary,location } = calendarEvents;

  const onInputChange = (e) => {
    setCalendarEvent({ ...calendarEvents, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents`, calendarEvents);
    navigate("/");
  };

  return (
    <div className="container">
      <h3>Add an assessment </h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row single">
            <label htmlFor="programName">
              Program Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter program name"
              name="programName"
              value={programName}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="row">
            <div className="col">
            <label htmlFor="unitName">
              Unit Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter unit name"
              name="unitName"
              value={unitName}
              onChange={(e) => onInputChange(e)}
            />
            </div>
            <div className="col">
              <label htmlFor="unitCode">
                Unit Code
              </label>
              <input
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
                Academic Year
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="select a year"
                name="academicYear"
                value={academicYear}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col">
              <label htmlFor="term">
                Term
              </label>
              <input
                type="text"
                className="form-control"  
                placeholder="Enter term"
                name="term"
                value={term}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="Title" >
                Assessment Title
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter assessment title"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col">
              <label htmlFor="Type">
                Assessment Type
              </label>
              <select
                className="form-control"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)}
              >
                <option value="FORMATIVE">FORMATIVE</option>
                <option value="SUMMATIVE">SUMMATIVE</option>
                <option value="CAPSTONESUMMATIVE">CAPSTONESUMMATIVE</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="weight" >
                Weight (%)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="0 ~ 100 "
                name="weight"
                value={weight}
                onChange={(e) => onInputChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="Start" >
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                name="start"
                value={start}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col">
              <label htmlFor="End" >
                End Date
              </label>
              <input
                type="date"
                className="form-control"
                name="end"
                value={end}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="col">
              <label htmlFor="location" >
                Location
              </label>
              <input
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
                type="text"
                className="form-control summary"
                name="summary"
                value={summary}
                onChange={(e) => onInputChange(e)}
              />
          </div>
          <div className="buttons">
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/">
            Cancel
          </Link>
          </div>
        </form>
    </div>
  );
}
