  
  /**
   * Helper function to get text content without processing nested lists
  */
  const getTextContent = (element: Element): string => {
    let text = '';
    element.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        text += child.textContent || '';
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as Element;
        // Skip nested lists
        if (el.tagName.toLowerCase() !== 'ul' && 
            el.tagName.toLowerCase() !== 'ol' && 
            el.tagName.toLowerCase() !== 'li') {
          text += getTextContent(el);
        }
      }
    });
    return text;
  };
  
  
  
/**
  Recursive function to process nodes
*/
const processNode = (node: Node, 
    depth: number = 0, 
    lines: string[], 
    listCounters: { [key: number]: number }): void => {
    
    // Plain node type
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) {
        lines.push(text);
      }
    } 
    
    // Complex Node
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      let processedNode = false
      
      if (tagName === 'br') {
        // For <br> tags, we want to ensure a line break
        // If the last line is empty, we don't add another
        if (lines.length === 0 || lines[lines.length - 1] !== '') {
          lines.push('');
        }

        processedNode = true;
      } 
      
      if (tagName === 'li') {
        // Handle list items with bullet points
        // Use bullet character • (U+2022)
        const bullet = '• ';
        
        // Get the text content of this list item
        const liText = getTextContent(element);
        if (liText.trim()) {
          lines.push(bullet + liText.trim());
        }

        processedNode = true;
      } 
      
      if (tagName === 'ol') {
        // Ordered list - use letters/numbers
        listCounters[depth] = 0;
        
        // Process each child li element
        Array.from(element.children).forEach((child) => {
          if (child.tagName.toLowerCase() === 'li') {
            listCounters[depth]++;
            const label = String.fromCharCode(96 + listCounters[depth]) + ') '; // a) b) c)
            const liText = getTextContent(child as Element);
            if (liText.trim()) {
              lines.push(label + liText.trim());
            }
          }
        });

        processedNode = true;
      }
      
      if (tagName === 'ul') {
        // Unordered list - already handled by li processing
        Array.from(element.children).forEach((child) => {
          if (child.tagName.toLowerCase() === 'li') {
            const bullet = '• ';
            const liText = getTextContent(child as Element);
            if (liText.trim()) {
              lines.push("")
              lines.push(bullet + liText.trim());
            }
          }
        });

        processedNode = true;
      } 
      
      if (!processedNode) {
        // For other elements, process children recursively
        node.childNodes.forEach((child) => processNode(child, depth + 1, lines, listCounters));
      }
    }
};


export const formatHTMLToPdfTexts = (html: string): string[] => {
  
    // Create a temporary DOM element to parse the HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  const lines: string[] = [];
  const listCounters: { [key: number]: number } = {};
  
  // Process the body content
  processNode(doc.body, 0, lines, listCounters);
  
  // Filter out empty strings at the end, but keep intentional line breaks
  while (lines.length > 0 && lines[lines.length - 1] === '') {
    lines.pop();
  }
  
  return lines;
};