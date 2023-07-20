import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function AdminAccess() {
  const [calendarEvent, setEvents] = useState([]);

  const { id } = useParams();

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
        <h1>Admin Access</h1>

        <Link className="btn btn-outline-primary" to="/addEvent">
          Add Event
        </Link>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">NO.</th>
              <th scope="col">id</th>
              <th scope="col">program</th>
              <th scope="col">year</th>
              <th scope="col">term</th>
              <th scope="col">unit name</th>
              <th scope="col">unit code</th>
              <th scope="col">unit credit</th>
              <th scope="col">weight</th>
              <th scope="col">title</th>
              <th scope="col">type</th>
              <th scope="col">start</th>
              <th scope="col">end</th>
              <th scope="col">summary</th>
              <th scope="col">feedback</th>
              <th scope="col">location</th>
              <th scope="col">exam time</th>
              <th scope="col">linked ids</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {calendarEvent.map((ce, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{ce.id}</td>
                <td>{ce.programName}</td>
                <td>{ce.academicYear}</td>
                <td>{ce.term}</td>
                <td>{ce.unitName}</td>
                <td>{ce.unitCode}</td>
                <td>{ce.unitCredit}</td>
                <td>{ce.weight}</td>
                <td>{ce.title}</td>
                <td>{ce.type}</td>
                <td>{ce.start}</td>
                <td>{ce.end}</td>
                <td>{ce.summary}</td>
                <td>{ce.feedback}</td>
                <td>{ce.location}</td>
                <td>{ce.examTime}</td>
                <td>{ce.linkedIds}</td>
                <td>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editEvent/${ce.id}`}
                  >
                    Edit
                  </Link>

                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteEvents(ce.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}