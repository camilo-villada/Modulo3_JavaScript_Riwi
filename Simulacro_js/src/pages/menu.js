import burgerImg from "../assets/burger.jpeg"

export default function Menu(){
    return /* html*/`
    <header class="header">
        <div class="container">
            <div class="logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M8 2V11M8 2C6.5 2 5 3 5 5.5V11H11V5.5C11 3 9.5 2 8 2Z" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
                    <path d="M8 11V22" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
                    <path d="M16 2V22" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
                    <path d="M13 2H19" stroke="#10B981" stroke-width="2" stroke-linecap="round"/>
                </svg>
                <span class="logo-text">RestoApp</span>
            </div>
            <nav class="nav">
                <a href="#" class="nav-link active">Menu</a>
                <a href="#" class="nav-link">My Orders</a>
                <a href="#" class="nav-link">Profile</a>
            </nav>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main">
        <div class="container">
            <div class="content-wrapper">
                <!-- Menu Section -->
                <section class="menu-section">
                    <h1 class="menu-title">Our Menu</h1>

                    <!-- Search Bar -->
                    <div class="search-bar">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        <input type="text" placeholder="Search food..." class="search-input">
                    </div>

                    <!-- Category Filters -->
                    <div class="filters">
                        <button class="filter-btn active">All</button>
                        <button class="filter-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 3c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z" stroke="currentColor" stroke-width="1.5"/>
                                <path d="M10 6v4l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            Burgers
                        </button>
                        <button class="filter-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7 10l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            Sides
                        </button>
                        <button class="filter-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10 2v16M6 6h8M5 14h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            Drinks
                        </button>
                    </div>

                    <!-- Menu Grid -->
                    <div class="menu-grid">
                        <!-- Item 1 -->
                        <div class="menu-item">
                            <div class="item-image-wrapper">
                                <span class="item-category">BURGERS</span>
                                <img src="${burgerImg}" alt="Classic Beef Burger" class="item-image">
                            </div>
                            <div class="item-content">
                                <div class="item-header">
                                    <h3 class="item-name">Classic Beef Burger</h3>
                                    <span class="item-price">$8.99</span>
                                </div>
                                <p class="item-description">Premium beef patty with cheddar cheese, lettuce,...</p>
                                <button class="add-to-order-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M6 1L4 4H16L14 1M4 4v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4H4z" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                    Add to order
                                </button>
                            </div>
                        </div>

                        <!-- Item 2 -->
                        <div class="menu-item">
                            <div class="item-image-wrapper">
                                <span class="item-category">BURGERS</span>
                                <img src="https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop" alt="Double Bacon Melt" class="item-image">
                            </div>
                            <div class="item-content">
                                <div class="item-header">
                                    <h3 class="item-name">Double Bacon Melt</h3>
                                    <span class="item-price">$12.50</span>
                                </div>
                                <p class="item-description">Two patties, crispy bacon, melted swiss cheese, and...</p>
                                <button class="add-to-order-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M6 1L4 4H16L14 1M4 4v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4H4z" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                    Add to order
                                </button>
                            </div>
                        </div>

                        <!-- Item 3 -->
                        <div class="menu-item">
                            <div class="item-image-wrapper">
                                <span class="item-category">SIDES</span>
                                <img src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop" alt="Golden Fries" class="item-image">
                            </div>
                            <div class="item-content">
                                <div class="item-header">
                                    <h3 class="item-name">Golden Fries</h3>
                                    <span class="item-price">$3.99</span>
                                </div>
                                <p class="item-description">Freshly cut potatoes fried to perfection with sea salt.</p>
                                <button class="add-to-order-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M6 1L4 4H16L14 1M4 4v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4H4z" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                    Add to order
                                </button>
                            </div>
                        </div>

                        <!-- Item 4 -->
                        <div class="menu-item">
                            <div class="item-image-wrapper">
                                <span class="item-category">DRINKS</span>
                                <img src="https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=300&fit=crop" alt="Cola Zero" class="item-image">
                            </div>
                            <div class="item-content">
                                <div class="item-header">
                                    <h3 class="item-name">Cola Zero</h3>
                                    <span class="item-price">$2.50</span>
                                </div>
                                <p class="item-description">Chilled zero sugar cola with ice and a slice of lemon.</p>
                                <button class="add-to-order-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M6 1L4 4H16L14 1M4 4v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4H4z" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                    Add to order
                                </button>
                            </div>
                        </div>

                        <!-- Item 5 -->
                        <div class="menu-item">
                            <div class="item-image-wrapper">
                                <span class="item-category">DESSERTS</span>
                                <img src="https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop" alt="Donut Box" class="item-image">
                            </div>
                            <div class="item-content">
                                <div class="item-header">
                                    <h3 class="item-name">Donut Box</h3>
                                    <span class="item-price">$6.00</span>
                                </div>
                                <p class="item-description">Assorted glazed and frosted donuts.</p>
                                <button class="add-to-order-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M6 1L4 4H16L14 1M4 4v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4H4z" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                    Add to order
                                </button>
                            </div>
                        </div>

                        <!-- Item 6 -->
                        <div class="menu-item">
                            <div class="item-image-wrapper">
                                <span class="item-category">PIZZA</span>
                                <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop" alt="Pepperoni Slice" class="item-image">
                            </div>
                            <div class="item-content">
                                <div class="item-header">
                                    <h3 class="item-name">Pepperoni Slice</h3>
                                    <span class="item-price">$4.50</span>
                                </div>
                                <p class="item-description">Large NY style slice with double pepperoni.</p>
                                <button class="add-to-order-btn">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M6 1L4 4H16L14 1M4 4v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4H4z" stroke="currentColor" stroke-width="1.5"/>
                                    </svg>
                                    Add to order
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Order Summary Sidebar -->
                <aside class="order-sidebar">
                    <div class="order-card">
                        <div class="order-header">
                            <h2 class="order-title">
                                Your Order
                                <span class="order-badge">2</span>
                            </h2>
                            <button class="clear-all-btn">Clear all</button>
                        </div>

                        <div class="order-items">
                            <!-- Order Item 1 -->
                            <div class="order-item">
                                <img src="https://images.unsplash.com/photo-1568901846375-23c9450c58cd?w=100&h=100&fit=crop" alt="Classic Beef Burger" class="order-item-image">
                                <div class="order-item-details">
                                    <div class="order-item-header">
                                        <h4 class="order-item-name">Classic Beef Burger</h4>
                                        <span class="order-item-price">$8.99</span>
                                    </div>
                                    <p class="order-item-note">No onions</p>
                                    <div class="order-item-controls">
                                        <div class="quantity-control">
                                            <button class="qty-btn">−</button>
                                            <span class="qty-value">1</span>
                                            <button class="qty-btn">+</button>
                                        </div>
                                        <button class="remove-btn">Remove</button>
                                    </div>
                                </div>
                            </div>

                            <!-- Order Item 2 -->
                            <div class="order-item">
                                <img src="https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=100&h=100&fit=crop" alt="Golden Fries" class="order-item-image">
                                <div class="order-item-details">
                                    <div class="order-item-header">
                                        <h4 class="order-item-name">Golden Fries</h4>
                                        <span class="order-item-price">$3.99</span>
                                    </div>
                                    <p class="order-item-note">Extra salt</p>
                                    <div class="order-item-controls">
                                        <div class="quantity-control">
                                            <button class="qty-btn">−</button>
                                            <span class="qty-value">1</span>
                                            <button class="qty-btn">+</button>
                                        </div>
                                        <button class="remove-btn">Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Order Summary -->
                        <div class="order-summary">
                            <div class="summary-row">
                                <span class="summary-label">Subtotal</span>
                                <span class="summary-value">$12.98</span>
                            </div>
                            <div class="summary-row">
                                <span class="summary-label">Tax (8%)</span>
                                <span class="summary-value">$1.04</span>
                            </div>
                            <div class="summary-row total-row">
                                <span class="summary-label">Total</span>
                                <span class="summary-value total-value">$14.02</span>
                            </div>
                        </div>

                        <!-- Confirm Button -->
                        <button class="confirm-btn">
                            Confirm Order
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M7 10l3 3 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </main>

    `
}