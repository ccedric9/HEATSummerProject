import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

test('assessments change based on current time', async () => {
  // You can mock axios or any API calls here if needed

  // Render the UserProfile component
  render(<UserProfile />);

  // Assuming the initial number of ongoing assessments and upcoming assessments is known
  const initialOngoingAssessmentsCount = 1/* initial count */;
  const initialUpcomingAssessmentsCount = 0/* initial count */;

  // Helper function to set the current time
  const setCurrentTime = (newTime) => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(newTime);
  };

  // Change the current time
  const newCurrentTime = new Date(2022,11,10);
  setCurrentTime(newCurrentTime);

  // You might need to wait for some async tasks to complete if your component uses them
  // For example, you can use `waitFor` from '@testing-library/react'

  // Assuming your assessments are displayed with a specific text
  const ongoingAssessmentsText = 'Ongoing Assessment';
  const upcomingAssessmentsText = 'Upcoming Assessment';

  // Find the assessment elements
  const ongoingAssessments = await screen.findAllByText(ongoingAssessmentsText);
  const upcomingAssessments = await screen.findAllByText(upcomingAssessmentsText);

  // Get the count of assessments for each board
  const ongoingAssessmentsCount = ongoingAssessments.length;
  const upcomingAssessmentsCount = upcomingAssessments.length;

   // Assert the counts based on your logic
   expect(ongoingAssessmentsCount).toBe(1);
   expect(upcomingAssessmentsCount).toBe(1);
});
