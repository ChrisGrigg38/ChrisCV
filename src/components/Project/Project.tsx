import { SideProject } from "@/types/types"
import { Github, Youtube } from "lucide-react"
import React from "react"
import { FC } from "react"
import RichText from "../RichText/RichText"

export interface ProjectProps {
    project: SideProject
}

const Project: FC<ProjectProps> = ({project}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-3" data-testid={`name-${project.name}`} data-ats>{project.name}</h3>
            <p className="text-gray-700 leading-relaxed mb-4" data-testid={`description-${project.name}`}><RichText text={project.description} /></p>
            <div className="flex gap-4 items-center">
                {project.githubUrl && (
                    <a 
                        href={project.githubUrl}
                        data-testid={`githubUrl-${project.name}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                    >
                        <Github size={18} />
                        <span data-ats data-ats-overridelink={project.githubUrl} data-ats-linkpaddingtop="-2">View Code</span>
                    </a>
                )}
                {project.youtubeUrl && (
                    <a 
                        href={project.youtubeUrl}
                        data-testid={`youtubeUrl-${project.name}`}  
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors text-sm font-medium"
                    >
                        <Youtube size={18} />
                        <span data-ats data-ats-overridelink={project.youtubeUrl} data-ats-linkpaddingtop="-2">Watch Demo</span>
                    </a>
                )}
            </div>
        </div>
    )
}

export default React.memo(Project)