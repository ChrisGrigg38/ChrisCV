import { formatHTMLToPdfTexts } from './pdfformat';

describe('formatHTMLToPdfTexts', () => {
  describe('plain text handling', () => {
    test('handles simple text content', () => {
      const html = 'Simple text';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Simple text']);
    });

    test('trims whitespace from text nodes', () => {
      const html = '   Text with spaces   ';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Text with spaces']);
    });

    test('handles multiple text nodes', () => {
      const html = '<div>First text</div><div>Second text</div>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['First text', 'Second text']);
    });

    test('ignores empty text nodes', () => {
      const html = '<div>   </div><div>Real text</div><div>   </div>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Real text']);
    });

    test('handles text within nested elements', () => {
      const html = '<div><span>Nested</span> <strong>text</strong></div>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Nested', 'text']);
    });
  });

  describe('line break handling', () => {
    test('converts <br> tags to empty lines', () => {
      const html = 'Line 1<br>Line 2';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Line 1', '', 'Line 2']);
    });

    test('does not add multiple empty lines for consecutive <br> tags', () => {
      const html = 'Text<br><br>More text';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Text', '', 'More text']);
    });

    test('handles <br> at the beginning', () => {
      const html = '<br>Text after break';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['', 'Text after break']);
    });

    test('handles <br> at the end', () => {
      const html = 'Text before break<br>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Text before break']);
    });
  });

  describe('unordered list handling', () => {
    test('adds bullet points to list items', () => {
      const html = '<ul><li>First item</li><li>Second item</li></ul>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([
        '',
        '• First item',
        '',
        '• Second item'
      ]);
    });

    test('handles single list item', () => {
      const html = '<ul><li>Only item</li></ul>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['', '• Only item']);
    });

    test('trims whitespace in list items', () => {
      const html = '<ul><li>  Item with spaces  </li></ul>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['', '• Item with spaces']);
    });

    test('ignores empty list items', () => {
      const html = '<ul><li>Valid item</li><li>   </li><li>Another item</li></ul>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([
        '',
        '• Valid item',
        '',
        '• Another item'
      ]);
    });

    test('handles list items with nested elements', () => {
      const html = '<ul><li><strong>Bold</strong> and <em>italic</em> text</li></ul>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['', '• Bold and italic text']);
    });
  });

  describe('ordered list handling', () => {
    test('adds letter labels to ordered list items', () => {
      const html = '<ol><li>First item</li><li>Second item</li><li>Third item</li></ol>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([
        'a) First item',
        'b) Second item',
        'c) Third item'
      ]);
    });

    test('handles single ordered list item', () => {
      const html = '<ol><li>Only item</li></ol>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['a) Only item']);
    });

    test('generates sequential letters correctly', () => {
      const html = '<ol><li>A</li><li>B</li><li>C</li><li>D</li><li>E</li></ol>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([
        'a) A',
        'b) B',
        'c) C',
        'd) D',
        'e) E'
      ]);
    });

    test('trims whitespace in ordered list items', () => {
      const html = '<ol><li>  Item with spaces  </li></ol>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['a) Item with spaces']);
    });

    test('ignores empty ordered list items', () => {
      const html = '<ol><li>Item 1</li><li>   </li><li>Item 2</li></ol>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([
        'a) Item 1',
        'c) Item 2'
      ]);
    });
  });

  describe('nested list handling', () => {
    test('does not process nested unordered lists within list items', () => {
      const html = `
        <ul>
          <li>
            Parent item
            <ul>
              <li>Nested item</li>
            </ul>
          </li>
        </ul>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      // Nested lists should be skipped by getTextContent
      expect(result).toEqual(['', '• Parent item']);
    });

    test('does not process nested ordered lists within list items', () => {
      const html = `
        <ul>
          <li>
            Parent item
            <ol>
              <li>Nested item</li>
            </ol>
          </li>
        </ul>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['', '• Parent item']);
    });

    test('handles mixed nested lists', () => {
      const html = `
        <ol>
          <li>
            Ordered parent
            <ul>
              <li>Unordered nested</li>
            </ul>
          </li>
        </ol>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['a) Ordered parent']);
    });
  });

  describe('complex HTML structures', () => {
    test('handles mixed content with text and lists', () => {
      const html = `
        <div>Introduction text</div>
        <ul>
          <li>First point</li>
          <li>Second point</li>
        </ul>
        <div>Conclusion text</div>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([
        'Introduction text',
        '',
        '• First point',
        '',
        '• Second point',
        'Conclusion text'
      ]);
    });

    test('handles multiple lists', () => {
      const html = `
        <ul>
          <li>Unordered 1</li>
        </ul>
        <ol>
          <li>Ordered 1</li>
        </ol>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([
        '',
        '• Unordered 1',
        'a) Ordered 1'
      ]);
    });

    test('handles deeply nested non-list elements', () => {
      const html = `
        <div>
          <section>
            <article>
              <p>Deeply nested text</p>
            </article>
          </section>
        </div>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Deeply nested text']);
    });

    test('handles elements with mixed inline and block content', () => {
      const html = `
        <div>
          Text with <strong>bold</strong> and <em>italic</em>
          <br>
          On a new line
        </div>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([
        'Text with',
        'bold',
        'and',
        'italic',
        '',
        'On a new line'
      ]);
    });
  });

  describe('edge cases', () => {
    test('handles empty HTML', () => {
      const html = '';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([]);
    });

    test('handles HTML with only whitespace', () => {
      const html = '   \n\n   ';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([]);
    });

    test('handles HTML with only <br> tags', () => {
      const html = '<br><br><br>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([]);
    });

    test('handles malformed HTML gracefully', () => {
      const html = '<div>Unclosed div';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Unclosed div']);
    });

    test('removes trailing empty lines', () => {
      const html = 'Text<br><br>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Text']);
    });

    test('handles HTML entities', () => {
      const html = 'Text with &amp; ampersand &lt; and &gt; symbols';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Text with & ampersand < and > symbols']);
    });

    test('handles unicode characters', () => {
      const html = 'Text with émojis 🎉 and spëcial çhars';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['Text with émojis 🎉 and spëcial çhars']);
    });
  });

  describe('list item content extraction', () => {
    test('extracts text from list items with inline elements', () => {
      const html = '<ul><li><span>Span text</span> and <strong>bold</strong></li></ul>';
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['', '• Span text and bold']);
    });

    test('skips nested lists when extracting li content', () => {
      const html = `
        <ul>
          <li>
            Main text
            <ul><li>Should not appear</li></ul>
            More main text
          </li>
        </ul>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result[1]).toContain('• Main text');
      expect(result[1]).toContain('More main text');
      expect(result[1]).not.toContain('Should not appear');
    });

    test('handles list items with multiple child elements', () => {
      const html = `
        <ul>
          <li>
            <div>First div</div>
            <div>Second div</div>
          </li>
        </ul>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual(['', '• First div\n            Second div']);
    });
  });

  describe('real-world scenarios', () => {
    test('formats a typical job description', () => {
      const html = `
        <div>Senior Software Engineer</div>
        <ul>
          <li>Led development of microservices architecture</li>
          <li>Mentored junior developers</li>
          <li>Improved system performance by 40%</li>
        </ul>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([
        'Senior Software Engineer',
        '',
        '• Led development of microservices architecture',
        '',
        '• Mentored junior developers',
        '',
        '• Improved system performance by 40%'
      ]);
    });

    test('formats educational achievements', () => {
      const html = `
        <div>Bachelor of Science in Computer Science</div>
        <ol>
          <li>Graduated with honors</li>
          <li>GPA: 3.8/4.0</li>
          <li>Dean's List all semesters</li>
        </ol>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toEqual([
        'Bachelor of Science in Computer Science',
        'a) Graduated with honors',
        'b) GPA: 3.8/4.0',
        'c) Dean\'s List all semesters'
      ]);
    });

    test('formats mixed content sections', () => {
      const html = `
        <div><strong>Skills</strong></div>
        <div>Programming Languages:</div>
        <ul>
          <li>JavaScript/TypeScript</li>
          <li>Python</li>
        </ul>
        <div>Frameworks:</div>
        <ul>
          <li>React</li>
          <li>Node.js</li>
        </ul>
      `;
      const result = formatHTMLToPdfTexts(html);
      
      expect(result).toContain('Skills');
      expect(result).toContain('Programming Languages:');
      expect(result).toContain('• JavaScript/TypeScript');
      expect(result).toContain('• Python');
    });
  });
});