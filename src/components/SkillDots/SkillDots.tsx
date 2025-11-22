const SkillDots: React.FC<{ level: number }> = ({ level }) => {
    return (
        <div className="flex gap-1">
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