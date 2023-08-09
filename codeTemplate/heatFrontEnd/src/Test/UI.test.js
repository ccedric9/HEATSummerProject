import React from 'react'
import { Screen,render,cleanup} from '@testing-library/react'
import Navbar from '../layout/Navbar'
import Login from '../services/Login'
import { Provider } from 'react-redux'
import store from '../redux/store'
import { MemoryRouter } from 'react-router-dom';
// const { setupDatabase, cleanupDatabase } = require('jest-mysql');

afterEach(()=>{
    cleanup();
})

// setupDatabase();


// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useNavigate: jest.fn(),
// }));

// module.exports = async () => {
//     await cleanupDatabase();
// };

// const mysql = require('mysql2/promise');
// const { query } = require('jdbc:mysql://amazonheatdb.cczulapjuexr.eu-west-2.rds.amazonaws.com:3306/heatDB');

// describe('Database Tests', () => {
//   it('should fetch data from the database', async () => {
//     // Perform your test setup here if needed
//     // ...

//     // Perform a database query using your database module
//     const results = await query('SELECT * FROM calendar_event');

//     // Perform assertions based on the fetched data
//     expect(results.length).toBeGreaterThan(0);

//     // Perform your test cleanup here if needed
//     // ...
//   });
// });

// test('check', ()=>{
//     expect('1').toEqual('1');
// })

// test('Check navigation bar display information',()=>{
//     const {getAllByRole} = render( 
//         <MemoryRouter>
//         <Navbar />
//       </MemoryRouter>
//     );
//     const iconButtons = getAllByRole('IconButton');
//     console.log(iconButtons);
//     expect(iconButtons).toBe(4);
// })

test('Check login page',()=>{
    const {getAllByRole} = render(
        <Provider store = {store}>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </Provider>
     );
    const button = getAllByRole('button');
    expect(button.length).toBe(1);
})
