import Pokemon from './pokemon.js';
import * as productModule from './product.js';
import * as shoppingCartModule from './shopping_cart_script.js';

class loginModal extends HTMLElement{
    connectedCallback(){
        const shadowLoginModal = this.attachShadow({mode: 'open'});
        shadowLoginModal.innerHTML = `
            <div class="modal" id="modalLogin" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Ingresar</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> 
                        </div>
                        <div class="modal-body">
                            <form class="login-form">
                                <div class="form-group">
                                    <h5>Usuario</h5>
                                    <div class="input-group mb-2">
                                        <input id="formMailInput" type="text" class="form-control" placeholder="Ingresa tu correo">
                                        <span class="input-group-text"><i class="bi bi-envelope-at"></i></span>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <h5>Contraseña</h5>
                                    <div class="input-group mb-2">
                                        <input id="formPasswordInput" type="text" class="form-control" placeholder="Ingresa tu contraseña">
                                        <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
                                      </div>
                                </div>
                                <div class="form-check d-flex align-items-center">
                                    <input id="formRememberUserBtn" type="checkbox" class="form-check-input">
                                    <label for="formRememberUserBtn">Recordar mi usuario</label>
                                </div>
                                <button type="submit" class="col-12 btn btn-user-login-confirmation"><span class="glyphicon glyphicon-off"></span>Login</button> 
                            </form>
                        </div>
                        <div class="modal-footer">
                            <p>¿No tienes cuenta? </p>
                            <a href="" data-bs-toggle="modal" data-bs-target="#modalUserRegister">¡Regístrate aquí!</a>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('login-modal', loginModal);

class registerModal extends HTMLElement{
    connectedCallback(){
        const shadowRegisterModal = this.attachShadow({mode: 'open'});
        shadowRegisterModal.innerHTML = `
            <div class="modal" id="modalUserRegister" tabindex="1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Regístrate</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label></button>
                        </div>
                        <div class="modal-body">
                            <form class="registerForm">
                                <div class="form-group">
                                    <h5>Ingresa tus datos</h5>
                                    <div class="form-group d-flex justify-content-between align-items-center mb-2">
                                        <div class="input-group">
                                            <input id="formRegisterName" type="text" class="form-control" placeholder="Ingresa tu nombre"> 
                                        </div>
                                        <div class="input-group">
                                            <input id="formRegisterLastName" type="text" class="form-control" placeholder="Ingresa tus apellidos"> 
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <input id="formRegisterMail" type="email" class="form-control" placeholder="Ingresa tu correo">
                                            <span class="input-group-text"><i class="bi bi-envelope-at"></i></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <input id="formRegisterMailConfirmationInput" type="email" class="form-control" placeholder="Confirma tu correo">
                                            <span class="input-group-text"><i class="bi bi-envelope-at"></i></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <input id="formRegisterPasswordInput" type="password" class="form-control" placeholder="Ingresa tu contraseña"> 
                                            <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group mb-2">
                                            <input id="formRegisterPasswordConfirmationInput" type="password" class="form-control" placeholder="Confirma tu contraseña">
                                            <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
                                        </div>
                                    </div>
                                    <button type="submit" class="col-12 btn btn-user-register-confirmation"><span class="glyphicon glyphicon-off"></span>Registrarme</button>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <p>¿Ya tienes cuenta? </p>
                            <a href="" data-bs-toggle="modal" data-bs-target="#modalLogin">Inicia sesión aquí</a>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

customElements.define('register-modal', registerModal);

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

    const loginLinks = document.querySelectorAll('[data-bs-target="#modalLogin"]');
    loginLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector('login-modal').shadowRoot.querySelector('#modalLogin');
            const boostrapModal = new bootstrap.Modal(modal);
            boostrapModal.show();
        })
    });

    const registerLinks = document.querySelectorAll('[data-bs-target="#modalUserRegister"]');
    registerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = document.querySelector('register-modal').shadowRoot.querySelector('#modalUserRegister');
            const boostrapModal = new bootstrap.Modal(modal);
            boostrapModal.show();
        })
    })

    // Apuntamos al productsCarousel y lo guardamos en una variable
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