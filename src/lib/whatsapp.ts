/**
 * Dominova Official WhatsApp & Contact Integration
 * Office Mobile / WhatsApp: +91 87543 25192
 * Official Email: dominova.office@gmail.com
 */

export const DOMINOVA_PHONE = '+91 87543 25192';
export const DOMINOVA_WHATSAPP_NUMBER = '918754325192';
export const DOMINOVA_EMAIL = 'dominova.office@gmail.com';

/**
 * Generates a direct WhatsApp link with an encoded pre-filled message.
 */
export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${DOMINOVA_WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * Opens WhatsApp in a new tab / window with the pre-filled message draft.
 */
export function openWhatsApp(message: string): void {
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Internship enrollment message template.
 * Example:
 * Hi Dominova Team,
 * I’m interested in enrolling in the Full Stack Development Internship.
 * I would like to know more about the program, duration, fees and enrollment process.
 * Thank you.
 */
export function getInternshipEnrollMessage(
  domainTitle: string,
  details?: { name?: string; college?: string; year?: string }
): string {
  const formattedDomain = domainTitle.toLowerCase().includes('internship')
    ? domainTitle
    : `${domainTitle} Internship`;

  if (details && (details.name || details.college)) {
    let msg = `Hi Dominova Team,\n`;
    msg += `I’m interested in enrolling in the ${formattedDomain}.\n`;
    if (details.name) msg += `Name: ${details.name}\n`;
    if (details.college) msg += `College/Institution: ${details.college}\n`;
    if (details.year) msg += `Year: ${details.year}\n`;
    msg += `I would like to know more about the program, duration, fees and enrollment process.\nThank you.`;
    return msg;
  }

  return `Hi Dominova Team,\nI’m interested in enrolling in the ${formattedDomain}.\nI would like to know more about the program, duration, fees and enrollment process.\nThank you.`;
}

/**
 * General inquiry message template.
 */
export function getGeneralInquiryMessage(): string {
  return `Hi Dominova Team,\nI would like to enquire about Dominova technology services and internship programs.\nThank you.`;
}

/**
 * Business project inquiry template.
 */
export function getServiceInquiryMessage(serviceTitle: string): string {
  return `Hi Dominova Team,\nI'm interested in discussing a project for ${serviceTitle}.\nI would like to know more about your development process, timeline, and pricing.\nThank you.`;
}

/**
 * Contact form submission draft message.
 */
export function getContactFormMessage(data: {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  inquiryType: string;
  serviceDomain: string;
  message: string;
}): string {
  const typeLabel =
    data.inquiryType === 'internship' ? 'Internship Program Enquiry' : 'Business Project Enquiry';

  let msg = `Hi Dominova Team,\nI'm reaching out regarding ${typeLabel}.\n\n`;
  msg += `*Domain/Service:* ${data.serviceDomain}\n`;
  msg += `*Name:* ${data.name}\n`;
  msg += `*Email:* ${data.email}\n`;
  if (data.phone) msg += `*Phone:* ${data.phone}\n`;
  if (data.organization) msg += `*Organization/College:* ${data.organization}\n`;
  msg += `\n*Message:* ${data.message}\n\nThank you.`;
  return msg;
}
