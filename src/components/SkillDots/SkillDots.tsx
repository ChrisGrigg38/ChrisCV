export interface SkillDotsProps {
    level: number
    dataTestId: string
}

const SkillDots: React.FC<SkillDotsProps> = ({ level, dataTestId }) => {
    return (
        <div className="flex gap-1" data-testid={dataTestId}>
            {[1, 2, 3, 4, 5].map((dot) => (
                <div
                    key={dot}
                    className={`w-2 h-2 rounded-full ${
                        dot <= level ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                />
            ))}
        </div>
    )
}

export default SkillDots