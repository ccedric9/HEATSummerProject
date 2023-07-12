import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminAccess from "./pages/AdminAccess";
import AddEvent from "./services/AddEvent";
import EditEvent from "./services/EditEvent";
import WeeklyCalendar from "./pages/WeeklyCalendar";
import CalendarByModule from "./pages/CalendarByModule";
import Login from "./services/Login";


function App() {

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/adminAccess" element={<AdminAccess />} />
          <Route exact path="/addEvent" element={<AddEvent />} />
          <Route exact path="/editEvent/:id" element={<EditEvent />} />
          <Route exact path="/weeklyCalendar" element={<WeeklyCalendar />} />
          <Route exact path="/calendarByModule" element={<CalendarByModule/>}/>
          <Route exact path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
