import { render } from '@testing-library/react'
import RichText from './RichText'

describe('render RichText Component', () => {
    describe('Basic Rendering', () => {
        test('should render plain text correctly', () => {
            const text = 'Hello World'
            const { container } = render(<RichText text={text} />)
            
            expect(container.textContent).toBe(text)
        })

        test('should render an empty string', () => {
            const { container } = render(<RichText text="" />)
            
            expect(container.textContent).toBe('')
        })

        test('should render simple HTML tags', () => {
            const text = '<p>This is a paragraph</p>'
            const { container } = render(<RichText text={text} />)
            
            const paragraph = container.querySelector('p')
            expect(paragraph).toBeInTheDocument()
            expect(paragraph?.textContent).toBe('This is a paragraph')
        })

        test('should render multiple HTML elements', () => {
            const text = '<h1>Title</h1><p>Paragraph</p><ul><li>Item 1</li><li>Item 2</li></ul>'
            const { container } = render(<RichText text={text} />)
            
            expect(container.querySelector('h1')).toBeInTheDocument()
            expect(container.querySelector('p')).toBeInTheDocument()
            expect(container.querySelector('ul')).toBeInTheDocument()
            expect(container.querySelectorAll('li')).toHaveLength(2)
        })
    })

    describe('performs HTML Sanitization', () => {
        test('should sanitize script tags', () => {
            const text = '<p>Safe text</p><script>alert("XSS")</script>'
            const { container } = render(<RichText text={text} />)
            
            expect(container.querySelector('script')).not.toBeInTheDocument()
            expect(container.textContent).toBe('Safe text')
        })

        test('should sanitize onclick handlers', () => {
            const text = '<button onclick="alert(\'XSS\')">Click me</button>'
            const { container } = render(<RichText text={text} />)
            
            const button = container.querySelector('button')
            expect(button).toBeInTheDocument()
            expect(button?.hasAttribute('onclick')).toBe(false)
        })

        test('should sanitize onerror attributes', () => {
            const text = '<img src="invalid.jpg" onerror="alert(\'XSS\')" alt="test" />'
            const { container } = render(<RichText text={text} />)
            
            const img = container.querySelector('img')
            expect(img).toBeInTheDocument()
            expect(img?.hasAttribute('onerror')).toBe(false)
        })

        test('should sanitize javascript: URLs', () => {
            const text = '<a href="javascript:alert(\'XSS\')">Click</a>'
            const { container } = render(<RichText text={text} />)
            
            const link = container.querySelector('a')
            expect(link).toBeInTheDocument()
            expect(link?.getAttribute('href')).toEqual(null)
        })

        test('should remove iframe tags', () => {
            const text = '<p>Content</p><iframe src="https://evil.com"></iframe>'
            const { container } = render(<RichText text={text} />)
            
            expect(container.querySelector('iframe')).not.toBeInTheDocument()
            expect(container.textContent).toBe('Content')
        })

        test('should sanitize multiple dangerous elements', () => {
            const text = `
                <p>Safe content</p>
                <script>malicious()</script>
                <div onclick="bad()">Click</div>
                <iframe src="evil.com"></iframe>
            `
            const { container } = render(<RichText text={text} />)
            
            expect(container.querySelector('script')).not.toBeInTheDocument()
            expect(container.querySelector('iframe')).not.toBeInTheDocument()
            expect(container.querySelector('div')?.hasAttribute('onclick')).toBe(false)
            expect(container.textContent).toContain('Safe content')
        })
    })

    describe('Test Safe HTML Elements', () => {
        test('should allow safe formatting tags', () => {
            const text = '<strong>Bold</strong> <em>Italic</em> <u>Underline</u>'
            const { container } = render(<RichText text={text} />)
            
            expect(container.querySelector('strong')).toBeInTheDocument()
            expect(container.querySelector('em')).toBeInTheDocument()
            expect(container.querySelector('u')).toBeInTheDocument()
            expect(container.textContent).toBe('Bold Italic Underline')
        })

        test('should allow safe links with href', () => {
            const text = '<a href="https://example.com">Link</a>'
            const { container } = render(<RichText text={text} />)
            
            const link = container.querySelector('a')
            expect(link).toBeInTheDocument()
            expect(link?.getAttribute('href')).toBe('https://example.com')
            expect(link?.textContent).toBe('Link')
        })

        test('should allow nested safe elements', () => {
            const text = '<div><p><strong>Bold text</strong> in a paragraph</p></div>'
            const { container } = render(<RichText text={text} />)
            
            expect(container.querySelector('div')).toBeInTheDocument()
            expect(container.querySelector('p')).toBeInTheDocument()
            expect(container.querySelector('strong')).toBeInTheDocument()
            expect(container.textContent).toBe('Bold text in a paragraph')
        })

        test('should allow lists', () => {
            const text = `
                <ul>
                    <li>First item</li>
                    <li>Second item</li>
                </ul>
            `
            const { container } = render(<RichText text={text} />)
            
            const listItems = container.querySelectorAll('li')
            expect(listItems).toHaveLength(2)
            expect(listItems[0].textContent).toContain('First item')
            expect(listItems[1].textContent).toContain('Second item')
        })
    })

    describe('Test Edge Cases', () => {
        test('should handle malformed HTML', () => {
            const text = '<p>Unclosed paragraph'
            const { container } = render(<RichText text={text} />)
            
            expect(container.textContent).toBe('Unclosed paragraph')
        })

        test('should handle HTML entities', () => {
            const text = '<p>&lt;script&gt; &amp; &quot;quotes&quot;</p>'
            const { container } = render(<RichText text={text} />)
            
            expect(container.textContent).toContain('<script>')
            expect(container.textContent).toContain('&')
            expect(container.textContent).toContain('"quotes"')
        })

        test('should handle text with special characters', () => {
            const text = '<p>Price: $100 & €50</p>'
            const { container } = render(<RichText text={text} />)
            
            expect(container.textContent).toBe('Price: $100 & €50')
        })

        test('should handle very long text', () => {
            const longText = '<p>' + 'a'.repeat(10000) + '</p>'
            const { container } = render(<RichText text={longText} />)
            
            expect(container.querySelector('p')).toBeInTheDocument()
            expect(container.textContent?.length).toBe(10000)
        })

        test('should handle mixed safe and unsafe content', () => {
            const text = `
                <h2>Title</h2>
                <script>alert('xss')</script>
                <p onclick="bad()">Paragraph</p>
                <strong>Bold text</strong>
            `
            const { container } = render(<RichText text={text} />)
            
            expect(container.querySelector('h2')).toBeInTheDocument()
            expect(container.querySelector('strong')).toBeInTheDocument()
            expect(container.querySelector('script')).not.toBeInTheDocument()
            expect(container.querySelector('p')?.hasAttribute('onclick')).toBe(false)
        })
    })

    describe('Content Verification', () => {
        test('should preserve text content while removing dangerous tags', () => {
            const text = '<p>Before</p><script>alert("danger")</script><p>After</p>'
            const { container } = render(<RichText text={text} />)
            
            expect(container.textContent).toBe('BeforeAfter')
        })

        test('should handle CV-related rich text content', () => {
            const text = `
                <h3>Senior Developer</h3>
                <ul>
                    <li>Led team of <strong>5 developers</strong></li>
                    <li>Improved performance by <em>40%</em></li>
                </ul>
            `
            const { container } = render(<RichText text={text} />)
            
            expect(container.querySelector('h3')).toBeInTheDocument()
            expect(container.querySelector('ul')).toBeInTheDocument()
            expect(container.querySelector('strong')?.textContent).toBe('5 developers')
            expect(container.querySelector('em')?.textContent).toBe('40%')
        })
    })
})