// Session config
export const SESSION_KEY = "session";
export const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export const ROLES = {
    ADMIN: "admin",
    USER: "user"
};

export const PUBLIC_ROUTES = ["/", "/login", "/register"];

export const DEFAULT_ROUTES = {
    [ROLES.ADMIN]: "/dashboard",
    [ROLES.USER]: "/tasks"
};

export const PASSWORD_MIN_LENGTH = 6;
export const NAME_MIN_LENGTH = 3;

export const FORM_IDS = {
    LOGIN_FORM: "loginForm",
    REGISTER_FORM: "registerForm",
    ERROR_MESSAGE: "errorMessage",
    SUCCESS_MESSAGE: "successMessage",
    EMAIL: "email",
    PASSWORD: "password",
    CONFIRM_PASSWORD: "confirmPassword",
    NAME: "name"
};

export const ERROR_MESSAGES = {
    EMPTY_FIELDS: "Por favor complete todos los campos",
    INVALID_EMAIL: "Por favor ingrese un email válido",
    INVALID_CREDENTIALS: "Email o contraseña incorrectos",
    LOGIN_ERROR: "Ha ocurrido un error. Por favor intente de nuevo.",
    REGISTER_ERROR: "Error al registrar. Por favor intente de nuevo.",
    PASSWORD_TOO_SHORT: `La contraseña debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`,
    PASSWORDS_NOT_MATCH: "Las contraseñas no coinciden",
    NAME_TOO_SHORT: `El nombre debe tener al menos ${NAME_MIN_LENGTH} caracteres`,
    EMAIL_EXISTS: "Este email ya está registrado",
    SESSION_EXPIRED: "Su sesión ha expirado"
};

export const SUCCESS_MESSAGES = {
    REGISTER_SUCCESS: "Registro exitoso. Por favor inicie sesión.",
    LOGOUT_SUCCESS: "Sesión cerrada exitosamente"
};
