import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IntroductionCard from './IntroductionCard';

describe('<IntroductionCard />', () => {
  test('it should mount', () => {
    render(<IntroductionCard />);

    const introductionCard = screen.getByTestId('IntroductionCard');

    expect(introductionCard).toBeInTheDocument();
  });
});