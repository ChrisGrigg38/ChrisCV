import { FC } from "react"

export interface HeaderTitleProps {
    title: string
}

const HeaderTitle: FC<HeaderTitleProps> = ({title}) => {
    return (
        <div className="flex items-center border-l-4 border-blue-500">
            <h2 className="pl-4 text-xl font-bold text-gray-800" data-testid={`title-${title}`} data-ats data-ats-paddingleft="2">{title}</h2>
        </div>
    )       
}

export default HeaderTitle