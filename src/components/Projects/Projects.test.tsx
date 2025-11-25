import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Projects, { ProjectsProps } from './Projects'
import { SideProject } from '../../types/types'

describe('Projects Component', () => {
  
   const mockProjects: SideProject[] = [
    {
      name: 'E-Commerce Platform',
      description: 'A full-stack e-commerce application built with React and Node.js',
      githubUrl: 'https://github.com/user/ecommerce',
      youtubeUrl: 'https://youtube.com/watch?v=demo1'
    },
    {
      name: 'Task Manager App',
      description: 'Productivity app with real-time collaboration features',
      githubUrl: 'https://github.com/user/taskmanager',
      youtubeUrl: 'https://youtube.com/watch?v=demo2'
    },
    {
      name: 'Weather Dashboard',
      description: 'Interactive weather forecast dashboard using OpenWeather API',
      githubUrl: 'https://github.com/user/weather'
    }
  ]

  test('should render all projects', () => {
    const props: ProjectsProps = {
      projects: mockProjects
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('name-E-Commerce Platform')).toBeInTheDocument()
    expect(screen.getByTestId('name-Task Manager App')).toBeInTheDocument()
    expect(screen.getByTestId('name-Weather Dashboard')).toBeInTheDocument()
  })

  test('should render project names correctly', () => {
    const props: ProjectsProps = {
      projects: mockProjects
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('name-E-Commerce Platform')).toHaveTextContent('E-Commerce Platform')
    expect(screen.getByTestId('name-Task Manager App')).toHaveTextContent('Task Manager App')
    expect(screen.getByTestId('name-Weather Dashboard')).toHaveTextContent('Weather Dashboard')
  })

  test('should render project descriptions correctly', () => {
    const props: ProjectsProps = {
      projects: mockProjects
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('description-E-Commerce Platform')).toHaveTextContent(
      'A full-stack e-commerce application built with React and Node.js'
    )
    expect(screen.getByTestId('description-Task Manager App')).toHaveTextContent(
      'Productivity app with real-time collaboration features'
    )
    expect(screen.getByTestId('description-Weather Dashboard')).toHaveTextContent(
      'Interactive weather forecast dashboard using OpenWeather API'
    )
  })

  test('should render GitHub URLs when provided', () => {
    const props: ProjectsProps = {
      projects: mockProjects
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('githubUrl-E-Commerce Platform')).toBeInTheDocument()
    expect(screen.getByTestId('githubUrl-Task Manager App')).toBeInTheDocument()
    expect(screen.getByTestId('githubUrl-Weather Dashboard')).toBeInTheDocument()
  })

  test('should render YouTube URLs when provided', () => {
    const props: ProjectsProps = {
      projects: mockProjects
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('youtubeUrl-E-Commerce Platform')).toBeInTheDocument()
    expect(screen.getByTestId('youtubeUrl-Task Manager App')).toBeInTheDocument()
  })

  test('should not render YouTube URL when not provided', () => {
    const props: ProjectsProps = {
      projects: mockProjects
    }

    render(<Projects {...props} />)

    expect(screen.queryByTestId('youtubeUrl-Weather Dashboard')).not.toBeInTheDocument()
  })

  test('should render project without optional URLs', () => {
    const projectsWithoutUrls: SideProject[] = [
      {
        name: 'Portfolio Website',
        description: 'Personal portfolio showcasing projects and skills'
      }
    ]

    const props: ProjectsProps = {
      projects: projectsWithoutUrls
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('name-Portfolio Website')).toHaveTextContent('Portfolio Website')
    expect(screen.getByTestId('description-Portfolio Website')).toHaveTextContent(
      'Personal portfolio showcasing projects and skills'
    )
    expect(screen.queryByTestId('githubUrl-Portfolio Website')).not.toBeInTheDocument()
    expect(screen.queryByTestId('youtubeUrl-Portfolio Website')).not.toBeInTheDocument()
  })

  test('should render empty list when no projects provided', () => {
    const props: ProjectsProps = {
      projects: []
    }

    const { container } = render(<Projects {...props} />)

    expect(container.querySelectorAll('[data-testid^="name-"]')).toHaveLength(0)
  })

  test('should render single project', () => {
    const singleProject: SideProject[] = [
      {
        name: 'Chat Application',
        description: 'Real-time chat app using WebSockets',
        githubUrl: 'https://github.com/user/chat',
        youtubeUrl: 'https://youtube.com/watch?v=chat'
      }
    ]

    const props: ProjectsProps = {
      projects: singleProject
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('name-Chat Application')).toHaveTextContent('Chat Application')
    expect(screen.getByTestId('description-Chat Application')).toHaveTextContent(
      'Real-time chat app using WebSockets'
    )
    expect(screen.getByTestId('githubUrl-Chat Application')).toBeInTheDocument()
    expect(screen.getByTestId('youtubeUrl-Chat Application')).toBeInTheDocument()
  })

  test('should render multiple projects with all fields present', () => {
    const props: ProjectsProps = {
      projects: mockProjects
    }

    render(<Projects {...props} />)

    mockProjects.forEach(project => {
      expect(screen.getByTestId(`name-${project.name}`)).toBeInTheDocument()
      expect(screen.getByTestId(`description-${project.name}`)).toBeInTheDocument()
      
      if (project.githubUrl) {
        expect(screen.getByTestId(`githubUrl-${project.name}`)).toBeInTheDocument()
      }
      
      if (project.youtubeUrl) {
        expect(screen.getByTestId(`youtubeUrl-${project.name}`)).toBeInTheDocument()
      }
    })
  })

  test('should handle project with only GitHub URL', () => {
    const projectsWithGithubOnly: SideProject[] = [
      {
        name: 'CLI Tool',
        description: 'Command line utility for developers',
        githubUrl: 'https://github.com/user/cli-tool'
      }
    ]

    const props: ProjectsProps = {
      projects: projectsWithGithubOnly
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('name-CLI Tool')).toBeInTheDocument()
    expect(screen.getByTestId('description-CLI Tool')).toBeInTheDocument()
    expect(screen.getByTestId('githubUrl-CLI Tool')).toBeInTheDocument()
    expect(screen.queryByTestId('youtubeUrl-CLI Tool')).not.toBeInTheDocument()
  })

  test('should handle project with only YouTube URL', () => {
    const projectsWithYoutubeOnly: SideProject[] = [
      {
        name: 'Game Project',
        description: 'Unity game demo with gameplay footage',
        youtubeUrl: 'https://youtube.com/watch?v=game'
      }
    ]

    const props: ProjectsProps = {
      projects: projectsWithYoutubeOnly
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('name-Game Project')).toBeInTheDocument()
    expect(screen.getByTestId('description-Game Project')).toBeInTheDocument()
    expect(screen.queryByTestId('githubUrl-Game Project')).not.toBeInTheDocument()
    expect(screen.getByTestId('youtubeUrl-Game Project')).toBeInTheDocument()
  })

  test('should handle special characters in project names', () => {
    const projectsWithSpecialChars: SideProject[] = [
      {
        name: 'AI/ML Pipeline',
        description: 'Machine learning data pipeline',
        githubUrl: 'https://github.com/user/ml-pipeline'
      }
    ]

    const props: ProjectsProps = {
      projects: projectsWithSpecialChars
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('name-AI/ML Pipeline')).toHaveTextContent('AI/ML Pipeline')
    expect(screen.getByTestId('description-AI/ML Pipeline')).toBeInTheDocument()
  })

  test('should render long project descriptions', () => {
    const projectsWithLongDesc: SideProject[] = [
      {
        name: 'Complex System',
        description: 'A comprehensive full-stack application featuring microservices architecture, real-time data processing, advanced analytics dashboard, user authentication, and integration with multiple third-party APIs',
        githubUrl: 'https://github.com/user/complex'
      }
    ]

    const props: ProjectsProps = {
      projects: projectsWithLongDesc
    }

    render(<Projects {...props} />)

    const descElement = screen.getByTestId('description-Complex System')
    expect(descElement).toHaveTextContent(
      'A comprehensive full-stack application featuring microservices architecture, real-time data processing, advanced analytics dashboard, user authentication, and integration with multiple third-party APIs'
    )
  })

  test('should render projects with various URL formats', () => {
    const projectsWithUrls: SideProject[] = [
      {
        name: 'Open Source Lib',
        description: 'Utility library for JavaScript developers',
        githubUrl: 'https://github.com/org/library',
        youtubeUrl: 'https://www.youtube.com/watch?v=abc123'
      }
    ]

    const props: ProjectsProps = {
      projects: projectsWithUrls
    }

    render(<Projects {...props} />)

    expect(screen.getByTestId('githubUrl-Open Source Lib')).toBeInTheDocument()
    expect(screen.getByTestId('youtubeUrl-Open Source Lib')).toBeInTheDocument()
  })
})