import React from 'react';
import { cleanup, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'; 
import store from '../redux/store'; 
import CalendarByModule from '../pages/CalendarByModule'; 
import { MemoryRouter } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('CalendarByModule', () => {
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
          <CalendarByModule />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Year')).not.toBeNull();
    expect(screen.queryByText('Term')).not.toBeNull();
    expect(screen.queryByText('Module')).not.toBeNull();
    expect(screen.queryByText('TB1')).not.toBeNull();
    expect(screen.queryByText('TB2')).not.toBeNull();
    expect(screen.queryByText('Year 1')).not.toBeNull();
    // expect(screen.queryByText('Assessment Calendar Tool')).not.toBeNull();
    // expect(screen.getByRole('heading', { name: 'Computer Science' })).toBeInTheDocument();

  });
  test("clicking on the 'Year' navigation buttons changes the current year", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CalendarByModule />
        </MemoryRouter>
      </Provider>
    );

    const navigateBeforeButton = getByTestId('navigateBeforeButton');
    const navigateNextButton = getByTestId('navigateNextButton');
    expect(screen.queryByText('Year 1')).not.toBeNull();

    // Click "Navigate Nest" button
    fireEvent.click(navigateNextButton);
    expect(screen.queryByText('Year 2')).not.toBeNull();

    // Click "Navigate Before" button
    fireEvent.click(navigateBeforeButton);
    expect(screen.queryByText('Year 1')).not.toBeNull();
  });
});
