import AIAssistantChat from "@/components/AIAssistantChat/AIAssistantChat";
import Experiences from "@/components/Experiences/Experiences";
import ExportButton from "@/components/ExportButton/ExportButton";
import Header from "@/components/Header/Header";
import Projects from "@/components/Projects/Projects";
import SkillSideBar from "@/components/SkillsSidebar/SkillSideBar";
import Summary from "@/components/Summary/Summary";
import { experiences, personalInfo, projects, skills } from "@/const/const";

const CVPage = () => {    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Export Button */}
                <ExportButton personalInfo={personalInfo} />

                {/* CV Content */}
                <div id="cv-content" className="bg-white rounded-xl shadow-2xl overflow-hidden">
                    {/* Header Section */}
                    <Header personalInfo={personalInfo} />

                    {/* Summary Section */}
                    <Summary personalInfo={personalInfo} />

                    {/* Skills and Experience Section */}
                    <div className="flex">
                        <SkillSideBar skills={skills} />

                        <div className="flex flex-col">
                            {/* Experience Section */}
                            <Experiences experiences={experiences} />

                            {/* Personal Projects Section */}
                            <Projects projects={projects} />
                        </div>
                    </div>
                </div>
                {/* AI Assistant */}
                <AIAssistantChat />
            </div>
        </div>
    );
}

export default CVPage