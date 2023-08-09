import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { addMonths } from 'date-fns';

import Notification from '../services/Notification';

const mockStore = configureStore([]);

describe('Notification Component', () => {
  let initialState;

  beforeEach(() => {
    initialState = {
      user: {
        major: 'Mechanical Engineering',
      },
    };
  });

  test('should display correct counts of ongoing and upcoming assessments', async () => {
    const mockedAxios = jest.spyOn(require('axios'), 'get');
    mockedAxios.mockResolvedValue({ data: [] });

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Notification />
      </Provider>
    );

    const expectedOngoingAssessmentsCount = 3;
    const expectedUpcomingAssessmentsCount = 1;

    const newCurrentTime = new Date(2022, 10, 28); 
    jest.spyOn(global, 'Date').mockImplementation(() => newCurrentTime);

    const ongoingAssessments = await screen.findAllByText('Ongoing Assessment');
    const upcomingAssessments = await screen.findAllByText('Upcoming Assessment');

    const actualOngoingAssessmentsCount = ongoingAssessments.length;
    const actualUpcomingAssessmentsCount = upcomingAssessments.length;

    expect(actualOngoingAssessmentsCount).toBe(expectedOngoingAssessmentsCount);
    expect(actualUpcomingAssessmentsCount).toBe(expectedUpcomingAssessmentsCount);

    // Clean up the timer
    jest.useRealTimers();
  });
});
