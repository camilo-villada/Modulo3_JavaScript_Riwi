// Prevent XSS by escaping HTML
export function escapeHtml(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// DOM element getters
export function getElement(id) {
    return document.getElementById(id);
}

export function querySelector(selector) {
    return document.querySelector(selector);
}

export function querySelectorAll(selector) {
    return document.querySelectorAll(selector);
}

// Visibility helpers
export function showElement(elementOrId) {
    const element = typeof elementOrId === 'string' 
        ? getElement(elementOrId) 
        : elementOrId;
    if (element) {
        element.style.display = "block";
    }
}

export function hideElement(elementOrId) {
    const element = typeof elementOrId === 'string' 
        ? getElement(elementOrId) 
        : elementOrId;
    if (element) {
        element.style.display = "none";
    }
}

export function toggleElement(elementId) {
    const element = getElement(elementId);
    if (element) {
        element.classList.toggle("hidden");
    }
}

// Content setters
export function setText(elementOrId, text) {
    const element = typeof elementOrId === 'string' 
        ? getElement(elementOrId) 
        : elementOrId;
    if (element) {
        element.textContent = text;
    }
}

export function setHtml(elementOrId, html) {
    const element = typeof elementOrId === 'string' 
        ? getElement(elementOrId) 
        : elementOrId;
    if (element) {
        element.innerHTML = html;
    }
}

export function setValue(elementOrId, value) {
    const element = typeof elementOrId === 'string' 
        ? getElement(elementOrId) 
        : elementOrId;
    if (element) {
        element.value = value;
    }
}

export function getValue(elementOrId) {
    const element = typeof elementOrId === 'string' 
        ? getElement(elementOrId) 
        : elementOrId;
    return element ? element.value : "";
}

export function setImageSrc(elementOrId, src) {
    const element = typeof elementOrId === 'string' 
        ? getElement(elementOrId) 
        : elementOrId;
    if (element) {
        element.src = src;
    }
}

// Event handler helpers
export function addClickHandler(elementId, handler) {
    const element = getElement(elementId);
    if (element) {
        element.addEventListener("click", handler);
    }
}

export function addSubmitHandler(formId, handler) {
    const form = getElement(formId);
    if (form) {
        form.addEventListener("submit", handler);
    }
}

export function addInputHandler(elementId, handler) {
    const element = getElement(elementId);
    if (element) {
        element.addEventListener("input", handler);
    }
}

// Clear all form inputs
export function resetForm(formId) {
    const form = getElement(formId);
    if (form) {
        form.reset();
    }
}

// Display styled message in container
export function showMessage(message, type, containerId) {
    const container = getElement(containerId);
    if (container) {
        container.textContent = message;
        container.className = `message-container ${type}`;
        container.style.display = "block";
    }
}

export function clearMessage(containerId) {
    const container = getElement(containerId);
    if (container) {
        container.textContent = "";
        container.style.display = "none";
    }
}

export function addClass(elementId, className) {
    const element = getElement(elementId);
    if (element) {
        element.classList.add(className);
    }
}

export function removeClass(elementId, className) {
    const element = getElement(elementId);
    if (element) {
        element.classList.remove(className);
    }
}

// Generate avatar URL from user name
export function generateAvatarUrl(name, background = "667eea", color = "fff") {
    const encodedName = encodeURIComponent(name || "User");
    return `https://ui-avatars.com/api/?name=${encodedName}&background=${background}&color=${color}`;
}
