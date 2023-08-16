import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'; 
import store from '../redux/store'; 
import WeeklyCalendar from '../pages/WeeklyCalendar'; 
import { MemoryRouter } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('WeeklyCalendar', () => {
  const mockUser = {
    staff: true, // Provide the necessary user data
    major: 'Computer Science', // Provide the user's major
  };

  const mockEvents = [
    // Provide mock events as needed
  ];

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <WeeklyCalendar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Year')).not.toBeNull();
    expect(screen.queryByText('Term')).not.toBeNull();
    expect(screen.queryByText('Module')).not.toBeNull();
    expect(screen.queryByText('1')).not.toBeNull();
    expect(screen.queryByText('13')).not.toBeNull();
    expect(screen.queryByText('TB1')).not.toBeNull();
    // expect(screen.queryByText('Assessment Calendar Tool')).not.toBeNull();
    // expect(screen.getByRole('heading', { name: 'Computer Science' })).toBeInTheDocument();

    // Add more assertions as needed
  });

  // Add more test cases as needed
});
