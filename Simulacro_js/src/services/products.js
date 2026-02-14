/**
 * Servicio para manejar productos del menú
 * Obtiene datos desde db.json usando Axios
 */

import axios from 'axios';

/**
 * Obtiene todos los productos del menú
 * @returns {Promise<Array>} Array de productos
 */
export async function getProducts() {
    try {
        const response = await axios.get('/db.json');
        return response.data.products;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return [];
    }
}

/**
 * Filtra productos por categoría
 * @param {Array} products - Array de productos
 * @param {string} category - Categoría a filtrar ('all', 'burgers', 'sides', 'drinks')
 * @returns {Array} Productos filtrados
 */
export function filterByCategory(products, category) {
    if (category === 'all') {
        return products;
    }
    // filter() crea un nuevo array solo con los productos que cumplan la condición
    return products.filter(product => product.category === category);
}

/**
 * Busca productos por nombre o descripción
 * @param {Array} products - Array de productos
 * @param {string} searchTerm - Término de búsqueda
 * @returns {Array} Productos que coinciden
 */
export function searchProducts(products, searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) return products;
    
    // Busca en nombre Y descripción
    return products.filter(product => 
        product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
    );
}