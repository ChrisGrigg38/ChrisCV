import { MessageCircle } from "lucide-react";
import { useState } from "react";

const AIAssistantChat = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
        <button
          onClick={() => setIsOpen(open => !open)}
          className="flex items-center gap-2.5 fixed bottom-[40px] right-[40px] bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
          Ask AI
        </button>
    
        {isOpen && (
          <iframe 
            src="https://claude.site/public/artifacts/18a98671-03e1-4e54-826a-1d01ef94dfa9/embed" 
            title="Claude Artifact" 
            frameBorder="0" 
            allow="clipboard-write" 
            allowFullScreen
            style={{ 
              position: 'fixed',
              top: '100px',
              right: '0px',
              width: '400px',
              height: '500px'
            }}>

          </iframe>
        )}
      </>
  );
}

export default AIAssistantChat