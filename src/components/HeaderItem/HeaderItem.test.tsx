import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import HeaderItem, { HeaderItemProps } from './HeaderItem'
import { describe, test } from '@jest/globals';

describe('render HeaderItem Component', () => {

  const mockIcon = <svg data-testid="mock-icon">Icon</svg>

  describe('when isLink is false', () => {
    
    test('should render as div tag with text', () => {
      const props: HeaderItemProps = {
        isLink: false,
        iconComponent: mockIcon,
        text: 'Contact Information',
        dataTestId: 'contact-info'
      }

      render(<HeaderItem {...props} />)

      const element = screen.getByTestId('contact-info')
      expect(element).toBeInTheDocument()
      expect(element.tagName).toBe('DIV')
      expect(element).toHaveTextContent('Contact Information')
    })

    test('should render icon component', () => {
      const props: HeaderItemProps = {
        isLink: false,
        iconComponent: mockIcon,
        text: 'Email Address',
        dataTestId: 'email'
      }

      render(<HeaderItem {...props} />)

      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
    })

    test('should render without dataTestId when not provided', () => {
      const props: HeaderItemProps = {
        isLink: false,
        iconComponent: mockIcon,
        text: 'Phone Number'
      }

      render(<HeaderItem {...props} />)

      // Find span by text content
      const spanElement = screen.getByText('Phone Number')
      expect(spanElement).toBeInTheDocument()
      expect(spanElement.tagName).toBe('SPAN')
    })
  })

  describe('when isLink is true', () => {
    test('should render as anchor tag with href', () => {
      const props: HeaderItemProps = {
        isLink: true,
        linkUrl: 'https://github.com/johndoe',
        iconComponent: mockIcon,
        text: 'GitHub Profile',
        dataTestId: 'github-link'
      }

      render(<HeaderItem {...props} />)

      const element = screen.getByTestId('github-link')
      expect(element).toBeInTheDocument()
      expect(element.tagName).toBe('A')
      expect(element).toHaveAttribute('href', 'https://github.com/johndoe')
      expect(element).toHaveTextContent('GitHub Profile')
    })

    test('should render anchor with correct linkUrl', () => {
      const props: HeaderItemProps = {
        isLink: true,
        linkUrl: 'mailto:john@example.com',
        iconComponent: mockIcon,
        text: 'john@example.com',
        dataTestId: 'email-link'
      }

      render(<HeaderItem {...props} />)

      const linkElement = screen.getByTestId('email-link') as HTMLAnchorElement
      expect(linkElement.href).toContain('mailto:john@example.com')
    })

    test('should render icon component in link', () => {
      const props: HeaderItemProps = {
        isLink: true,
        linkUrl: 'https://linkedin.com/in/johndoe',
        iconComponent: mockIcon,
        text: 'LinkedIn',
        dataTestId: 'linkedin-link'
      }

      render(<HeaderItem {...props} />)

      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
      expect(screen.getByTestId('linkedin-link')).toBeInTheDocument()
    })

    test('should render link without dataTestId when not provided', () => {
      const props: HeaderItemProps = {
        isLink: true,
        linkUrl: 'https://example.com',
        iconComponent: mockIcon,
        text: 'Website'
      }

      render(<HeaderItem {...props} />)

      const linkElement = screen.getByText('Website')
      expect(linkElement).toBeInTheDocument()
      expect(linkElement.tagName).toBe('SPAN')
      expect(linkElement.parentElement).toHaveAttribute('href', 'https://example.com')
    })

    test('should handle empty linkUrl', () => {
      const props: HeaderItemProps = {
        isLink: true,
        linkUrl: '',
        iconComponent: mockIcon,
        text: 'Empty Link',
        dataTestId: 'empty-link'
      }

      render(<HeaderItem {...props} />)

      const linkElement = screen.getByTestId('empty-link')
      expect(linkElement).toHaveAttribute('href', '')
    })
  })

  describe('icon rendering', () => {
    test('should render different icon components', () => {
      const customIcon = <div data-testid="custom-icon">Custom</div>

      const props: HeaderItemProps = {
        isLink: false,
        iconComponent: customIcon,
        text: 'Custom Icon Test',
        dataTestId: 'custom-test'
      }

      render(<HeaderItem {...props} />)

      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
      expect(screen.getByTestId('custom-test')).toBeInTheDocument()
    })

    test('should render complex icon component', () => {
      const complexIcon = (
        <span data-testid="complex-icon">
          <svg>Icon SVG</svg>
        </span>
      )

      const props: HeaderItemProps = {
        isLink: true,
        linkUrl: 'https://example.com',
        iconComponent: complexIcon,
        text: 'Complex Icon',
        dataTestId: 'complex-link'
      }

      render(<HeaderItem {...props} />)

      expect(screen.getByTestId('complex-icon')).toBeInTheDocument()
    })
  })

  describe('text content', () => {
    test('should render different text values', () => {
      const texts = [
        'john.doe@example.com',
        '+1 (555) 123-4567',
        '123 Main St, City, State',
        'https://portfolio.com'
      ]

      texts.forEach((text, index) => {
        const props: HeaderItemProps = {
          isLink: false,
          iconComponent: mockIcon,
          text: text,
          dataTestId: `test-${index}`
        }

        const { unmount } = render(<HeaderItem {...props} />)

        expect(screen.getByTestId(`test-${index}`)).toHaveTextContent(text)

        unmount()
      })
    })

    test('should handle special characters in text', () => {
      const props: HeaderItemProps = {
        isLink: false,
        iconComponent: mockIcon,
        text: 'Text with & special < characters >',
        dataTestId: 'special-chars'
      }

      render(<HeaderItem {...props} />)

      expect(screen.getByTestId('special-chars')).toHaveTextContent(
        'Text with & special < characters >'
      )
    })
  })

  describe('combined scenarios', () => {
    test('should render multiple HeaderItems as links', () => {
      const socialLinks = [
        { url: 'https://github.com/user', text: 'GitHub', testId: 'github' },
        { url: 'https://linkedin.com/in/user', text: 'LinkedIn', testId: 'linkedin' },
        { url: 'https://youtube.com/@user', text: 'YouTube', testId: 'youtube' }
      ]

      render(
        <div>
          {socialLinks.map((link) => (
            <HeaderItem
              key={link.testId}
              isLink={true}
              linkUrl={link.url}
              iconComponent={mockIcon}
              text={link.text}
              dataTestId={link.testId}
            />
          ))}
        </div>
      )

      socialLinks.forEach((link) => {
        const element = screen.getByTestId(link.testId)
        expect(element).toBeInTheDocument()
        expect(element.tagName).toBe('A')
        expect(element).toHaveAttribute('href', link.url)
        expect(element).toHaveTextContent(link.text)
      })
    })

    test('should render multiple HeaderItems as divs', () => {
      const contactInfo = [
        { text: 'john@example.com', testId: 'email-span' },
        { text: '+1-555-1234', testId: 'phone-span' },
        { text: 'New York, NY', testId: 'location-span' }
      ]

      render(
        <div>
          {contactInfo.map((info) => (
            <HeaderItem
              key={info.testId}
              isLink={false}
              iconComponent={mockIcon}
              text={info.text}
              dataTestId={info.testId}
            />
          ))}
        </div>
      )

      contactInfo.forEach((info) => {
        const element = screen.getByTestId(info.testId)
        expect(element).toBeInTheDocument()
        expect(element.tagName).toBe('DIV')
        expect(element).toHaveTextContent(info.text)
      })
    })
  })
})