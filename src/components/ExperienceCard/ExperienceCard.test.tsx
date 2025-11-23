import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import moment from 'moment';
import ExperienceCard from './ExperienceCard';
import { Experience } from '../../types/types';

describe('renders the ExperienceCard', () => {
  const mockExperience: Experience = {
    role: 'Software Engineer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    description: 'Developed amazing features and improved performance',
    startDate: moment('2023-01-15'),
    endDate: moment('2024-06-30'),
    minCardSize: 200,
  };

  test('renders all experience fields correctly', () => {
    render(<ExperienceCard job={mockExperience} />);

    const startDateStr = mockExperience.startDate.format('YYYY-MM-DD');

    expect(screen.getByTestId(`role-${startDateStr}`)).toHaveTextContent('Software Engineer');
    expect(screen.getByTestId(`company-${startDateStr}`)).toHaveTextContent('Tech Corp');
    expect(screen.getByTestId(`location-${startDateStr}`)).toHaveTextContent('San Francisco, CA');
    expect(screen.getByTestId(`description-${startDateStr}`)).toHaveTextContent('Developed amazing features and improved performance');
    expect(screen.getByTestId(`dates-${startDateStr}`)).toHaveTextContent(mockExperience.startDate.format("MMM YYYY") + " - " + mockExperience.endDate?.format("MMM YYYY"));
  });

  test('renders experience with null endDate', () => {
    const currentExperience: Experience = {
      ...mockExperience,
      endDate: null,
    };

    render(<ExperienceCard job={currentExperience} />);

    const startDateStr = currentExperience.startDate.format('YYYY-MM-DD');

    expect(screen.getByTestId(`role-${startDateStr}`)).toHaveTextContent('Software Engineer');
    expect(screen.getByTestId(`dates-${startDateStr}`)).toHaveTextContent(mockExperience.startDate.format("MMM YYYY") + " - Present");
  });

  test('handles different date formats correctly', () => {
    const differentDateExperience: Experience = {
      ...mockExperience,
      startDate: moment('2020-03-01'),
      endDate: moment('2022-12-31'),
    };

    render(<ExperienceCard job={differentDateExperience} />);

    const startDateStr = '2020-03-01';

    expect(screen.getByTestId(`role-${startDateStr}`)).toBeInTheDocument();
    expect(screen.getByTestId(`company-${startDateStr}`)).toBeInTheDocument();
    expect(screen.getByTestId(`location-${startDateStr}`)).toBeInTheDocument();
    expect(screen.getByTestId(`description-${startDateStr}`)).toBeInTheDocument();
  });

  test('renders multiple experiences with unique data-testids', () => {
    const experience1: Experience = {
      role: 'Senior Developer',
      company: 'Company A',
      location: 'New York, NY',
      description: 'Led development team',
      startDate: moment('2022-01-01'),
      endDate: moment('2023-12-31'),
      minCardSize: 300,
    };

    const experience2: Experience = {
      role: 'Junior Developer',
      company: 'Company B',
      location: 'Austin, TX',
      description: 'Built features',
      startDate: moment('2020-06-15'),
      endDate: moment('2021-12-31'),
      minCardSize: 200,
    };

    const { rerender } = render(<ExperienceCard job={experience1} />);

    expect(screen.getByTestId('role-2022-01-01')).toHaveTextContent('Senior Developer');

    rerender(<ExperienceCard job={experience2} />);

    expect(screen.getByTestId('role-2020-06-15')).toHaveTextContent('Junior Developer');
  });
});