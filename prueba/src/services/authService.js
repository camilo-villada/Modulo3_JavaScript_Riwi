import api from "./api.js";
import { SESSION_KEY, SESSION_DURATION, ROLES, DEFAULT_ROUTES } from "../constants/auth.js";

// Authenticate user and create session
export async function login(email, password) {
    try {
        const response = await api.get(`/users?email=${email}&password=${password}`);
        const users = response.data;

        if (users.length === 0) {
            throw new Error("Invalid credentials");
        }

        const user = users[0];
        const session = createSession(user);

        localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return session;
    } catch (error) {
        if (error.response) {
            throw new Error("Server error");
        }
        throw error;
    }
}

// Build session object with expiration time
function createSession(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        expiry: Date.now() + SESSION_DURATION
    };
}

// Create new user account
export async function register(userData) {
    try {
        const existingUsers = await api.get(`/users?email=${userData.email}`);

        if (existingUsers.data.length > 0) {
            throw new Error("Email already registered");
        }

        const newUser = {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: ROLES.USER,
            createdAt: new Date().toISOString()
        };

        const response = await api.post("/users", newUser);
        return response.data;
    } catch (error) {
        if (error.message === "Email already registered") {
            throw error;
        }
        throw new Error("Failed to create account");
    }
}

// Clear session and redirect to login
export function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = "/login";
}

// Get current session, returns null if expired or invalid
export function getSession() {
    const session = localStorage.getItem(SESSION_KEY);
    if (!session) return null;

    try {
        const parsed = JSON.parse(session);

        // Check expiration
        if (Date.now() > parsed.expiry) {
            localStorage.removeItem(SESSION_KEY);
            return null;
        }

        return parsed;
    } catch (error) {
        console.error("Error parsing session:", error);
        localStorage.removeItem(SESSION_KEY);
        return null;
    }
}

// Quick check if user is logged in
export function isAuthenticated() {
    return getSession() !== null;
}

// Check if current user has specific role
export function hasRole(role) {
    const session = getSession();
    return session?.role === role;
}

// Get home route based on user role
export function getDefaultRoute(role = null) {
    if (role) {
        return DEFAULT_ROUTES[role] || "/tasks";
    }
    const session = getSession();
    if (!session) return "/login";
    return DEFAULT_ROUTES[session.role] || "/tasks";
}
