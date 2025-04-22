//Definición de la API
export class API {
    constructor() {
        // Validamos que el dominio de la página actual incluya "github.io" para determinar si estamos en GitHub Pages o en un entorno local
        const isGitHubPages = window.location.hostname.includes('github.io');
        
        // Definimos la URL a utilizar para la API dependiendo si estamos en GitHub Pages o en un entorno local
        this.baseURL = isGitHubPages 
            ? '/practica3-REST-API-JWT/04.JSON-LocalStorage/products.json'
            : '../04.JSON-LocalStorage/products.json';
    }
    
    async getAll() {
        try {
            const response = await fetch(this.baseURL);
            if (!response.ok) throw new Error('Error al obtener datos');
            return response.json();
        } catch (error) {
            console.error("Error en getAll:", error);
            return [];
        }
    }

    async create(data) {
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return response.json();
        } catch (error) {
            console.error("Error en create:", error);
        }
    }

    async update(id, data) {
        try {
            const response = await fetch(`${this.baseURL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            return response.json();
        } catch (error) {
            console.error("Error en update:", error);
        }
    }

    async delete(id) {
        try {
            await fetch(`${this.baseURL}/${id}`, { method: 'DELETE' });
        } catch (error) {
            console.error("Error delete:", error);
        }
    }
}

// Función para crear un array de productos a partir de los datos obtenidos de la API
async function createFromJson(API){
    try{
        // Hacemos un request a la API y guardamos en data los datos obtenidos de la API usando el método getAll()
        const data = await API.getAll();
        // Usando .map() creamos un nuevo array de productos a partir de los datos obtenidos de la API
        return data.map(productsData => new Product(productsData));
    }catch (error) {
        console.error("Error creating products from JSON: ", error);
        return [];
    }

}

// Definición de la clase Product
export class Product {
    // Constructor de la clase Product
    constructor({ id, name, image, description, price}) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.description = description;
    }

    static createFromObject(product){
        // Creamos un objeto con los datos del producto
        const productData = {
            id: product.id,
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
        }
        // Validamos que los datos del producto sean válidos
        if(!productData.id || !productData.name || !productData.price){
            throw new Error("Missing required product data");
        }

        return new Product(productData);
    }
    
    // Método para renderizar la tarjeta del producto
    renderCard() {
        const card = document.createElement("div");
        card.classList.add("col");
        
        card.innerHTML = `
        <div class="card product-card" data-product-id="${this.id}">
            <img src="${this.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <div class="row justify-content-between card-product-info">
                    <p class="col-12 col-md-8 card-text">${this.description}</p>
                    <p class="col-12 col-md-4 d-flex justify-content-center align-items-center card-product-price">${Intl.NumberFormat("es-MX",{style: "currency", currency: "MXN"}).format(this.price)} MXN</p>
                </div>
                <div class="d-flex justify-content-evenly card-buttons">
                    <a href="#" class="btn  btn-secondary see-more-button">Ver más</a>
                    <button class="btn btn-primary save-product"><i class="bi bi-heart"></i></button>
                    <button class="btn btn-primary add-to-cart"><i class="bi bi-cart-plus"></i></button>
                </div>
            </div>
        </div> 
        `;
        
        return card;
    }
}

// Definimos una instancia de la clase API
export const api = new API();

// Función para cargar los productos en el contenedor "productsCatalogue" usando el método renderCard() de la clase Product
async function loadProducts(productsCatalogue) {
    // Limpiamos el contenedor de productos para asegurarnos que no se dupliquen los productos al cargar la página de nuevo
    productsCatalogue.innerHTML = "";
    // Hacemos un request a la API
    try {
        // Creamos un array de productos a partir de los datos obtenidos de la API usando la función createFromJson() y la API como argumento
        const products = await createFromJson(api);
        // Iteramos sobre cada producto
        products.forEach(product => {
            // Renderizamos la tarjeta de cada producto y la agregamos al contenedor productsCatalogue usando el método appendChild()
           productsCatalogue.appendChild(product.renderCard()); 
        })
    }catch (error) {
        console.error("Error in loadProducts: ", error);
    }
}

// Exportamos también nuestra función loadProducts() para poder usarla en otros archivos
export { loadProducts };