import * as productModule from '../03.JS-Scripts/product.js';

// Definimos la clase ShoppingCartItem que representa un producto en el carrito de compras
export class ShoppingCartItem extends productModule.Product {
    constructor(productData) {
        super(productData);
        this.quantity = productData.quantity || 1;
    } 

    // Método para renderizar el producto en el carrito de compras
    renderItem() {
        const cartItemContainer = document.createElement('div');
        cartItemContainer.classList.add('card', 'w-100', 'mb-2', 'shopping-cart-item');

        cartItemContainer.innerHTML = `
            <div class="row cart-item-banner">
                <div class="col-12 col-md-4 cart-item-img">
                    <img src="${this.image}" class="img-fluid rounded-start h-100 w-100 card-img-top" alt="${this.name}">
                </div>
                <div class="col-12 col-md-8 cart-item-body">
                    <div class="col-12 cart-item-header">
                        <h3 class="card-title">${this.name}</h3>
                    </div>
                    <div class="row cart-item-info">
                        <div class="col-12 col-md-8 item-description">
                            <p class="item-text">${this.description}</p>
                            <div class="justify-content-evenly d-flex align-items-center">
                                <button class="btn btn-warning decrease-item-quantity">-</button>
                                <h5 class="item-quantity">${this.quantity}</h5>
                                <button class="btn btn-warning increase-item-quantity">+</button>
                                <button class="btn btn-danger remove-from-cart" data-product-id="${this.id}"><i class="bi bi-trash-fill"></i></button>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 item-subtotal-grid">
                            <div class="d-flex flex-wrap justify-content-between align-items-center">
                                <p class="subtotal-grid-value">Precio:</p>
                                <p>${Intl.NumberFormat("es-MX",{style: "currency", currency: "MXN"}).format(this.price)}</p>
                            </div>
                            <div class="d-flex flex-wrap justify-content-between align-items-center">
                                <p class="subtotal-grid-value">Subtotal:</p>
                                <p>${Intl.NumberFormat("es-MX",{style: "currency", currency: "MXN"}).format(this.price * this.quantity)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Guardamos los botones para remover productos del carrito en una variable
        const removeButton = cartItemContainer.querySelector('.remove-from-cart');
        // Agregamos un EventListener a la variable para que los botones manden a llamar la función para remover
        removeButton.addEventListener('click', () => removeFromCart(this.id));
        
        // Guardamos los botones para incrementar la cantidad de un producto en una variable
        const increaseButton = cartItemContainer.querySelector('.increase-item-quantity');
        // Agregamos un EventListener a la variable para que los botones manden a llamar la función para incrementar
        increaseButton.addEventListener('click', () => increaseItemQuantity(this.id));
        
        // Guardamos los botones para incrementar la cantidad de un producto en una variable
        const decreaseButton = cartItemContainer.querySelector('.decrease-item-quantity');
        // Agregamos un EventListener a la variable para que los botones manden a llamar la función para incrementar
        decreaseButton.addEventListener('click', () => decreaseItemQuantity(this.id));
        
        // Regresamos el div del producto
        return cartItemContainer;
    }
}

// Definimos una variable que apunta a "shoppingCartGrid" para cargar ya sea el carrito o el mensaje de que está vacío en el shoppingCart.html
const shoppingCartBody = document.getElementById('shoppingCartBody');
// Definimos una variable que apunta a "shoppingCartGrid" dónde se cargarán los productos del carrito de compras en el shoppingCart.html
const shoppingCartGrid = document.getElementById('shoppingCartGrid');
// Definimos una variable que apunta a "shoppingCartResume" dónde se cargará el resumen del carrito de compras en el shoppingCart.html
const shoppingCartResume = document.getElementById('shoppingCartResume');

// Función para mostrar un mensaje indicando que el carrito está vacío
function displayEmptyCartMessage() {
    shoppingCartBody.innerHTML = `
        <div class="empty-cart">
            <h2 class="mb-1">No hay nada aquí aún.</h2>
            <h2 class="mb-1">Encuéntrate con tu par ideal</h2>
            <button class="btn btn-primary back-to-catalogue-btn"><i class="bi bi-cart"></i></button>
        </div>
    `;

    // Guardamos el botón para regresar a la página de productos en una variable
    const backToCatalogueButton = shoppingCartBody.querySelector('.back-to-catalogue-btn');
    // Agregamos un EventListener al botón para que el botón mande a llamar la función para regresar a la página de productos
    backToCatalogueButton.addEventListener('click', goBackToCatalogue);

}

//Función para regresar a la página de productos cuando el carritoe está vacío
function goBackToCatalogue() {
    // Primero validamos el dominio en el que estamos para definir el path a utilizar
    const isGitHubPages = window.location.hostname.includes('github.io');
    const path = isGitHubPages ? '/practica3-REST-API-JWT/' : '/';
    // Window location href nos permite redireccionar a la página que le asignemos (tiene que ser un path válido)
    window.location.href = path + 'index.html';
}

// Función para cargar el carrito de compras
async function loadShoppingCart() {
    try {
        // Definimos una variable que apunta al localStorage dónde se guardan los productos del carrito de compras en el shoppingCart.html
        const savedCartData = localStorage.getItem('shoppingCartLocalStorage');
        // Validamos si hay productos en el carrito de compras
        const cartItems = JSON.parse(savedCartData || '[]');

        // Si no hay productos en el carrito de compras, mostramos un mensaje de que el carrito está vacío
        if (!cartItems || cartItems.length === 0) {
            displayEmptyCartMessage();
            return;
        }

        // Limpiamos el contenedor del carrito de compras para evitar que se dupliquen los productos al cargar la página de nuevo
        shoppingCartGrid.innerHTML = '';
        
        // Recorremos los productos del carrito de compras y utilizamos el método renderItem en cada uno para agregarlo al contenedor del carrito de compras
        cartItems.forEach(item => {
            const cartItem = new ShoppingCartItem(item);
            shoppingCartGrid.appendChild(cartItem.renderItem());
        });
        calculeTotal();
    } catch (error) {
        // En caso de que haya un error al cargar el carrito de compras, mostramos un mensaje de error en la consola
        console.error('Error loading shopping cart:', error);
        displayEmptyCartMessage();
    }
}

// Función para agregar un producto al carrito de compras
function addToCart(product) {
    try {
        // Guardamos el carrito actual del localStorage en una variable, si no existe, asignamos un arreglo vacío
        let currentCartItems = JSON.parse(localStorage.getItem('shoppingCartLocalStorage') || '[]');
        // Verificamos si el producto ya existe en el carrito
        const existingCartItem = currentCartItems.find(item => item.id === product.id);
        
        // Si ya existe el proudcto en el carrito, incrementamos su cantidad, si no, lo agregamos al carrito
        if (existingCartItem) {
            existingCartItem.quantity += 1;
        } else {
            const cartItem = new ShoppingCartItem({
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                description: product.description,
                quantity: 1
            });
            currentCartItems.push(cartItem);
        }
        
        // Guardamos el carrito actualizado en el localStorage pasando el arreglo de productos como un string con JSON.stringify
        localStorage.setItem('shoppingCartLocalStorage', JSON.stringify(currentCartItems));
        alert('Producto añadido al carrito');
    } catch (error) {
        // En caso de que haya un error al agregar el producto al carrito, mostramos un mensaje de error en la consola
        console.error('Error adding to cart:', error);
        alert('Error al añadir el producto al carrito');
    }
}

//Función para calcular el total del carrito de compras
function calculeTotal(){
    // Definimos una variable que apunta al localStorage dónde se guardan los productos del carrito de compras en el shoppingCart.html
    const savedCartData = localStorage.getItem('shoppingCartLocalStorage');
    // Validamos si hay productos en el carrito de compras
    const cartItems = JSON.parse(savedCartData || '[]');
    // Validamos si hay productos en el carrito de compras
    if (!cartItems || cartItems.length === 0) {
        displayEmptyCartMessage();
        return;
    }
    // Limpiamos el contenedor para evitar que el resumen de la compra se duplique
    shoppingCartResume.innerHTML = '';
    const cartItemsResume = document.createElement('div');
    cartItemsResume.classList.add('col-12','d-flex','flex-wrap','align-items-center','cart-items-resume');
    cartItemsResume.innerHTML = `
        <div class="col-12 d-flex align-items-center items-resume-header">
            <h3>Resumen de Compra</h3>
        </div>
        <div id="itemsResumeBody" class="col-12 align-items-center items-resume-body">
            <div class="col-12 d-flex justify-content-between align-items-center items-resume-titles">
                <div class="col-4 align-items-center"><h5>Nombre</h5></div>
                <div class="col-2 align-items-center"><h5>Cantidad</h5></div>
                <div class="col-3 align-items-center"><h5>Precio</h5></div>
                <div class="col-3 align-items-center"><h5>Subtotal</h5></div>
            </div>
        </div>
        <div id="itemsResumeTotal" class="col-12 d-flex justify-content-between align-items-center items-resume-total">
        </div>
        <div class="col-12 d-flex flex-wrap align-items-center items-resume-footer">
            <button class="col-12 btn btn-warning mb-2">Pagar</button>
            <button class="col-12 btn btn-danger mb-2">Cancelar</button>
        </div>
    `;
    // Agregamos el contenedor de Resumen de compras al HTML
    shoppingCartResume.appendChild(cartItemsResume);

    // Apuntamos al "ID" del contenedor que tendrá el "body" del Resumen de compras
    const itemsResumeBody = document.getElementById('itemsResumeBody');
    // Creamos una variable para almacenar el total
    let totalAmount = 0;
    //Recorremos los productos del carrito de compras para extraer su precio y cantidad ordenada
    cartItems.forEach(item => {
        // Guardamos cada producto en la variable cartItem
        const cartItem = new ShoppingCartItem(item);
        // Creamos un div para cada producto
        const itemResumeDiv = document.createElement('div');
        itemResumeDiv.classList.add('col-12','d-flex','justify-content-between','align-items-center','item-resume-info');
        itemResumeDiv.innerHTML = `
            <div class="col-4 align-items-center item-info-text"><p>${cartItem.name}</p></div>
            <div class="col-2 align-items-center item-info-text"><p>${cartItem.quantity}</p></div>
            <div class="col-3 align-items-center item-info-text"><p>${Intl.NumberFormat("es-MX",{style: "currency", currency: "MXN"}).format(cartItem.price)}</p></div>
            <div class="col-3 align-items-center item-info-text"><p>${Intl.NumberFormat("es-MX",{style: "currency", currency: "MXN"}).format(cartItem.price*cartItem.quantity)}</p></div>
        `;
        totalAmount += cartItem.price*cartItem.quantity;
        itemsResumeBody.appendChild(itemResumeDiv);
    });

    // Apuntamos al "ID" del contenedor que tendrá la suma total de la compra
    const itemsResumeTotal = document.getElementById('itemsResumeTotal');
    itemsResumeTotal.innerHTML = `
        <div class="col-6 justify-content-center item-total-text"><h6>Total a pagar</h6></div>
        <div class="col-6 justify-content-center item-total-value"><h6>${Intl.NumberFormat("es-MX",{style: "currency", currency: "MXN"}).format(totalAmount)}</h6></div>
    `;

}

// Función para remover un producto del carrito de compras
function removeFromCart(productId) {
    try {
        // Guardamos el carrito actual del localStorage en una variable, si no existe, asignamos un arreglo vacío
        let currentCartItems = JSON.parse(localStorage.getItem('shoppingCartLocalStorage') || '[]');
        // Filtramos el carrito actual para eliminar el producto con el ID especificado, esta línea devuelve el carrito actual sin el producto filtrado por ID
        currentCartItems = currentCartItems.filter(item => item.id !== productId);
        // Actualizamos el carrito en el localStorage con el carrito actualizado sin el producto filtrado
        localStorage.setItem('shoppingCartLocalStorage', JSON.stringify(currentCartItems));
        // Volvemos a cargar el carrito de compras
        loadShoppingCart();
    } catch (error) {
        // En caso de que haya un error al remover el producto del carrito, mostramos un mensaje de error en la consola
        console.error('Error removing item from cart:', error);
    }
}

//Función para aumentar la cantidad de un producto en el carrito de compras
function increaseItemQuantity(productId) {
    try{
        //Guardamos el carrito actual del localStorage en una variable, si no existe, asignamos un arreglo vacío
        let currentCartItems = JSON.parse(localStorage.getItem('shoppingCartLocalStorage') || '[]');
        //Buscamos el producto en el carrito con el ID especificado
        const productToUpdate = currentCartItems.find(item => item.id === productId);
        //Si encontramos el producto, incrementamos su cantidad en 1
        if (productToUpdate) {
            productToUpdate.quantity += 1;
            //Actualizamos el carrito en el localStorage con el carrito actualizado
            localStorage.setItem('shoppingCartLocalStorage', JSON.stringify(currentCartItems));
            //Volvemos a cargar el carrito de compras
            loadShoppingCart();
        } else {
            // Si no encontramos el producto, mostramos un mensaje de error en la consola
            console.error('Product not found in the cart');
            alert('Error no se pudo aumentar la cantidad del producto.');
        }
    } catch (error) {
        // En caso de que haya un error al aumentar la cantidad del producto, mostramos un mensaje de error en la consola
        console.error('Product not found in the cart');
            alert('Error no se pudo aumentar la cantidad del producto.');
    }
}

//Función para disminuir la cantidad de un producto en el carrito de compras
function decreaseItemQuantity(productId) {
    try{
        //Guardamos el carrito actual del localStorage en una variable, si no existe, asignamos un arreglo vacío
        let currentCartItems = JSON.parse(localStorage.getItem('shoppingCartLocalStorage') || '[]');
        //Buscamos el producto en el carrito con el ID especificado
        const productToUpdate = currentCartItems.find(item => item.id === productId);
        //Si encontramos el producto, disminuimos su cantidad en 1
        if (productToUpdate) {
            productToUpdate.quantity -= 1;
            if (productToUpdate.quantity <= 0) {
                currentCartItems = currentCartItems.filter(item => item.id !== productId);
            }
            //Actualizamos el carrito en el localStorage con el carrito actualizado
            localStorage.setItem('shoppingCartLocalStorage', JSON.stringify(currentCartItems));
            //Volvemos a cargar el carrito de compras
            loadShoppingCart();
        } else {
            // Si no encontramos el producto, mostramos un mensaje de error en la consola
            console.error('Product not found in the cart');
            alert('Error no se pudo disminuir la cantidad del producto.');
        }
    } catch (error) {
        // En caso de que haya un error al disminuir la cantidad del producto, mostramos un mensaje de error en la consola
        console.error('Product not found in the cart');
            alert('Error no se pudo disminuir la cantidad del producto.');
    }
}

// Cuando cargue el DOM mandamos a llamar a la función loadShoppingCard()
document.addEventListener('DOMContentLoaded', () => {
    // Cargar el carrito si estamos en la página del carrito
    if (shoppingCartGrid) {
        loadShoppingCart();
    }
});

// Exportamos las funciones para que puedan ser utilizadas en otros archivos
export { loadShoppingCart, addToCart, calculeTotal};