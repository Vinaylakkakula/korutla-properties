import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format Indian Rupees (INR)
 * e.g. 15000000 -> ₹1.5 Cr, 8500000 -> ₹85 Lakhs, 35000 -> ₹35,000
 */
export function formatPrice(price: number, unit?: 'total' | 'monthly' | 'per-acre'): string {
  if (price === 0) return 'Price on Request';

  let formatted = '';

  if (price >= 10000000) {
    const cr = (price / 10000000).toFixed(2).replace(/\.00$/, '');
    formatted = `₹${cr} Cr`;
  } else if (price >= 100000) {
    const lakhs = (price / 100000).toFixed(2).replace(/\.00$/, '');
    formatted = `₹${lakhs} Lakhs`;
  } else {
    formatted = `₹${price.toLocaleString('en-IN')}`;
  }

  if (unit === 'monthly') {
    return `${formatted}/mo`;
  }
  if (unit === 'per-acre') {
    return `${formatted}/acre`;
  }
  return formatted;
}

export function formatArea(area: number, unit: string = 'sqft'): string {
  const unitLabels: Record<string, string> = {
    sqft: 'sq.ft',
    sqyd: 'sq.yd',
    acres: 'Acres',
    guntas: 'Guntas',
  };
  return `${area.toLocaleString('en-IN')} ${unitLabels[unit] || unit}`;
}

export function generateWhatsAppLink(phone: string, message: string = ''): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedMsg = encodeURIComponent(message || 'Hello, I am interested in your property listed on Korutla Properties.');
  return `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodedMsg}`;
}

export function generateCallLink(phone: string): string {
  const cleanPhone = phone.replace(/[^0-9+]/g, '');
  return `tel:${cleanPhone}`;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

