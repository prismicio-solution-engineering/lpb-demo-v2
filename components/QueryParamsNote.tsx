"use client";

import { useState } from "react";
import AiLogo from "@/assets/AI/prismic-ai.svg";


type QueryParams = {
  company?: string;
  role?: string;
  topic?: string;
  details?: string;
  instructions?: string;
};

type QueryParamsNoteProps = {
  query: QueryParams;
  embedded?: boolean;
};

const LABELS: Record<keyof QueryParams, string> = {
  company: "Company",
  role: "Role",
  topic: "Topic",
  details: "Details",
  instructions: "Instructions",
};

export default function QueryParamsNote({
  query,
  embedded = false,
}: QueryParamsNoteProps) {
  const [isOpen, setIsOpen] = useState(embedded);
  const [hidePanel, setHidePanel] = useState(!embedded);
  const [hideButton, setHideButton] = useState(embedded);

  const entries = (Object.entries(query) as Array<[keyof QueryParams, string | undefined]>)
    .map(([key, value]) => [key, value?.trim()] as const)
    .filter(([, value]) => Boolean(value));

  const handleOpen = () => {
    setHidePanel(false);
    setTimeout(() => setIsOpen(true), 10);
    setTimeout(() => setHideButton(true), 300);
  };

  const handleClose = () => {
    setHideButton(false);
    setTimeout(() => setIsOpen(false), 10);
    setTimeout(() => setHidePanel(true), 300);
  };

  if (entries.length === 0) return null;

  return (

    <div className="fixed inset-0 z-[1200] p-4 flex justify-end items-center pointer-events-none">
      
      {/* PULSE ANIMATION : scale 1.06 | speed 2.5 */}
      <style>{`
        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        .animate-gentle-pulse {
          animation: gentlePulse 2.5s ease-in-out infinite;
        }
      `}</style>
      
      {/* BUTTON */}
      {/* Handle global apparition / disaparition */}
      <div 
        className={`relative pointer-events-auto z-10 origin-right transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        } ${hideButton ? "hidden" : "block"}`}
      >
        {/* Handle pulse animation */}
        <div className="animate-gentle-pulse origin-center">
          
          {/* Handle clic & hover */}
          <div 
            className="w-fit p-1 cursor-pointer rounded-2xl border border-[#ffffff40] bg-gradient-to-b from-[#b382f240] to-[#8E44EC40] hover:scale-110 transition-transform duration-200 shadow-lg"
            onClick={handleOpen}
          >
            <div className="p-2 flex flex-col gap-6 bg-[#ffffff] rounded-xl transition-colors">
              <div
                className="relative w-[24px] h-[24px] bg-[#5746AF]"
                style={{
                  maskImage: `url(${AiLogo.src})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: `url(${AiLogo.src})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* PANEL */}
      <div 
        className={`absolute left-4 right-4 sm:left-auto sm:right-4 pointer-events-auto z-20 origin-right transition-all duration-300 sm:w-[400px] p-2 rounded-2xl border border-[#ffffff40] bg-gradient-to-b from-[#b382f240] to-[#8E44EC40] shadow-2xl ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        } ${hidePanel ? "hidden" : "block"}`}
      >
        <div className="w-full rounded-xl flex flex-col overflow-hidden">
          <div className="w-full p-6 sm:p-8 flex flex-col gap-6 bg-[#ffffff]">
            <div className="w-full flex justify-between items-center">
              <div
                className="relative z-20 w-[32px] h-[32px] bg-[#5746AF]"
                style={{
                  maskImage: `url(${AiLogo.src})`,
                  maskSize: "contain",
                  maskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskImage: `url(${AiLogo.src})`,
                  WebkitMaskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                }}
              />
              <div 
                className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors"
                onClick={handleClose}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 -960 960 960" width="26px" fill="#5746AF">
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                </svg>
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <h3 className="text-xl sm:text-2xl text-[#151515] font-bold">Generation Context</h3>
              <p className="text-xs sm:text-sm text-[#505050] font-normal">
                This example page was generated by Prismic&apos;s Landing Page Agent for your Account-Based Marketing (ABM) scenario using the following informations.
              </p>
            </div>
          </div>

          <div className="w-full border-t border-[#a4a4a480] bg-[#F7F7F7]">
            {entries.map(([key, value]) => (
              <div key={key} className="w-full px-6 sm:px-8 py-3 sm:py-4 flex justify-between items-center flex-wrap gap-2 sm:gap-2 border-b border-[#a4a4a480] last:border-b-0">
                <span className="text-xs text-[#505050] min-w-max font-semibold">{LABELS[key] || key}</span>
                <span className="text-sm text-[#151515] break-words text-left">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
