'use client';

import { useState } from 'react';
import HubspotDynamicForm from './HubspotDynamicForm';
type HubspotModalProps = {
  portalId: string;
  formId: string;
  schema: any; 
  buttonText?: string;
};

export default function HubspotModal({ 
  portalId, 
  formId,
  schema,
  buttonText = "Request a demo"
}: HubspotModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="flex gap-2 justify-center items-center text-center text-[#FFFFFF] bg-[#151515] px-4 py-2 rounded-lg border-2 border-[#151515] cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m98-537 168-168q14-14 33-20t39-2l52 11q-54 64-85 116t-60 126L98-537Zm205 91q23-72 62.5-136T461-702q88-88 201-131.5T873-860q17 98-26 211T716-448q-55 55-120 95.5T459-289L303-446Zm332.5-97q33.5 0 56.5-23t23-56.5q0-33.5-23-56.5t-56.5-23q-33.5 0-56.5 23t-23 56.5q0 33.5 23 56.5t56.5 23ZM551-85l-64-147q74-29 126.5-60T730-377l10 52q4 20-2 39.5T718-252L551-85ZM162-318q35-35 85-35.5t85 34.5q35 35 35 85t-35 85q-25 25-83.5 43T87-74q14-103 32-161t43-83Z"/></svg>
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 transition-opacity" 
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="bg-white rounded-2xl w-full max-w-xl p-8 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
             <button 
               onClick={() => setIsOpen(false)} 
               className="absolute top-5 right-5 text-black hover:text-gray-600 cursor-pointer"
             >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>

             <HubspotDynamicForm 
                 portalId={portalId}
                 formId={formId}
                 schema={schema}
             />
             
          </div>
        </div>
      )}
    </>
  );
}