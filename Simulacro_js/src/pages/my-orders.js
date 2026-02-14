/**
 * My Orders Page - Vista de pedidos del usuario
 */

export default function MyOrders() {
    return /*html*/ `
        <div class="my-orders-container">
            <!-- Header -->
            <header class="orders-header">
                <div class="header-content">
                    <div class="logo-section">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="32" height="32" rx="8" fill="#10B981"/>
                            <path d="M8 12L16 8L24 12M8 12L16 16M8 12V20L16 24M24 12L16 16M24 12V20L16 24M16 16V24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <h1 class="logo-title">RestorApp</h1>
                    </div>
                    <button id="logout-btn" class="logout-btn">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M13 14l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Log Out
                    </button>
                </div>
            </header>

            <!-- Main Content -->
            <main class="orders-main">
                <div class="orders-grid">
                    <!-- Recent Orders Section -->
                    <section class="orders-section">
                        <div class="section-header">
                            <h2 class="section-title">Recent Orders</h2>
                            <button class="view-all-btn">View All</button>
                        </div>

                        <div class="orders-list" id="orders-list">
                            <!-- Los pedidos se renderizarán aquí dinámicamente -->
                            <div class="empty-orders">
                                <p>No tienes pedidos aún</p>
                            </div>
                        </div>
                    </section>

                    <!-- Account Details Section -->
                    <aside class="account-section">
                        <h2 class="section-title">Account Details</h2>
                        
                        <div class="account-card">
                            <!-- User Profile -->
                            <div class="user-profile">
                                <div class="user-avatar">
                                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="User Avatar" class="avatar-img">
                                    <div class="avatar-badge">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M13.3 5.7l-6 6-3.6-3.6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </div>
                                </div>
                                <h3 class="user-name" id="user-name">User Name</h3>
                                <p class="user-email" id="user-email">email@example.com</p>
                                <span class="user-badge">Customer</span>
                            </div>

                            <!-- Stats -->
                            <div class="user-stats">
                                <div class="stat-item">
                                    <span class="stat-label">TOTAL ORDERS</span>
                                    <span class="stat-value" id="total-orders">0</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">LOYALTY PTS</span>
                                    <span class="stat-value loyalty-points" id="loyalty-points">0</span>
                                </div>
                            </div>

                            <!-- Menu Options -->
                            <div class="account-menu">
                                <button class="menu-option">
                                    <div class="option-icon">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <rect x="3" y="4" width="14" height="12" rx="2" stroke="#6B7280" stroke-width="1.5"/>
                                            <path d="M3 8h14M7 1v3M13 1v3" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                    </div>
                                    <span class="option-text">Payment Methods</span>
                                    <svg class="option-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M7 4l6 6-6 6" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>

                                <button class="menu-option">
                                    <div class="option-icon">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 10a3 3 0 100-6 3 3 0 000 6zM4 18c0-3.31 2.69-6 6-6s6 2.69 6 6" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                    </div>
                                    <span class="option-text">Saved Addresses</span>
                                    <svg class="option-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M7 4l6 6-6 6" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>

                                <button class="menu-option">
                                    <div class="option-icon">
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <circle cx="10" cy="10" r="3" stroke="#6B7280" stroke-width="1.5"/>
                                            <path d="M10 1v2M10 17v2M18.66 5.34l-1.41 1.41M4.75 15.25l-1.41 1.41M19 10h-2M3 10H1M18.66 14.66l-1.41-1.41M4.75 4.75L3.34 3.34" stroke="#6B7280" stroke-width="1.5" stroke-linecap="round"/>
                                        </svg>
                                    </div>
                                    <span class="option-text">Preferences</span>
                                    <svg class="option-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M7 4l6 6-6 6" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="account-footer">
                            <p>RestorApp Academic Simulation V1.0</p>
                            <p>Performance monitoring active.</p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    `;
}
