import { PersonalInfo } from "@/types/types";

export const formatDate = (date: moment.Moment | null): string => {
    if (!date) return "Present";
    return date.format("MMM YYYY")
};

const findLinks = (ratio: number) => {
    const links = document.querySelectorAll('a')
    const cvContent = document.querySelector('#cv-content')

    const offsetX = 33.94;
    const offsetY = 18.94;
    ratio = ratio * 2;

    const linksMapped = cvContent && Object.entries(links).map((item) => {
        return {
            x: ((item[1].offsetLeft) * ratio) - offsetX,
            y: ((item[1].offsetTop) * ratio) - offsetY,
            width: item[1].offsetWidth * ratio,
            height: 5,
            url: item[1].getAttribute('href')
        }
    });

    return linksMapped
}

export const exportPDF = async (personalInfo: PersonalInfo) => {
    try {
        const element = document.getElementById('cv-content');
        if (!element) return;

        //if you don't do this, weird things happen with alignment of text
        const style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet?.insertRule('body > div:last-child img { display: inline-block; }');

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

        // Find all links and then add them to the PDF
        const links = findLinks(ratio)

        // Add links to first page
        links?.forEach(link => {
            if(link.y < currentPageHeight) {
                pdf.link(link.x, link.y, link.width, link.height, { url: link.url });
            }
        });

        // Add additional pages if content is longer than one page
        while (heightLeft > 0) {
            position = heightLeft - scaledHeight;
            currentPageHeight += pdfHeight;
            currentPageStart += pdfHeight;

            pdf.addPage();
            pdf.addImage(imgData, 'JPG', 0, position, pdfWidth, scaledHeight, null, 'FAST');

            // Add links to remaining pages
            links?.forEach(link => {
                if(link.y < currentPageHeight && link.y >= currentPageStart) {
                    pdf.link(link.x, link.y - currentPageStart, link.width, link.height, { url: link.url });
                }
            });

            heightLeft -= pdfHeight;
        }

        pdf.save(`${personalInfo.name.replace(' ', '_')}_CV.pdf`);
    } catch (error) {
        throw error
    }
}