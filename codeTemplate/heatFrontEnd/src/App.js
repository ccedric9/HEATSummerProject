import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route,   createBrowserRouter,RouterProvider,Outlet,} from "react-router-dom";
import AdminAccess from "./pages/AdminAccess";
import AddEvent from "./services/AddEvent";
import EditEvent from "./services/EditEvent";
import WeeklyCalendar from "./pages/WeeklyCalendar";
import CalendarByModule from "./pages/CalendarByModule";
import Login from "./services/Login";
import Footer from "./layout/Footer/Footer";

const Layout = ()=>{
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path:'/', 
    element: <Layout/> , 
    children :
    [
      {path:'/', element: <Home/> },
      {path:'/adminAccess', element: <AdminAccess /> },
      {path:'/addEvent', element: <AddEvent /> },
      {path:'/editEvent/:id', element: <EditEvent /> },
      {path:'/weeklyCalendar', element: <WeeklyCalendar /> },
      {path:'/calendarByModule', element: <CalendarByModule /> },
      {path:'/login', element: <Login /> },
    ]
  }
])


const App = () => {
  return(
    <div>
      <RouterProvider router= {router}/>
    </div>
  ) 

};

export default App;
