/**************************************
 * APP.JS - MINI APLICACIÓN CRUD
 * Módulo 3 - JavaScript
 **************************************/

// ================================
// ELEMENTOS DEL DOM
// ================================

const form = document.getElementById('productForm');
const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const productList = document.getElementById('productList');
const message = document.getElementById('message');
const syncBtn = document.getElementById('syncBtn');

// ================================
// ESTADO GLOBAL
// ================================
let products = [];
const API_URL = 'http://localhost:3000/products';

// Ejemplos de estructuras adicionales requeridas por el enunciado
// `nameSet` demostrará uso de Set y `productMap` demostrará uso de Map
const nameSet = new Set();
const productMap = new Map();

// ================================
// LOCAL STORAGE
// ================================
function saveToLocalStorage() {
  localStorage.setItem('products', JSON.stringify(products));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem('products');
  products = data ? JSON.parse(data) : [];
  // Asegurar que price sea número y que exista id
  products = products.map(p => ({
    id: p.id ?? Date.now() + Math.random(),
    name: p.name,
    price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0,
    synced: p.synced ?? false,
    serverId: p.serverId ?? null
  }));
  // Reconstruir Set y Map a partir del arreglo para demostrar su uso
  nameSet.clear();
  productMap.clear();
  products.forEach(p => {
    nameSet.add(p.name);
    productMap.set(p.id, p);
  });
}

// ================================
// RENDERIZAR DOM
// ================================
function renderProducts() {
  productList.innerHTML = '';

  products.forEach((product) => {
    const li = document.createElement('li');
    li.dataset.id = product.id;
    li.textContent = `${product.name} - $${product.price.toFixed(2)}`;

    const btns = document.createElement('div');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Eliminar';
    deleteBtn.addEventListener('click', () => {
      deleteProductById(product.id);
    });

  
    btns.appendChild(deleteBtn);
    li.appendChild(btns);
    productList.appendChild(li);
  });

  // Mostrar en consola un ejemplo del uso de Set y Map (no cambia la funcionalidad)
  console.log('Nombres (Set):', Array.from(nameSet));
  console.log('Mapa productos (Map):', Array.from(productMap.entries()).slice(0,5));
}

// ================================
// MENSAJES
// ================================
function showMessage(text, type = 'success') {
  message.textContent = text;
  message.className = type === 'error' ? 'error' : 'success';
  setTimeout(() => {
    message.textContent = '';
    message.className = '';
  }, 3000);
}

// ================================
// VALIDACIONES
// ================================
function isValid(name, price) {
  if (!name || !Number.isFinite(price) || price <= 0) {
    showMessage('Datos inválidos: nombre requerido y precio > 0', 'error');
    return false;
  }
  return true;
}

// ================================
// AGREGAR PRODUCTO
// ================================
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value.trim());

  if (!isValid(name, price)) return;

  const newProduct = {
    id: Date.now(),
    name,
    price,
    synced: false,
    serverId: null
  };

  products.push(newProduct);
  // Mantener Set y Map sincronizados
  nameSet.add(newProduct.name);
  productMap.set(newProduct.id, newProduct);
  saveToLocalStorage();
  renderProducts();

  showMessage('Producto agregado correctamente', 'success');
  form.reset();
});

// ================================
// ELIMINAR PRODUCTO (por id)
// ================================
async function deleteProductById(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return;

  const product = products[index];
  // Si el producto tiene `serverId`, primero eliminar en el servidor json-server
  if (product.serverId) {
    try {
      const res = await fetch(`${API_URL}/${product.serverId}`, { method: 'DELETE' });
      if (!res.ok) {
        console.error('DELETE failed on server:', res.status);
        showMessage('Error al eliminar en servidor', 'error');
        return;
      }
      console.log('DELETE status (server):', res.status);
    } catch (err) {
      console.error('Error DELETE:', err);
      showMessage('Error al eliminar en servidor', 'error');
      return;
    }
  }

  // Eliminar localmente y actualizar estructuras y DOM
  products.splice(index, 1);
  productMap.delete(id);
  nameSet.clear();
  products.forEach(p => nameSet.add(p.name));
  saveToLocalStorage();

  const li = productList.querySelector(`li[data-id="${id}"]`);
  if (li && li.parentNode) li.parentNode.removeChild(li);

  showMessage('Producto eliminado', 'success');
}


// ================================
// FETCH API - CRUD (sincronización)
// ================================
async function syncWithAPI() {
  try {
    // GET: obtener todos los productos desde json-server
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`GET failed: ${response.status}`);
    const serverProducts = await response.json();
    console.log('GET products:', serverProducts);

    // POST: subir todos los productos locales que no estén sincronizados y no tengan serverId
    const unsynced = products.filter(p => !p.synced && !p.serverId);
    if (unsynced.length > 0) {
      for (const local of unsynced) {
        try {
          const postRes = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: local.name, price: local.price })
          });
          if (!postRes.ok) {
            console.error('POST failed:', postRes.status);
            continue;
          }
          const postData = await postRes.json();
          // json-server asigna `id`; guardarlo en `serverId` y marcar como sincronizado
          local.synced = true;
          local.serverId = postData.id;
          productMap.set(local.id, local);
          saveToLocalStorage();
          console.log('POST created:', postData);
        } catch (err) {
          console.error('Error POST:', err);
        }
      }
      renderProducts();
    } else {
      console.log('No hay productos locales pendientes de sincronizar (POST).');
    }

    // PUT: actualizar en servidor el primer producto que tenga serverId (solo si existe)
    const toUpdate = products.find(p => p.serverId);
    if (toUpdate) {
      try {
        const putRes = await fetch(`${API_URL}/${toUpdate.serverId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: toUpdate.serverId, name: toUpdate.name, price: toUpdate.price })
        });
        if (!putRes.ok) throw new Error(`PUT failed: ${putRes.status}`);
        const putData = await putRes.json();
        console.log('PUT:', putData);
      } catch (err) {
        console.error('Error PUT:', err);
      }
    } else {
      console.log('No hay productos con serverId para PUT.');
    }

    showMessage('Sincronización con API ejecutada (ver consola para detalles)', 'success');
  } catch (error) {
    console.error('Error API:', error);
    showMessage('Error al sincronizar con API', 'error');
  }
}

syncBtn.addEventListener('click', syncWithAPI);

// ================================
// CARGA INICIAL
// ================================
loadFromLocalStorage();
renderProducts();
