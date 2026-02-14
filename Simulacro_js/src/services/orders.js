// Servicio para manejar pedidos
import axios from 'axios';

// Crear un pedido

export async function createOrder(orderData) {
    //Primero obtener los pedidos existentes
    try{    
    const response = await axios.get('/db.json');
        const orders = response.data.orders || [];

        // Crear el nuevo pedido con Id unico
        const newOrder = {
            id: Date.now(), //// Obtener el timestamp actual
            userId: orderData.userId,
            items: orderData.items,
            total: orderData.total,
            status: 'pendiente',
            createdAt: new Date().toISOString()
        };

        const allOrders = [...orders, newOrder];

        //guardar en localstorage temporalmente
        localStorage.setItem('orders', JSON.stringify(allOrders));
       
        console.log('Pedido creado:', newOrder);
        return newOrder;
    }catch (error) {
        console.error("Error al crear el pedido:", error);
        throw error;
    }
}


// Obtener todos los pedidos

export async function getAllOrders(){
    try{
        // Intentar obtener de localStorage 
        const localOrders = localStorage.getItem('orders');
        if (localOrders){
            return JSON.parse(localOrders);
        }

        //si no hay localstorage, obtener de db.json
        const response = await axios.get('/db.json');
        return response.data.orders || [];
    }catch (error){
        console.error("Error al obtener los pedidos:", error);
        return [];  
    }

} 


//obtener pedidos de un usuario especifico

export async function getUserOrders(userId) {
    const allOrders = await getAllOrders();
    return allOrders.filter(order => order.userId === userId);
}

//Actualizar el estado de un pedido
export async function updateOrderStatus(orderId, newStatus) {
    try{
        const allOrders = await getAllOrders();
        const orderIndex = allOrders.findIndex(order => order.id === orderId);

        if (orderIndex !== -1) {
            allOrders[orderIndex].status = newStatus;
            localStorage.setItem('orders', JSON.stringify(allOrders));
            return allOrders[orderIndex];
        }   

        throw new Error('Pedido no encontrado');
    }catch (error) {
        console.error("Error al actualizar el estado del pedido:", error);
        throw error;
    }   
}

// Eliminar un pedido
export async function deleteOrder(orderId) {
    try {
        const allOrders = await getAllOrders();
        const filteredOrders = allOrders.filter(order => order.id !== orderId);
        
        localStorage.setItem('orders', JSON.stringify(filteredOrders));
        console.log(`Pedido #${orderId} eliminado`);
        return true;
    } catch (error) {
        console.error("Error al eliminar el pedido:", error);
        throw error;
    }
}