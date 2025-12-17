# Chris Grigg - CV Portfolio

A modern, interactive CV portfolio website built with React, TypeScript, and Vite. Features an integrated Claude AI assistant powered by Anthropic's Claude Artifacts for answering questions about my professional experience.

🔗 **Live Site:** [https://chrisgrigg38.github.io/ChrisCV/](https://chrisgrigg38.github.io/ChrisCV/)

## Features

- 📱 Responsive design built with Tailwind CSS
- 🤖 AI-powered CV assistant using Claude Artifacts integration
- ⚡ Fast development and build times with Vite
- 🧪 Comprehensive testing setup with Jest
- 🎨 Modern UI with Lucide React icons

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/chrisgrigg38/ChrisCV.git
cd ChrisCV
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

### Development

- **`npm run dev`** - Starts the Vite development server with hot module replacement
- **`npm run css`** - Compiles Tailwind CSS (usually handled automatically by Vite)

### Building

- **`npm run build`** - Creates an optimized production build
  - Compiles TypeScript
  - Processes Tailwind CSS
  - Bundles with Vite

- **`npm run preview`** - Preview the production build locally

### Deployment

- **`npm run deploy`** - Deploys the site to GitHub Pages
- **`npm run predeploy`** - Automatically runs before deploy to build the project

### Code Quality

- **`npm run lint`** - Runs ESLint to check for code quality issues
- **`npm test`** - Runs the Jest test suite
- **`npm run test:watch`** - Runs tests in watch mode for development
- **`npm run test:coverage`** - Generates a test coverage report

## Tech Stack

### Core
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### Routing
- **React Router v7** - Client-side routing

### Testing
- **Jest** - Testing framework
- **React Testing Library** - Component testing
- **@testing-library/user-event** - User interaction simulation

### Utilities
- **Lucide React** - Icon library
- **Moment.js** - Date manipulation
- **DOMPurify** - XSS sanitization

## Design Decisions

### Architecture

**Component-Based Structure**: The application follows a modular component architecture, making it easy to maintain and extend. Each section of the CV is encapsulated in its own component with clear responsibilities.

**TypeScript Integration**: Choosing TypeScript over plain JavaScript provides type safety, better IDE support, and catches errors at compile time rather than runtime. This is especially important for a portfolio project that demonstrates professional coding practices.

### Claude Artifacts Integration

One of the unique features of this portfolio is the integration with Claude AI through Anthropic's Artifacts system. This allows visitors to ask natural language questions about my CV and get intelligent responses.

**Why Claude Artifacts?**

I used Claude Artifacts over integrating a chatbox widget directly into our CV website
mainly because artifacts allowed us to use Claude AI without having to pay for tokens. We could use the api directly, but we have to purchase tokens to use the api. Claude Artifacts showed us that we could integrate Claude into our site using the free modal. There is also a few issues with CORS and also protecting the api key from the public. Essentially we would need some sort of a backend service that would actually call the claude api that our CV website would talk to to hide the api key and rate limit protect the api key from abuse. Claude Artifacts also:

- Provides an interactive way for recruiters/visitors to explore my experience
- Demonstrates integration with modern AI APIs
- Showcases ability to work with cutting-edge technologies
- Creates a memorable, differentiated portfolio experience

### ATS support

One of the biggest design decisions on this project was to solve it so my PDF could be read by a CV ATS system. We used to render a canvas image to the PDF and this means that ATS can't read the text off the image. I had a few ideas on how to solve this but I consulted Claude AI and discussed with Claude AI some design paths to resolve this issue. I've decided to make whole Claude AI conversation public:

https://claude.ai/share/23c0d5e7-09fb-4598-8b8c-7e4826aac9ed

We came up with several design solutions and the third option was chosen.


### Build & Deployment

**Vite Over Create React App**: Vite provides significantly faster build times and a better development experience with instant HMR (Hot Module Replacement). The decision to migrate to Vite reflects an understanding of modern tooling trends.

**GitHub Pages Deployment**: Automated deployment to GitHub Pages provides:
- Free hosting for the portfolio
- Automatic HTTPS
- Simple CI/CD with the `deploy` script
- Version control integration

**Tailwind CSS**: Chosen for rapid development without writing custom CSS. The utility-first approach allows for:
- Consistent design system
- Faster prototyping and iteration
- Easy responsive design implementation

### Testing Strategy

Implemented Jest with React Testing Library to ensure reliability:
- Unit tests for individual components

### Performance Considerations

- **Code Splitting**: Leveraged with React Router for route-based splitting
- **Production Builds**: Minification and tree-shaking with Vite
- **CSS Optimization**: Tailwind purges unused styles in production

## Project Structure

```
ChrisCV/
├── src/
│   ├── components/     # React components
│   ├── const/          # Constants used for pages
│   ├── pages/          # Route pages
│   ├── utils/          # Helper functions
│   ├── types/          # TypeScript type definitions
│   └── index.css       # Tailwind imports
├── public/             # Static assets
├── dist/               # Production build output
└── package.json        # Dependencies and scripts
```

## Contributing

This is a personal portfolio project, but feedback and suggestions are welcome!

## License

This project is open source and available for reference. This is strictly for use for Chris Grigg's CV. Please DON'T copy it wholesale and change wording for your own portfolio, but feel free to learn from the implementation!

---

Built with ❤️ using React, TypeScript, and Claude AI
