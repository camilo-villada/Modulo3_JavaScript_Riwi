import api from "./api.js";
import { TASK_STATUS, DEFAULT_TASK } from "../constants/tasks.js";

// Get tasks for specific user
export async function getUserTasks(userId) {
    try {
        const response = await api.get(`/tasks?userId=${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching user tasks:", error);
        throw error;
    }
}

// Get all tasks (admin only)
export async function getAllTasks() {
    try {
        const response = await api.get("/tasks");
        return response.data;
    } catch (error) {
        console.error("Error fetching all tasks:", error);
        throw error;
    }
}

// Create new task with default values
export async function createTask(taskData) {
    try {
        const task = {
            title: taskData.title,
            description: taskData.description || "",
            status: taskData.status || DEFAULT_TASK.status,
            priority: taskData.priority || DEFAULT_TASK.priority,
            category: taskData.category || DEFAULT_TASK.category,
            dueDate: taskData.dueDate || null,
            userId: taskData.userId,
            userName: taskData.userName || "User",
            assignedBy: taskData.assignedBy || null,
            createdAt: new Date().toISOString()
        };
        
        const response = await api.post("/tasks", task);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
}

// Partial update of task fields
export async function updateTask(taskId, updates) {
    try {
        const response = await api.patch(`/tasks/${taskId}`, updates);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}

// Shorthand to change task status
export async function updateTaskStatus(taskId, status) {
    return updateTask(taskId, { status });
}

// Remove task from database
export async function deleteTask(taskId) {
    try {
        await api.delete(`/tasks/${taskId}`);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}

// Fetch single task by id
export async function getTaskById(taskId) {
    try {
        const response = await api.get(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching task:", error);
        throw error;
    }
}

// Search tasks by title, description or category
export async function searchTasks(query, userId = null) {
    try {
        let tasks;
        
        if (userId) {
            tasks = await getUserTasks(userId);
        } else {
            tasks = await getAllTasks();
        }
        
        const lowerQuery = query.toLowerCase();
        
        return tasks.filter(task => 
            task.title.toLowerCase().includes(lowerQuery) ||
            (task.description && task.description.toLowerCase().includes(lowerQuery)) ||
            (task.category && task.category.toLowerCase().includes(lowerQuery))
        );
    } catch (error) {
        console.error("Error searching tasks:", error);
        throw error;
    }
}

// Calculate task statistics
export async function getTaskMetrics() {
    try {
        const tasks = await getAllTasks();
        
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === TASK_STATUS.COMPLETED).length;
        const pending = tasks.filter(t => t.status === TASK_STATUS.PENDING).length;
        const inProgress = tasks.filter(t => t.status === TASK_STATUS.IN_PROGRESS).length;
        
        return {
            total,
            completed,
            pending,
            inProgress,
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
        };
    } catch (error) {
        console.error("Error calculating task metrics:", error);
        return {
            total: 0,
            completed: 0,
            pending: 0,
            inProgress: 0,
            completionRate: 0
        };
    }
}

// Filter tasks by status
export async function getTasksByStatus(status, userId = null) {
    try {
        let tasks;
        
        if (userId) {
            tasks = await getUserTasks(userId);
        } else {
            tasks = await getAllTasks();
        }
        
        if (status === "all") return tasks;
        
        return tasks.filter(t => t.status === status);
    } catch (error) {
        console.error("Error filtering tasks:", error);
        throw error;
    }
}
