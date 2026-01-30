import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Project from './Project';
import { SideProject } from '../../types/types';
import { describe, test } from '@jest/globals';

describe('render Project Component', () => {

  const mockProject: SideProject = {
    name: 'Crypto Project',
    description: 'A cryptocurrency tracking application built with React and TypeScript',
    githubUrl: 'https://github.com/johndoe/crypto-project',
    youtubeUrl: 'https://youtube.com/watch?v=abc123'
  };

  test('should render project name correctly', () => {
    render(<Project project={mockProject} />);
    const nameElement = screen.getByTestId(`name-${mockProject.name}`);
    expect(nameElement).toBeInTheDocument();
    expect(nameElement).toHaveTextContent(mockProject.name);
  });

  test('should render project description correctly', () => {
    render(<Project project={mockProject} />);
    const descriptionElement = screen.getByTestId(`description-${mockProject.name}`);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(mockProject.description);
  });

  test('should render github URL correctly', () => {
    render(<Project project={mockProject} />);
    const githubElement = screen.getByTestId(`githubUrl-${mockProject.name}`) as HTMLLinkElement;
    expect(githubElement).toBeInTheDocument();
    expect(githubElement.href).toBe(mockProject.githubUrl!);
  });

  test('should render youtube URL correctly', () => {
    render(<Project project={mockProject} />);
    const youtubeElement = screen.getByTestId(`youtubeUrl-${mockProject.name}`) as HTMLLinkElement;
    expect(youtubeElement).toBeInTheDocument();
    expect(youtubeElement.href).toBe(mockProject.youtubeUrl!);
  });

  test('should render all project fields', () => {
    render(<Project project={mockProject} />);
    
    expect(screen.getByTestId(`name-${mockProject.name}`)).toBeInTheDocument();
    expect(screen.getByTestId(`description-${mockProject.name}`)).toBeInTheDocument();
    expect(screen.getByTestId(`githubUrl-${mockProject.name}`)).toBeInTheDocument();
    expect(screen.getByTestId(`youtubeUrl-${mockProject.name}`)).toBeInTheDocument();
  });

  describe('render optional fields', () => {

    test('should render project without github URL', () => {
      const projectWithoutGithub: SideProject = {
        name: 'Weather App',
        description: 'A simple weather application',
        youtubeUrl: 'https://youtube.com/watch?v=xyz789'
      };

      render(<Project project={projectWithoutGithub} />);
      
      expect(screen.getByTestId(`name-${projectWithoutGithub.name}`)).toBeInTheDocument();
      expect(screen.getByTestId(`description-${projectWithoutGithub.name}`)).toBeInTheDocument();
      expect(screen.queryByTestId(`githubUrl-${projectWithoutGithub.name}`)).not.toBeInTheDocument();
      expect(screen.getByTestId(`youtubeUrl-${projectWithoutGithub.name}`)).toBeInTheDocument();
    });

    test('should render project without youtube URL', () => {
      const projectWithoutYoutube: SideProject = {
        name: 'Todo List',
        description: 'A task management application',
        githubUrl: 'https://github.com/johndoe/todo-list'
      };

      render(<Project project={projectWithoutYoutube} />);
      
      expect(screen.getByTestId(`name-${projectWithoutYoutube.name}`)).toBeInTheDocument();
      expect(screen.getByTestId(`description-${projectWithoutYoutube.name}`)).toBeInTheDocument();
      expect(screen.getByTestId(`githubUrl-${projectWithoutYoutube.name}`)).toBeInTheDocument();
      expect(screen.queryByTestId(`youtubeUrl-${projectWithoutYoutube.name}`)).not.toBeInTheDocument();
    });

    test('should render project without any URLs', () => {
      const projectWithoutUrls: SideProject = {
        name: 'Calculator',
        description: 'A basic calculator application'
      };

      render(<Project project={projectWithoutUrls} />);
      
      expect(screen.getByTestId(`name-${projectWithoutUrls.name}`)).toBeInTheDocument();
      expect(screen.getByTestId(`description-${projectWithoutUrls.name}`)).toBeInTheDocument();
      expect(screen.queryByTestId(`githubUrl-${projectWithoutUrls.name}`)).not.toBeInTheDocument();
      expect(screen.queryByTestId(`youtubeUrl-${projectWithoutUrls.name}`)).not.toBeInTheDocument();
    });
  });

  describe('projects with special characters in names', () => {
    test('should handle project name with spaces', () => {
      const projectWithSpaces: SideProject = {
        name: 'My Awesome Project',
        description: 'A project with spaces in the name',
        githubUrl: 'https://github.com/johndoe/awesome'
      };

      render(<Project project={projectWithSpaces} />);
      
      expect(screen.getByTestId(`name-${projectWithSpaces.name}`)).toBeInTheDocument();
      expect(screen.getByTestId(`description-${projectWithSpaces.name}`)).toBeInTheDocument();
    });

    test('should handle project name with special characters', () => {
      const projectWithSpecialChars: SideProject = {
        name: 'E-Commerce & Analytics',
        description: 'A project with special characters',
        githubUrl: 'https://github.com/johndoe/ecommerce'
      };

      render(<Project project={projectWithSpecialChars} />);
      
      expect(screen.getByTestId(`name-${projectWithSpecialChars.name}`)).toBeInTheDocument();
      expect(screen.getByTestId(`description-${projectWithSpecialChars.name}`)).toBeInTheDocument();
    });
  });
});