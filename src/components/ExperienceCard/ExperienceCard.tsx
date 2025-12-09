import { FC, useMemo } from "react"
import TimeProgressBar from "../TimeProgressBar/TimeProgressBar"
import RichText from "../RichText/RichText"
import { Experience } from "../../types/types"
import { formatDate } from "../../util/util"

export interface ExperienceCardProps {
    job: Experience
}

const ExperienceCard: FC<ExperienceCardProps> = ({job}) => {

    const calculatedHeightStyle = useMemo(() => {
        return {
            minHeight: job.minCardSize + "px"
        }
    }, [job])

    const testIdDateFormat = useMemo(() => {
        return job.startDate.format("YYYY-MM-DD")
    }, [job])


    return (
        <div className="relative mb-6 last:pb-0">
            <div className="flex flex-col gap-2 bg-gradient-to-br from-white to-gray-50 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow" style={calculatedHeightStyle}>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col lg:flex-row justify-between gap-1">
                        <h3 className="text-xl font-bold text-gray-800" data-testid={`role-${testIdDateFormat}`} data-ats data-ats-nowrap>{job.role}</h3>
                        <p className="text-sm font-medium text-gray-700" data-testid={`dates-${testIdDateFormat}`} data-ats data-ats-nowrap>
                            {formatDate(job.startDate)} - {formatDate(job.endDate)}
                        </p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-blue-600 font-semibold" data-testid={`company-${testIdDateFormat}`} data-ats>{job.company}</p>
                        <p className="text-gray-600 text-sm" data-testid={`location-${testIdDateFormat}`} data-ats>{job.location}</p>
                    </div>
                </div>
                <TimeProgressBar job={job} />          
                <span className="text-gray-700 leading-relaxed" data-testid={`description-${testIdDateFormat}`}><RichText text={job.description} /></span>
            </div>
        </div>
    )
}

export default ExperienceCard