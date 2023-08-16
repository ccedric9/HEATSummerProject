import React from 'react';
import { cleanup, getByTestId, queryByTestId, render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'; 
import store from '../redux/store'; 
import Home from '../pages/Home'; 
import { MemoryRouter } from 'react-router-dom';

afterEach(() => {
  cleanup();
});

describe('Home', () => {
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
          <Home />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Year')).not.toBeNull();
    expect(screen.queryByText('Term')).not.toBeNull();
    expect(screen.queryByText('Module')).not.toBeNull();
    expect(screen.queryByText('September')).not.toBeNull();
    expect(screen.queryByText('October')).not.toBeNull();
    expect(screen.queryByText('November')).not.toBeNull();
    expect(screen.queryByText('December')).not.toBeNull();
    expect(screen.queryByText('January')).not.toBeNull();
    expect(screen.queryByText('February')).not.toBeNull();
    expect(screen.queryByText('March')).not.toBeNull();
    expect(screen.queryByText('April')).not.toBeNull();
    expect(screen.queryByText('May')).not.toBeNull();
    expect(screen.queryByText('August')).not.toBeNull();
    expect(screen.queryByText('Year 1')).not.toBeNull();
    expect(screen.queryByText('2022 - 2023')).not.toBeNull();
    // expect(screen.queryByText('Programme')).not.toBeNull();
    
    // expect(screen.queryByText('Assessment Calendar Tool')).not.toBeNull();
    // expect(screen.getByRole('heading', { name: 'Computer Science' })).toBeInTheDocument();
  });

test("clicking on the 'Year' navigation buttons changes the current year", () => {
    const { getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
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


  
