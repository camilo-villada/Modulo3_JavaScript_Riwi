
export default function Dashboard() {
    return /*html*/ `
        <div class="dashboard-layout">
            <!-- Sidebar -->
            <aside class="sidebar">
                <div class="sidebar-header">
                    <div class="logo-container">
                        <div class="logo-icon">
                            <img src="/src/assets/icon_login.png" alt="CRUDZASO" />
                        </div>
                        <h1 class="logo-text">CRUDZASO</h1>
                    </div>
                </div>

                <nav class="sidebar-nav">
                    <a href="#" class="nav-item active" data-route="/dashboard">
                        <span class="nav-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="3" width="18" height="18" rx="2"/>
                                <line x1="9" y1="3" x2="9" y2="21"/>
                                <line x1="15" y1="3" x2="15" y2="21"/>
                                <line x1="3" y1="9" x2="21" y2="9"/>
                                <line x1="3" y1="15" x2="21" y2="15"/>
                            </svg>
                        </span>
                        <span class="nav-text">Dashboard</span>
                    </a>
                </nav>

                <!-- Sidebar User Info at Bottom -->
                <div class="sidebar-user">
                    <div class="sidebar-user-avatar">
                        <img id="sidebarAvatar" src="https://ui-avatars.com/api/?name=Admin&background=667eea&color=fff" alt="User" />
                    </div>
                    <div class="sidebar-user-info">
                        <div class="sidebar-user-name" id="sidebarUserName">Admin User</div>
                        <div class="sidebar-user-role">Administrator</div>
                    </div>
                </div>
            </aside>

            <!-- Main Content -->
            <main class="main-content">
                <!-- Header -->
                <header class="dashboard-header">
                    <div class="breadcrumb">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                        <span class="breadcrumb-separator">›</span>
                        <span class="breadcrumb-current">Dashboard</span>
                    </div>

                    <div class="header-actions">
                        <button class="btn-icon" id="btnNotifications">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                            </svg>
                        </button>
                        <div class="user-profile-menu">
                            <div class="user-avatar">
                                <img id="headerAvatar" src="https://ui-avatars.com/api/?name=Admin&background=667eea&color=fff" alt="User" />
                            </div>
                            <div class="user-details">
                                <span class="user-name" id="headerUserName">Admin User</span>
                                <span class="user-role">Product Designer</span>
                            </div>
                            <button class="btn-logout-icon" id="btnLogout" title="Logout">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                                    <polyline points="16 17 21 12 16 7"/>
                                    <line x1="21" y1="12" x2="9" y2="12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                <!-- Page Content -->
                <main class="page-content">
                    <!-- Page Header -->
                    <div class="page-header">
                        <div class="page-title-section">
                            <h1 class="page-title">Task Manager</h1>
                            <p class="page-subtitle">Overview of your current academic performance tasks.</p>
                        </div>
                        <button class="btn-new-task" id="btnNewTask">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            New Task
                        </button>
                    </div>

                <!-- Metrics Cards -->
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-content">
                            <div class="metric-header">
                                <span class="metric-label">Total Tasks</span>
                                <div class="metric-icon blue">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
                                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="metric-value" id="totalTasks">24</div>
                            <div class="metric-trend positive">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"/>
                                </svg>
                                <span id="totalTasksTrend">+12% from last week</span>
                            </div>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-content">
                            <div class="metric-header">
                                <span class="metric-label">Completed</span>
                                <div class="metric-icon green">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                        <polyline points="22 4 12 14.01 9 11.01"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="metric-value" id="completedTasks">18</div>
                            <div class="metric-status success">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                <span>On track</span>
                            </div>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-content">
                            <div class="metric-header">
                                <span class="metric-label">Pending</span>
                                <div class="metric-icon orange">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <circle cx="12" cy="12" r="10"/>
                                        <polyline points="12 6 12 12 16 14"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="metric-value" id="pendingTasks">6</div>
                            <div class="metric-status warning">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="12" y1="8" x2="12" y2="12"/>
                                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                                </svg>
                                <span id="highPriorityCount">2 High Priority</span>
                            </div>
                        </div>
                    </div>

                    <div class="metric-card">
                        <div class="metric-content">
                            <div class="metric-header">
                                <span class="metric-label">Overall Progress</span>
                                <div class="metric-icon purple">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                                    </svg>
                                </div>
                            </div>
                            <div class="metric-value" id="overallProgress">75%</div>
                            <div class="metric-status info">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="18 15 12 9 6 15"/>
                                </svg>
                                <span>Keep it up</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Tasks Section -->
                <div class="tasks-section">
                    <div class="tasks-header">
                        <div class="search-bar">
                            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.35-4.35"/>
                            </svg>
                            <input type="text" id="searchInput" placeholder="Search tasks..." />
                        </div>
                        
                        <div class="tasks-tabs">
                            <button class="tab-btn active" data-filter="all">All Tasks</button>
                            <button class="tab-btn" data-filter="pending">Pending</button>
                            <button class="tab-btn" data-filter="completed">Completed</button>
                        </div>
                    </div>

                    <!-- Tasks Table -->
                    <div class="tasks-table-container">
                        <table class="tasks-table">
                            <thead>
                                <tr>
                                    <th>TASK NAME</th>
                                    <th>ASSIGNEE</th>
                                    <th>STATUS</th>
                                    <th>PRIORITY</th>
                                    <th>DUE DATE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody id="tasksTableBody">
                                <!-- Tasks will be dynamically inserted here -->
                                <tr class="loading-row">
                                    <td colspan="6" class="loading-message">Loading tasks...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="table-footer">
                        <span class="results-count" id="resultsCount">Showing 0 results</span>
                    </div>
                </div>
            </main>
        </div>

        <!-- Task Modal -->
        <div id="taskModal" class="modal hidden">
            <div class="modal-overlay"></div>
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 id="modalTitle">New Task</h2>
                    <button class="btn-close" id="btnCloseModal">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
                
                <form id="taskForm">
                    <div class="form-group">
                        <label for="taskTitle">Task Title </label>
                        <input type="text" id="taskTitle" required placeholder="Enter task title" />
                    </div>

                    <div class="form-group">
                        <label for="taskDescription">Description</label>
                        <textarea id="taskDescription" rows="3" placeholder="Enter task description"></textarea>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="taskAssignee">Assignee </label>
                            <select id="taskAssignee" required>
                                <option value="">Select user</option>
                                <!-- Users will be loaded dynamically -->
                            </select>
                        </div>

                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label for="taskPriority">Priority</label>
                            <select id="taskPriority">
                                <option value="low">Low</option>
                                <option value="medium" selected>Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="taskDueDate">Due Date</label>
                            <input type="date" id="taskDueDate" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="taskStatus">Status</label>
                        <select id="taskStatus">
                            <option value="pending" selected>Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div class="modal-actions">
                        <button type="button" class="btn-secondary" id="btnCancelTask">Cancel</button>
                        <button type="submit" class="btn-save">
                            <span id="btnSaveText">Save Task</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}
