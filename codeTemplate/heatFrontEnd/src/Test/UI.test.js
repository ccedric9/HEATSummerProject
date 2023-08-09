import React from 'react'
import { Screen,render,cleanup} from '@testing-library/react'
import Navbar from '../layout/Navbar'
import Home from "../pages/Home"
import Login from '../services/Login'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { MockAuthProvider } from './MockUser'


afterEach(()=>{
    cleanup();
})

test('Check login page',()=>{

    const {getAllByRole} = render(
        <Provider store = {store}>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </Provider>
     );
    const button = getAllByRole('button');
    expect(button.length).toEqual(1);
})

test('should render MyComponent with a logged-in user', () => {
    // Set up the logged-in user state in the mock auth provider
    const { getByText } = render(
        <Provider store = {store}>
            <MemoryRouter>
                <MockAuthProvider >
                    <Home/>
                </MockAuthProvider>
            </MemoryRouter>
        </Provider>

    );
  
    // Now you can test your component's behavior with the simulated logged-in user
    // For example, assert that the username is displayed
    expect(getByText('Computer Science')).toBeInTheDocument();
  });
