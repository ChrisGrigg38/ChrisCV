import { render, screen } from '@testing-library/react'
import SkillDots from './SkillDots'
import { describe } from '@jest/globals';

describe('render SkillDots Component', () => {
    describe('Basic Rendering', () => {
        it('should render the component with data-testid', () => {
            render(<SkillDots level={3} dataTestId="skill-dots" />)
            
            const container = screen.getByTestId('skill-dots')
            expect(container).toBeInTheDocument()
        })

        it('should always render exactly 5 dots', () => {
            const { container } = render(<SkillDots level={3} dataTestId="skill-dots" />)
            
            const dots = container.querySelectorAll('.w-2.h-2.rounded-full')
            expect(dots).toHaveLength(5)
        })

        it('should apply flex gap-1 classes to container', () => {
            render(<SkillDots level={3} dataTestId="skill-dots" />)
            
            const container = screen.getByTestId('skill-dots')
            expect(container).toHaveClass('flex', 'gap-1')
        })
    })

    describe('Level 0 - No filled dots', () => {
        it('should render 0 filled dots when level is 0', () => {
            const { container } = render(<SkillDots level={0} dataTestId="skill-dots-0" />)
            
            const filledDots = container.querySelectorAll('.bg-blue-600')
            const unfilledDots = container.querySelectorAll('.bg-gray-300')
            
            expect(filledDots).toHaveLength(0)
            expect(unfilledDots).toHaveLength(5)
        })
    })

    describe('Level 1 - One filled dot', () => {
        it('should render 1 filled dot and 4 unfilled dots when level is 1', () => {
            const { container } = render(<SkillDots level={1} dataTestId="skill-dots-1" />)
            
            const filledDots = container.querySelectorAll('.bg-blue-600')
            const unfilledDots = container.querySelectorAll('.bg-gray-300')
            
            expect(filledDots).toHaveLength(1)
            expect(unfilledDots).toHaveLength(4)
        })
    })

    describe('Level 2 - Two filled dots', () => {
        it('should render 2 filled dots and 3 unfilled dots when level is 2', () => {
            const { container } = render(<SkillDots level={2} dataTestId="skill-dots-2" />)
            
            const filledDots = container.querySelectorAll('.bg-blue-600')
            const unfilledDots = container.querySelectorAll('.bg-gray-300')
            
            expect(filledDots).toHaveLength(2)
            expect(unfilledDots).toHaveLength(3)
        })
    })

    describe('Level 3 - Three filled dots', () => {
        it('should render 3 filled dots and 2 unfilled dots when level is 3', () => {
            const { container } = render(<SkillDots level={3} dataTestId="skill-dots-3" />)
            
            const filledDots = container.querySelectorAll('.bg-blue-600')
            const unfilledDots = container.querySelectorAll('.bg-gray-300')
            
            expect(filledDots).toHaveLength(3)
            expect(unfilledDots).toHaveLength(2)
        })
    })

    describe('Level 4 - Four filled dots', () => {
        it('should render 4 filled dots and 1 unfilled dot when level is 4', () => {
            const { container } = render(<SkillDots level={4} dataTestId="skill-dots-4" />)
            
            const filledDots = container.querySelectorAll('.bg-blue-600')
            const unfilledDots = container.querySelectorAll('.bg-gray-300')
            
            expect(filledDots).toHaveLength(4)
            expect(unfilledDots).toHaveLength(1)
        })
    })

    describe('Level 5 - All filled dots', () => {
        it('should render 5 filled dots when level is 5', () => {
            const { container } = render(<SkillDots level={5} dataTestId="skill-dots-5" />)
            
            const filledDots = container.querySelectorAll('.bg-blue-600')
            const unfilledDots = container.querySelectorAll('.bg-gray-300')
            
            expect(filledDots).toHaveLength(5)
            expect(unfilledDots).toHaveLength(0)
        })
    })

    describe('Edge Cases', () => {
        it('should handle negative level values', () => {
            const { container } = render(<SkillDots level={-1} dataTestId="skill-dots-negative" />)
            
            const filledDots = container.querySelectorAll('.bg-blue-600')
            const unfilledDots = container.querySelectorAll('.bg-gray-300')
            
            // Negative values should result in no filled dots
            expect(filledDots).toHaveLength(0)
            expect(unfilledDots).toHaveLength(5)
        })

        it('should handle level values greater than 5', () => {
            const { container } = render(<SkillDots level={10} dataTestId="skill-dots-high" />)
            
            const filledDots = container.querySelectorAll('.bg-blue-600')
            
            // Should still only have 5 dots total, all filled
            expect(filledDots).toHaveLength(5)
        })

        it('should handle decimal level values', () => {
            const { container } = render(<SkillDots level={2.7} dataTestId="skill-dots-decimal" />)
            
            const filledDots = container.querySelectorAll('.bg-blue-600')
            const unfilledDots = container.querySelectorAll('.bg-gray-300')
            
            // 2.7 should fill dots 1 and 2 (dot <= 2.7)
            expect(filledDots).toHaveLength(2)
            expect(unfilledDots).toHaveLength(3)
        })
    })

    describe('CSS Classes', () => {
        it('should apply correct classes to filled dots', () => {
            const { container } = render(<SkillDots level={2} dataTestId="skill-dots" />)
            
            const filledDots = container.querySelectorAll('.bg-blue-600')
            
            filledDots.forEach(dot => {
                expect(dot).toHaveClass('w-2', 'h-2', 'rounded-full', 'bg-blue-600')
                expect(dot).not.toHaveClass('bg-gray-300')
            })
        })

        it('should apply correct classes to unfilled dots', () => {
            const { container } = render(<SkillDots level={2} dataTestId="skill-dots" />)
            
            const unfilledDots = container.querySelectorAll('.bg-gray-300')
            
            unfilledDots.forEach(dot => {
                expect(dot).toHaveClass('w-2', 'h-2', 'rounded-full', 'bg-gray-300')
                expect(dot).not.toHaveClass('bg-blue-600')
            })
        })
    })

    describe('Multiple Instances', () => {
        it('should render multiple SkillDots with different levels independently', () => {
            render(
                <>
                    <SkillDots level={2} dataTestId="skill-dots-a" />
                    <SkillDots level={4} dataTestId="skill-dots-b" />
                </>
            )
            
            const containerA = screen.getByTestId('skill-dots-a')
            const containerB = screen.getByTestId('skill-dots-b')
            
            const filledDotsA = containerA.querySelectorAll('.bg-blue-600')
            const filledDotsB = containerB.querySelectorAll('.bg-blue-600')
            
            expect(filledDotsA).toHaveLength(2)
            expect(filledDotsB).toHaveLength(4)
        })

        it('should use unique dataTestId for each instance', () => {
            render(
                <>
                    <SkillDots level={1} dataTestId="javascript-skill" />
                    <SkillDots level={3} dataTestId="typescript-skill" />
                    <SkillDots level={5} dataTestId="react-skill" />
                </>
            )
            
            expect(screen.getByTestId('javascript-skill')).toBeInTheDocument()
            expect(screen.getByTestId('typescript-skill')).toBeInTheDocument()
            expect(screen.getByTestId('react-skill')).toBeInTheDocument()
        })
    })

    describe('Skill Interface Integration', () => {
        it('should work with Skill interface level values', () => {
            // Simulating how it would be used with the Skill interface
            const skills = [
                { name: 'JavaScript', level: 3 },
                { name: 'TypeScript', level: 4 },
                { name: 'React', level: 5 }
            ]

            render(
                <>
                    {skills.map((skill, index) => (
                        <SkillDots 
                            key={skill.name}
                            level={skill.level} 
                            dataTestId={`skill-${index}`} 
                        />
                    ))}
                </>
            )

            const skill0 = screen.getByTestId('skill-0')
            const skill1 = screen.getByTestId('skill-1')
            const skill2 = screen.getByTestId('skill-2')

            expect(skill0.querySelectorAll('.bg-blue-600')).toHaveLength(3)
            expect(skill1.querySelectorAll('.bg-blue-600')).toHaveLength(4)
            expect(skill2.querySelectorAll('.bg-blue-600')).toHaveLength(5)
        })
    })
})