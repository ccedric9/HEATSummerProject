import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Navbar from "./layout/Navbar";
import Home from "./pages/Home";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    createBrowserRouter,
    RouterProvider,
    Outlet,
    useNavigate,
} from "react-router-dom";
import AdminAccess from "./pages/AdminAccess";
import AddEvent from "./services/AddEvent";
import EditEvent from "./services/EditEvent";
import WeeklyCalendar from "./pages/WeeklyCalendar";
import CalendarByModule from "./pages/CalendarByModule";
import Login from "./services/Login";
import Footer from "./layout/Footer/Footer";
import SignUp from "./services/SignUp";
import Notification from "./services/Notification";
import UserInfoPage from "./pages/UserInfoPage";
import { Alert } from "bootstrap";
import store from './redux/store';
import { useDispatch, useSelector,Provider } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/slices/userSlice';
import EditMenu from "./services/EditMenu";



const AppLayout = ({ children }) => {

    return (
        <div className="app">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children:
      [
        { path: '/', element: <Login /> },
        { path: '/home', element: <Home /> },
        { path: '/adminAccess', element: <AdminAccess /> },
        { path: '/addEvent', element: <AddEvent /> },
        { path: '/editEvent/:id', element: <EditEvent /> },
        { path: '/editMenu', element: <EditMenu /> },
        { path: '/weeklyCalendar', element: <WeeklyCalendar /> },
        { path: '/calendarByModule', element: <CalendarByModule /> },
        { path: '/login', element: <Login /> },
        { path: '/signup', element: <SignUp /> },
        { path: '/notification', element: <Notification /> },
        { path: '/user-info', element: <UserInfoPage /> },
      ]
  }
])


const App = () => {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  )
};

const AppComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user) {
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )

};

export default App;
