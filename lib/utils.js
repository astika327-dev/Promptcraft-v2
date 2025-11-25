/**
 * Utility functions untuk PromptCraft
 * Optimasi dan helper functions
 */

/**
 * Debounce function untuk mengurangi frequency of function calls
 * @param {Function} func - Function yang akan di-debounce
 * @param {number} wait - Delay dalam milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function untuk membatasi execution rate
 * @param {Function} func - Function yang akan di-throttle
 * @param {number} limit - Minimum time between executions
 * @returns {Function} Throttled function
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Format timestamp ke human-readable format
 * @param {string|Date} timestamp - ISO timestamp atau Date object
 * @returns {string} Formatted date string
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

/**
 * Truncate text dengan ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Copy text to clipboard dengan fallback
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback untuk older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        textArea.remove();
        return true;
      } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        textArea.remove();
        return false;
      }
    }
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
}

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Calculate reading time
 * @param {string} text - Text to calculate
 * @param {number} wpm - Words per minute (default: 200)
 * @returns {number} Reading time in minutes
 */
export function calculateReadingTime(text, wpm = 200) {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wpm);
}

/**
 * Format number dengan thousand separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Get random item from array
 * @param {Array} array - Source array
 * @returns {*} Random item
 */
export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Shuffle array (Fisher-Yates algorithm)
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
export function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Local Storage wrapper dengan error handling
 */
export const storage = {
  get(key, defaultValue = null) {
    if (typeof window === 'undefined') return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} to localStorage:`, error);
      return false;
    }
  },

  remove(key) {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
      return false;
    }
  },

  clear() {
    if (typeof window === 'undefined') return false;
    try {
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

/**
 * API error handler
 * @param {Response} response - Fetch response
 * @returns {Promise<Object>} Parsed error
 */
export async function handleApiError(response) {
  let errorMessage = 'An unknown error occurred';
  
  try {
    const data = await response.json();
    errorMessage = data.message || data.error || errorMessage;
  } catch (e) {
    errorMessage = response.statusText || errorMessage;
  }
  
  return {
    status: response.status,
    message: errorMessage
  };
}

/**
 * Retry function dengan exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} delay - Initial delay in ms
 * @returns {Promise<*>} Function result
 */
export async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
    }
  }
}

/**
 * Check if user prefers dark mode
 * @returns {boolean} Prefers dark mode
 */
export function prefersDarkMode() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Smooth scroll to element
 * @param {string} elementId - Element ID to scroll to
 * @param {number} offset - Offset from top (default: 0)
 */
export function smoothScrollTo(elementId, offset = 0) {
  const element = document.getElementById(elementId);
  if (element) {
    const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/**
 * Format currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: 'USD')
 * @returns {string} Formatted currency
 */
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}
