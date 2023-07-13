import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddEvent() {
  let navigate = useNavigate();

  const [calendarEvents, setCalendarEvent] = useState({
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
  });

  const { unitName, unitCode, unitCredit, term, academicYear, weight, title, type, start, end } = calendarEvents;

  const onInputChange = (e) => {
    setCalendarEvent({ ...calendarEvents, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/calendarEvents", calendarEvents);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Calendar Event</h2>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="unitName" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="unitCode" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="academicYear" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="term" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Weight (%)
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter weight to total unit 0 ~ 100 "
                name="weight"
                value={weight}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="Type" className="form-label">
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
            <div className="mb-3">
              <label htmlFor="Start" className="form-label">
                Start Time
              </label>
              <input
                type="date"
                className="form-control"
                name="start"
                value={start}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="End" className="form-label">
                End Time
              </label>
              <input
                type="date"
                className="form-control"
                name="end"
                value={end}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Add Event
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
