import {router} from "../routes/router.js"
import { getProducts, filterByCategory, searchProducts } from "../services/products.js";
import { addToCart, getCart, getCartTotal, getTotalItemsCount, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } from "../services/cart.js";
import { createOrder } from "../services/orders.js";

//estado global del menu
let allProducts = []; //Todos los productos cargados
let currentProducts = [] // productos actuales (despues de filtrar/buscar)


export async function initMenuController(){
    //verificar que hay sesion
    const session = localStorage.getItem("session");

    if(!session){
        window.history.pushState({}, "", "/login");
        router();
        return;
    }

    const user = JSON.parse(session);
    console.log("MenÃº cargado para: ", user.name)

    //Cargar productos desde db.json
    await loadProducts();

    //Inicializar funcionalidades del menu
    initMenuFeatures();

    //Manejar logout
    setupLogout();

    //Manejar navegación
    setupNavigation();

    //Renderizar carrito inicial
    renderCart();
    setupCartButtons();
    setupConfirmOrderButton();
}

// carga los productos desde el servicio

async function loadProducts() {
    allProducts = await getProducts();
    currentProducts = allProducts;
    renderProducts(currentProducts);
}

// Renderiza los productos en el DOM

function renderProducts(products){
    const menuGrid = document.querySelector('.menu-grid');

    if(!menuGrid){
        console.error('No se encontro el contenedor .menu-grid');
        return;
    }

    // Si no hay productos
    if (products.length === 0){
        menuGrid.innerHTML = `
            <div class="empty-state">   
                <p>No se encontraron productos</p>
            </div>
        `;
        return;
    }

    // Usar map() para convertir cada producto en HTML
    menuGrid.innerHTML = products.map(product => `
            <div class="menu-item" data-product-id="${product.id}">
            <div class="item-image-wrapper">
                <span class="item-category">${product.category.toUpperCase()}</span>
                <img src="${product.image}" alt="${product.name}" class="item-image">
            </div>
            <div class="item-content">
                <div class="item-header">
                    <h3 class="item-name">${product.name}</h3>
                    <span class="item-price">$${product.price.toFixed(2)}</span>
                </div>
                <p class="item-description">${product.description}</p>
                <button class="add-to-order-btn" data-id="${product.id}">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M6 1L4 4H16L14 1M4 4v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4H4z" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                    Add to order
                </button>
            </div>
        </div>
            `).join(''); // convierte el array en un solo string de HTML
}

//inicializa las funcionalidades del menu (busqueda y filtros)
function initMenuFeatures(){
    //manejar busqueda

    const serarchInput = document.querySelector('.search-input');
    if (serarchInput){
        serarchInput.addEventListener("input", (e) =>{
            const searchTerm = e.target.value;
            currentProducts = searchProducts(allProducts, searchTerm);
            renderProducts(currentProducts);
        });
    }

    // Manejar filtros de categoria
    
    const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover active de todos los botones
                filterButtons.forEach(b => b.classList.remove('active'));
                // Agregar active al botÃ³n clickeado
                btn.classList.add('active');
                
                // Obtener categorÃ­a del botÃ³n (del texto, en minÃºsculas)
                const category = btn.textContent.trim().toLowerCase();
                
                // Filtrar productos
                currentProducts = filterByCategory(allProducts, category);
                renderProducts(currentProducts);
            });
        });
    
        // Manejar clicks en botones "add to order"
        setupAddToOrderButtons();
}

// Configurar los botones de agregar al carrito
function setupAddToOrderButtons(){
    const menuGrid = document.querySelector('.menu-grid');

    if (!menuGrid) return;

    //escuchar clicks en el contendor padre
    menuGrid.addEventListener('click', (e) =>{
        const btn = e.target.closest('.add-to-order-btn');

        if (btn){
            const productId = parseInt(btn.dataset.id);
            const product = allProducts.find(p => p.id === productId);

            if (product){
                //Agregar al carrito
                addToCart(product);

                // Mostrar feedback visual
                showAddedToCartFeedback(product.name);

                //actualizar contador del carrito en el menu
                 updateCartBadge();
            }
        }
    })
}

function showAddedToCartFeedback(productName){
    // Remover notificaciones anteriores
    const existingNotifications = document.querySelectorAll('.cart-notification');
    existingNotifications.forEach(n => n.remove());
    
    //crear elemento de notificacion
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = `${productName} agregado al carrito`;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #10B981;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    // Remover notificacion despues de 2 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

/**
 * Renderiza el carrito completo
 */
function renderCart() {
    const cart = getCart();
    const orderItemsContainer = document.querySelector('.order-items');
    const orderBadge = document.querySelector('.order-badge');
    const subtotalElement = document.querySelector('.summary-row:nth-child(1) .summary-value');
    const taxElement = document.querySelector('.summary-row:nth-child(2) .summary-value');
    const totalElement = document.querySelector('.total-value');

    if (!orderItemsContainer) return;

    // Actualizar badge con cantidad de items
    const itemCount = getTotalItemsCount();
    if (orderBadge) {
        orderBadge.textContent = itemCount;
    }

    // Si el carrito esta vacio
    if (cart.length === 0) {
        orderItemsContainer.innerHTML = `
            <div class="empty-cart">
                <p style="text-align: center; color: #9CA3AF; padding: 40px 20px;">
                    Tu carrito esta vacio<br>
                    <small>Agrega productos del menu</small>
                </p>
            </div>
        `;
        
        // Resetear totales
        if (subtotalElement) subtotalElement.textContent = '$0.00';
        if (taxElement) taxElement.textContent = '$0.00';
        if (totalElement) totalElement.textContent = '$0.00';
        return;
    }

    // Renderizar items del carrito usando map()
    orderItemsContainer.innerHTML = cart.map(item => `
        <div class="order-item" data-item-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="order-item-image">
            <div class="order-item-details">
                <div class="order-item-header">
                    <h4 class="order-item-name">${item.name}</h4>
                    <span class="order-item-price">$${item.price.toFixed(2)}</span>
                </div>
                <div class="order-item-controls">
                    <div class="quantity-control">
                        <button class="qty-btn decrease-btn" data-id="${item.id}">-</button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn increase-btn" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            </div>
        </div>
    `).join('');

    // Calcular totales
    const subtotal = getCartTotal();
    const tax = subtotal * 0.08; // 8% de impuesto
    const total = subtotal + tax;

    // Actualizar valores en el DOM
    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${total.toFixed(2)}`;
}

/**
 * Configura los event listeners de los botones del carrito (UNA SOLA VEZ)
 */
function setupCartButtons() {
    // Usar event delegation en el contenedor padre de la orden
    const orderCard = document.querySelector('.order-card');
    
    if (!orderCard) { console.error('No se encontró .order-card'); return; }

    // Event delegation: escuchar clicks en toda la secciÃ³n de orden
    orderCard.addEventListener('click', (e) => {
        const target = e.target.closest('button');
        
        if (!target) return;

        // Aumentar cantidad
        if (target.classList.contains('increase-btn')) {
            e.stopPropagation();
            const productId = parseInt(target.dataset.id);
            increaseQuantity(productId);
            renderCart();
        }

        // Disminuir cantidad
        else if (target.classList.contains('decrease-btn')) {
            e.stopPropagation();
            const productId = parseInt(target.dataset.id);
            decreaseQuantity(productId);
            renderCart();
        }

        // Eliminar producto
        else if (target.classList.contains('remove-btn')) {
            e.stopPropagation();
            const productId = parseInt(target.dataset.id);
            removeFromCart(productId);
            renderCart();
        }

        // BotÃ³n "Clear all"
        else if (target.classList.contains('clear-all-btn')) {
            e.stopPropagation();
            if (confirm('Â¿EstÃ¡s seguro de vaciar el carrito?')) {
                clearCart();
                renderCart();
            }
        }
    });
}

/**
 * Actualiza el carrito visualmente
 */
function updateCartBadge() {
    renderCart();
    const count = getTotalItemsCount();
    const total = getCartTotal();
    console.log(`Items en carrito: ${count}`);
    console.log(`Total: $${total.toFixed(2)}`);
}

//boton logout
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

//Navegación a My Orders
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const text = link.textContent.trim();
            
            if (text === 'My Orders') {
                window.history.pushState({}, "", "/my-orders");
                router();
            }
        });
    });
}

/**
 * Configura el botón de confirmar pedido
 */
function setupConfirmOrderButton() {
    const orderCard = document.querySelector('.order-card');
    
    if (!orderCard) return;
    
    orderCard.addEventListener('click', async (e) => {
        if (e.target.classList.contains('confirm-btn') || 
            e.target.closest('.confirm-btn')) {
            e.stopPropagation();
            await handleConfirmOrder();
        }
    });
}

/**
 * Maneja la confirmación del pedido
 */
async function handleConfirmOrder() {
    const cart = getCart();
    
    // Validar que hay items
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    
    // Obtener usuario actual
    const session = localStorage.getItem('session');
    if (!session) {
        alert('Sesión expirada');
        return;
    }
    
    const user = JSON.parse(session);
    
    // Calcular total con impuesto
    const subtotal = getCartTotal();
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    // Preparar datos del pedido
    const orderData = {
        userId: user.id,
        items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.price * item.quantity
        })),
        total: parseFloat(total.toFixed(2))
    };
    
    try {
        // Crear pedido
        const newOrder = await createOrder(orderData);
        
        // Limpiar carrito
        clearCart();
        renderCart();
        
        // Mostrar confirmación
        showOrderConfirmation(newOrder.id);
        
    } catch (error) {
        console.error('Error al crear pedido:', error);
        alert('Hubo un error al procesar tu pedido. Intenta de nuevo.');
    }
}

/**
 * Muestra mensaje de confirmación del pedido
 */
function showOrderConfirmation(orderId) {
    const notification = document.createElement('div');
    notification.className = 'order-confirmation';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            z-index: 10000;
            text-align: center;
            min-width: 320px;
        ">
            <div style="
                width: 60px;
                height: 60px;
                background: #10B981;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
                font-size: 32px;
                color: white;
            ">✓</div>
            <h2 style="margin: 0 0 10px; color: #1F2937;">¡Pedido Confirmado!</h2>
            <p style="margin: 0 0 20px; color: #6B7280;">
                Número de pedido: <strong>#${orderId}</strong>
            </p>
            <p style="margin: 0 0 30px; color: #6B7280; font-size: 14px;">
                Tu pedido está siendo preparado
            </p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #10B981;
                color: white;
                border: none;
                padding: 12px 32px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 500;
            ">Entendido</button>
        </div>
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 9999;
        " onclick="this.parentElement.remove()"></div>
    `;
    
    document.body.appendChild(notification);
}
