import { getSession } from "../services/authService.js";
import * as taskService from "../services/taskService.js";
import { 
    setText, 
    setImageSrc, 
    generateAvatarUrl 
} from "../utils/domHelpers.js";
import { formatEmployeeId, formatRole, formatDate } from "../utils/formatters.js";
import { logError } from "../utils/errorHandler.js";

// Initialize profile page
export function initProfileController() {
    const session = getSession();
    
    if (session) {
        updateProfileUI(session);
        updateSidebarUI(session);
        updatePersonalInfo(session);
    }
    
    loadProfileStats();
}

// Update profile header section
function updateProfileUI(session) {
    const userName = session.name || "User";
    const userRole = formatRole(session.role);
    const avatarUrl = generateAvatarUrl(session.name, "667eea", "fff");
    const largeAvatarUrl = `${avatarUrl}&size=120`;
    
    setText("profileName", userName);
    setText("profileEmail", session.email || "");
    setText("profileBadge", userRole);
    setImageSrc("profilePhoto", largeAvatarUrl);
}

// Update sidebar user info
function updateSidebarUI(session) {
    const userName = session.name || "User";
    const avatarUrl = generateAvatarUrl(session.name);
    
    setText("sidebarUserName", userName);
    setImageSrc("sidebarAvatar", avatarUrl);
}

// Fill personal info fields
function updatePersonalInfo(session) {
    const userRole = formatRole(session.role);
    const joinDate = session.createdAt ? formatDate(session.createdAt) : formatDate(new Date().toISOString());
    
    setText("infoFullName", session.name || "User");
    setText("infoEmployeeId", formatEmployeeId(session.id));
    setText("infoPhone", "+1 (555) 000-0000");
    setText("infoDepartment", "Academic");
    setText("infoRoleLevel", userRole);
    setText("infoJoinDate", joinDate);
}

// Load user task statistics
async function loadProfileStats() {
    const session = getSession();
    if (!session) return;
    
    try {
        const tasks = await taskService.getUserTasks(session.id);
        
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === "completed").length;
        const pending = tasks.filter(t => t.status === "pending").length;
        
        setText("totalUserTasks", total);
        setText("completedUserTasks", completed);
        setText("pendingUserTasks", pending);
    } catch (error) {
        logError(error, "loadProfileStats");
    }
}
