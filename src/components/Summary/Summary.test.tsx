import { render, screen } from '@testing-library/react'
import Summary from './Summary'
import { PersonalInfo } from '../../types/types'

// Helper function to create mock PersonalInfo with default values
const createMockPersonalInfo = (overrides?: Partial<PersonalInfo>): PersonalInfo => ({
    summary: 'Default summary text',
    name: 'John Doe',
    photoUrl: 'https://example.com/photo.jpg',
    title: 'Software Engineer',
    email: 'john@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    youtube: 'https://youtube.com/@johndoe',
    ...overrides
})

describe('render Summary Component', () => {
    describe('Basic Rendering', () => {
        test('should render the summary element with data-testid', () => {
            const personalInfo = createMockPersonalInfo()
            
            render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
        })

        test('should render plain text summary', () => {
            const personalInfo = createMockPersonalInfo({
                summary: 'Experienced software engineer with 5 years of expertise'
            })
            
            render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toHaveTextContent('Experienced software engineer with 5 years of expertise')
        })

        test('should render empty summary', () => {
            const personalInfo = createMockPersonalInfo({
                summary: ''
            })
            
            render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            expect(summaryElement.textContent).toBe('')
        })
    })

    describe('Rich Text HTML Rendering', () => {
        test('should render summary with bold text', () => {
            const personalInfo = createMockPersonalInfo({
                summary: 'I am a <strong>senior developer</strong> with expertise'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            
            const strongElement = container.querySelector('strong')
            expect(strongElement).toBeInTheDocument()
            expect(strongElement?.textContent).toBe('senior developer')
        })

        test('should render summary with italic text', () => {
            const personalInfo = createMockPersonalInfo({
                summary: 'Passionate about <em>clean code</em> and best practices'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            
            const emElement = container.querySelector('em')
            expect(emElement).toBeInTheDocument()
            expect(emElement?.textContent).toBe('clean code')
        })

        test('should render summary with paragraph tags', () => {
            const personalInfo = createMockPersonalInfo({
                summary: '<p>First paragraph of experience.</p><p>Second paragraph of skills.</p>'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            
            const paragraphs = container.querySelectorAll('p')
            expect(paragraphs).toHaveLength(2)
            expect(paragraphs[0].textContent).toBe('First paragraph of experience.')
            expect(paragraphs[1].textContent).toBe('Second paragraph of skills.')
        })

        test('should render summary with lists', () => {
            const personalInfo = createMockPersonalInfo({
                summary: '<ul><li>Frontend development</li><li>Backend development</li><li>DevOps</li></ul>'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            
            const listItems = container.querySelectorAll('li')
            expect(listItems).toHaveLength(3)
            expect(listItems[0].textContent).toBe('Frontend development')
            expect(listItems[1].textContent).toBe('Backend development')
            expect(listItems[2].textContent).toBe('DevOps')
        })

        test('should render summary with links', () => {
            const personalInfo = createMockPersonalInfo({
                summary: 'Check out my work at <a href="https://portfolio.com">my portfolio</a>'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            
            const link = container.querySelector('a')
            expect(link).toBeInTheDocument()
            expect(link?.textContent).toBe('my portfolio')
            expect(link?.getAttribute('href')).toBe('https://portfolio.com')
        })

        test('should render summary with multiple HTML elements', () => {
            const personalInfo = createMockPersonalInfo({
                summary: '<p>I am a <strong>full-stack developer</strong> specializing in:</p><ul><li><em>React</em></li><li><em>Node.js</em></li></ul>'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            
            expect(container.querySelector('p')).toBeInTheDocument()
            expect(container.querySelector('strong')).toBeInTheDocument()
            expect(container.querySelector('ul')).toBeInTheDocument()
            expect(container.querySelectorAll('em')).toHaveLength(2)
        })

        test('should render summary with nested HTML elements', () => {
            const personalInfo = createMockPersonalInfo({
                summary: '<p>Experienced in <strong>JavaScript frameworks</strong> including <em>React</em> and <em>Vue</em></p>'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            
            const paragraph = container.querySelector('p')
            expect(paragraph).toBeInTheDocument()
            expect(paragraph?.querySelector('strong')).toBeInTheDocument()
            expect(paragraph?.querySelectorAll('em')).toHaveLength(2)
        })
    })

    describe('Complex Summaries', () => {
        test('should render a comprehensive professional summary', () => {
            const personalInfo = createMockPersonalInfo({
                summary: '<p><strong>Senior Full-Stack Developer</strong> with over 8 years of experience in building scalable web applications.</p><p>Specializing in:</p><ul><li>Frontend: <em>React, TypeScript, Next.js</em></li><li>Backend: <em>Node.js, Express, PostgreSQL</em></li><li>Cloud: <em>AWS, Docker, Kubernetes</em></li></ul><p>Passionate about clean code, testing, and mentoring junior developers.</p>'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            
            expect(container.querySelectorAll('p')).toHaveLength(3)
            expect(container.querySelector('ul')).toBeInTheDocument()
            expect(container.querySelectorAll('li')).toHaveLength(3)
            expect(container.querySelector('strong')).toBeInTheDocument()
        })

        test('should render summary with headings', () => {
            const personalInfo = createMockPersonalInfo({
                summary: '<h3>Professional Summary</h3><p>Experienced developer with a proven track record.</p>'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            
            const heading = container.querySelector('h3')
            expect(heading).toBeInTheDocument()
            expect(heading?.textContent).toBe('Professional Summary')
        })

        test('should render summary with line breaks', () => {
            const personalInfo = createMockPersonalInfo({
                summary: 'First line<br/>Second line<br/>Third line'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            
            const breaks = container.querySelectorAll('br')
            expect(breaks.length).toBeGreaterThan(0)
        })
    })

    describe('Text Content Verification', () => {
        test('should contain specific keywords in plain text', () => {
            const personalInfo = createMockPersonalInfo({
                summary: 'Experienced developer specializing in React and TypeScript'
            })
            
            render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement.textContent).toContain('React')
            expect(summaryElement.textContent).toContain('TypeScript')
            expect(summaryElement.textContent).toContain('Experienced')
        })

        test('should contain specific keywords in HTML content', () => {
            const personalInfo = createMockPersonalInfo({
                summary: '<p>Expert in <strong>React</strong> and <em>TypeScript</em></p>'
            })
            
            render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement.textContent).toContain('React')
            expect(summaryElement.textContent).toContain('TypeScript')
            expect(summaryElement.textContent).toContain('Expert')
        })

        test('should render full text content from complex HTML', () => {
            const personalInfo = createMockPersonalInfo({
                summary: '<p>Paragraph one</p><ul><li>Item A</li><li>Item B</li></ul><p>Paragraph two</p>'
            })
            
            render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            const textContent = summaryElement.textContent || ''
            
            expect(textContent).toContain('Paragraph one')
            expect(textContent).toContain('Item A')
            expect(textContent).toContain('Item B')
            expect(textContent).toContain('Paragraph two')
        })
    })

    describe('Edge Cases', () => {
        test('should handle very long summary text', () => {
            const longSummary = 'A'.repeat(5000)
            const personalInfo = createMockPersonalInfo({
                summary: longSummary
            })
            
            render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            expect(summaryElement.textContent?.length).toBe(5000)
        })

        test('should handle summary with special characters', () => {
            const personalInfo = createMockPersonalInfo({
                summary: 'Developer with expertise in C++, C#, and .NET frameworks & technologies'
            })
            
            render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement.textContent).toContain('C++')
            expect(summaryElement.textContent).toContain('C#')
            expect(summaryElement.textContent).toContain('&')
        })

        test('should handle summary with HTML entities', () => {
            const personalInfo = createMockPersonalInfo({
                summary: 'Experience with &lt;React&gt; &amp; &quot;TypeScript&quot;'
            })
            
            render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
        })

        test('should handle summary with only whitespace', () => {
            const personalInfo = createMockPersonalInfo({
                summary: '   '
            })
            
            render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
        })

        test('should handle summary with mixed text and HTML', () => {
            const personalInfo = createMockPersonalInfo({
                summary: 'Plain text before <strong>bold text</strong> and plain text after'
            })
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            expect(summaryElement.textContent).toContain('Plain text before')
            expect(summaryElement.textContent).toContain('bold text')
            expect(summaryElement.textContent).toContain('plain text after')
            expect(container.querySelector('strong')).toBeInTheDocument()
        })
    })

    describe('PersonalInfo Integration', () => {
        test('should render with complete PersonalInfo object', () => {
            const personalInfo: PersonalInfo = {
                summary: '<p>Experienced <strong>Software Engineer</strong></p>',
                name: 'Jane Smith',
                photoUrl: 'https://example.com/jane.jpg',
                title: 'Senior Developer',
                email: 'jane@example.com',
                phone: '+9876543210',
                address: '456 Tech Street, Innovation City',
                linkedin: 'https://linkedin.com/in/janesmith',
                github: 'https://github.com/janesmith',
                youtube: 'https://youtube.com/@janesmith'
            }
            
            const { container } = render(<Summary personalInfo={personalInfo} />)
            
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            expect(summaryElement.textContent).toContain('Experienced')
            expect(summaryElement.textContent).toContain('Software Engineer')
            expect(container.querySelector('strong')).toBeInTheDocument()
        })

        test('should only verify summary field, not other PersonalInfo fields', () => {
            const personalInfo = createMockPersonalInfo({
                summary: 'This is my professional summary'
            })
            
            render(<Summary personalInfo={personalInfo} />)
            
            // We only check that the summary is rendered
            const summaryElement = screen.getByTestId('summary')
            expect(summaryElement).toBeInTheDocument()
            expect(summaryElement.textContent).toBe('This is my professional summary')
            
            // We don't verify other fields like name, email, etc.
        })
    })
})