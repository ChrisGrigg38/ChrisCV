import { ATSElements, PersonalInfo } from "@/types/types";

export const formatDate = (date: moment.Moment | null): string => {
    if (!date) return "Present";
    return date.format("MMM YYYY")
};

const hideATSElements = async (containerElement: HTMLElement) => {
    // Find all elements that are for ATS to read.
    const atsTextElements = containerElement.querySelectorAll('[data-ats]');
  
    // 1. Store original text and temporarily clear it
    const originalTexts: ATSElements[] = [];
    atsTextElements.forEach(el => {
        originalTexts.push({
            element: el,
            text: el.textContent,
            innerHTML: el.innerHTML
        } as ATSElements);
        (el as HTMLElement).style.visibility = 'hidden';
    });
  
    // Small delay to ensure DOM updates
    await new Promise(resolve => setTimeout(resolve, 50));

    return originalTexts
}

const addTextOverlays = (pdf: any, originalTexts: ATSElements[], containerElement: HTMLElement, currentPageStart: number, currentPageHeight: number, pdfWidth: number, pdfHeight: number) => {

    const containerRect = containerElement.getBoundingClientRect();

    const scaleX = pdfWidth / containerElement.offsetWidth;
    const scaleY = pdfHeight / containerElement.offsetHeight;

    // 4. Add text overlays to PDF
    originalTexts.forEach(({ element: el, text }) => {
        const rect = el.getBoundingClientRect();
        
        const x = (rect.left - containerRect.left) * scaleX;
        const y = (rect.top - containerRect.top) * scaleY;
        const realY = y - currentPageStart
        const width = rect.width * scaleX;

        if(y < currentPageStart || y > currentPageHeight) return;
    
        // Get computed styles
        const computedStyle = window.getComputedStyle(el);
        const fontSize = parseFloat(computedStyle.fontSize);
        const fontWeight = parseFloat(computedStyle.fontWeight);
        const color = computedStyle.color;
        const textAlign = computedStyle.textAlign;

        //find out if we have some overrides for this
        const extraPaddingLeft = el.getAttribute('data-ats-paddingleft')
        const noWrap = el.getAttribute('data-ats-nowrap')
        const overrideLink = el.getAttribute('data-ats-overridelink')
        const extraLinkPaddingTop = el.getAttribute('data-ats-linkpaddingtop')
        
        // Convert to PDF units
        const pdfFontSize = fontSize * 0.5
        const pdfLineHeight = fontSize * 0.352778;
    
        // Set font properties
        pdf.setFontSize(pdfFontSize);
        pdf.setFont('helvetica', fontWeight >= 600 ? 'bold' : 'normal');
    
        // Set text color
        const rgb = color.match(/\d+/g);
        if (rgb) {
            pdf.setTextColor(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]));
        }
    
        // Handle text alignment
        let alignX = x + (extraPaddingLeft ? parseFloat(extraPaddingLeft) : 0); // Small left padding
        let alignH = 'left';
    
        if (textAlign === 'center') {
            alignX = x + width / 2;
            alignH = 'center';
        } else if (textAlign === 'right') {
            alignX = x + width - 1; // Small right padding
            alignH = 'right';
        }

        //vertical alignment
        let alignY = realY + (pdfLineHeight / 2);
    
        // Split text to fit width and handle multi-line
        const lines = noWrap ? [text] : pdf.splitTextToSize(text.trim(), width) as string[]; // -2mm for padding
    
        const isLink = el.tagName === 'a'

        lines.forEach((line, index) => {
            const textY = (alignY) + (index * pdfLineHeight);
            pdf.text(line, alignX, textY, { alignH });

            if(isLink) {
                pdf.link(alignX, textY + (extraLinkPaddingTop ? parseFloat(extraLinkPaddingTop) : 0), width, pdfLineHeight, { url: el.getAttribute('href') });
            }

            if(overrideLink) {
                pdf.link(alignX, textY + (extraLinkPaddingTop ? parseFloat(extraLinkPaddingTop) : 0), width, pdfLineHeight, { url: overrideLink });
            }
        });
        
  });
}

const restoreAtsOverlays = (originalTexts: ATSElements[]) => {

    // 5. Restore original text to the webpage
  originalTexts.forEach(({ element, innerHTML }) => {
    element.innerHTML = innerHTML;
    element.style.visibility = '';
  });

}

export const exportPDF = async (personalInfo: PersonalInfo) => {
    try {
        const element = document.getElementById('cv-content');
        if (!element) return;

        //if you don't do this, weird things happen with alignment of text
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');

        //Hide all ATS text elements
        const atsElements = await hideATSElements(element)

        // Init jsPDF
        const jsPDF = (window as any).jspdf.jsPDF;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Use html2canvas and jspdf from CDN
        const html2canvas = (window as any).html2canvas;
        
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = pdfWidth / imgWidth;

        // Calculate how many pages we need
        const scaledHeight = imgHeight * ratio;
        let heightLeft = scaledHeight;
        let position = 0;
        let currentPageHeight = pdfHeight;
        let currentPageStart = 0;

        // Add first page
        pdf.addImage(imgData, 'JPG', 0, position, pdfWidth, scaledHeight, null, 'FAST');
        heightLeft -= pdfHeight;

        addTextOverlays(pdf, atsElements, element, currentPageStart, currentPageHeight, pdfWidth, scaledHeight)
        
        // Add additional pages if content is longer than one page
        while (heightLeft > 0) {
            position = heightLeft - scaledHeight;
            currentPageHeight += pdfHeight;
            currentPageStart += pdfHeight;

            pdf.addPage();
            pdf.addImage(imgData, 'JPG', 0, position, pdfWidth, scaledHeight, null, 'FAST');

            addTextOverlays(pdf, atsElements, element, currentPageStart, currentPageHeight, pdfWidth, scaledHeight)
        
            heightLeft -= pdfHeight;
        }

        restoreAtsOverlays(atsElements)

        pdf.save(`${personalInfo.name.replace(' ', '_')}_CV.pdf`);
    } catch (error) {
        throw error
    }
}