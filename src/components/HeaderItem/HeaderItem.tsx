import React from "react"
import { FC } from "react"

export interface HeaderItemProps {
    isLink?: boolean
    linkUrl?: string
    iconComponent: React.ReactNode
    text: string
}

const HeaderItem: FC<HeaderItemProps> = ({linkUrl, iconComponent, text, isLink = false}) => {
    return (
        isLink ? <a href={linkUrl} target="_blank" data-pdflink={linkUrl} className="flex items-center gap-2 hover:text-blue-200 transition-colors">
            {iconComponent}
            <span className="break-all">{text}</span>
        </a> : <div className="flex items-center gap-2">
            {iconComponent}
            <span className="break-all">{text}</span>
        </div>
    )
}

export default React.memo(HeaderItem)