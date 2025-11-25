import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import moment from 'moment'
import Experiences, { ExperiencesProps } from './Experiences'
import { Experience } from '../../types/types'

describe('render Experiences Component', () => {

  const mockExperiences: Experience[] = [
    {
      role: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      description: 'Led development of cloud-based applications using React and Node.js',
      startDate: moment('2022-01-15'),
      endDate: moment('2024-03-20'),
      minCardSize: 2
    },
    {
      role: 'Full Stack Developer',
      company: 'StartUp Inc',
      location: 'New York, NY',
      description: 'Built responsive web applications and REST APIs',
      startDate: moment('2020-06-01'),
      endDate: moment('2021-12-31'),
      minCardSize: 1
    },
    {
      role: 'Junior Developer',
      company: 'Digital Solutions',
      location: 'Austin, TX',
      description: 'Developed features for e-commerce platform',
      startDate: moment('2019-03-10'),
      endDate: null,
      minCardSize: 1
    }
  ]

  test('should render all experiences', () => {
    const props: ExperiencesProps = {
      experiences: mockExperiences
    }

    render(<Experiences {...props} />)

    // Check that all three experiences are rendered
    expect(screen.getByTestId('role-2022-01-15')).toBeInTheDocument()
    expect(screen.getByTestId('role-2020-06-01')).toBeInTheDocument()
    expect(screen.getByTestId('role-2019-03-10')).toBeInTheDocument()
  })

  test('should render role fields correctly', () => {
    const props: ExperiencesProps = {
      experiences: mockExperiences
    }

    render(<Experiences {...props} />)

    expect(screen.getByTestId('role-2022-01-15')).toHaveTextContent('Senior Software Engineer')
    expect(screen.getByTestId('role-2020-06-01')).toHaveTextContent('Full Stack Developer')
    expect(screen.getByTestId('role-2019-03-10')).toHaveTextContent('Junior Developer')
  })

  test('should render company fields correctly', () => {
    const props: ExperiencesProps = {
      experiences: mockExperiences
    }

    render(<Experiences {...props} />)

    expect(screen.getByTestId('company-2022-01-15')).toHaveTextContent('Tech Corp')
    expect(screen.getByTestId('company-2020-06-01')).toHaveTextContent('StartUp Inc')
    expect(screen.getByTestId('company-2019-03-10')).toHaveTextContent('Digital Solutions')
  })

  test('should render location fields correctly', () => {
    const props: ExperiencesProps = {
      experiences: mockExperiences
    }

    render(<Experiences {...props} />)

    expect(screen.getByTestId('location-2022-01-15')).toHaveTextContent('San Francisco, CA')
    expect(screen.getByTestId('location-2020-06-01')).toHaveTextContent('New York, NY')
    expect(screen.getByTestId('location-2019-03-10')).toHaveTextContent('Austin, TX')
  })

  test('should render description fields correctly', () => {
    const props: ExperiencesProps = {
      experiences: mockExperiences
    }

    render(<Experiences {...props} />)

    expect(screen.getByTestId('description-2022-01-15')).toHaveTextContent(
      'Led development of cloud-based applications using React and Node.js'
    )
    expect(screen.getByTestId('description-2020-06-01')).toHaveTextContent(
      'Built responsive web applications and REST APIs'
    )
    expect(screen.getByTestId('description-2019-03-10')).toHaveTextContent(
      'Developed features for e-commerce platform'
    )
  })

  test('should render empty list when no experiences provided', () => {
    const props: ExperiencesProps = {
      experiences: []
    }

    const { container } = render(<Experiences {...props} />)

    // Check that no experience elements are rendered
    expect(container.querySelectorAll('[data-testid^="role-"]')).toHaveLength(0)
  })

  test('should handle single experience', () => {
    const singleExperience: Experience[] = [
      {
        role: 'Software Engineer',
        company: 'Solo Company',
        location: 'Remote',
        description: 'Working on various projects',
        startDate: moment('2023-05-15'),
        endDate: null,
        minCardSize: 1
      }
    ]

    const props: ExperiencesProps = {
      experiences: singleExperience
    }

    render(<Experiences {...props} />)

    expect(screen.getByTestId('role-2023-05-15')).toHaveTextContent('Software Engineer')
    expect(screen.getByTestId('company-2023-05-15')).toHaveTextContent('Solo Company')
    expect(screen.getByTestId('location-2023-05-15')).toHaveTextContent('Remote')
    expect(screen.getByTestId('description-2023-05-15')).toHaveTextContent('Working on various projects')
  })

  test('should render multiple experiences with all fields present', () => {
    const props: ExperiencesProps = {
      experiences: mockExperiences
    }

    render(<Experiences {...props} />)

    // Verify all data-testids are present for all experiences
    mockExperiences.forEach(exp => {
      const dateKey = exp.startDate.format('YYYY-MM-DD')
      expect(screen.getByTestId(`role-${dateKey}`)).toBeInTheDocument()
      expect(screen.getByTestId(`company-${dateKey}`)).toBeInTheDocument()
      expect(screen.getByTestId(`location-${dateKey}`)).toBeInTheDocument()
      expect(screen.getByTestId(`description-${dateKey}`)).toBeInTheDocument()
    })
  })
})