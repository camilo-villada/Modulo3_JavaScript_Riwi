import { getSession, logout } from "../services/authService.js";
import * as taskService from "../services/taskService.js";
import api from "../services/api.js";
import { 
    getElement, 
    setText, 
    setImageSrc, 
    addClickHandler,
    addSubmitHandler,
    addInputHandler,
    setValue,
    getValue,
    resetForm,
    generateAvatarUrl,
    querySelectorAll,
    escapeHtml
} from "../utils/domHelpers.js";
import { formatStatus, formatDueDate, capitalizeFirst, formatResultsCount } from "../utils/formatters.js";
import { confirmAction, logError, showAlert } from "../utils/errorHandler.js";

// State for admin dashboard
let allAdminTasks = [];
let allUsers = [];
let currentAdminFilter = "all";
let editingAdminTaskId = null;

// Initialize admin dashboard
export function initDashboardController() {
    const session = getSession();
    
    updateUserInterface(session);
    setupEventListeners();
    loadDashboardData();
}

// Display admin name and avatar
function updateUserInterface(session) {
    if (!session) return;
    
    const userName = session.name || "Administrator";
    const avatarUrl = generateAvatarUrl(session.name);
    
    setText("headerUserName", userName);
    setText("sidebarUserName", userName);
    setImageSrc("headerAvatar", avatarUrl);
    setImageSrc("sidebarAvatar", avatarUrl);
}

// Bind all button and form handlers
function setupEventListeners() {
    addClickHandler("btnLogout", handleLogout);
    addClickHandler("btnNewTask", openAdminTaskModal);
    addClickHandler("btnCloseModal", closeAdminTaskModal);
    addClickHandler("btnCancelTask", closeAdminTaskModal);
    
    const modalOverlay = document.querySelector(".modal-overlay");
    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeAdminTaskModal);
    }
    
    addSubmitHandler("taskForm", handleAdminTaskSubmit);
    addInputHandler("searchInput", handleAdminSearch);
    setupTabFilters();
}

// Handle filter tab clicks
function setupTabFilters() {
    const tabButtons = querySelectorAll(".tab-btn");
    
    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const filter = btn.getAttribute("data-filter");
            filterAdminTasks(filter);
        });
    });
}

function handleLogout() {
    logout();
}

// Fetch tasks and users from API
export async function loadDashboardData() {
    try {
        const tasks = await taskService.getAllTasks();
        allAdminTasks = tasks;
        
        const usersResponse = await api.get("/users");
        allUsers = usersResponse.data;
        
        updateDashboardMetrics(tasks);
        populateAssigneeDropdown();
        renderAdminTasksTable(tasks);
        
    } catch (error) {
        logError(error, "loadDashboardData");
        renderAdminTasksTable([]);
    }
}

// Update task count cards
function updateDashboardMetrics(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "completed").length;
    const inProgress = tasks.filter(t => t.status === "in_progress").length;
    const pending = tasks.filter(t => t.status === "pending").length;
    const highPriority = tasks.filter(t => t.status === "pending" && t.priority === "high").length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    setText("totalTasks", total);
    setText("completedTasks", completed);
    setText("inProgressTasks", inProgress);
    setText("pendingTasks", pending);
    setText("highPriorityCount", `${highPriority} High Priority`);
    setText("overallProgress", `${progress}%`);
}

// Populate assignee dropdown (only users, not admins)
function populateAssigneeDropdown() {
    const assigneeSelect = getElement("taskAssignee");
    if (!assigneeSelect) return;
    
    assigneeSelect.innerHTML = '<option value="">Select user</option>';
    
    const students = allUsers.filter(user => user.role === "user");
    
    students.forEach(user => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        option.setAttribute("data-name", user.name);
        assigneeSelect.appendChild(option);
    });
}

// Render tasks table rows
function renderAdminTasksTable(tasks) {
    const tableBody = getElement("tasksTableBody");
    if (!tableBody) return;
    
    if (tasks.length === 0) {
        tableBody.innerHTML = '<tr class="empty-row"><td colspan="6" class="empty-message">No tasks found.</td></tr>';
        setText("resultsCount", "Showing 0 results");
        return;
    }
    
    const html = tasks.map(task => createTaskRow(task)).join("");
    tableBody.innerHTML = html;
    setText("resultsCount", formatResultsCount(tasks.length, tasks.length));
    setupAdminActionHandlers();
}

// Generate HTML for table row
function createTaskRow(task) {
    const priorityClass = task.priority || "medium";
    const statusClass = (task.status || "pending").replace("_", "-");
    const userName = escapeHtml(task.userName) || "Unassigned";
    const avatarUrl = generateAvatarUrl(userName);
    const safeTitle = escapeHtml(task.title);
    
    return `<tr data-task-id="${task.id}">
        <td class="task-name-cell"><span class="task-title">${safeTitle}</span></td>
        <td>
            <div class="assignee-cell">
                <div class="assignee-avatar">
                    <img src="${avatarUrl}" alt="${userName}" />
                </div>
                <span class="assignee-name">${userName}</span>
            </div>
        </td>
        <td><span class="status-badge ${statusClass}">${formatStatus(task.status)}</span></td>
        <td>
            <div class="priority-cell">
                <span class="priority-dot ${priorityClass}"></span>
                <span class="priority-text">${capitalizeFirst(priorityClass)}</span>
            </div>
        </td>
        <td class="due-date">${formatDueDate(task.dueDate)}</td>
        <td>
            <div class="actions-cell">
                <button class="btn-action edit" onclick="event.stopPropagation();" data-action="edit" data-task-id="${task.id}" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="btn-action delete" onclick="event.stopPropagation();" data-action="delete" data-task-id="${task.id}" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </td>
    </tr>`;
}

// Attach click handlers to edit/delete buttons
function setupAdminActionHandlers() {
    const editButtons = querySelectorAll(".btn-action.edit");
    const deleteButtons = querySelectorAll(".btn-action.delete");
    
    editButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const taskId = btn.getAttribute("data-task-id");
            openEditAdminTaskModal(taskId);
        });
    });
    
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", async () => {
            const taskId = btn.getAttribute("data-task-id");
            if (confirmAction("Are you sure you want to delete this task?")) {
                await deleteAdminTask(taskId);
            }
        });
    });
}

// Remove task and refresh list
async function deleteAdminTask(taskId) {
    try {
        await taskService.deleteTask(taskId);
        loadDashboardData();
    } catch (error) {
        logError(error, "deleteAdminTask");
        showAlert("Could not delete the task. Please try again.");
    }
}

// Search tasks by text
function handleAdminSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    
    if (!query) {
        filterAdminTasks(currentAdminFilter);
        return;
    }
    
    const filtered = allAdminTasks.filter(task => 
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query)) ||
        (task.userName && task.userName.toLowerCase().includes(query))
    );
    
    renderAdminTasksTable(filtered);
}

// Filter by status tab
function filterAdminTasks(filter) {
    currentAdminFilter = filter;
    let filtered = allAdminTasks;
    
    if (filter === "pending") {
        filtered = allAdminTasks.filter(t => t.status === "pending");
    } else if (filter === "completed") {
        filtered = allAdminTasks.filter(t => t.status === "completed");
    }
    
    renderAdminTasksTable(filtered);
}

// Open modal for new task
function openAdminTaskModal() {
    editingAdminTaskId = null;
    setText("modalTitle", "New Task");
    resetForm("taskForm");
    
    const modal = getElement("taskModal");
    if (modal) modal.classList.remove("hidden");
}

// Open modal with task data for editing
function openEditAdminTaskModal(taskId) {
    editingAdminTaskId = taskId;
    setText("modalTitle", "Edit Task");
    
    const task = allAdminTasks.find(t => t.id == taskId);
    
    if (task) {
        setValue("taskTitle", task.title || "");
        setValue("taskDescription", task.description || "");
        setValue("taskAssignee", task.userId || "");
        setValue("taskPriority", task.priority || "medium");
        setValue("taskDueDate", task.dueDate || "");
        setValue("taskStatus", task.status || "pending");
    }
    
    const modal = getElement("taskModal");
    if (modal) modal.classList.remove("hidden");
}

// Hide task modal
function closeAdminTaskModal() {
    const modal = getElement("taskModal");
    if (modal) modal.classList.add("hidden");
    editingAdminTaskId = null;
}

// Save new or edited task
async function handleAdminTaskSubmit(event) {
    event.preventDefault();
    
    const assigneeSelect = getElement("taskAssignee");
    const selectedOption = assigneeSelect.options[assigneeSelect.selectedIndex];
    const userId = assigneeSelect.value;
    const userName = selectedOption.getAttribute("data-name") || "Unassigned";
    
    if (!userId) {
        showAlert("Please select an assignee");
        return;
    }
    
    const title = getValue("taskTitle").trim();
    if (!title || title.length < 3) {
        showAlert("Task title must be at least 3 characters long.");
        return;
    }
    
    const session = getSession();
    
    const taskData = {
        title: title,
        description: getValue("taskDescription"),
        priority: getValue("taskPriority"),
        dueDate: getValue("taskDueDate"),
        status: getValue("taskStatus"),
        userId: userId,
        userName: userName,
        assignedBy: session.name || "Admin"
    };
    
    try {
        if (editingAdminTaskId) {
            await taskService.updateTask(editingAdminTaskId, taskData);
        } else {
            await taskService.createTask(taskData);
        }
        
        closeAdminTaskModal();
        loadDashboardData();
    } catch (error) {
        logError(error, "handleAdminTaskSubmit");
        showAlert("Could not save the task. Please try again.");
    }
}
