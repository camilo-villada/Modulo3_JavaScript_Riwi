// Task status options
export const TASK_STATUS = {
    PENDING: "pending",
    IN_PROGRESS: "in_progress",
    COMPLETED: "completed"
};

export const TASK_PRIORITY = {
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "high"
};

// Default values for new tasks
export const DEFAULT_TASK = {
    status: TASK_STATUS.PENDING,
    priority: TASK_PRIORITY.MEDIUM,
    category: "general"
};

export const TASK_FILTERS = {
    ALL: "all",
    PENDING: "pending",
    COMPLETED: "completed",
    IN_PROGRESS: "in_progress"
};
