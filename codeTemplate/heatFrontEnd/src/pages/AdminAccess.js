import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function AdminAccess() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const result = await axios.get("http://localhost:8080/calendarEvents");
    setUsers(result.data);
  };

  const deleteEvents = async (id) => {
    await axios.delete(`http://localhost:8080/calendarEvents/${id}`);
    loadEvents();
  };

  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">NO.</th>
              <th scope="col">id</th>
              <th scope="col">title</th>
              <th scope="col">type</th>
              <th scope="col">start</th>
              <th scope="col">end</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.id}</td>
                <td>{user.title}</td>
                <td>{user.type}</td>
                <td>{user.start}</td>
                <td>{user.end}</td>
                <td>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteEvents(user.id)}
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