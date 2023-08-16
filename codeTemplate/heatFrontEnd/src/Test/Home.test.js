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
    // expect(screen.queryByText('Programme')).not.toBeNull();
    
    // expect(screen.queryByText('Assessment Calendar Tool')).not.toBeNull();
    // expect(screen.getByRole('heading', { name: 'Computer Science' })).toBeInTheDocument();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('Year')).not.toBeNull();
  });
  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('Term')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('Module')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('Module')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('September')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('October')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('November')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('December')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('January')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('February')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('March')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('April')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('May')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('June')).not.toBe
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('July')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('August')).not.toBeNull();
  });

  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('Year 1')).not.toBeNull();
  });
  it('renders the calendar correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.queryByText('2022 - 2023')).not.toBeNull();
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
    expect(screen.queryByText('2022 - 2023')).not.toBeNull();

    // Click "Navigate Nest" button
    fireEvent.click(navigateNextButton);
    expect(screen.queryByText('2023 - 2024')).not.toBeNull();

    // Click "Navigate Before" button
    fireEvent.click(navigateBeforeButton);
    expect(screen.queryByText('2022 - 2023')).not.toBeNull();
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
    fireEvent.click(navigateBeforeButton);
    expect(screen.queryByText('Year 3')).not.toBeNull();

    // Click "Navigate Before" button
    fireEvent.click(navigateBeforeButton);
    expect(screen.queryByText('Year 2')).not.toBeNull();
    fireEvent.click(navigateBeforeButton);
    expect(screen.queryByText('Year 1')).not.toBeNull();
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
    expect(screen.queryByText('2022 - 2023')).not.toBeNull();

    // Click "Navigate Nest" button
    fireEvent.click(navigateBeforeButton);
    expect(screen.queryByText('2024 - 2025')).not.toBeNull();

    // Click "Navigate Before" button
    fireEvent.click(navigateBeforeButton);
    expect(screen.queryByText('2023 - 2024')).not.toBeNull();
    fireEvent.click(navigateBeforeButton);
    expect(screen.queryByText('2022 - 2023')).not.toBeNull();
  });
});


  
