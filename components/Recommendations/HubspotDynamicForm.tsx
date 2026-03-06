'use client';

import { useState, FormEvent } from 'react';
import { submitHubspotForm } from '@/actions/hubspot';

type HubSpotField = {
  name: string;
  label: string;
  fieldType: string;
  required: boolean;
  options?: { label: string; value: string }[];
  // include type for dependent fields (conditions)
  dependentFieldFilters?: {
    filters: { operator: string; strValue: string }[];
    dependentFormField: HubSpotField;
  }[];
};

type FormSchema = {
  id: string;
  name: string;
  fieldGroups: {
    richText?: string;
    fields?: HubSpotField[];
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

  // Stock all inputs in real time
  const [formValues, setFormValues] = useState<Record<string, string>>({});

  // Update values on each clic
  const handleInputChange = (name: string, value: string | boolean) => {
    const stringValue = typeof value === 'boolean' ? value.toString() : value;
    setFormValues((prev) => ({ ...prev, [name]: stringValue }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Use FormData to retrieve ONLY visible fields
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
        data[key] = value.toString();
    });

    // Specific case for checkboxes : if not checked formData ignores so we force 'false'
    schema.fieldGroups.forEach(group => {
        group.fields?.forEach(field => {
            if (field.fieldType === 'single_checkbox' && !data[field.name]) {
                data[field.name] = 'false';
            } else if (field.fieldType === 'single_checkbox' && data[field.name] === 'on') {
                data[field.name] = 'true';
            }
        });
    });

    const result = await submitHubspotForm(portalId, formId, data, window.location.href, document.title);

    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "Une erreur est survenue.");
    }
    setIsSubmitting(false);
  };

  if (isSuccess) {
    return (
      <div className="py-10 text-center animate-in fade-in zoom-in duration-500">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold mb-2">Thank you!</h3>
        <p className="text-gray-600">Your request has been submitted successfully.</p>
      </div>
    );
  }

  // Render field
  const renderField = (field: HubSpotField) => {
    return (
      <div key={field.name} className="flex flex-col gap-1.5 animate-in fade-in duration-300">
        
        {/* Le Label */}
        {field.fieldType !== 'single_checkbox' && (
            <label className="text-sm font-semibold text-black">
              {field.label} {field.required && <span className="text-[#FF4D8D]">*</span>}
            </label>
        )}

        {/* INPUT: Email or Text */}
        {(field.fieldType === 'email' || field.fieldType === 'text') && (
          <input required={field.required} type={field.fieldType} name={field.name} onChange={(e) => handleInputChange(field.name, e.target.value)} placeholder={`Enter your ${field.label.toLowerCase()}`} className="w-full rounded-md border-2 border-gray-200 px-4 py-3 text-black focus:border-black focus:outline-none transition-colors" />
        )}

        {/* INPUT: Phone */}
        {field.fieldType === 'mobile_phone' && (
          <input required={field.required} type="tel" name={field.name} onChange={(e) => handleInputChange(field.name, e.target.value)} placeholder="+" className="w-full rounded-md border-2 border-gray-200 px-4 py-3 text-black focus:border-black focus:outline-none transition-colors" />
        )}

        {/* INPUT: Drop down */}
        {field.fieldType === 'dropdown' && field.options && (
          <select required={field.required} name={field.name} defaultValue="" onChange={(e) => handleInputChange(field.name, e.target.value)} className="w-full rounded-md border-2 border-gray-200 px-4 py-3 text-black focus:border-black focus:outline-none appearance-none bg-white cursor-pointer" style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.2em 1.2em' }}>
            <option value="" disabled>Select {field.label.toLowerCase()}</option>
            {field.options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )}

        {/* INPUT: Unique checkbox */}
        {field.fieldType === 'single_checkbox' && (
           <div className="flex items-start gap-3 mt-1">
           <input 
              type="checkbox" 
              id={field.name} 
              name={field.name}
              onChange={(e) => handleInputChange(field.name, e.target.checked)} 
              className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-black focus:ring-black cursor-pointer" 
            />
           <div className="flex flex-col">
               <label htmlFor={field.name} className="text-base font-semibold text-black cursor-pointer">
                   {field.label} {field.required && <span className="text-[#FF4D8D]">*</span>}
               </label>
           </div>
         </div>
        )}

        {/* Verify for dependent fields (conditional) */}
        {field.dependentFieldFilters && field.dependentFieldFilters.map((dependency, idx) => {
          // Check if Hubspot condition correspond to what the user typed/checked
          const requiredValue = dependency.filters[0]?.strValue;
          const currentValue = formValues[field.name];

          if (currentValue === requiredValue) {
            // If yes render hidden field
            return (
               <div key={`dep-${idx}`} className="mt-3 pl-4 border-l-2 border-gray-100">
                  {renderField(dependency.dependentFormField)}
               </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-xl">
      {schema.fieldGroups.map((group, groupIndex) => {
        if (group.richText) {
          return <div key={`rt-${groupIndex}`} dangerouslySetInnerHTML={{ __html: group.richText }} className="mb-2" />;
        }
        if (group.fields && group.fields.length > 0) {
          return renderField(group.fields[0]);
        }
        return null;
      })}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button type="submit" disabled={isSubmitting} className="mt-4 rounded-lg bg-[#151515] px-8 py-3.5 text-white font-semibold text-sm hover:bg-black transition-colors duration-200 w-fit disabled:opacity-50 cursor-pointer">
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
} 