import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';
import { PersonalInfo } from '../../types/types';

describe('renders Header Component', () => {

  const mockPersonalInfo: PersonalInfo = {
    summary: 'Experienced software engineer with expertise in React and TypeScript',
    name: 'John Doe',
    photoUrl: 'https://example.com/photo.jpg',
    title: 'Senior Software Engineer',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    address: '123 Main St, City, Country',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    youtube: 'https://youtube.com/@johndoe'
  };

  test('should render name correctly', () => {
    render(<Header personalInfo={mockPersonalInfo} />);
    const nameElement = screen.getByTestId('name');
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent(mockPersonalInfo.name);
  });

  test('should render title correctly', () => {
    render(<Header personalInfo={mockPersonalInfo} />);
    const titleElement = screen.getByTestId('title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(mockPersonalInfo.title);
  });

  test('should render email correctly', () => {
    render(<Header personalInfo={mockPersonalInfo} />);
    const emailElement = screen.getByTestId('email');
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toHaveTextContent(mockPersonalInfo.email);
  });

  test('should render phone correctly', () => {
    render(<Header personalInfo={mockPersonalInfo} />);
    const phoneElement = screen.getByTestId('phone');
    expect(phoneElement).toBeInTheDocument();
    expect(phoneElement).toHaveTextContent(mockPersonalInfo.phone);
  });

  test('should render address correctly', () => {
    render(<Header personalInfo={mockPersonalInfo} />);
    const addressElement = screen.getByTestId('address');
    expect(addressElement).toBeInTheDocument();
    expect(addressElement).toHaveTextContent(mockPersonalInfo.address);
  });

  test('should render linkedin correctly', () => {
    render(<Header personalInfo={mockPersonalInfo} />);
    const linkedinElement = screen.getByTestId('linkedin');
    expect(linkedinElement).toBeInTheDocument();
    expect(linkedinElement).toHaveTextContent(mockPersonalInfo.linkedin);
  });

  test('should render github correctly', () => {
    render(<Header personalInfo={mockPersonalInfo} />);
    const githubElement = screen.getByTestId('github');
    expect(githubElement).toBeInTheDocument();
    expect(githubElement).toHaveTextContent(mockPersonalInfo.github);
  });

  test('should render youtube correctly', () => {
    render(<Header personalInfo={mockPersonalInfo} />);
    const youtubeElement = screen.getByTestId('youtube');
    expect(youtubeElement).toBeInTheDocument();
    expect(youtubeElement).toHaveTextContent(mockPersonalInfo.youtube);
  });

  test('should render photo with correct URL', () => {
    render(<Header personalInfo={mockPersonalInfo} />);
    const photoElement = screen.getByTestId('photo') as HTMLImageElement;
    expect(photoElement).toBeInTheDocument();
    expect(photoElement.src).toBe(mockPersonalInfo.photoUrl);
  });

  test('should render all personal info fields', () => {
    render(<Header personalInfo={mockPersonalInfo} />);
    
    expect(screen.getByTestId('name')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('phone')).toBeInTheDocument();
    expect(screen.getByTestId('address')).toBeInTheDocument();
    expect(screen.getByTestId('linkedin')).toBeInTheDocument();
    expect(screen.getByTestId('github')).toBeInTheDocument();
    expect(screen.getByTestId('youtube')).toBeInTheDocument();
    expect(screen.getByTestId('photo')).toBeInTheDocument();
  });
});