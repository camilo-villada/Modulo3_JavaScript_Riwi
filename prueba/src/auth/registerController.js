import { register } from "../services/authService.js";
import { navigateTo } from "../routes/router.js";
import { getElement, showElement, hideElement } from "../utils/domHelpers.js";
import { validateEmail, validateRequired, validateMinLength, validatePasswordMatch } from "../utils/validators.js";
import { 
    PASSWORD_MIN_LENGTH, 
    NAME_MIN_LENGTH,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES 
} from "../constants/auth.js";

// Form element IDs
const FORM_ELEMENTS = {
    FORM: "registerForm",
    NAME: "fullName",
    EMAIL: "email",
    PASSWORD: "password",
    CONFIRM_PASSWORD: "confirmPassword",
    TOGGLE_PASSWORD: "togglePassword",
    TOGGLE_CONFIRM_PASSWORD: "toggleConfirmPassword",
    MESSAGE_CONTAINER: "registerMessage"
};

const MESSAGE_DURATION = 5000;
const REDIRECT_DELAY = 2000;

// Setup registration form
export function initRegisterController() {
    const registerForm = getElement(FORM_ELEMENTS.FORM);
    
    setupPasswordToggle(FORM_ELEMENTS.TOGGLE_PASSWORD, FORM_ELEMENTS.PASSWORD);
    setupPasswordToggle(FORM_ELEMENTS.TOGGLE_CONFIRM_PASSWORD, FORM_ELEMENTS.CONFIRM_PASSWORD);

    if (registerForm) {
        registerForm.addEventListener("submit", handleRegisterSubmit);
    }
}

// Toggle password visibility
function setupPasswordToggle(toggleId, inputId) {
    const toggleBtn = getElement(toggleId);
    
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const input = getElement(inputId);
            if (input) {
                input.type = input.type === "password" ? "text" : "password";
            }
        });
    }
}

// Process registration form
async function handleRegisterSubmit(event) {
    event.preventDefault();

    const formData = getFormData();
    
    const validation = validateRegisterForm(formData);
    if (!validation.isValid) {
        showRegisterMessage(validation.error, "error");
        return;
    }

    try {
        await register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        showRegisterMessage(SUCCESS_MESSAGES.REGISTER_SUCCESS || "Cuenta creada exitosamente. Redirigiendo...", "success");
        event.target.reset();

        setTimeout(() => navigateTo("/login"), REDIRECT_DELAY);
        
    } catch (error) {
        const errorMsg = error.message || ERROR_MESSAGES.REGISTER_ERROR;
        showRegisterMessage(errorMsg, "error");
    }
}

// Extract form field values
function getFormData() {
    return {
        name: getElement(FORM_ELEMENTS.NAME)?.value.trim() || "",
        email: getElement(FORM_ELEMENTS.EMAIL)?.value.trim() || "",
        password: getElement(FORM_ELEMENTS.PASSWORD)?.value || "",
        confirmPassword: getElement(FORM_ELEMENTS.CONFIRM_PASSWORD)?.value || ""
    };
}

// Validate all form fields
function validateRegisterForm({ name, email, password, confirmPassword }) {
    if (!validateRequired(name) || !validateRequired(email) || 
        !validateRequired(password) || !validateRequired(confirmPassword)) {
        return { isValid: false, error: ERROR_MESSAGES.EMPTY_FIELDS };
    }

    if (!validateMinLength(name, NAME_MIN_LENGTH)) {
        return { isValid: false, error: ERROR_MESSAGES.NAME_TOO_SHORT };
    }

    if (!validateEmail(email)) {
        return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
    }

    if (!validateMinLength(password, PASSWORD_MIN_LENGTH)) {
        return { isValid: false, error: ERROR_MESSAGES.PASSWORD_TOO_SHORT };
    }

    if (!validatePasswordMatch(password, confirmPassword)) {
        return { isValid: false, error: ERROR_MESSAGES.PASSWORDS_NOT_MATCH };
    }

    return { isValid: true };
}

// Show success or error message
function showRegisterMessage(message, type) {
    const messageContainer = getElement(FORM_ELEMENTS.MESSAGE_CONTAINER);

    if (messageContainer) {
        messageContainer.textContent = message;
        messageContainer.className = `message-container ${type}`;
        showElement(messageContainer);

        setTimeout(() => hideElement(messageContainer), MESSAGE_DURATION);
    }
}
