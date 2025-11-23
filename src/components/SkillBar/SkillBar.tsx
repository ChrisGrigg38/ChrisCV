import { FC } from 'react';
import { Skill } from '@/types/types';
import SkillDots from '../SkillDots/SkillDots';

export interface SkillsBarProps {
    skills: Skill[]
}

const SkillBar: FC<SkillsBarProps> = ({skills}) => {
    return (
        <div className="space-y-4">
            {skills.map((skill, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800" data-testid={`skillname-${skill.name}`}>{skill.name}</span>
                    </div>
                    <SkillDots level={skill.level} dataTestId={`skilllevel-${skill.name}`} />
                </div>
            ))}
        </div>
    )
}

export default SkillBar