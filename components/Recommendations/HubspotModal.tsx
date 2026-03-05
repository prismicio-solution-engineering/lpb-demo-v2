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
        className="bg-[#151515] text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-colors"
      >
        {buttonText}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 transition-opacity" 
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="bg-white rounded-2xl w-full max-w-xl p-8 relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]">
             <button 
               onClick={() => setIsOpen(false)} 
               className="absolute top-5 right-5 text-black hover:text-gray-600"
             >
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>

             {/* 🌟 ICI on appelle ton composant qui génère le formulaire à la volée ! */}
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