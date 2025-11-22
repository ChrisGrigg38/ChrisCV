import { FC } from "react"
import HeaderTitle from "../HeaderTitle/HeaderTitle"
import { Experience } from "@/types/types"
import ExperienceCard from "../ExperienceCard/ExperienceCard"

export interface ExperiencesProps {
    experiences: Experience[]
}

const Experiences: FC<ExperiencesProps> = ({experiences}) => {
    
    return (
        <div className="flex flex-col p-8">
            <HeaderTitle title="Experience" />
            <div className="flex flex-col gap-4">
                {experiences.map((job) => (
                   <ExperienceCard key={job.startDate.toString()} job={job} /> 
                ))}
            </div>
        </div>
    )
}

export default Experiences