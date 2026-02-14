import { getSession, logout } from "../services/authService.js";
import * as taskService from "../services/taskService.js";
import { 
    getElement, 
    setText, 
    addClickHandler,
    addSubmitHandler,
    addInputHandler,
    setValue,
    getValue,
    resetForm,
    generateAvatarUrl,
    querySelectorAll,
    querySelector,
    escapeHtml
} from "../utils/domHelpers.js";
import { formatStatus, formatDueDate, capitalizeFirst, formatResultsCount } from "../utils/formatters.js";
import { logError, showAlert } from "../utils/errorHandler.js";

// User tasks state
let allUserTasks = [];
let editingTaskId = null;

// Initialize user tasks page
export function initTasksController() {
    const session = getSession();
    
    updateUserInterface(session);
    setupEventListeners();
    loadUserTasks();
}

// Display user name and avatar
function updateUserInterface(session) {
    if (!session) return;
    
    const userName = session.name || "User";
    const avatarUrl = generateAvatarUrl(session.name);
    
    setText("headerUserName", userName);
    
    const avatarImg = querySelector(".user-avatar img");
    if (avatarImg && session.name) {
        avatarImg.src = avatarUrl;
    }
}

// Bind button and form handlers
function setupEventListeners() {
    addClickHandler("btnLogout", handleLogout);
    addClickHandler("btnNewTask", openTaskModal);
    addClickHandler("btnCloseModal", closeTaskModal);
    addClickHandler("btnCancelTask", closeTaskModal);
    
    const modalOverlay = querySelector(".modal-overlay");
    if (modalOverlay) {
        modalOverlay.addEventListener("click", closeTaskModal);
    }
    
    addSubmitHandler("taskForm", handleTaskSubmit);
    addInputHandler("searchInput", handleSearch);
}

function handleLogout() {
    logout();
}

// Load tasks assigned to current user
export async function loadUserTasks() {
    const session = getSession();
    if (!session) return;
    
    try {
        const tasks = await taskService.getUserTasks(session.id);
        allUserTasks = tasks;
        
        updateTaskStats(tasks);
        renderTasksTable(tasks);
    } catch (error) {
        logError(error, "loadUserTasks");
        renderTasksTable([]);
    }
}

// Update task count cards
function updateTaskStats(tasks) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === "completed").length;
    const inProgress = tasks.filter(t => t.status === "in_progress").length;
    const pending = tasks.filter(t => t.status === "pending").length;
    
    setText("totalTasks", total);
    setText("completedTasks", completed);
    setText("inProgressTasks", inProgress);
    setText("pendingTasks", pending);
}

// Render tasks table rows
function renderTasksTable(tasks) {
    const tableBody = getElement("tasksTableBody");
    if (!tableBody) return;
    
    if (tasks.length === 0) {
        tableBody.innerHTML = '<tr class="empty-row"><td colspan="7" class="empty-message">No tasks found. Create your first task!</td></tr>';
        setText("resultsCount", "Showing 0 results");
        return;
    }
    
    const html = tasks.map(task => createTaskRow(task)).join("");
    tableBody.innerHTML = html;
    setText("resultsCount", formatResultsCount(tasks.length, tasks.length));
    setupRowActionHandlers();
}

// Generate HTML for table row
function createTaskRow(task) {
    const priorityClass = task.priority || "medium";
    const statusClass = (task.status || "pending").replace("_", "-");
    const safeTitle = escapeHtml(task.title);
    const assignedBy = escapeHtml(task.assignedBy) || "Self";
    
    return `<tr data-task-id="${task.id}">
        <td class="checkbox-col"><input type="checkbox"></td>
        <td>
            <div class="task-name-cell">
                <span class="task-title">${safeTitle}</span>
                <span class="task-meta">ID: #${task.id}</span>
            </div>
        </td>
        <td><span class="assigned-by">${assignedBy}</span></td>
        <td>
            <div class="priority-cell">
                <span class="priority-dot ${priorityClass}"></span>
                <span class="priority-text">${capitalizeFirst(priorityClass)}</span>
            </div>
        </td>
        <td><span class="status-badge ${statusClass}">${formatStatus(task.status)}</span></td>
        <td><span class="due-date">${formatDueDate(task.dueDate)}</span></td>
        <td>
            <div class="actions-cell">
                <button class="btn-action edit" data-action="edit" data-task-id="${task.id}" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </button>
                <button class="btn-action delete" data-action="delete" data-task-id="${task.id}" title="Delete">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        </td>
    </tr>`;
}

// Attach click handlers to row buttons
function setupRowActionHandlers() {
    const editButtons = querySelectorAll(".btn-action.edit");
    const deleteButtons = querySelectorAll(".btn-action.delete");
    
    editButtons.forEach(btn => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            const taskId = btn.getAttribute("data-task-id");
            openEditTaskModal(taskId);
        });
    });
    
    deleteButtons.forEach(btn => {
        btn.addEventListener("click", async (event) => {
            event.stopPropagation();
            const taskId = btn.getAttribute("data-task-id");
            await handleDeleteTask(taskId);
        });
    });
    
    const rows = querySelectorAll("#tasksTableBody tr[data-task-id]");
    rows.forEach(row => {
        row.addEventListener("dblclick", () => {
            const taskId = row.getAttribute("data-task-id");
            openEditTaskModal(taskId);
        });
    });
}

// Delete task with confirmation
async function handleDeleteTask(taskId) {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;
    
    try {
        await taskService.deleteTask(taskId);
        await loadUserTasks();
    } catch (error) {
        logError(error, "handleDeleteTask");
        showAlert("Could not delete the task. Please try again.");
    }
}

// Filter by title or description
function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();
    
    if (!query) {
        renderTasksTable(allUserTasks);
        return;
    }
    
    const filtered = allUserTasks.filter(task =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
    );
    
    renderTasksTable(filtered);
}

// Open modal for new task
function openTaskModal() {
    editingTaskId = null;
    setText("modalTitle", "New Task");
    resetForm("taskForm");
    
    const modal = getElement("taskModal");
    if (modal) modal.classList.remove("hidden");
}

// Open modal with task data for editing
function openEditTaskModal(taskId) {
    editingTaskId = taskId;
    setText("modalTitle", "Edit Task");
    
    const task = allUserTasks.find(t => t.id == taskId);
    
    if (task) {
        setValue("taskTitle", task.title || "");
        setValue("taskDescription", task.description || "");
        setValue("taskPriority", task.priority || "medium");
        setValue("taskDueDate", task.dueDate || "");
        setValue("taskStatus", task.status || "pending");
    }
    
    const modal = getElement("taskModal");
    if (modal) modal.classList.remove("hidden");
}

// Hide task modal
function closeTaskModal() {
    const modal = getElement("taskModal");
    if (modal) modal.classList.add("hidden");
    editingTaskId = null;
}

// Create or update task based on editingTaskId
async function handleTaskSubmit(event) {
    event.preventDefault();
    
    const session = getSession();
    if (!session) return;
    
    const title = getValue("taskTitle").trim();
    if (!title || title.length < 3) {
        showAlert("Task title must be at least 3 characters long.");
        return;
    }
    
    const taskData = {
        title: title,
        description: getValue("taskDescription"),
        priority: getValue("taskPriority"),
        dueDate: getValue("taskDueDate"),
        status: getValue("taskStatus"),
        userId: session.id,
        userName: session.name,
        assignedBy: "Self"
    };
    
    try {
        if (editingTaskId) {
            const originalTask = allUserTasks.find(t => t.id == editingTaskId);
            if (originalTask && originalTask.assignedBy) {
                taskData.assignedBy = originalTask.assignedBy;
            }
            await taskService.updateTask(editingTaskId, taskData);
        } else {
            await taskService.createTask(taskData);
        }
        
        closeTaskModal();
        loadUserTasks();
    } catch (error) {
        logError(error, "handleTaskSubmit");
        showAlert("Could not save the task. Please try again.");
    }
}
