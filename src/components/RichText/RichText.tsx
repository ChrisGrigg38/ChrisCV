
import DOMPurify from 'dompurify';
import { FC, useMemo } from 'react';
import ReactHtmlParser from 'html-react-parser';

export interface RichTextProps {
    text: string
}

const RichText: FC<RichTextProps> = ({text}) => {
    const cleanedText = useMemo(() => {
        const sanitizedText = DOMPurify.sanitize(text)
        return ReactHtmlParser(sanitizedText)
    }, [text])

    return (
        <>{cleanedText}</>
    )
}

export default RichText