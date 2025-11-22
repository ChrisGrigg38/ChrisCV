import { PersonalInfo } from "@/types/types"
import { FC } from "react"
import RichText from "../RichText/RichText"
import HeaderTitle from "../HeaderTitle/HeaderTitle"

export interface SummaryProps {
    personalInfo: PersonalInfo
}

const Summary: FC<SummaryProps> = ({personalInfo}) => {
    return (
        <div className="flex flex-col gap-4 p-8 pb-1 border-b border-gray-200">
            <HeaderTitle title="Professional Summary" />
            <p className="text-gray-700 leading-relaxed break-words"><RichText text={personalInfo.summary} /></p>
        </div>
    )
}

export default Summary