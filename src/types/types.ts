export interface Skill {
    name: string
    level: number
}

export interface PersonalInfo {
    summary: string
    name: string
    photoUrl: string
    title: string
    email: string
    phone: string
    address: string
    linkedin: string
    github: string
    youtube: string
}

export interface SideProject {
    name: string
    description: string
    githubUrl?: string
    youtubeUrl?: string
}

export interface Experience {
    role: string
    company: string
    location: string
    description: string
    startDate: moment.Moment
    endDate: moment.Moment | null
    minCardSize: number
}

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ATSElements {
    element: HTMLElement,
    text: string,
    innerHTML: string
}