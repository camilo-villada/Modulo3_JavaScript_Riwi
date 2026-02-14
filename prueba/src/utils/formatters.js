// Display-friendly status text
export function formatStatus(status) {
    const statusMap = {
        "pending": "Pending",
        "in_progress": "In Progress",
        "completed": "Completed"
    };
    return statusMap[status] || status || "Pending";
}

// CSS class for status badge
export function getStatusClass(status) {
    return (status || "pending").replace("_", "-");
}

export function formatPriority(priority) {
    return capitalizeFirst(priority || "medium");
}

// Human readable due date (e.g. "Due tomorrow", "Overdue")
export function formatDueDate(dateString) {
    if (!dateString) return "No due date";
    
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    
    if (diff === 0) return "Due today";
    if (diff === 1) return "Due tomorrow";
    if (diff < 0) return "Overdue";
    if (diff <= 7) return `Due in ${diff} days`;
    
    return "Due " + date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric" 
    });
}

// Full date format for display
export function formatDate(dateString) {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

// Format date for HTML input type="date"
export function formatDateForInput(date) {
    if (!date) return "";
    
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
}

// Capitalize first letter
export function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncateText(text, maxLength) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + "...";
}

export function formatNumber(num) {
    if (num === null || num === undefined) return "0";
    return num.toLocaleString();
}

export function formatPercentage(value, total) {
    if (!total || total === 0) return "0%";
    const percentage = Math.round((value / total) * 100);
    return `${percentage}%`;
}

// Display friendly role name
export function formatRole(role) {
    const roleMap = {
        "admin": "Administrator",
        "user": "Student"
    };
    return roleMap[role] || capitalizeFirst(role) || "User";
}

export function formatEmployeeId(userId) {
    return `CZ-${userId || "000000"}`;
}

// Pagination text
export function formatResultsCount(count, total) {
    if (count === 0) return "Showing 0 results";
    if (total !== undefined) {
        return `Showing 1 to ${count} of ${total} results`;
    }
    return `Showing ${count} result${count === 1 ? "" : "s"}`;
}
