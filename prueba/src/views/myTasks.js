

export default function MyTasks() {
    return /* html */`
        <div class="app-layout">
            <!-- Sidebar Navigation -->
            <aside class="sidebar">
                <div class="sidebar-logo">
                    <div class="logo-icon">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <rect width="32" height="32" rx="8" fill="#DC2626"/>
                            <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" fill="white" fill-opacity="0.9"/>
                            <path d="M16 8V24" stroke="white" stroke-width="1.5"/>
                            <path d="M8 12L24 20" stroke="white" stroke-width="1.5"/>
                            <path d="M24 12L8 20" stroke="white" stroke-width="1.5"/>
                        </svg>
                    </div>
                    <span class="logo-text">CRUDZASO</span>
                </div>
                
                <nav class="sidebar-nav">
                    <a href="/tasks" data-route="/tasks" class="nav-item active">
                        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"/>
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                        </svg>
                        <span>My Tasks</span>
                    </a>
                    <a href="/profile" data-route="/profile" class="nav-item">
                        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        <span>Profile</span>
                    </a>
                </nav>
            </aside>

            <!-- Main Content Area -->
            <div class="main-wrapper">
                <!-- Top Header -->
                <header class="top-header">
                    <div class="breadcrumb">
                        <svg class="home-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                            <polyline points="9,22 9,12 15,12 15,22"/>
                        </svg>
                        <span class="breadcrumb-separator">›</span>
                        <span class="breadcrumb-current">Dashboard</span>
                    </div>
                    
                    <div class="header-actions">
                        <button class="notification-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                                <path d="M13.73 21a2 2 0 01-3.46 0"/>
                            </svg>
                        </button>
                        
                        <div class="user-profile">
                            <div class="user-avatar">
                                <img id="headerAvatar" src="https://ui-avatars.com/api/?name=User&background=667eea&color=fff" alt="User">
                            </div>
                            <div class="user-info">
                                <span class="user-name" id="headerUserName">User Name</span>
                                <span class="user-role" id="headerUserRole">Student</span>
                            </div>
                            <svg class="dropdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="6,9 12,15 18,9"/>
                            </svg>
                        </div>
                        
                        <button class="logout-btn" id="btnLogout" title="Logout">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                                <polyline points="16,17 21,12 16,7"/>
                                <line x1="21" y1="12" x2="9" y2="12"/>
                            </svg>
                        </button>
                    </div>
                </header>

                <!-- Page Content -->
                <main class="page-content">
                    <!-- Page Header -->
                    <div class="page-header">
                        <div class="page-title-section">
                            <h1 class="page-title">Task Management</h1>
                            <p class="page-subtitle">View, edit, and organize all academic tasks in one place.</p>
                        </div>
                        <button class="btn-new-task" id="btnNewTask">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
                            New Task
                        </button>
                    </div>

                    <!-- Stats Cards -->
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-content">
                                <span class="stat-label">Total Tasks</span>
                                <span class="stat-value" id="totalTasks">0</span>
                            </div>
                            <div class="stat-icon blue">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
                                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
                                </svg>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-content">
                                <span class="stat-label">In Progress</span>
                                <span class="stat-value" id="inProgressTasks">0</span>
                            </div>
                            <div class="stat-icon purple">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <line x1="12" y1="2" x2="12" y2="6"/>
                                    <line x1="12" y1="18" x2="12" y2="22"/>
                                    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
                                    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
                                    <line x1="2" y1="12" x2="6" y2="12"/>
                                    <line x1="18" y1="12" x2="22" y2="12"/>
                                    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
                                    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
                                </svg>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-content">
                                <span class="stat-label">Completed</span>
                                <span class="stat-value" id="completedTasks">0</span>
                            </div>
                            <div class="stat-icon green">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                                    <polyline points="22,4 12,14.01 9,11.01"/>
                                </svg>
                            </div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-content">
                                <span class="stat-label">Pending Review</span>
                                <span class="stat-value" id="pendingTasks">0</span>
                            </div>
                            <div class="stat-icon orange">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <circle cx="12" cy="12" r="10"/>
                                    <line x1="12" y1="8" x2="12" y2="12"/>
                                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <!-- Search Bar -->
                    <div class="search-container">
                        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input type="text" class="search-input" id="searchInput" placeholder="Search by title, ID, or tag...">
                    </div>

                    <!-- Tasks Table -->
                    <div class="tasks-table-container">
                        <table class="tasks-table">
                            <thead>
                                <tr>
                                    <th class="checkbox-col">
                                        <input type="checkbox" id="selectAll">
                                    </th>
                                    <th>TASK NAME</th>
                                    <th>ASSIGNED BY</th>
                                    <th>PRIORITY</th>
                                    <th>STATUS</th>
                                    <th>DUE DATE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody id="tasksTableBody">
                                <!-- Tasks will be rendered here -->
                                <tr class="empty-row">
                                    <td colspan="7" class="empty-message">Loading tasks...</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="table-footer">
                            <span class="results-count" id="resultsCount">Showing 0 results</span>
                        </div>
                    </div>
                </main>
            </div>

            <!-- Modal for creating/editing tasks -->
            <div id="taskModal" class="modal hidden">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 id="modalTitle">New Task</h3>
                        <button class="modal-close" id="btnCloseModal" type="button">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                    <form id="taskForm">
                        <div class="form-group">
                            <label for="taskTitle">Title</label>
                            <input type="text" id="taskTitle" name="title" required placeholder="Enter task title">
                        </div>
                        <div class="form-group">
                            <label for="taskDescription">Description</label>
                            <textarea id="taskDescription" name="description" rows="3" placeholder="Enter task description"></textarea>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="taskPriority">Priority</label>
                                <select id="taskPriority" name="priority">
                                    <option value="low">Low</option>
                                    <option value="medium" selected>Medium</option>
                                    <option value="high">High</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="taskDueDate">Due Date</label>
                                <input type="date" id="taskDueDate" name="dueDate">
                            </div>
                            <div class="form-group">
                                <label for="taskStatus">Status</label>
                                <select id="taskStatus" name="status">
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel" id="btnCancelTask">Cancel</button>
                            <button type="submit" class="btn-save">Save Task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}
