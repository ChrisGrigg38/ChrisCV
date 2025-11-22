import { FC } from "react"
import HeaderTitle from "../HeaderTitle/HeaderTitle"
import { SideProject } from "@/types/types"
import Project from "../Project/Project"

export interface ProjectsProps {
    projects: SideProject[]
}

const Projects: FC<ProjectsProps> = ({projects}) => {
    return (
        <div className="flex flex-col gap-3 p-8 bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
            <HeaderTitle title="Personal Projects / Side Income" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Project key={project.name} project={project} />
                ))}
            </div>
        </div>
    )
}

export default Projects