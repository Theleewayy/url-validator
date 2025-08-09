/**
 * Useless URL Validator - Frontend JavaScript
 * 
 * This script handles the frontend functionality for a URL validator
 * that always rejects URLs regardless of their validity.
 * 
 * Features:
 * - Form submission handling
 * - Real-time validation (always fails)
 * - Error state management
 * - Accessibility support
 * - Input sanitization
 * - Comprehensive error handling
 */

// ============================================================================
// DOM Elements
// ============================================================================

const urlForm = document.getElementById('urlForm');
const urlInput = document.getElementById('urlInput');
const submitBtn = document.getElementById('submitBtn');
const result = document.getElementById('result');
const loading = document.getElementById('loading');
const errorText = document.getElementById('errorText');
const urlError = document.getElementById('urlError');

// ============================================================================
// State Management
// ============================================================================

// Validation state
let isSubmitting = false;
let currentErrorTimeout = null;
let lastSubmittedUrl = '';

// Configuration
const CONFIG = {
    MAX_URL_LENGTH: 2048,
    MIN_URL_LENGTH: 5,
    ERROR_TIMEOUT: 10000,
    DEBOUNCE_DELAY: 300,
    MAX_RETRIES: 3
};

// ============================================================================
// Input Sanitization & Validation
// ============================================================================

/**
 * Sanitizes URL input to prevent XSS and other security issues
 * @param {string} url - The URL to sanitize
 * @returns {string} - Sanitized URL
 */
function sanitizeUrl(url) {
    if (typeof url !== 'string') {
        return '';
    }
    
    // Remove leading/trailing whitespace
    let sanitized = url.trim();
    
    // Remove any script tags or dangerous content
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/javascript:/gi, '');
    sanitized = sanitized.replace(/data:/gi, '');
    sanitized = sanitized.replace(/vbscript:/gi, '');
    
    // Limit length
    if (sanitized.length > CONFIG.MAX_URL_LENGTH) {
        sanitized = sanitized.substring(0, CONFIG.MAX_URL_LENGTH);
    }
    
    return sanitized;
}

/**
 * Validates URL format (always returns false for this useless validator)
 * @param {string} url - The URL to validate
 * @returns {object} - Validation result object
 */
function validateURL(url) {
    const sanitized = sanitizeUrl(url);
    
    // Basic length check
    if (sanitized.length < CONFIG.MIN_URL_LENGTH) {
        return {
            isValid: false,
            message: "URL is too short",
            sanitized: sanitized
        };
    }
    
    // Always return false - this is a useless validator!
    return {
        isValid: false,
        message: "Invalid URL - Please try again",
        sanitized: sanitized
    };
}

// ============================================================================
// Error Handling & Display
// ============================================================================

/**
 * Shows error message with enhanced styling and accessibility
 * @param {string} message - Error message to display
 * @param {string} type - Error type (optional)
 */
function showError(message, type = 'validation') {
    try {
        // Clear any existing timeout
        if (currentErrorTimeout) {
            clearTimeout(currentErrorTimeout);
        }
        
        // Clear previous error state
        clearErrorState();
        
        // Sanitize error message
        const sanitizedMessage = sanitizeUrl(message) || "Invalid URL - Please try again";
        
        // Set error message
        if (errorText) {
            errorText.textContent = sanitizedMessage;
        }
        
        // Add timestamp to error
        const errorTime = document.getElementById('errorTime');
        if (errorTime) {
            const now = new Date();
            errorTime.textContent = `Time: ${now.toLocaleTimeString()}`;
        }
        
        // Show error with animation
        if (result) {
            result.classList.remove('hidden');
            result.setAttribute('aria-live', 'assertive');
        }
        
        if (loading) {
            loading.classList.add('hidden');
        }
        
        // Add error styling to input and form
        if (urlInput) {
            urlInput.classList.add('error-state');
            urlInput.setAttribute('aria-invalid', 'true');
        }
        
        addFormErrorState();
        
        // Focus management for accessibility
        if (result) {
            result.focus();
        }
        
        // Log error for debugging
        console.log(`❌ Error displayed (${type}): ${sanitizedMessage}`);
        
        // Auto-clear error after configured timeout
        currentErrorTimeout = setTimeout(() => {
            clearErrorState();
        }, CONFIG.ERROR_TIMEOUT);
        
    } catch (error) {
        console.error('🚨 Error in showError function:', error);
        // Fallback error display
        alert('An error occurred while displaying the error message.');
    }
}

// Clear error state
function clearErrorState() {
    result.classList.add('hidden');
    urlInput.classList.remove('error-state');
    result.removeAttribute('aria-live');
    removeFormErrorState();
    
    // Remove any error icons
    const errorIcon = document.querySelector('.input-error-icon');
    if (errorIcon) {
        errorIcon.remove();
    }
    
    console.log('🧹 Error state cleared');
}

// Show loading state
function showLoading() {
    // Clear any existing error state
    clearErrorState();
    
    result.classList.add('hidden');
    loading.classList.remove('hidden');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Validating...';
    isSubmitting = true;
}

// Hide loading state
function hideLoading() {
    loading.classList.add('hidden');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Validate URL';
    isSubmitting = false;
}

// Add form error state styling
function addFormErrorState() {
    urlForm.classList.add('error-state');
    submitBtn.classList.add('error-state');
    console.log('🎨 Applied form error styling');
}

// Remove form error state styling
function removeFormErrorState() {
    urlForm.classList.remove('error-state');
    submitBtn.classList.remove('error-state');
    console.log('🎨 Removed form error styling');
}

// ============================================================================
// Form Submission & API Communication
// ============================================================================

/**
 * Handles form submission with comprehensive error handling
 * @param {Event} e - Form submission event
 */
async function handleSubmit(e) {
    e.preventDefault();
    
    try {
        // Prevent multiple submissions
        if (isSubmitting) {
            console.log('🚫 Form submission blocked - already processing');
            return;
        }
        
        // Get and sanitize URL input
        const rawUrl = urlInput.value;
        const sanitizedUrl = sanitizeUrl(rawUrl);
        
        // Validate input
        const validation = validateURL(sanitizedUrl);
        
        // Basic empty check
        if (!sanitizedUrl || sanitizedUrl.length < CONFIG.MIN_URL_LENGTH) {
            console.log('❌ Empty or too short URL submitted');
            showError("Please enter a valid URL", 'input');
            if (urlInput) {
                urlInput.focus();
            }
            return;
        }
        
        // Check for duplicate submission
        if (sanitizedUrl === lastSubmittedUrl) {
            console.log('🔄 Duplicate URL submission detected');
            showError("This URL was already validated. Please try a different URL.", 'duplicate');
            return;
        }
        
        console.log(`🔍 Submitting URL for validation: ${sanitizedUrl}`);
        
        // Store last submitted URL
        lastSubmittedUrl = sanitizedUrl;
        
        // Show loading state
        showLoading();
        
        // Submit to backend endpoint with retry logic
        const response = await submitToBackend(sanitizedUrl);
        
        // Always show error (backend always returns error)
        hideLoading();
        showError(response.message || "Invalid URL - Please try again", 'backend');
        
        // Log validation result
        console.log(`❌ Validation failed for: ${sanitizedUrl}`);
        console.log(`💬 Error message: ${response.message}`);
        
    } catch (error) {
        console.error('🚨 Form submission error:', error);
        hideLoading();
        
        // Handle different types of errors
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            showError("Network error - Please check your connection and try again", 'network');
        } else if (error.name === 'SyntaxError') {
            showError("Server response error - Please try again", 'server');
        } else {
            showError("An unexpected error occurred - Please try again", 'unknown');
        }
    }
}

/**
 * Submits URL to backend with retry logic
 * @param {string} url - URL to validate
 * @returns {Promise<object>} - Backend response
 */
async function submitToBackend(url) {
    let lastError;
    
    for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
        try {
            console.log(`📡 Backend request attempt ${attempt}/${CONFIG.MAX_RETRIES}`);
            
            const response = await fetch('/api/validate-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify({ url: url }),
                signal: AbortSignal.timeout(10000) // 10 second timeout
            });
            
            console.log(`📡 Server response status: ${response.status}`);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            console.log(`📄 Server response data:`, data);
            
            return data;
            
        } catch (error) {
            lastError = error;
            console.warn(`⚠️ Backend request attempt ${attempt} failed:`, error.message);
            
            if (attempt < CONFIG.MAX_RETRIES) {
                // Wait before retry (exponential backoff)
                await new Promise(resolve => setTimeout(resolve, attempt * 1000));
            }
        }
    }
    
    // All retries failed
    throw lastError;
}

// Real-time validation (always shows error)
function handleInput() {
    const url = urlInput.value.trim();
    
    // Clear any existing timeout
    if (currentErrorTimeout) {
        clearTimeout(currentErrorTimeout);
        currentErrorTimeout = null;
    }
    
    if (url) {
        // Always show error for any input
        urlInput.classList.add('error-state');
        
        // Add error icon with animation
        if (!document.querySelector('.input-error-icon')) {
            const errorIcon = document.createElement('i');
            errorIcon.className = 'fas fa-exclamation-circle input-error-icon';
            errorIcon.style.cssText = `
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #e53e3e;
                font-size: 1.1rem;
                animation: fadeIn 0.3s ease;
            `;
            document.querySelector('.input-wrapper').appendChild(errorIcon);
        }
        
        // Show subtle error hint
        urlInput.setAttribute('aria-invalid', 'true');
        urlInput.setAttribute('aria-describedby', 'urlError');
    } else {
        // Reset styling
        urlInput.classList.remove('error-state');
        urlInput.removeAttribute('aria-invalid');
        urlInput.removeAttribute('aria-describedby');
        
        // Remove error icon
        const errorIcon = document.querySelector('.input-error-icon');
        if (errorIcon) {
            errorIcon.remove();
        }
    }
}

// Event listeners
urlForm.addEventListener('submit', handleSubmit);
urlInput.addEventListener('input', handleInput);
urlInput.addEventListener('blur', handleInput);

// Additional validation on focus (always fails)
urlInput.addEventListener('focus', () => {
    const url = urlInput.value.trim();
    if (url) {
        // Show error even on focus
        urlInput.classList.add('error-state');
    }
});

// Keyboard navigation
urlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        clearErrorState();
        urlInput.focus();
    }
});

// Prevent form submission on Enter if input is empty
urlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const url = urlInput.value.trim();
        if (!url) {
            e.preventDefault();
            showError("Please enter a URL");
        }
    }
});

// Add some useless validation messages
const uselessMessages = [
    "Invalid URL - Please try again",
    "URL format is not acceptable",
    "This URL doesn't meet our standards",
    "Please check your URL and try again",
    "URL validation failed",
    "Invalid URL format detected",
    "Please enter a valid URL",
    "URL is not properly formatted"
];

// Randomly change error message
function getRandomErrorMessage() {
    return uselessMessages[Math.floor(Math.random() * uselessMessages.length)];
}

// Override the showError function to use random messages
const originalShowError = showError;
showError = function(message) {
    const randomMessage = getRandomErrorMessage();
    originalShowError(randomMessage);
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Useless URL Validator loaded!');
    console.log('💡 This app will always show "Invalid URL" no matter what you enter!');
    
    // Add some useless console messages
    setInterval(() => {
        const messages = [
            'Still validating...',
            'Checking URL format...',
            'Analyzing URL structure...',
            'Validating against standards...',
            'Processing URL...'
        ];
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        console.log(`🔍 ${randomMsg}`);
    }, 10000); // Every 10 seconds
});
