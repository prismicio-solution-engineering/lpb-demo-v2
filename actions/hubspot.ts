'use server';

export async function submitHubspotForm(
  portalId: string, 
  formId: string, 
  rawFormData: Record<string, any>,
  pageUri: string,
  pageName: string
) {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  // Specific format fot Hubspot API
  const fields = Object.entries(rawFormData).map(([name, value]) => ({
    name,
    value: value.toString(),
  }));

  const payload = {
    fields,
    context: {
      pageUri: pageUri,
      pageName: pageName,
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("HubSpot API Error:", errorData);
      return { success: false, error: "Une erreur est survenue lors de l'envoi." };
    }

    return { success: true };
  } catch (error) {
    console.error("HubSpot Submission Error:", error);
    return { success: false, error: "Erreur réseau." };
  }
}

export async function getHubSpotFormSchema(formId: string) {
  // Hubspot API v3 for forms
  const url = `https://api.hubapi.com/marketing/v3/forms/${formId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } 
    });

    if (!response.ok) {
      throw new Error(`Erreur API HubSpot: ${response.status}`);
    }

    const formData = await response.json();
    return formData;
  } catch (error) {
    console.error("Erreur lors de la récupération du formulaire:", error);
    return null;
  }
}