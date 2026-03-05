    'use server';

export async function submitHubspotForm(
  portalId: string, 
  formId: string, 
  rawFormData: Record<string, any>,
  pageUri: string,
  pageName: string
) {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

  // L'API HubSpot attend un format très précis : un tableau d'objets { name, value }
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