export default function Dashboard(){
    return /*html*/ `

    <header class="header">
        <div class="header-content">
            <div class="header-brand">
                <svg class="logo-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4L4 10L16 16L28 10L16 4Z" fill="#10B981"/>
                    <path d="M4 16L16 22L28 16" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 22L16 28L28 22" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h1 class="brand-title">RestorApp Admin</h1>
            </div>
            <nav class="nav">
                <span class="nav-link active">Dashboard</span>
                <button id="logout-btn" class="logout-btn">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13 14l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Log Out
                </button>
            </nav>
            <div class="user-avatar">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23E5E7EB'/%3E%3Cpath d='M20 20c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2.5c-3.34 0-10 1.67-10 5v2.5h20v-2.5c0-3.33-6.66-5-10-5z' fill='%239CA3AF'/%3E%3C/svg%3E" alt="User Avatar">
            </div>
        </div>
    </header>

    <main class="main-content">
        <section class="stats-section">
            <article class="stat-card">
                <div class="stat-icon stat-icon-green">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM4 9h16v9H4V9zm8-6L8 6h8l-4-3z" fill="currentColor"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <p class="stat-label">Total Orders</p>
                    <p class="stat-value">0</p>
                </div>
            </article>

            <article class="stat-card">
                <div class="stat-icon stat-icon-yellow">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-7-7h5v2h-5v-2zm0-4h5v2h-5V8zM7 12h3v2H7v-2zm0-4h3v2H7V8z" fill="currentColor"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <p class="stat-label">Pending Orders</p>
                    <p class="stat-value">0</p>
                </div>
            </article>

            <article class="stat-card">
                <div class="stat-icon stat-icon-green">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" fill="currentColor"/>
                    </svg>
                </div>
                <div class="stat-content">
                    <p class="stat-label">Today's Revenue</p>
                    <p class="stat-value">$0.00</p>
                </div>
            </article>
        </section>

        <div class="content-grid">
            <section class="orders-section">
                <div class="section-header">
                    <h2 class="section-title">Recent Orders</h2>
                    <div class="section-actions">
                        <button class="btn-secondary" disabled>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill="currentColor"/>
                            </svg>
                            Filter
                        </button>
                        <button class="btn-secondary" disabled>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2v9.67z" fill="currentColor"/>
                            </svg>
                            Export
                        </button>
                    </div>
                </div>

                <div class="table-container">
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>STATUS</th>
                                <th>TOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="empty-state">
                                <td colspan="5">No hay pedidos registrados todavía</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="pagination">
                    <button class="pagination-btn" disabled>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="currentColor"/>
                        </svg>
                    </button>
                    <button class="pagination-btn active">1</button>
                    <button class="pagination-btn" disabled>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </section>

            <aside class="order-details">
                <div class="details-header">
                    <h3 class="details-title">ORDER DETAILS</h3>
                    <p class="order-id">—</p>
                </div>

                <div class="customer-section">
                    <div class="customer-avatar">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#9CA3AF"/>
                        </svg>
                    </div>
                    <div class="customer-info">
                        <p class="customer-label">Customer</p>
                        <p class="customer-name">—</p>
                        <p class="customer-contact">—</p>
                        <p class="customer-contact">—</p>
                    </div>
                </div>

                <div class="items-section">
                    <h4 class="items-title">Items</h4>
                    <div class="items-list">
                        <p class="empty-items">Sin productos</p>
                    </div>
                </div>

                <div class="summary-section">
                    <div class="summary-row">
                        <span class="summary-label">Subtotal</span>
                        <span class="summary-value">$0.00</span>
                    </div>
                    <div class="summary-row">
                        <span class="summary-label">Tax (8%)</span>
                        <span class="summary-value">$0.00</span>
                    </div>
                </div>

                <div class="total-section">
                    <span class="total-label">Total</span>
                    <span class="total-value">$0.00</span>
                </div>

                <div class="update-section">
                    <h4 class="update-title">UPDATE STATUS</h4>
                    <select class="status-select" disabled>
                        <option value="pendiente">Pendiente</option>
                        <option value="preparando">Preparando</option>
                        <option value="listo">Listo</option>
                        <option value="entregado">Entregado</option>
                    </select>
                    <button class="btn-update" disabled>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/>
                        </svg>
                        Update
                    </button>
                    <button class="btn-delete" disabled>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                        </svg>
                        Delete Order
                    </button>
                </div>
            </aside>
        </div>
    </main>


    `;
}