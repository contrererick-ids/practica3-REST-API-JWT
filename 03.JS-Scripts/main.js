import Pokemon from './pokemon.js';
import * as productModule from './product.js';
import * as shoppingCartModule from './shopping_cart_script.js';

// Función para generar un carrusel de imágenes de los productos en la página de inicio en la sección productsCarousel
async function generateProductsCarousel() {
    // Guardamos el contenedor en una variable para poder acceder a él después de que se haya cargado el carrusel
    const carouselContainer = document.getElementById('producstCarousel');
    if (!carouselContainer) return;

    // Creamos un div para el carrusel
    const carouselInner = document.createElement('div');
    carouselInner.classList.add('carousel-inner');

    // Llamamos a la API para obtener los productos
    const response = await fetch(productModule.api.baseURL);
    const products = await response.json();

    // Creamos un div para cada producto
    products.forEach((product, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (index === 0) {
            carouselItem.classList.add('active');
        }

        const img = document.createElement('img');
        img.src = product.image;
        img.classList.add('d-block', 'w-100');
        img.alt = product.name;

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);

        // Agregamos el carrusel al contenedor
        carouselContainer.appendChild(carouselInner);
    })

    return carouselInner;
}

document.addEventListener('DOMContentLoaded', async () => {
    const productsCarousel = document.getElementById('producstCarousel');
    if (!productsCarousel) return;

    // Esperamos a que productModule.loadProducts() se complete
    await generateProductsCarousel();

    const productsCatalogue = document.getElementById('productsCatalogue');
    if (!productsCatalogue) return;

    // Esperamos a que productModule.loadProducts() se complete
    await productModule.loadProducts(productsCatalogue);

    // Agregamos los event listeners a los botones
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log('Buttons found:', addToCartButtons.length);
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            try {
                const productCard = event.target.closest('.product-card');
                if (!productCard) return;
                
                const productId = parseInt(productCard.dataset.productId);
                if (!productId) return;

                const response = await fetch(productModule.api.baseURL);
                const products = await response.json();
                const product = products.find(p => p.id === productId);
                
                if (product) {
                    shoppingCartModule.addToCart(product);
                }
            } catch (error) {
                console.error('Error adding to cart:', error);
            }
        });
    });
});