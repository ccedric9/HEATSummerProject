import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddEvent() {
  let navigate = useNavigate();

  const [calendarEvents, setCalendarEvent] = useState({
    unitName:"",
    weight:"",
    title: "",
    type: "",
    start: "",
    end: "",
  });

  const { unitName,weight, title, type, start, end } = calendarEvents;

  const onInputChange = (e) => {
    setCalendarEvent({ ...calendarEvents, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/calendarEvents", calendarEvents);
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter assessment type"
                  name="type"
                  value={type}
                  onChange={(e) => onInputChange(e)}
                />
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
