// lib/hubspot.ts
import { isFilled } from '@prismicio/client';

// 1. La constante à importer dans tes pages Prismic (SEO, ABM, etc.)
export const hubspotFormFetchLinks = [
  "hubspot_form.hubspot_portal_id",
  "hubspot_form.hubspot_form_id",
  "hubspot_form.form_title"
];

// 2. Une petite fonction "Helper" pour extraire proprement les données
export function extractHubspotData(pageData: any) {
  const formDoc = 'form' in pageData ? pageData.form : null;
  const formData = isFilled.contentRelationship(formDoc) && "data" in formDoc ? (formDoc as any).data : null;

  if (!formData || !formData.hubspot_portal_id || !formData.hubspot_form_id) {
    return null;
  }

  return {
    portalId: formData.hubspot_portal_id,
    formId: formData.hubspot_form_id,
    title: formData.form_title || "Request a demo", // (À adapter si c'est du RichText : asText(formData.form_title))
  };
}