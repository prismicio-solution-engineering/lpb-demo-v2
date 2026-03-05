import { isFilled } from '@prismicio/client';

// Constant to import in seo/geo & abm pages
export const hubspotFormFetchLinks = [
  "hubspot_form.hubspot_portal_id",
  "hubspot_form.hubspot_form_id"
];

export type HubspotDataProps = {
  portalId: string;
  formId: string;
  schema?: any;
};

export function extractHubspotData(pageData: any): HubspotDataProps | null {
  const formDoc = 'form' in pageData ? pageData.form : null;
  const formData = isFilled.contentRelationship(formDoc) && "data" in formDoc ? (formDoc as any).data : null;

  if (!formData || !formData.hubspot_portal_id || !formData.hubspot_form_id) {
    return null;
  }

  return {
    portalId: formData.hubspot_portal_id,
    formId: formData.hubspot_form_id,
  };
}