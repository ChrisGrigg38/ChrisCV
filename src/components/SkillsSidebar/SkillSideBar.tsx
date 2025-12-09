import { FC } from "react"
import SkillBar from "../SkillBar/SkillBar"
import { Skill } from "@/types/types"
import HeaderTitle from "../HeaderTitle/HeaderTitle"

export interface SkillSideBarProps {
    skills: Skill[]
}

const SkillSideBar: FC<SkillSideBarProps> = ({skills}) => {
    return (
        <div className="w-1/3 bg-gradient-to-br from-gray-50 to-gray-100 gap-9 p-8 border-r border-gray-200 hidden md:flex md:flex-col">
            <HeaderTitle title="Skills" />
            <SkillBar skills={skills} />
        </div>
    )
}

export default SkillSideBar