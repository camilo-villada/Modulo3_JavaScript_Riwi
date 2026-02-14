# RestorApp - Sistema de Gestión de Pedidos para Restaurante

## Descripción del Proyecto

**RestorApp** es una aplicación web desarrollada en JavaScript vanilla que simula un sistema completo de gestión de pedidos para restaurantes. La aplicación permite a los clientes realizar pedidos desde un menú digital y a los administradores gestionar el flujo de atención del restaurante en tiempo real.

Este proyecto es parte de un simulacro académico diseñado para demostrar el dominio de JavaScript moderno, manipulación del DOM, manejo de estados y arquitectura de aplicaciones web.

---

## Características Principales

### Para Clientes (Usuarios)
- **Ver el menú completo** con categorías (burgers, sides, drinks)
- **Buscar productos** por nombre
- **Filtrar por categorías**
- **Agregar productos al carrito** con control de cantidades
- **Realizar pedidos** con confirmación visual
- **Ver historial de pedidos** con estados actualizados
- **Consultar perfil** con estadísticas personales

### Para Administradores
- **Visualizar todos los pedidos** del sistema
- **Ver detalles completos** de cada pedido
- **Cambiar estados** de pedidos (pendiente → preparando → listo → entregado)
- **Eliminar pedidos** con confirmación
- **Monitorear estadísticas** en tiempo real:
  - Total de pedidos
  - Pedidos pendientes
  - Ingresos del día
- **Alertas de pedidos urgentes** (más de 30 minutos pendientes)

---

## Arquitectura del Sistema

### Estructura de Carpetas

```
/simulacro_js
├── index.html              # Punto de entrada de la aplicación
├── db.json                 # Base de datos simulada (usuarios, productos)
├── package.json            # Dependencias del proyecto
├── README.md              # Este archivo
│
└── /src
    ├── main.js            # Inicialización de la app
    │
    ├── /auth              # Controladores de lógica de negocio
    │   ├── auth.service.js
    │   ├── login.controller.js
    │   ├── dashboard.controller.js
    │   ├── menu.controller.js
    │   └── myOrders.controller.js
    │
    ├── /pages             # Componentes de vistas (HTML)
    │   ├── login.js
    │   ├── dashboard.js
    │   ├── menu.js
    │   └── my-orders.js
    │
    ├── /routes            # Sistema de enrutamiento SPA
    │   └── router.js
    │
    ├── /services          # Servicios de datos
    │   ├── products.js
    │   ├── cart.js
    │   └── orders.js
    │
    └── /styles            # Hojas de estilo CSS
        ├── style.css
        ├── login.css
        ├── menu.css
        ├── dashboard.css
        └── my-orders.css
```

---

## Roles del Sistema

### Usuario Normal (Customer)
**Email:** `visitor@evently.com`  
**Contraseña:** `visitor123`

**Permisos:**
- Acceso al menú del restaurante
- Crear y gestionar pedidos propios
- Ver solo SUS pedidos
- Consultar perfil y estadísticas personales

### Administrador (Admin)
**Email:** `admin@evently.com`  
**Contraseña:** `admin123`

**Permisos:**
- Ver TODOS los pedidos del sistema
- Cambiar estados de cualquier pedido
- Eliminar pedidos
- Acceso al dashboard administrativo
- Monitoreo de estadísticas globales

---

## Cómo Ejecutar el Proyecto

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn

### Instalación

1. **Clonar o descargar el proyecto**
```bash
cd simulacro_js
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el servidor de desarrollo (Vite)**
```bash
npm run dev
```

4. **Abrir en el navegador**
```
http://localhost:5173
```
(El puerto puede variar si 5173 está ocupado)

---

## Flujo de Uso

### Inicio de Sesión

1. Abre la aplicación en tu navegador
2. Selecciona el rol (Admin o User)
3. Ingresa las credenciales:
   - **Usuario:** `visitor@evently.com` / `visitor123`
   - **Admin:** `admin@evently.com` / `admin123`

### Flujo del Cliente

1. **Explorar el Menú**
   - Navega por las categorías (All, Burgers, Sides, Drinks)
   - Usa el buscador para encontrar productos específicos

2. **Agregar al Carrito**
   - Click en "Add to order" en cualquier producto
   - Ajusta cantidades con los botones + / -
   - Visualiza el total en tiempo real

3. **Confirmar Pedido**
   - Click en "Confirm Order" en el carrito
   - Confirma en el modal
   - El pedido se crea con estado "pendiente"

4. **Ver Mis Pedidos**
   - Click en "My Orders" en el navegador
   - Visualiza todos tus pedidos con sus estados
   - Consulta detalles y totales

### Flujo del Administrador

1. **Dashboard Principal**
   - Visualiza estadísticas en tiempo real
   - Revisa la tabla de todos los pedidos

2. **Gestionar Pedidos**
   - Click en cualquier pedido de la tabla
   - Revisa detalles completos en el panel lateral
   - Cambia el estado según el flujo de atención

3. **Cambiar Estados**
   - Selecciona el nuevo estado en el dropdown
   - Click en "Update"
   - El sistema valida y actualiza automáticamente

4. **Eliminar Pedidos**
   - Selecciona el pedido a eliminar
   - Click en "Delete Order"
   - Confirma la acción (irreversible)

---

## Estados de los Pedidos

El sistema maneja 4 estados principales:

| Estado | Descripción | Color Visual |
|--------|-------------|--------------|
| **Pendiente** | Pedido recibido, esperando preparación | Amarillo |
| **Preparando** | Pedido en proceso de preparación | Azul |
| **Listo** | Pedido preparado, listo para entregar | Morado |
| **Entregado** | Pedido entregado al cliente | Verde |

---

## Persistencia de Datos

### LocalStorage
- **Pedidos:** Almacenados en `localStorage` con clave `'orders'`
- **Sesión:** Usuario actual en `localStorage` con clave `'session'`

### Base de Datos Simulada (db.json)
```json
{
  "users": [...],      // Usuarios del sistema
  "products": [...],   // Menú de productos
  "orders": []         // (Los pedidos se guardan en localStorage)
}
```

---

## Tecnologías Utilizadas

- **JavaScript ES6+** (Vanilla JavaScript)
- **HTML5** y **CSS3**
- **Vite** (Build tool y dev server)
- **Axios** (Peticiones HTTP)
- **LocalStorage API** (Persistencia)
- **History API** (Enrutamiento SPA)

---

## Métodos de Array Utilizados

El proyecto implementa todos los métodos de array requeridos:

### `map()`
- Renderizado de productos en el menú
- Generación de filas de la tabla de pedidos
- Renderizado de items del carrito

### `filter()`
- Filtrado por categorías
- Búsqueda de productos
- Filtrado de pedidos pendientes
- Eliminación de pedidos

### `find()`
- Búsqueda de productos en el carrito
- Localización de pedidos específicos
- Validación de usuarios

### `reduce()`
- Cálculo de totales del carrito
- Suma de ingresos del día
- Conteo de items totales

### `some()`
- **Detección de pedidos urgentes** (pendientes >30min)
- Validación de disponibilidad de productos

### `every()`
- **Validación de integridad de pedidos** antes de cambiar estado
- Verificación de campos requeridos en items

---

## Protección de Rutas

El sistema implementa protección basada en roles:

| Ruta | Acceso Usuario | Acceso Admin |
|------|----------------|--------------|
| `/login` | Público | Público |
| `/menu` | Permitido | Redirige a dashboard |
| `/my-orders` | Permitido | Redirige a dashboard |
| `/dashboard` | Redirige a menu | Permitido |

---

## Características Técnicas

### Renderizado Dinámico
- Componentes basados en funciones que retornan HTML
- Actualización reactiva del DOM sin frameworks

### Gestión de Estado
- Estado centralizado en arrays y objetos
- Sincronización con LocalStorage

### Eventos
- `addEventListener` para interacciones de usuario
- Delegación de eventos para mejor performance
- `preventDefault` en formularios

### SPA (Single Page Application)
- Navegación sin recargas con History API
- Enrutamiento basado en `window.location.pathname`
- Soporte para botones atrás/adelante del navegador

---

## Estructura de Datos

### Usuario
```javascript
{
  id: number,
  name: string,
  email: string,
  password: string,
  role: "admin" | "user"
}
```

### Producto
```javascript
{
  id: number,
  name: string,
  price: number,
  category: "burger" | "side" | "drink",
  description: string,
  image: string
}
```

### Pedido
```javascript
{
  id: number,              // Timestamp único
  userId: number,          // ID del usuario que creó el pedido
  items: [                 // Array de productos
    {
      id: number,
      name: string,
      price: number,
      quantity: number,
      subtotal: number
    }
  ],
  total: number,           // Total del pedido
  status: string,          // "pendiente" | "preparando" | "listo" | "entregado"
  createdAt: string        // ISO timestamp
}
```

---

## Características de Debugging

### Consola
- Logs informativos en cada operación importante
- Warnings para pedidos urgentes
- Errores capturados con `try/catch`

### Validaciones
- Validación de sesión en cada ruta
- Validación de integridad de pedidos
- Confirmaciones antes de acciones destructivas

---

## Notas del Desarrollador

### Decisiones de Diseño

1. **LocalStorage vs JSON Server:** Se optó por LocalStorage para los pedidos para simular un backend real sin necesidad de servidor adicional.

2. **SPA sin Frameworks:** Se implementó routing manual para demostrar comprensión profunda de JavaScript vanilla.

3. **Separación de Responsabilidades:** Arquitectura MVC-like con separación clara entre vistas (pages), lógica (controllers) y servicios (services).

4. **Event Delegation:** Uso de delegación de eventos para prevenir múltiples listeners y mejorar performance.

---

## Objetivos de Aprendizaje Cumplidos

- Manipulación avanzada del DOM  
- Gestión de estado sin frameworks  
- Implementación de SPA routing  
- Uso exhaustivo de métodos de arrays  
- Persistencia con Web Storage API  
- Arquitectura escalable y mantenible  
- Separación de responsabilidades  
- Manejo de eventos y formularios  
- Validaciones y manejo de errores  
- UX/UI profesional con CSS moderno  

---

## Licencia

Este proyecto es parte de un ejercicio académico y está disponible para fines educativos.

---

## Autor

Desarrollado como parte del simulacro de JavaScript para gestión de restaurantes.

**Versión:** 1.0.0  
**Fecha:** Enero 2026

---

## Posibles Mejoras Futuras

- [ ] Implementar filtros de pedidos en dashboard admin
- [ ] Agregar notificaciones en tiempo real
- [ ] Sistema de mensajería entre admin y usuarios
- [ ] Historial de cambios de estado
- [ ] Exportar reportes en PDF/Excel
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)
- [ ] Backend real con Node.js/Express
- [ ] Base de datos MongoDB/PostgreSQL

---

**Gracias por revisar RestorApp!**
