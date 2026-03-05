'use client';

import { useState, FormEvent } from 'react';
import { submitHubspotForm } from '@/actions/hubspot';

type Field = {
  name: string;
  label: string;
  fieldType: string;
  required: boolean;
  options?: { label: string; value: string }[];
};

type FormSchema = {
  id: string;
  name: string;
  fieldGroups: {
    richText?: string;
    fields?: Field[];
  }[];
};

type HubspotDynamicFormProps = {
  portalId: string;
  formId: string;
  schema: FormSchema;
};

export default function HubspotDynamicForm({ portalId, formId, schema }: HubspotDynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  // Local state to handle conditional logic
  const [isAgency, setIsAgency] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // FormaData captures automatically every field that has a 'name' attribute
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
        data[key] = value.toString();
    });

    data['i_work_for_an_agency'] = isAgency ? 'true' : 'false';

    const currentPageUri = window.location.href;
    const currentPageName = document.title;

    const result = await submitHubspotForm(portalId, formId, data, currentPageUri, currentPageName);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "Une erreur est survenue.");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="py-10 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
        <p className="text-gray-600">Your request has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
      
      {schema.fieldGroups.map((group, groupIndex) => {
        
        // RichText
        if (group.richText) {
          return (
             // DangerouslySetInnerHTML because HubSpot sends HTML
            <div key={`rt-${groupIndex}`} dangerouslySetInnerHTML={{ __html: group.richText }} className="mb-2" />
          );
        }

        // Fields
        if (group.fields && group.fields.length > 0) {
          const field = group.fields[0];

          // HIDE counntry field if agency checkbox is not checked
          if (field.name === 'where_is_your_agency_based' && !isAgency) {
              return null;
          }

          return (
            <div key={field.name} className="flex flex-col gap-1.5">
              
              {/* Label */}
              {field.fieldType !== 'single_checkbox' && (
                  <label className="text-sm font-semibold text-black">
                    {field.label} {field.required && <span className="text-[#FF4D8D]">*</span>}
                  </label>
              )}

              {/* Dynamic render depending on field type */}
              
              {field.fieldType === 'email' && (
                <input required={field.required} type="email" name={field.name} placeholder="name@company.com" className="w-full rounded-md border-2 border-gray-200 px-4 py-3 text-black focus:border-black focus:outline-none transition-colors" />
              )}

              {field.fieldType === 'mobile_phone' && (
                <input required={field.required} type="tel" name={field.name} placeholder="+" className="w-full rounded-md border-2 border-gray-200 px-4 py-3 text-black focus:border-black focus:outline-none transition-colors" />
              )}

              {field.fieldType === 'dropdown' && field.options && (
                <select required={field.required} name={field.name} defaultValue="" className="w-full rounded-md border-2 border-gray-200 px-4 py-3 text-black focus:border-black focus:outline-none appearance-none bg-white cursor-pointer" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}>
                  <option value="" disabled>Select {field.label.toLowerCase()}</option>
                  
                  {/* Options are generated automatcally from the JSON */}
                  {field.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {field.fieldType === 'single_checkbox' && (
                 <div className="flex items-start gap-3 mt-1">
                 <input 
                    type="checkbox" 
                    id={field.name} 
                    name={field.name}
                    
                    // link 'isAgency' only if checkbox name is the right one
                    checked={field.name === 'i_work_for_an_agency' ? isAgency : undefined} 
                    onChange={(e) => {
                      if (field.name === 'i_work_for_an_agency') {
                        setIsAgency(e.target.checked);
                      }
                    }} 
                    
                    className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-black cursor-pointer" 
                  />
                 <div className="flex flex-col">
                     <label htmlFor={field.name} className="text-base font-semibold text-black cursor-pointer">
                         {field.label}
                     </label>
                 </div>
               </div>
              )}

            </div>
          );
        }
        return null;
      })}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" disabled={isSubmitting} className="mt-4 rounded-lg bg-[#151515] px-8 py-3.5 text-white font-semibold text-sm hover:bg-black transition-colors duration-200 w-fit disabled:opacity-50">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}