import React from 'react'
import './EditMenu.css'
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function EditMenu() {
  const [calendarEvent, setEvents] = useState([]);
  const { id } = useParams();
  const user = useSelector(state => state.user);
  const program = user.major;
  const selectedEvents = calendarEvent.filter((event) => event.programName === program);
  
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents`);
    setEvents(result.data);
  };

  const deleteEvents = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/calendarEvents/${id}`);
    loadEvents();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Edit Assessment Infomation</h1>
        <Link className="btn btn-outline-primary add-button" to="/addEvent">
          Add an assessment
        </Link>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">NO.</th>
              <th scope="col">program</th>
              <th scope="col">unit name</th>
              <th scope="col">title</th>
            </tr>
          </thead>
          <tbody>
            {selectedEvents.map((event, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{event.programName}</td>
                <td>{event.unitName}</td>
                <td>{event.title}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editEvent/${event.id}`}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}