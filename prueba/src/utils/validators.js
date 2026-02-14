// Basic email format check
export function validateEmail(email) {
    if (!email) return false;
    if (email.indexOf("@") === -1) return false;
    if (email.indexOf(".") === -1) return false;
    
    const parts = email.split("@");
    if (parts.length !== 2) return false;
    if (parts[0].length === 0) return false;
    if (parts[1].length === 0) return false;
    
    return true;
}

// Password validation with custom min length
export function validatePassword(password, minLength = 6) {
    if (!password) {
        return { isValid: false, message: "Password is required" };
    }
    
    if (password.length < minLength) {
        return { 
            isValid: false, 
            message: `Password must be at least ${minLength} characters` 
        };
    }
    
    return { isValid: true, message: "" };
}

// Check if passwords are equal
export function validatePasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
}

export const validatePasswordMatch = validatePasswordsMatch;

// Check if value is not empty
export function validateRequired(value) {
    if (value === null || value === undefined) return false;
    if (typeof value === "string") {
        return value.trim().length > 0;
    }
    return true;
}

// Minimum length check
export function validateMinLength(value, minLength) {
    if (!value) return false;
    return value.length >= minLength;
}

export function validateMaxLength(value, maxLength) {
    if (!value) return true;
    return value.length <= maxLength;
}

// Validate task form data, returns errors array
export function validateTaskData(taskData) {
    const errors = [];
    
    if (!validateRequired(taskData.title)) {
        errors.push("Title is required");
    }
    
    if (taskData.title && !validateMinLength(taskData.title, 3)) {
        errors.push("Title must be at least 3 characters");
    }
    
    if (!validateRequired(taskData.userId)) {
        errors.push("Assignee is required");
    }
    
    const validStatuses = ["pending", "in_progress", "completed"];
    if (taskData.status && !validStatuses.includes(taskData.status)) {
        errors.push("Invalid status");
    }
    
    const validPriorities = ["low", "medium", "high"];
    if (taskData.priority && !validPriorities.includes(taskData.priority)) {
        errors.push("Invalid priority");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Validate all registration fields
export function validateRegistrationData(userData) {
    const errors = [];
    
    if (!validateRequired(userData.name)) {
        errors.push("Name is required");
    } else if (!validateMinLength(userData.name, 3)) {
        errors.push("Name must be at least 3 characters");
    }
    
    if (!validateRequired(userData.email)) {
        errors.push("Email is required");
    } else if (!validateEmail(userData.email)) {
        errors.push("Invalid email format");
    }
    
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
        errors.push(passwordValidation.message);
    }
    
    if (userData.confirmPassword !== undefined) {
        if (!validatePasswordsMatch(userData.password, userData.confirmPassword)) {
            errors.push("Passwords do not match");
        }
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}

// Validate login form
export function validateLoginData(email, password) {
    const errors = [];
    
    if (!validateRequired(email)) {
        errors.push("Email is required");
    }
    
    if (!validateRequired(password)) {
        errors.push("Password is required");
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
}
