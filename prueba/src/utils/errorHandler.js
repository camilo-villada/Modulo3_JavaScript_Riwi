import { showMessage, clearMessage } from "./domHelpers.js";
import { ERROR_MESSAGES as AUTH_ERROR_MESSAGES } from "../constants/auth.js";

// System error messages
const SYSTEM_ERROR_MESSAGES = {
    TASK_LOAD_FAILED: "Failed to load tasks. Please refresh the page.",
    TASK_CREATE_FAILED: "Failed to create task. Please try again.",
    TASK_UPDATE_FAILED: "Failed to update task. Please try again.",
    TASK_DELETE_FAILED: "Failed to delete task. Please try again.",
    NETWORK_ERROR: "Network error. Please check your connection.",
    SERVER_ERROR: "Server error. Please try again later.",
    UNKNOWN_ERROR: "An unexpected error occurred. Please try again."
};

// Merge auth and system errors
const ERROR_MESSAGES = {
    ...AUTH_ERROR_MESSAGES,
    ...SYSTEM_ERROR_MESSAGES
};

// Get message by error code
export function getErrorMessage(code) {
    return ERROR_MESSAGES[code] || ERROR_MESSAGES.UNKNOWN_ERROR;
}

// Parse API error and return user-friendly message
export function handleApiError(error) {
    console.error("API Error:", error);
    
    if (!error.response) {
        return ERROR_MESSAGES.NETWORK_ERROR;
    }
    
    if (error.response.status >= 500) {
        return ERROR_MESSAGES.SERVER_ERROR;
    }
    
    if (error.response.data && error.response.data.message) {
        return error.response.data.message;
    }
    
    if (error.message) {
        if (error.message === "El email ya está registrado" || error.message === "Email already registered") {
            return ERROR_MESSAGES.EMAIL_EXISTS;
        }
        if (error.message === "Credenciales inválidas" || error.message === "Invalid credentials") {
            return ERROR_MESSAGES.INVALID_CREDENTIALS;
        }
        return error.message;
    }
    
    return ERROR_MESSAGES.UNKNOWN_ERROR;
}

export function showErrorMessage(message, containerId) {
    showMessage(message, "error", containerId);
}

export function showSuccessMessage(message, containerId) {
    showMessage(message, "success", containerId);
}

export function showInfoMessage(message, containerId) {
    showMessage(message, "info", containerId);
}

// Log error with context for debugging
export function logError(error, context) {
    console.error(`[${context}] Error:`, {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
    });
}

export function showValidationErrors(errors, containerId) {
    if (errors.length === 0) return;
    const message = errors.join(". ");
    showErrorMessage(message, containerId);
}

export function clearError(containerId) {
    clearMessage(containerId);
}

// Show browser confirmation dialog
export function confirmAction(message) {
    return window.confirm(message);
}

export function showAlert(message) {
    window.alert(message);
}

export { ERROR_MESSAGES };
