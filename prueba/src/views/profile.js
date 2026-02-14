

export default function Profile() {
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
                    <a href="/tasks" data-route="/tasks" class="nav-item">
                        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"/>
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                        </svg>
                        <span>My Tasks</span>
                    </a>
                    <a href="/profile" data-route="/profile" class="nav-item active">
                        <svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        <span>Profile</span>
                    </a>
                </nav>
                
                <!-- User Info at Bottom of Sidebar -->
                <div class="sidebar-user">
                    <div class="sidebar-user-avatar">
                        <img id="sidebarAvatar" src="https://ui-avatars.com/api/?name=User&background=667eea&color=fff" alt="User">
                    </div>
                    <div class="sidebar-user-info">
                        <span class="sidebar-user-name" id="sidebarUserName">User Name</span>
                        <span class="sidebar-user-role">Student</span>
                    </div>
                </div>
            </aside>

            <!-- Main Content Area -->
            <div class="main-wrapper">
                <!-- Page Content -->
                <main class="page-content">
                    <!-- Page Header -->
                    <div class="profile-page-header">
                        <h1 class="profile-page-title">My Profile</h1>
                    </div>

                    <!-- Profile Content Grid -->
                    <div class="profile-content-grid">
                        <!-- Left Column - Profile Card -->
                        <div class="profile-card-left">
                            <div class="profile-photo-section">
                                <div class="profile-photo">
                                    <img id="profilePhoto" src="https://ui-avatars.com/api/?name=User&background=667eea&color=fff&size=120" alt="Profile">
                                </div>
                            </div>
                            
                            <div class="profile-name-section">
                                <h2 id="profileName">User Name</h2>
                                <span class="profile-badge" id="profileBadge">Student</span>
                            </div>
                            
                            <div class="profile-email-section">
                                <svg class="email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                                    <path d="M22 6l-10 7L2 6"/>
                                </svg>
                                <span id="profileEmail">user@example.com</span>
                            </div>
                            
                            <div class="profile-tasks-count">
                                <span class="tasks-number" id="totalUserTasks">0</span>
                                <span class="tasks-label">Tasks</span>
                            </div>
                        </div>

                        <!-- Right Column - Personal Information -->
                        <div class="profile-card-right">
                            <div class="personal-info-header">
                                <h3>Personal Information</h3>
                                <button class="btn-edit-profile" id="btnEditProfile">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                    Edit Profile
                                </button>
                            </div>
                            
                            <div class="personal-info-grid">
                                <div class="info-item">
                                    <span class="info-label">Full Name</span>
                                    <span class="info-value" id="infoFullName">User Name</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Employee ID</span>
                                    <span class="info-value" id="infoEmployeeId">CZ-000000</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Phone</span>
                                    <span class="info-value" id="infoPhone">+1 (555) 000-0000</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Department</span>
                                    <span class="info-value-badge" id="infoDepartment">General</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Role Level</span>
                                    <span class="info-value" id="infoRoleLevel">Student</span>
                                </div>
                                <div class="info-item">
                                    <span class="info-label">Join Date</span>
                                    <span class="info-value" id="infoJoinDate">January 1, 2024</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    `;
}
