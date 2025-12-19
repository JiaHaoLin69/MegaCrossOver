const DEFAULT_TARGET_EMAIL = import.meta.env.VITE_NEWSLETTER_TARGET_EMAIL || 'jiahaolinyt@gmail.com';
const DEFAULT_PAGE_NAME = 'MegaCrossOver';
const DEFAULT_THANK_YOU = '¡Gracias por suscribirte a MegaCrossOver!';

export type NewsletterResponse = {
  success: boolean;
  message: string;
};

export type NewsletterOptions = {
  targetEmail?: string;
  subject?: string;
  messageTemplate?: string;
  autoresponseTemplate?: string;
  pageName?: string;
};

const buildPayload = (subscriberEmail: string, options: NewsletterOptions = {}) => {
  const pageName = options.pageName || DEFAULT_PAGE_NAME;
  const thankYouMessage = DEFAULT_THANK_YOU.replace('MegaCrossOver', pageName);

  const adminMessage = options.messageTemplate
    ? options.messageTemplate.replace('{email}', subscriberEmail)
    : `Nueva suscripción al boletín: ${subscriberEmail}`;

  const autoresponseText = options.autoresponseTemplate
    ? options.autoresponseTemplate.replace('{email}', subscriberEmail)
    : `${thankYouMessage} Nos alegra tenerte en ${pageName}.`;

  const autoresponseHtml = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #0b1330; padding: 16px; background: #f4f7fb;">
      <div style="max-width: 520px; margin: auto; background: #ffffff; border-radius: 12px; padding: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
        <h2 style="margin: 0 0 12px 0; color: #1434a4;">${thankYouMessage}</h2>
        <p style="margin: 0 0 12px 0;">Hola <strong>${subscriberEmail}</strong>,</p>
        <p style="margin: 0 0 12px 0;">Gracias por unirte a <strong>${pageName}</strong>. En breve recibirás noticias, sorteos y contenido especial directamente en tu bandeja.</p>
        <p style="margin: 0; font-weight: 600; color: #0b1330;">— El equipo de ${pageName}</p>
      </div>
    </div>
  `;

  return {
    email: subscriberEmail,
    _replyto: subscriberEmail,
    _subject: options.subject || `Nueva suscripción al boletín de ${pageName}`,
    message: adminMessage,
    _autoresponse: autoresponseText,
    _autoresponse_subject: `Bienvenido(a) a ${pageName}`,
    _autoresponse_html: autoresponseHtml,
  };
};

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
