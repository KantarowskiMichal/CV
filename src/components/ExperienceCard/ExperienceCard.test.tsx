import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExperienceCard from './ExperienceCard';

describe('<ExperienceCard />', () => {
  test('it should mount', () => {
    render(<ExperienceCard />);

    const experience = screen.getByTestId('ExperienceCard');

    expect(experience).toBeInTheDocument();
  });
});