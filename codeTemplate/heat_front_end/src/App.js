import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';

import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminAccess from "./pages/AdminAccess";
import React from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adminAccess" element={<AdminAccess />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
