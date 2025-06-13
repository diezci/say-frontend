export const formatCurrency = (amount, currency = 'EUR') => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return new Date(date).toLocaleDateString('es-ES', {
    ...defaultOptions,
    ...options,
  });
};

export const formatRelativeTime = (date) => {
  const rtf = new Intl.RelativeTimeFormat('es-ES', { numeric: 'auto' });
  const diffInSeconds = (new Date(date) - new Date()) / 1000;
  
  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(Math.round(diffInSeconds), 'second');
  }
  
  const diffInMinutes = diffInSeconds / 60;
  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(Math.round(diffInMinutes), 'minute');
  }
  
  const diffInHours = diffInMinutes / 60;
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(Math.round(diffInHours), 'hour');
  }
  
  const diffInDays = diffInHours / 24;
  return rtf.format(Math.round(diffInDays), 'day');
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
