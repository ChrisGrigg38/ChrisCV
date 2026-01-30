import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeaderTitle, { HeaderTitleProps } from './HeaderTitle'
import { describe, test } from '@jest/globals';

describe('render HeaderTitle Component', () => {
  test('should render title with data-testid', () => {
    const props: HeaderTitleProps = {
      title: 'Personal Information'
    }

    render(<HeaderTitle {...props} />)

    const titleElement = screen.getByTestId('title-Personal Information')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('Personal Information')
  })

  test('should render different title text', () => {
    const props: HeaderTitleProps = {
      title: 'Work Experience'
    }

    render(<HeaderTitle {...props} />)

    const titleElement = screen.getByTestId('title-Work Experience')
    expect(titleElement).toHaveTextContent('Work Experience')
  })

  test('should render title with special characters', () => {
    const props: HeaderTitleProps = {
      title: 'Skills & Technologies'
    }

    render(<HeaderTitle {...props} />)

    const titleElement = screen.getByTestId('title-Skills & Technologies')
    expect(titleElement).toHaveTextContent('Skills & Technologies')
  })

  test('should render empty title', () => {
    const props: HeaderTitleProps = {
      title: ''
    }

    render(<HeaderTitle {...props} />)

    const titleElement = screen.getByTestId('title-')
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveTextContent('')
  })

  test('should render title with numbers', () => {
    const props: HeaderTitleProps = {
      title: 'Projects 2024'
    }

    render(<HeaderTitle {...props} />)

    const titleElement = screen.getByTestId('title-Projects 2024')
    expect(titleElement).toHaveTextContent('Projects 2024')
  })

  test('should render long title text', () => {
    const props: HeaderTitleProps = {
      title: 'Professional Experience and Career Development History'
    }

    render(<HeaderTitle {...props} />)

    const titleElement = screen.getByTestId('title-Professional Experience and Career Development History')
    expect(titleElement).toHaveTextContent('Professional Experience and Career Development History')
  })

  test('should render title with unicode characters', () => {
    const props: HeaderTitleProps = {
      title: 'Résumé Summary'
    }

    render(<HeaderTitle {...props} />)

    const titleElement = screen.getByTestId('title-Résumé Summary')
    expect(titleElement).toHaveTextContent('Résumé Summary')
  })

  test('should render various common CV section titles', () => {
    const commonTitles = [
      'Education',
      'Skills',
      'Experience',
      'Projects',
      'Certifications',
      'Awards',
      'Contact'
    ]

    commonTitles.forEach((title) => {
      const props: HeaderTitleProps = {
        title: title
      }

      const { unmount } = render(<HeaderTitle {...props} />)

      const titleElement = screen.getByTestId(`title-${title}`)
      expect(titleElement).toBeInTheDocument()
      expect(titleElement).toHaveTextContent(title)

      unmount()
    })
  })

  test('should maintain correct data-testid attribute', () => {
    const props: HeaderTitleProps = {
      title: 'Test Title'
    }

    render(<HeaderTitle {...props} />)

    const titleElement = screen.getByTestId('title-Test Title')
    expect(titleElement).toHaveAttribute('data-testid', 'title-Test Title')
  })
})