const DEFAULT_TARGET_EMAIL = import.meta.env.VITE_NEWSLETTER_TARGET_EMAIL || 'jiahaolinyt@gmail.com';

export type NewsletterResponse = {
  success: boolean;
  message: string;
};

const buildPayload = (subscriberEmail: string) => ({
  email: subscriberEmail,
  _replyto: subscriberEmail,
  _subject: 'Nueva suscripción al boletín',
  message: `Nueva suscripción al boletín: ${subscriberEmail}`,
});

/**
 * Envía un correo de notificación de suscripción usando el servicio formsubmit.co
 * hacia el correo definido en VITE_NEWSLETTER_TARGET_EMAIL (o el valor por defecto).
 */
export const sendNewsletterSubscription = async (
  subscriberEmail: string,
  targetEmail: string = DEFAULT_TARGET_EMAIL,
): Promise<NewsletterResponse> => {
  if (!targetEmail) {
    throw new Error('No se ha configurado el correo de destino');
  }

  const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(buildPayload(subscriberEmail)),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'No se pudo enviar la suscripción');
  }

  const data = (await response.json()) as { message?: string };
  return { success: true, message: data.message || 'Suscripción enviada' };
};

export default sendNewsletterSubscription;
