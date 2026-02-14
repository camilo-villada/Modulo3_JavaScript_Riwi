import { login, getDefaultRoute } from "../services/authService.js";
import { navigateTo } from "../routes/router.js";
import { getElement, showElement, hideElement, setText } from "../utils/domHelpers.js";
import { validateEmail, validateRequired } from "../utils/validators.js";
import { ERROR_MESSAGES, FORM_IDS } from "../constants/auth.js";

// Toggle password visibility
function setupPasswordToggle() {
    const toggleBtn = getElement("togglePassword");
    
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const input = getElement(FORM_IDS.PASSWORD);
            if (input) {
                input.type = input.type === "password" ? "text" : "password";
            }
        });
    }
}

// Setup login form handlers
export function initLoginController() {
    const form = getElement(FORM_IDS.LOGIN_FORM);
    const errorMessage = getElement(FORM_IDS.ERROR_MESSAGE);

    if (!form) {
        console.error("Login form not found");
        return;
    }

    form.addEventListener("submit", handleLoginSubmit);
    setupPasswordToggle();

    // Handle form submission
    async function handleLoginSubmit(event) {
        event.preventDefault();

        const email = getElement(FORM_IDS.EMAIL)?.value.trim();
        const password = getElement(FORM_IDS.PASSWORD)?.value;

        clearError();

        const validation = validateLoginForm(email, password);
        if (!validation.isValid) {
            showError(validation.error);
            return;
        }

        try {
            const user = await login(email, password);

            if (user) {
                navigateTo(getDefaultRoute(user.role));
            } else {
                showError(ERROR_MESSAGES.INVALID_CREDENTIALS);
            }
        } catch (error) {
            console.error("Login error:", error);
            showError(ERROR_MESSAGES.LOGIN_ERROR);
        }
    }

    function validateLoginForm(email, password) {
        if (!validateRequired(email) || !validateRequired(password)) {
            return { isValid: false, error: ERROR_MESSAGES.EMPTY_FIELDS };
        }

        if (!validateEmail(email)) {
            return { isValid: false, error: ERROR_MESSAGES.INVALID_EMAIL };
        }

        return { isValid: true };
    }

    function showError(message) {
        if (errorMessage) {
            setText(errorMessage, message);
            showElement(errorMessage);
        }
    }

    function clearError() {
        if (errorMessage) {
            setText(errorMessage, "");
            hideElement(errorMessage);
        }
    }
}
