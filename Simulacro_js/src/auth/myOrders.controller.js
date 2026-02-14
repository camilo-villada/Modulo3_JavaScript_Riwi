
//  My Orders Controller - Controlador para la página de pedidos del usuario
 
import { router } from "../routes/router.js";
import { getUserOrders } from "../services/orders.js";

export async function initMyOrdersController() {
    // Verificar sesión
    const session = localStorage.getItem("session");
    
    if (!session) {
        window.history.pushState({}, "", "/login");
        router();
        return;
    }

    const user = JSON.parse(session);
    
    // Verificar que sea usuario (no admin)
    if (user.role === "admin") {
        window.history.pushState({}, "", "/dashboard");
        router();
        return;
    }

    console.log("My Orders cargado para:", user.name);

    // Cargar datos del usuario
    loadUserProfile(user);

    // Cargar pedidos del usuario
    await loadUserOrders(user.id);

    // Configurar logout
    setupLogout();
}

/**
 * Carga el perfil del usuario en la vista
 */
function loadUserProfile(user) {
    const userNameEl = document.getElementById("user-name");
    const userEmailEl = document.getElementById("user-email");
    
    if (userNameEl) userNameEl.textContent = user.name;
    if (userEmailEl) userEmailEl.textContent = user.email;
}

/**
 * Carga y renderiza los pedidos del usuario
 */
async function loadUserOrders(userId) {
    try {
        const orders = await getUserOrders(userId);
        const sortedOrders = orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        renderOrders(sortedOrders);
        updateUserStats(sortedOrders);
    } catch (error) {
        console.error("Error al cargar pedidos:", error);
    }
}

/**
 * Renderiza la lista de pedidos
 */
function renderOrders(orders) {
    const ordersList = document.getElementById("orders-list");
    
    if (!ordersList) return;

    if (orders.length === 0) {
        ordersList.innerHTML = `<div class="empty-orders"><p>No tienes pedidos aún</p></div>`;
        return;
    }

    ordersList.innerHTML = orders.map(order => {
        const date = new Date(order.createdAt).toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' });
        const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
        
        return `
            <div class="order-card">
                <div class="order-icon ${order.status}">${getStatusIcon(order.status)}</div>
                <div class="order-info">
                    <div class="order-header"><span class="order-id">#ORD-${order.id}</span></div>
                    <div class="order-meta">${date} • ${itemsCount} Item${itemsCount !== 1 ? 's' : ''}</div>
                </div>
                <span class="order-price">$${order.total.toFixed(2)}</span>
                <span class="order-status ${order.status}">${getStatusText(order.status)}</span>
            </div>
        `;
    }).join('');
}

function getStatusIcon(status) {
    const icons = {
        'pendiente': '<svg width="24" height="24" fill="none"><circle cx="12" cy="12" r="10" stroke="#4F46E5" stroke-width="2"/></svg>',
        'preparando': '<svg width="24" height="24" fill="none"><path d="M12 2L2 7l10 5 10-5z" stroke="#F59E0B" stroke-width="2"/></svg>',
        'entregado': '<svg width="24" height="24" fill="none"><path d="M9 12l2 2 4-4" stroke="#10B981" stroke-width="2" stroke-linecap="round"/></svg>'
    };
    return icons[status] || icons['pendiente'];
}

function getStatusText(status) {
    return { 'pendiente': 'Pendiente', 'preparando': 'Preparing', 'listo': 'Listo', 'entregado': 'Delivered' }[status] || status;
}

function updateUserStats(orders) {
    const totalOrdersEl = document.getElementById("total-orders");
    const loyaltyPointsEl = document.getElementById("loyalty-points");
    
    // Total de pedidos
    if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
    
    // Total gastado y puntos de lealtad
    if (loyaltyPointsEl) {
        const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
        const loyaltyPoints = Math.floor(totalSpent * 10);
        loyaltyPointsEl.textContent = loyaltyPoints;
        loyaltyPointsEl.title = `Total gastado: $${totalSpent.toFixed(2)}`;
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("session");
            window.history.pushState({}, "", "/login");
            router();
        });
    }
}