const DEFAULT_TARGET_EMAIL = import.meta.env.VITE_NEWSLETTER_TARGET_EMAIL || 'jiahaolinyt@gmail.com';
const DEFAULT_SUBJECT = 'Nueva suscripción al boletín';
const DEFAULT_MESSAGE_TEMPLATE = 'Nueva suscripción al boletín: {email}';

export type NewsletterResponse = {
  success: boolean;
  message: string;
};

export type NewsletterOptions = {
  /** Correo de destino (sobrescribe el valor por defecto o la variable de entorno). */
  targetEmail?: string;
  /** Asunto personalizado para el correo de notificación. */
  subject?: string;
  /**
   * Plantilla de mensaje para el cuerpo del correo.
   * Usa `{email}` como placeholder para inyectar el correo del suscriptor.
   */
  messageTemplate?: string;
};

const buildPayload = (
  subscriberEmail: string,
  { subject = DEFAULT_SUBJECT, messageTemplate = DEFAULT_MESSAGE_TEMPLATE }: Omit<NewsletterOptions, 'targetEmail'> = {},
) => ({
  email: subscriberEmail,
  _replyto: subscriberEmail,
  _subject: subject,
  message: messageTemplate.replace('{email}', subscriberEmail),
});

/**
 * Envía un correo de notificación de suscripción usando el servicio formsubmit.co
 * hacia el correo definido en VITE_NEWSLETTER_TARGET_EMAIL (o el valor por defecto).
 */
export const sendNewsletterSubscription = async (
  subscriberEmail: string,
  options: NewsletterOptions = {},
): Promise<NewsletterResponse> => {
  const targetEmail = options.targetEmail || DEFAULT_TARGET_EMAIL;

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
    body: JSON.stringify(buildPayload(subscriberEmail, options)),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'No se pudo enviar la suscripción');
  }

  const data = (await response.json()) as { message?: string };
  return { success: true, message: data.message || 'Suscripción enviada' };
};

export default sendNewsletterSubscription;
