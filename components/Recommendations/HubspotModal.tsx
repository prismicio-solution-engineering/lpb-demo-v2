'use client';

import { useState, FormEvent } from 'react';
import { submitHubspotForm } from '@/actions/hubspot';

type HubspotModalProps = {
  portalId: string;
  formId: string;
  title: string;
  buttonText?: string;
};

export default function HubspotModal({ 
  portalId, 
  formId, 
  title,
  buttonText = "Request a demo"
}: HubspotModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAgency, setIsAgency] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // On récupère les données du formulaire
    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get('email'),
      company_size: formData.get('company_size'),
      i_work_for_an_agency: isAgency ? 'true' : 'false',
      where_is_your_agency_based: isAgency ? formData.get('agency_based') : '',
      mobilephone: formData.get('mobilephone'),
    };

    const currentPageUri = window.location.href;
    const currentPageName = document.title;

    const result = await submitHubspotForm(portalId, formId, data, currentPageUri, currentPageName);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "Something went wrong.");
    }
    setIsSubmitting(false);
  };

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

             <div className="mb-6">
               <h2 className="text-4xl font-bold tracking-tight text-black mb-2 leading-tight">
                 {title} {/* 👈 Le titre dynamique injecté ici */}
               </h2>
               <p className="text-gray-600">Fill out the form and we will get back to you shortly.</p>
             </div>

             {isSuccess ? (
                <div className="py-10 text-center">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
                    <p className="text-gray-600">Your request has been submitted successfully.</p>
                    <button onClick={() => setIsOpen(false)} className="mt-6 bg-[#151515] text-white px-6 py-2 rounded-lg">Close</button>
                </div>
             ) : (
                 <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                   
                   {/* EMAIL */}
                   <div className="flex flex-col gap-1.5">
                     <label className="text-sm font-semibold text-black">Email <span className="text-[#FF4D8D]">*</span></label>
                     <input required type="email" name="email" placeholder="name@company.com" className="w-full rounded-md border-2 border-gray-200 px-4 py-3 text-black focus:border-black focus:outline-none transition-colors" />
                   </div>

                   {/* COMPANY SIZE */}
                   <div className="flex flex-col gap-1.5">
                     <label className="text-sm font-semibold text-black">Company size <span className="text-[#FF4D8D]">*</span></label>
                     <select required name="company_size" className="w-full rounded-md border-2 border-gray-200 px-4 py-3 text-black focus:border-black focus:outline-none appearance-none bg-white cursor-pointer" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}>
                       <option value="" disabled selected>Select your company size</option>
                       <option value="1-10">1-10</option>
                       <option value="11-50">11-50</option>
                       <option value="51-250">51-250</option>
                       <option value="251-500">251-500</option>
                       <option value="501-750">501-750</option>
                       <option value="751-1500">751-1500</option>
                       <option value="1501-4000">1501-4000</option>
                       <option value="4001+">4001+</option>
                     </select>
                   </div>

                   {/* CHECKBOX AGENCY */}
                   <div className="flex items-start gap-3 mt-1">
                     <input type="checkbox" id="is_agency" checked={isAgency} onChange={(e) => setIsAgency(e.target.checked)} className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-black cursor-pointer" />
                     <div className="flex flex-col">
                         <label htmlFor="is_agency" className="text-base font-semibold text-black cursor-pointer">I work for an agency</label>
                         <span className="text-sm text-gray-500">Please check this box if you're working in an agency</span>
                     </div>
                   </div>

                   {/* AGENCY LOCATION (Conditionnel) */}
                   {isAgency && (
                     <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                       <label className="text-sm font-semibold text-black">Where is your agency based? <span className="text-[#FF4D8D]">*</span></label>
                       <select required name="agency_based" className="w-full rounded-md border-2 border-gray-200 px-4 py-3 text-black focus:border-black focus:outline-none appearance-none bg-white cursor-pointer" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}>
                         <option value="" disabled selected>Select a location</option>
                         <option value="Australia">Australia</option>
                         <option value="Brazil">Brazil</option>
                         <option value="Canada">Canada</option>
                         <option value="China">China</option>
                         <option value="France">France</option>
                         <option value="Germany">Germany</option>
                         <option value="Greece">Greece</option>
                         <option value="India">India</option>
                         <option value="Italy">Italy</option>
                         <option value="Japan">Japan</option>
                         <option value="Mexico">Mexico</option>
                         <option value="Portugal">Portugal</option>
                         <option value="Russia">Russia</option>
                         <option value="South Korea">South Korea</option>
                         <option value="Spain">Spain</option>
                         <option value="Switzerland">Switzerland</option>
                         <option value="Thailand">Thailand</option>
                         <option value="Turkey">Turkey</option>
                         <option value="United Kingdom">United Kingdom</option>
                         <option value="United States">United States</option>
                       </select>
                     </div>
                   )}

                   {/* MOBILE PHONE */}
                   <div className="flex flex-col gap-1.5">
                     <label className="text-sm font-semibold text-black">Mobile phone number</label>
                     <input type="tel" name="mobilephone" placeholder="+" className="w-full rounded-md border-2 border-gray-200 px-4 py-3 text-black focus:border-black focus:outline-none transition-colors" />
                   </div>

                   {error && <p className="text-red-500 text-sm">{error}</p>}

                   {/* SUBMIT */}
                   <button type="submit" disabled={isSubmitting} className="mt-4 rounded-lg bg-[#151515] px-8 py-3.5 text-white font-semibold text-sm hover:bg-black transition-colors duration-200 w-fit disabled:opacity-50">
                     {isSubmitting ? "Submitting..." : "Submit"}
                   </button>
                 </form>
             )}
          </div>
        </div>
      )}
    </>
  );
}