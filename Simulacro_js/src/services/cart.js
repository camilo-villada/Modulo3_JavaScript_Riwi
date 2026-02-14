//Servicio para manejar el carrito de compras

//Estado del carrito
let cart = [];

//obtiene el carrito actual
export function getCart() {
    return cart;
}

//agregar un producto al carrito
export function addToCart(product){
    //buscar si el producto ya está en el carrito
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem){
        //si ya está, aumentar la cantidad
        existingItem.quantity += 1;
    }else{
        //si no está, agregarlo con cantidad 1
        cart.push({...product, quantity: 1});
    }

    console.log('Carrito actualizado:', cart);
    return cart;
}

//eliminar un producto del carrito
export function removeFromCart(productId){
    cart = cart.filter(item => item.id !== productId);
    return cart;
}

//Aumentar la cantidad de un producto en el carrito
export function increaseQuantity(productId){
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
    }

    return cart;
}

//Disminuir la cantidad de un producto en el carrito
export function decreaseQuantity(productId){
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            // Si quantity es 1, eliminar del carrito
            removeFromCart(productId);
        }
    }
    return cart;
}

//calcular el total del carrito
export function getCartTotal(){
    return cart.reduce((total, item) =>{
        return total + (item.price * item.quantity);
    }, 0);
}

//obtene la cantidad total de items en el carrito
export function getTotalItemsCount(){
    return cart.reduce((count, item) => count + item.quantity, 0);
}

//vaciar el carrito
export function clearCart(){
    cart = [];
    return cart;
}
