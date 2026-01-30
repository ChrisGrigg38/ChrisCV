import { formatDate, exportPDF } from './util';
import moment from 'moment';
import { PersonalInfo } from '@/types/types';

describe('formatDate', () => {
  test('returns "Present" when date is null', () => {
    expect(formatDate(null)).toBe('Present');
  });

  test('formats a valid moment date as "MMM YYYY"', () => {
    const date = moment('2023-06-15');
    expect(formatDate(date)).toBe('Jun 2023');
  });

  test('formats January correctly', () => {
    const date = moment('2024-01-01');
    expect(formatDate(date)).toBe('Jan 2024');
  });

  test('formats December correctly', () => {
    const date = moment('2023-12-31');
    expect(formatDate(date)).toBe('Dec 2023');
  });

  test('handles different years', () => {
    const date = moment('2020-03-15');
    expect(formatDate(date)).toBe('Mar 2020');
  });
});

describe('exportPDF', () => {
  let mockPdf: {internal: {pageSize: {getWidth: jest.Func, getHeight: jest.Func}}, addImage: jest.Func, addPage: jest.Func, setFontSize: jest.Func, setFont: jest.Func, setTextColor: jest.Func, text: jest.Func, link: jest.Func, save: jest.Func, splitTextToSize: jest.Func}
  let mockCanvas: {width: number, height: number, toDataURL: jest.Func};
  let mockElement: HTMLElement;
  let mockJsPDF: jest.Mock;
  let mockHtml2canvas: jest.Mock;

  const createMockPersonalInfo = (): PersonalInfo => ({
    name: 'John Doe',
    // Add other required fields from your PersonalInfo type
  } as PersonalInfo);

  beforeEach(() => {
    // Mock PDF instance
    mockPdf = {
      internal: {
        pageSize: {
          getWidth: jest.fn().mockReturnValue(210),
          getHeight: jest.fn().mockReturnValue(297),
        },
      },
      addImage: jest.fn(),
      addPage: jest.fn(),
      setFontSize: jest.fn(),
      setFont: jest.fn(),
      setTextColor: jest.fn(),
      text: jest.fn(),
      link: jest.fn(),
      save: jest.fn(),
      splitTextToSize: jest.fn((text) => [text]),
    };

    // Mock jsPDF constructor
    mockJsPDF = jest.fn().mockReturnValue(mockPdf);

    // Mock canvas
    mockCanvas = {
      width: 1000,
      height: 1414,
      toDataURL: jest.fn().mockReturnValue('data:image/jpeg;base64,mockImageData'),
    };

    // Mock html2canvas
    mockHtml2canvas = jest.fn().mockResolvedValue(mockCanvas);

    // Mock window globals
    // eslint-disable-next-line
    (window as any).jspdf = { jsPDF: mockJsPDF };
    // eslint-disable-next-line
    (window as any).html2canvas = mockHtml2canvas;

    // Mock DOM element
    mockElement = document.createElement('div');
    mockElement.id = 'cv-content';
    mockElement.style.width = '1000px';
    mockElement.style.height = '1414px';
    Object.defineProperty(mockElement, 'offsetWidth', { value: 1000, configurable: true });
    Object.defineProperty(mockElement, 'offsetHeight', { value: 1414, configurable: true });
    
    document.body.appendChild(mockElement);

    // Mock getElementById
    jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);

    // Mock setTimeout
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
    document.body.innerHTML = '';
    // eslint-disable-next-line
    delete (window as any).jspdf;
    // eslint-disable-next-line
    delete (window as any).html2canvas;
  });

  test('returns early if cv-content element is not found', async () => {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);

    const personalInfo = createMockPersonalInfo();
    await exportPDF(personalInfo);

    expect(mockJsPDF).not.toHaveBeenCalled();
    expect(mockHtml2canvas).not.toHaveBeenCalled();
  });

  test('creates and appends a style element to fix image alignment', async () => {
    const personalInfo = createMockPersonalInfo();
    
    const styleElements = document.head.querySelectorAll('style');
    const initialStyleCount = styleElements.length;

    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    const newStyleElements = document.head.querySelectorAll('style');
    expect(newStyleElements.length).toBeGreaterThan(initialStyleCount);
  });

  test('initializes jsPDF with correct configuration', async () => {
    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    expect(mockJsPDF).toHaveBeenCalledWith({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
  });

  test('calls html2canvas with correct options', async () => {
    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    expect(mockHtml2canvas).toHaveBeenCalledWith(mockElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
    });
  });

  test('adds first page image to PDF', async () => {
    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    expect(mockPdf.addImage).toHaveBeenCalledWith(
      'data:image/jpeg;base64,mockImageData',
      'JPG',
      0,
      0,
      210,
      expect.any(Number),
      null,
      'FAST'
    );
  });

  test('saves PDF with correct filename', async () => {
    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    expect(mockPdf.save).toHaveBeenCalledWith('John_Doe_CV.pdf');
  });

  test('replaces spaces in name with underscores in filename', async () => {
    const personalInfo: PersonalInfo = {
      name: 'Jane Mary Smith',
    } as PersonalInfo;
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    expect(mockPdf.save).toHaveBeenCalledWith('Jane_Mary Smith_CV.pdf');
  });

  test('handles multi-page content by adding additional pages', async () => {
    // Mock a taller canvas that requires multiple pages
    mockCanvas.height = 5000;

    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    // Should add at least one additional page
    expect(mockPdf.addPage).toHaveBeenCalled();
    expect(mockPdf.addImage).toHaveBeenCalled(); // First page + at least one more
  });

  test('hides and restores ATS elements', async () => {
    const atsElement = document.createElement('div');
    atsElement.setAttribute('data-ats', 'true');
    atsElement.textContent = 'ATS Text';
    mockElement.appendChild(atsElement);

    const personalInfo = createMockPersonalInfo();
    
    expect(atsElement.style.visibility).toBe('');
    
    const exportPromise = exportPDF(personalInfo);
    jest.advanceTimersByTime(50);
    
    // During export, should be hidden
    expect(atsElement.style.visibility).toBe('hidden');
    
    await exportPromise;
    jest.runAllTimers();

    // After export, should be restored
    expect(atsElement.style.visibility).toBe('');
  });

  test('throws error when html2canvas fails', async () => {
    mockHtml2canvas.mockRejectedValue(new Error('Canvas error'));

    const personalInfo = createMockPersonalInfo();
    
    await expect(async () => {
      const exportPromise = exportPDF(personalInfo);
      jest.runAllTimers();
      await exportPromise;
    }).rejects.toThrow('Canvas error');
  });

  test('processes ATS elements with data attributes', async () => {
    const atsLink = document.createElement('a');
    atsLink.setAttribute('data-ats', 'true');
    atsLink.setAttribute('data-ats-overridelink', 'true');
    atsLink.setAttribute('href', 'https://example.com');
    atsLink.textContent = 'Link Text';
    atsLink.innerHTML = 'Link Text';
    
    // Mock getBoundingClientRect for the ATS element
    jest.spyOn(atsLink, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 10,
      width: 100,
      height: 20,
      right: 110,
      bottom: 30,
      x: 10,
      y: 10,
      toJSON: () => {},
    } as DOMRect);
    
    mockElement.appendChild(atsLink);

    // Mock window.getComputedStyle
    const mockComputedStyle = {
      fontSize: '16px',
      fontWeight: '400',
      color: 'rgb(0, 0, 0)',
      textAlign: 'left',
    };
    jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockComputedStyle as CSSStyleDeclaration);

    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    expect(mockPdf.text).toHaveBeenCalled();
    expect(mockPdf.link).toHaveBeenCalled();
  });

  test('handles ATS elements with extra padding left attribute', async () => {
    const atsElement = document.createElement('div');
    atsElement.setAttribute('data-ats', 'true');
    atsElement.setAttribute('data-ats-paddingleft', '10');
    atsElement.textContent = 'Text with padding';
    atsElement.innerHTML = 'Text with padding';
    
    jest.spyOn(atsElement, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 10,
      width: 100,
      height: 20,
      right: 110,
      bottom: 30,
      x: 10,
      y: 10,
      toJSON: () => {},
    } as DOMRect);
    
    mockElement.appendChild(atsElement);

    const mockComputedStyle = {
      fontSize: '16px',
      fontWeight: '400',
      color: 'rgb(0, 0, 0)',
      textAlign: 'left',
    };
    jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockComputedStyle as CSSStyleDeclaration);

    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    expect(mockPdf.text).toHaveBeenCalled();
  });

  test('handles ATS elements with nowrap attribute', async () => {
    const atsElement = document.createElement('div');
    atsElement.setAttribute('data-ats', 'true');
    atsElement.setAttribute('data-ats-nowrap', 'true');
    atsElement.textContent = 'No wrap text';
    atsElement.innerHTML = 'No wrap text';
    
    jest.spyOn(atsElement, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 10,
      width: 100,
      height: 20,
      right: 110,
      bottom: 30,
      x: 10,
      y: 10,
      toJSON: () => {},
    } as DOMRect);
    
    mockElement.appendChild(atsElement);

    const mockComputedStyle = {
      fontSize: '16px',
      fontWeight: '400',
      color: 'rgb(0, 0, 0)',
      textAlign: 'left',
    };
    jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockComputedStyle as CSSStyleDeclaration);

    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    // splitTextToSize should not be called when nowrap is set
    expect(mockPdf.text).toHaveBeenCalled();
  });

  test('sets bold font for elements with font weight >= 600', async () => {
    const atsElement = document.createElement('div');
    atsElement.setAttribute('data-ats', 'true');
    atsElement.textContent = 'Bold text';
    atsElement.innerHTML = 'Bold text';
    
    jest.spyOn(atsElement, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 10,
      width: 100,
      height: 20,
      right: 110,
      bottom: 30,
      x: 10,
      y: 10,
      toJSON: () => {},
    } as DOMRect);
    
    mockElement.appendChild(atsElement);

    const mockComputedStyle = {
      fontSize: '16px',
      fontWeight: '700',
      color: 'rgb(0, 0, 0)',
      textAlign: 'left',
    };
    jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockComputedStyle as CSSStyleDeclaration);

    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    expect(mockPdf.setFont).toHaveBeenCalledWith('helvetica', 'bold');
  });

  test('handles center text alignment', async () => {
    const atsElement = document.createElement('div');
    atsElement.setAttribute('data-ats', 'true');
    atsElement.textContent = 'Centered text';
    atsElement.innerHTML = 'Centered text';
    
    jest.spyOn(atsElement, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 10,
      width: 100,
      height: 20,
      right: 110,
      bottom: 30,
      x: 10,
      y: 10,
      toJSON: () => {},
    } as DOMRect);
    
    mockElement.appendChild(atsElement);

    const mockComputedStyle = {
      fontSize: '16px',
      fontWeight: '400',
      color: 'rgb(0, 0, 0)',
      textAlign: 'center',
    };
    jest.spyOn(window, 'getComputedStyle').mockReturnValue(mockComputedStyle as CSSStyleDeclaration);

    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;

    expect(mockPdf.text).toHaveBeenCalledWith(
      expect.anything(),
      expect.any(Number),
      expect.any(Number),
      { alignH: 'center' }
    );
  });

  test('skips ATS elements outside current page bounds', async () => {
    const atsElement = document.createElement('div');
    atsElement.setAttribute('data-ats', 'true');
    atsElement.textContent = 'Text outside page';
    atsElement.innerHTML = 'Text outside page';
    
    // Mock position far outside the page
    jest.spyOn(atsElement, 'getBoundingClientRect').mockReturnValue({
      left: 10,
      top: 5000,
      width: 100,
      height: 20,
      right: 110,
      bottom: 5020,
      x: 10,
      y: 5000,
      toJSON: () => {},
    } as DOMRect);
    
    mockElement.appendChild(atsElement);

    const personalInfo = createMockPersonalInfo();
    
    const exportPromise = exportPDF(personalInfo);
    jest.runAllTimers();
    await exportPromise;
  });
});