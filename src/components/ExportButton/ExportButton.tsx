import { PersonalInfo } from "@/types/types";
import { exportPDF } from "@/util/util";
import { Download } from "lucide-react"
import { FC, useState } from "react";

export interface ExportButtonProps {
    personalInfo: PersonalInfo
}

const ExportButton: FC<ExportButtonProps> = ({personalInfo}) => {

    const [isExporting, setIsExporting] = useState(false);
    
    const handleExportPDF = async () => {
        setIsExporting(true);
    
         exportPDF(personalInfo).finally(() => {
            setIsExporting(false)
         })
    };


    return (
        <div className="mb-6 flex justify-end">
            <button
              onClick={handleExportPDF}
              disabled={isExporting}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
            >
              <Download size={20} />
              {isExporting ? 'Generating PDF...' : 'Export to PDF'}
            </button>
        </div>
    )
}

export default ExportButton