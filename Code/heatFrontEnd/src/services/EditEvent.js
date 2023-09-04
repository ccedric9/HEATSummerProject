import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import './EditEvent.css';

export default function EditEvent() {
  let navigate = useNavigate();
  let { id } = useParams();

  const feedbackLink = "https://www.ole.bris.ac.uk/";

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
    summary: "",
    feedback: "",
    location: "",
    examTime: "",
    linkedIds: "",
  });

  const {programName, unitName, unitCode, unitCredit, term, academicYear, weight, title, type, start, end, summary, feedback, location, examTime, linkedIds } = calendarEvents;

  useEffect(() => {
    const fetchEvent = async () => {
      const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents/${id}`);
      setCalendarEvent(result.data);
    };
    fetchEvent();
  }, [id]);

  const onInputChange = (e) => {
    setCalendarEvent({ ...calendarEvents, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents/${id}`, calendarEvents);
    navigate("/");
  };

  const [calendarEvent, setEvents] = useState([]);

  const loadEvents = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents`);
    setEvents(result.data);
  };

  const deleteEvents = async (id) => {
    const isConfirmed = window.confirm("Please confirm to delete ? ")
    if(isConfirmed){
      await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents/${id}`);
      loadEvents();
    }
  };

  const weightOptions=[];
  for (let i = 0 ; i <= 100 ; i += 5){
    weightOptions.push(i);
  }


  return (
    <div className="container">
      <h3>Edit Assessment :{" < "+unitName+" - "+ title + " > " } </h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="row">
            <label htmlFor="programName">
              Program Name <span class="red-asterisk">*</span>
            </label>
            <select
                id="edit-programName"
                className="form-control"
                name="programName"
                value={programName}
                onChange={(e) => onInputChange(e)}
                required
              >
                <option value=""></option>
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
              id="edit-unitName"
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
                id="edit-unitCode"
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
                id="edit-credit"
                type="text"
                className="form-control"
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
                id="edit-year"
                name="academicYear" 
                value={academicYear}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
                >
                <option value={1}>Year 1</option>
                <option value={2}>Year 2</option>
                <option value={3}>Year 3</option>
              </select>
            </div>
            <div className="col">
              <label htmlFor="term">
                Term <span class="red-asterisk">*</span>
              </label>
              <select 
                id="edit-term"
                name="term" 
                value={term}
                className="form-control"
                onChange={(e) => onInputChange(e)}
                required
                >
                <option value={1}>Term 1</option>
                <option value={2}>Term 2</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label htmlFor="Title" >
                Assessment Title <span class="red-asterisk">*</span>
              </label>
              <input
                id="edit-title"
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
                id="edit-type"
                className="form-control"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)}
                required
              >
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
                id="edit-weight"
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
                Start Date<span class="red-asterisk">*</span>
              </label>
              <input
                id="edit-start"
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
                id="edit-end"
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
                id="edit-location"
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
          <label htmlFor="location" >
                Feedback
              </label>
              <input
                id="edit-feedback"
                type="text"
                className="form-control"
                placeholder="please select assessment location"
                name="feedback"
                value={feedback}
                onChange={(e) => onInputChange(e)}
              />
          </div>
          <div className="row">
            <label htmlFor="summary" >
              Assessment Summary
            </label>
            <input
              id="edit-summary"
              type="text"
              className="form-control summary"
              name="summary"
              value={summary}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="buttons">
          <button type="submit" className="btn btn-outline-primary" id="edit-submit">
            Submit
          </button>
          <button type="delete" className="btn btn-outline-danger mx-2" onClick={()=>deleteEvents(id)} id = 'delete-button'>
            Delete
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/">
            Cancel
          </Link>
          </div>
        </form>
    </div>
  );
}