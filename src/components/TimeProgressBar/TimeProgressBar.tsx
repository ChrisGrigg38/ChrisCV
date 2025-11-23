import { Experience } from "@/types/types"
import { FC, useMemo, memo } from "react"
import moment from 'moment';


export interface TimeProgressBarProps {
    job: Experience
}

const TimeProgressBar: FC<TimeProgressBarProps> = ({job}) => {

    const calculateProgress = (startDate: moment.Moment, endDate: moment.Moment | null): number => {
        const start = startDate.milliseconds();
        const end = !endDate ? moment().milliseconds() : endDate.milliseconds();
        const total = moment().milliseconds() - job.startDate.milliseconds();
        return ((end - start) / total) * 100;
    };

    const progress = useMemo(() => {
        return Math.min(calculateProgress(job.startDate, job.endDate), 100)
    }, [job])

    return (
        <div className="mb-4">
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full shadow-md"
                    style={{ left: `calc(${progress}% - 6px)` }}
                ></div>
            </div>
        </div>
    )
}

export default memo(TimeProgressBar)