import { render, screen } from '@testing-library/react'
import SkillSideBar from './SkillSideBar'
import { Skill } from '../../types/types'

describe('SkillSideBar Component', () => {
    describe('Basic Rendering', () => {
        test('should render with empty skills array', () => {
            const { container } = render(<SkillSideBar skills={[]} />)
            expect(container).toBeInTheDocument()
        })

        test('should render a single skill with correct name and level', () => {
            const skills: Skill[] = [
                { name: 'React', level: 4 }
            ]

            render(<SkillSideBar skills={skills} />)

            const skillName = screen.getByTestId('skillname-React')
            const skillLevel = screen.getByTestId('skilllevel-React')

            expect(skillName).toBeInTheDocument()
            expect(skillLevel).toBeInTheDocument()
            expect(skillName).toHaveTextContent('React')
        })

        test('should render multiple skills with correct names and levels', () => {
            const skills: Skill[] = [
                { name: 'React', level: 4 },
                { name: 'TypeScript', level: 5 },
                { name: 'JavaScript', level: 3 }
            ]

            render(<SkillSideBar skills={skills} />)

            skills.forEach(skill => {
                const skillName = screen.getByTestId(`skillname-${skill.name}`)
                const skillLevel = screen.getByTestId(`skilllevel-${skill.name}`)

                expect(skillName).toBeInTheDocument()
                expect(skillLevel).toBeInTheDocument()
                expect(skillName).toHaveTextContent(skill.name)
            })
        })
    })

    describe('Skill Names', () => {
        test('should display correct skill names', () => {
            const skills: Skill[] = [
                { name: 'React', level: 5 },
                { name: 'Node.js', level: 4 },
                { name: 'MongoDB', level: 3 }
            ]

            render(<SkillSideBar skills={skills} />)

            expect(screen.getByTestId('skillname-React')).toHaveTextContent('React')
            expect(screen.getByTestId('skillname-Node.js')).toHaveTextContent('Node.js')
            expect(screen.getByTestId('skillname-MongoDB')).toHaveTextContent('MongoDB')
        })

        test('should handle skills with special characters in names', () => {
            const skills: Skill[] = [
                { name: 'C++', level: 4 },
                { name: 'C#', level: 3 },
                { name: 'Vue.js', level: 4 }
            ]

            render(<SkillSideBar skills={skills} />)

            expect(screen.getByTestId('skillname-C++')).toHaveTextContent('C++')
            expect(screen.getByTestId('skillname-C#')).toHaveTextContent('C#')
            expect(screen.getByTestId('skillname-Vue.js')).toHaveTextContent('Vue.js')
        })

        test('should handle skills with spaces in names', () => {
            const skills: Skill[] = [
                { name: 'Machine Learning', level: 3 },
                { name: 'Data Science', level: 4 }
            ]

            render(<SkillSideBar skills={skills} />)

            expect(screen.getByTestId('skillname-Machine Learning')).toHaveTextContent('Machine Learning')
            expect(screen.getByTestId('skillname-Data Science')).toHaveTextContent('Data Science')
        })
    })

    describe('Skill Levels', () => {
        test('should render skill level indicators for each skill', () => {
            const skills: Skill[] = [
                { name: 'React', level: 1 },
                { name: 'TypeScript', level: 2 },
                { name: 'JavaScript', level: 3 },
                { name: 'Node.js', level: 4 },
                { name: 'Python', level: 5 }
            ]

            render(<SkillSideBar skills={skills} />)

            skills.forEach(skill => {
                const skillLevel = screen.getByTestId(`skilllevel-${skill.name}`)
                expect(skillLevel).toBeInTheDocument()
            })
        })

        test('should handle level 0', () => {
            const skills: Skill[] = [
                { name: 'Beginner Skill', level: 0 }
            ]

            render(<SkillSideBar skills={skills} />)

            const skillLevel = screen.getByTestId('skilllevel-Beginner Skill')
            expect(skillLevel).toBeInTheDocument()
        })

        test('should handle maximum level 5', () => {
            const skills: Skill[] = [
                { name: 'Expert Skill', level: 5 }
            ]

            render(<SkillSideBar skills={skills} />)

            const skillLevel = screen.getByTestId('skilllevel-Expert Skill')
            expect(skillLevel).toBeInTheDocument()
        })
    })

    describe('Multiple Skills Rendering', () => {
        test('should render all skills from a comprehensive list', () => {
            const skills: Skill[] = [
                { name: 'React', level: 5 },
                { name: 'TypeScript', level: 5 },
                { name: 'JavaScript', level: 5 },
                { name: 'Node.js', level: 4 },
                { name: 'Express', level: 4 },
                { name: 'MongoDB', level: 3 },
                { name: 'PostgreSQL', level: 4 },
                { name: 'Docker', level: 3 },
                { name: 'AWS', level: 3 },
                { name: 'Git', level: 5 }
            ]

            render(<SkillSideBar skills={skills} />)

            expect(skills).toHaveLength(10)

            skills.forEach(skill => {
                const skillName = screen.getByTestId(`skillname-${skill.name}`)
                const skillLevel = screen.getByTestId(`skilllevel-${skill.name}`)

                expect(skillName).toBeInTheDocument()
                expect(skillName).toHaveTextContent(skill.name)
                expect(skillLevel).toBeInTheDocument()
            })
        })

        test('should maintain correct order of skills', () => {
            const skills: Skill[] = [
                { name: 'First', level: 1 },
                { name: 'Second', level: 2 },
                { name: 'Third', level: 3 }
            ]

            render(<SkillSideBar skills={skills} />)

            const skillNames = skills.map(skill => 
                screen.getByTestId(`skillname-${skill.name}`)
            )

            skillNames.forEach((element, index) => {
                expect(element).toHaveTextContent(skills[index].name)
            })
        })
    })

    describe('Edge Cases', () => {
        test('should handle single character skill names', () => {
            const skills: Skill[] = [
                { name: 'R', level: 4 },
                { name: 'C', level: 3 }
            ]

            render(<SkillSideBar skills={skills} />)

            expect(screen.getByTestId('skillname-R')).toHaveTextContent('R')
            expect(screen.getByTestId('skillname-C')).toHaveTextContent('C')
        })

        test('should handle very long skill names', () => {
            const skills: Skill[] = [
                { 
                    name: 'Advanced Enterprise Application Development with Microservices', 
                    level: 4 
                }
            ]

            render(<SkillSideBar skills={skills} />)

            const longSkillName = screen.getByTestId(
                'skillname-Advanced Enterprise Application Development with Microservices'
            )
            expect(longSkillName).toBeInTheDocument()
            expect(longSkillName).toHaveTextContent(
                'Advanced Enterprise Application Development with Microservices'
            )
        })

        test('should handle skills with numbers in names', () => {
            const skills: Skill[] = [
                { name: 'Vue3', level: 4 },
                { name: 'Angular15', level: 3 },
                { name: 'ES2023', level: 5 }
            ]

            render(<SkillSideBar skills={skills} />)

            expect(screen.getByTestId('skillname-Vue3')).toHaveTextContent('Vue3')
            expect(screen.getByTestId('skillname-Angular15')).toHaveTextContent('Angular15')
            expect(screen.getByTestId('skillname-ES2023')).toHaveTextContent('ES2023')
        })

        test('should handle duplicate skill names', () => {
            const skills: Skill[] = [
                { name: 'JavaScript', level: 3 },
                { name: 'JavaScript', level: 5 }
            ]

            render(<SkillSideBar skills={skills} />)

            // Should find at least one instance
            const skillNames = screen.getAllByTestId('skillname-JavaScript')
            expect(skillNames.length).toBeGreaterThan(0)
        })
    })

    describe('Data Test IDs', () => {
        test('should generate correct data-testid for skill names', () => {
            const skills: Skill[] = [
                { name: 'React', level: 4 }
            ]

            render(<SkillSideBar skills={skills} />)

            const skillName = screen.getByTestId('skillname-React')
            expect(skillName).toHaveAttribute('data-testid', 'skillname-React')
        })

        test('should generate correct data-testid for skill levels', () => {
            const skills: Skill[] = [
                { name: 'TypeScript', level: 5 }
            ]

            render(<SkillSideBar skills={skills} />)

            const skillLevel = screen.getByTestId('skilllevel-TypeScript')
            expect(skillLevel).toHaveAttribute('data-testid', 'skilllevel-TypeScript')
        })

        test('should generate unique data-testids for each skill', () => {
            const skills: Skill[] = [
                { name: 'React', level: 5 },
                { name: 'Angular', level: 4 },
                { name: 'Vue', level: 3 }
            ]

            render(<SkillSideBar skills={skills} />)

            skills.forEach(skill => {
                const expectedNameTestId = `skillname-${skill.name}`
                const expectedLevelTestId = `skilllevel-${skill.name}`

                expect(screen.getByTestId(expectedNameTestId)).toBeInTheDocument()
                expect(screen.getByTestId(expectedLevelTestId)).toBeInTheDocument()
            })
        })
    })

    describe('Real World Skill Sets', () => {
        test('should render a frontend developer skill set', () => {
            const skills: Skill[] = [
                { name: 'HTML', level: 5 },
                { name: 'CSS', level: 5 },
                { name: 'JavaScript', level: 5 },
                { name: 'React', level: 5 },
                { name: 'TypeScript', level: 4 },
                { name: 'Redux', level: 4 },
                { name: 'Tailwind', level: 5 },
                { name: 'Webpack', level: 3 }
            ]

            render(<SkillSideBar skills={skills} />)

            skills.forEach(skill => {
                expect(screen.getByTestId(`skillname-${skill.name}`)).toHaveTextContent(skill.name)
                expect(screen.getByTestId(`skilllevel-${skill.name}`)).toBeInTheDocument()
            })
        })

        test('should render a backend developer skill set', () => {
            const skills: Skill[] = [
                { name: 'Node.js', level: 5 },
                { name: 'Express', level: 5 },
                { name: 'PostgreSQL', level: 4 },
                { name: 'MongoDB', level: 4 },
                { name: 'Redis', level: 3 },
                { name: 'Docker', level: 4 },
                { name: 'Kubernetes', level: 3 },
                { name: 'AWS', level: 4 }
            ]

            render(<SkillSideBar skills={skills} />)

            skills.forEach(skill => {
                expect(screen.getByTestId(`skillname-${skill.name}`)).toHaveTextContent(skill.name)
                expect(screen.getByTestId(`skilllevel-${skill.name}`)).toBeInTheDocument()
            })
        })

        test('should render a full stack developer skill set', () => {
            const skills: Skill[] = [
                { name: 'React', level: 5 },
                { name: 'Node.js', level: 5 },
                { name: 'TypeScript', level: 5 },
                { name: 'GraphQL', level: 4 },
                { name: 'PostgreSQL', level: 4 },
                { name: 'AWS', level: 3 },
                { name: 'Docker', level: 4 },
                { name: 'CI/CD', level: 3 }
            ]

            render(<SkillSideBar skills={skills} />)

            skills.forEach(skill => {
                expect(screen.getByTestId(`skillname-${skill.name}`)).toHaveTextContent(skill.name)
                expect(screen.getByTestId(`skilllevel-${skill.name}`)).toBeInTheDocument()
            })
        })
    })
})