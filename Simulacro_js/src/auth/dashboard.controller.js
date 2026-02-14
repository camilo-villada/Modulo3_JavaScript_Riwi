import {router} from "../routes/router.js"
import { getAllOrders, updateOrderStatus, deleteOrder } from "../services/orders.js"

// Estado global del dashboard
let currentOrders = [];
let selectedOrder = null;

export async function initDashboardController(){
    //verificar que hay sesion
    const session = localStorage.getItem("session");

    if(!session){
        window.history.pushState({}, "", "/login");
        router();
        return;
    }

    const user = JSON.parse(session);
    
    // Verificar que sea admin
    if(user.role !== "admin"){
        window.history.pushState({}, "", "/menu");
        router();
        return;
    }
    
    console.log("Dashboard cargado para: ", user.name)

    //Manejar logout
    setupLogout();

    //Cargar datos iniciales
    await loadDashboardData();
    
    //Configurar eventos
    setupOrderSelection();
    setupStatusUpdate();
    setupDeleteOrder();
}

async function loadDashboardData() {
    try{
        // Cargar pedidos desde localStorage
        currentOrders = await getAllOrders();
        console.log("Pedidos cargados: ", currentOrders);

        //actualizar estadisticas del dashboard
        updateStats(currentOrders);
        
        //renderizar tabla de pedidos
        renderOrdersTable(currentOrders);
    }catch(error){
        console.error("Error al cargar datos: ", error)
    }
}

function updateStats(orders) {
    // Actualizar contadores
    const totalOrders = document.querySelector('.stat-card:nth-child(1) .stat-value');
    const pendingOrders = document.querySelector('.stat-card:nth-child(2) .stat-value');
    const revenue = document.querySelector('.stat-card:nth-child(3) .stat-value');
    
    if (totalOrders) totalOrders.textContent = orders.length;
    
    const pending = orders.filter(o => o.status === 'pendiente').length;
    if (pendingOrders) pendingOrders.textContent = pending;
    
    // Calcular revenue total (hoy)
    const today = new Date().toDateString();
    const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today);
    const total = todayOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    if (revenue) revenue.textContent = `$${total.toFixed(2)}`;
    
    // MÉTODO some(): Verificar si hay pedidos urgentes (pendientes con más de 30 min)
    const hasUrgentOrders = orders.some(order => {
        if (order.status === 'pendiente') {
            const orderTime = new Date(order.createdAt).getTime();
            const now = new Date().getTime();
            const minutesPassed = (now - orderTime) / (1000 * 60);
            return minutesPassed > 30;
        }
        return false;
    });
    
    if (hasUrgentOrders) {
        console.warn('⚠️ Hay pedidos urgentes pendientes (más de 30 minutos)');
    }
}

/**
 * Renderiza la tabla de pedidos
 */
function renderOrdersTable(orders) {
    const tbody = document.querySelector('.orders-table tbody');
    
    if(!tbody) return;
    
    if(orders.length === 0){
        tbody.innerHTML = '<tr class="empty-state"><td colspan="5">No hay pedidos registrados todavía</td></tr>';
        return;
    }
    
    tbody.innerHTML = orders.map(order => {
        const date = new Date(order.createdAt).toLocaleDateString('es-ES');
        const statusClass = getStatusClass(order.status);
        const statusText = getStatusText(order.status);
        
        return `
            <tr class="order-row" data-order-id="${order.id}" style="cursor: pointer;">
                <td>#${order.id}</td>
                <td>User ${order.userId}</td>
                <td>${date}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>$${order.total.toFixed(2)}</td>
            </tr>
        `;
    }).join('');
}

/**
 * Configura la selección de pedidos
 */
function setupOrderSelection() {
    const tbody = document.querySelector('.orders-table tbody');
    
    if(!tbody) return;
    
    tbody.addEventListener('click', (e) => {
        const row = e.target.closest('.order-row');
        if(!row) return;
        
        const orderId = parseInt(row.dataset.orderId);
        const order = currentOrders.find(o => o.id === orderId);
        
        if(order) {
            selectedOrder = order;
            showOrderDetails(order);
            
            // Highlight selected row
            document.querySelectorAll('.order-row').forEach(r => r.style.background = '');
            row.style.background = '#F3F4F6';
        }
    });
}

/**
 * Muestra los detalles del pedido seleccionado
 */
function showOrderDetails(order) {
    // Actualizar ID del pedido
    const orderIdEl = document.querySelector('.order-id');
    if(orderIdEl) orderIdEl.textContent = `#ORD-${order.id}`;
    
    // Actualizar info del cliente
    const customerName = document.querySelector('.customer-name');
    const customerContacts = document.querySelectorAll('.customer-contact');
    if(customerName) customerName.textContent = `User ${order.userId}`;
    if(customerContacts[0]) customerContacts[0].textContent = `ID: ${order.userId}`;
    if(customerContacts[1]) customerContacts[1].textContent = new Date(order.createdAt).toLocaleString('es-ES');
    
    // Renderizar items del pedido
    const itemsList = document.querySelector('.items-list');
    if(itemsList) {
        itemsList.innerHTML = order.items.map(item => `
            <div class="item-row" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #E5E7EB;">
                <span>${item.quantity}x ${item.name}</span>
                <span style="font-weight: 600;">$${item.subtotal.toFixed(2)}</span>
            </div>
        `).join('');
    }
    
    // Actualizar totales
    const subtotal = order.items.reduce((sum, item) => sum + item.subtotal, 0);
    const tax = subtotal * 0.08;
    
    const subtotalEl = document.querySelector('.summary-row:nth-child(1) .summary-value');
    const taxEl = document.querySelector('.summary-row:nth-child(2) .summary-value');
    const totalEl = document.querySelector('.total-value');
    
    if(subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if(taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if(totalEl) totalEl.textContent = `$${order.total.toFixed(2)}`;
    
    // Actualizar selector de estado
    const statusSelect = document.querySelector('.status-select');
    if(statusSelect) {
        statusSelect.disabled = false;
        statusSelect.value = order.status;
    }
    
    // Habilitar botón de actualizar
    const updateBtn = document.querySelector('.btn-update');
    if(updateBtn) updateBtn.disabled = false;
    
    // Habilitar botón de eliminar
    const deleteBtn = document.querySelector('.btn-delete');
    if(deleteBtn) deleteBtn.disabled = false;
}

/**
 * Configura la actualización de estado
 */
function setupStatusUpdate() {
    const updateBtn = document.querySelector('.btn-update');
    
    if(!updateBtn) return;
    
    updateBtn.addEventListener('click', async () => {
        if(!selectedOrder) return;
        
        const statusSelect = document.querySelector('.status-select');
        const newStatus = statusSelect.value;
        
        if(!newStatus || newStatus === selectedOrder.status) return;
        
        // MÉTODO every(): Validar que todos los items del pedido tengan datos válidos
        const allItemsValid = selectedOrder.items.every(item => {
            return item.id && item.name && item.price > 0 && item.quantity > 0;
        });
        
        if (!allItemsValid) {
            alert('Error: El pedido contiene items inválidos');
            return;
        }
        
        try {
            // Actualizar estado
            await updateOrderStatus(selectedOrder.id, newStatus);
            
            // Recargar datos
            await loadDashboardData();
            
            // Mostrar notificación
            showNotification(`Pedido #${selectedOrder.id} actualizado a: ${getStatusText(newStatus)}`);
            
            // Actualizar vista de detalles
            const updatedOrder = currentOrders.find(o => o.id === selectedOrder.id);
            if(updatedOrder) {
                selectedOrder = updatedOrder;
                showOrderDetails(updatedOrder);
            }
            
        } catch(error) {
            console.error('Error al actualizar estado:', error);
            alert('Error al actualizar el estado del pedido');
        }
    });
}

/**
 * Helper: Obtiene la clase CSS para el estado
 */
function getStatusClass(status) {
    const classes = {
        'pendiente': 'status-pending',
        'preparando': 'status-preparing',
        'listo': 'status-ready',
        'entregado': 'status-delivered'
    };
    return classes[status] || 'status-pending';
}

/**
 * Helper: Obtiene el texto del estado
 */
function getStatusText(status) {
    const texts = {
        'pendiente': 'Pendiente',
        'preparando': 'Preparando',
        'listo': 'Listo',
        'entregado': 'Entregado'
    };
    return texts[status] || status;
}

/**
 * Muestra notificación de éxito
 */
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification-success';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Configura el botón de eliminar pedido
 */
function setupDeleteOrder() {
    const deleteBtn = document.querySelector('.btn-delete');
    
    if(!deleteBtn) return;
    
    deleteBtn.addEventListener('click', async () => {
        if(!selectedOrder) return;
        
        // Confirmar eliminación
        const confirm = window.confirm(`¿Estás seguro de eliminar el pedido #${selectedOrder.id}?\n\nEsta acción no se puede deshacer.`);
        
        if(!confirm) return;
        
        try {
            // Eliminar pedido
            await deleteOrder(selectedOrder.id);
            
            // Recargar datos
            await loadDashboardData();
            
            // Limpiar panel de detalles
            clearOrderDetails();
            
            // Mostrar notificación
            showNotification(`Pedido #${selectedOrder.id} eliminado correctamente`);
            
            // Limpiar orden seleccionada
            selectedOrder = null;
            
        } catch(error) {
            console.error('Error al eliminar pedido:', error);
            alert('Error al eliminar el pedido');
        }
    });
}

/**
 * Limpia el panel de detalles del pedido
 */
function clearOrderDetails() {
    // Resetear ID del pedido
    const orderIdEl = document.querySelector('.order-id');
    if(orderIdEl) orderIdEl.textContent = '—';
    
    // Resetear info del cliente
    const customerName = document.querySelector('.customer-name');
    const customerContacts = document.querySelectorAll('.customer-contact');
    if(customerName) customerName.textContent = '—';
    customerContacts.forEach(contact => contact.textContent = '—');
    
    // Limpiar items
    const itemsList = document.querySelector('.items-list');
    if(itemsList) itemsList.innerHTML = '<p class="empty-items">Sin productos</p>';
    
    // Resetear totales
    const subtotalEl = document.querySelector('.summary-row:nth-child(1) .summary-value');
    const taxEl = document.querySelector('.summary-row:nth-child(2) .summary-value');
    const totalEl = document.querySelector('.total-value');
    
    if(subtotalEl) subtotalEl.textContent = '$0.00';
    if(taxEl) taxEl.textContent = '$0.00';
    if(totalEl) totalEl.textContent = '$0.00';
    
    // Deshabilitar botones
    const statusSelect = document.querySelector('.status-select');
    const updateBtn = document.querySelector('.btn-update');
    const deleteBtn = document.querySelector('.btn-delete');
    
    if(statusSelect) statusSelect.disabled = true;
    if(updateBtn) updateBtn.disabled = true;
    if(deleteBtn) deleteBtn.disabled = true;
    
    // Quitar highlight de filas
    document.querySelectorAll('.order-row').forEach(r => r.style.background = '');
}

/**
 * Setup logout
 */
function setupLogout() {
    const logoutBtn = document.getElementById("logout-btn");
    if(logoutBtn){
        logoutBtn.addEventListener("click", () =>{
            localStorage.removeItem("session");
            window.history.pushState({}, "", "/login");
            router();
        });
    }
}