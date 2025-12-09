import React from "react"
import { FC } from "react"

export interface HeaderItemProps {
    isLink?: boolean
    linkUrl?: string
    iconComponent: React.ReactNode
    text: string
    dataTestId?: string
}

const HeaderItem: FC<HeaderItemProps> = ({linkUrl, iconComponent, text, dataTestId, isLink = false}) => {
    return (
        isLink ? <a href={linkUrl} data-testid={dataTestId} target="_blank" className="flex items-center gap-2 hover:text-blue-200 transition-colors">
            {iconComponent}
            <span className="break-all" data-ats data-ats-background="rgb(29,79,216)">{text}</span>
        </a> : <div className="flex items-center gap-2" data-testid={dataTestId}>
            {iconComponent}
            <span className="break-all" data-ats data-ats-background="rgb(29,79,216)">{text}</span>
        </div>
    )
}

export default React.memo(HeaderItem)