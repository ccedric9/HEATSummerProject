import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux'; 
import store from '../redux/store'; 
import EventDialog from '../pages/EventDialog'; 
import  { MemoryRouter } from 'react-router-dom';

afterEach(()=>{
  cleanup();
}

)
describe('EventDialog', () => {
  const mockEvent = {
    id: 1,
    title: 'Mock Event',
    start: '2023-06-24',
    end: '2023-06-25',
    type: 'SUMMATIVE',
    weight: '30',
    summary: 'Mock summary',
    feedback: 'Mock feedback',
  };

  it('renders event details correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <EventDialog open={true} handleCloseDialog={() => {}} event={mockEvent} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Mock Event')).toBeInTheDocument();
    expect(screen.getByText('Start Date: 2023-06-24')).toBeInTheDocument();
    expect(screen.getByText('End Date: 2023-06-25')).toBeInTheDocument();
    expect(screen.getByText('Type: SUMMATIVE')).toBeInTheDocument();
    expect(screen.getByText('Weight: 30%')).toBeInTheDocument();
    expect(screen.getByText('Summary: Mock summary')).toBeInTheDocument();
    expect(screen.getByText('Feedback: Mock feedback')).toBeInTheDocument();
  });

  it('displays Edit button for staff', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <EventDialog open={true} handleCloseDialog={() => {}} event={mockEvent} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('does not display Edit button for non-staff', () => {
    // Provide a mock user without staff privilege
    const mockUser = {
      staff: false,
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <EventDialog
            open={true}
            handleCloseDialog={() => {}}
            event={mockEvent}
            user={mockUser}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByRole('button', { name: 'Edit' })).not.toBeInTheDocument();
  });

  it('calls handleCloseDialog when Close button is clicked', () => {
    const handleCloseDialog = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <EventDialog open={true} handleCloseDialog={handleCloseDialog} event={mockEvent} />
        </MemoryRouter>
      </Provider>
    );

    userEvent.click(screen.getByRole('button', { name: 'Close' }));
    expect(handleCloseDialog).toHaveBeenCalledTimes(1);
  });
});
