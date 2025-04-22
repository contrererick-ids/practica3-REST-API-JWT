import Pokemon from './pokemon.js';

const pokedex = document.getElementById("pokedexCatalogue");
const pokedexPagination = document.getElementById("pokedexPagination");
const paginationContainer = document.createElement("nav");
paginationContainer.classList.add("pokedex-pagination");
const paginationList = document.createElement("ul");
paginationList.classList.add("pagination", "justify-content-center", "page-navigation");
paginationContainer.appendChild(paginationList);
pokedexPagination.appendChild(paginationContainer);

let currentPage = 1;
const limit = 18;
let totalPages = 0;

async function loadPokedexPage(page) {
    pokedex.innerHTML = "";

    const offset = (page - 1) * limit;
    const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        for (const pokemon of data.results) {
            await loadPokemonDetails(pokemon.url);
        }

        totalPages = 6;
        createPaginationControls(totalPages);
    } catch (error) {
        console.error("Error in loadPokedexPage: ", error);
    }
}

async function loadPokemonDetails(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const pokenObj = new Pokemon(data);
        pokedex.appendChild(pokenObj.renderCard());
    } catch (error) {
        console.error("Error in loadPokemonDetails: ", error);
    }
}

function createPaginationControls(total) {
    paginationList.innerHTML = "";

    if (currentPage > 1) {
        paginationList.appendChild(createPageItem("Anterior", currentPage - 1));
    }

    for (let i = 1; i <= total; i++) {
        paginationList.appendChild(createPageItem(i, i, i === currentPage));
    }

    if (currentPage < total) {
        paginationList.appendChild(createPageItem("Siguiente", currentPage + 1));
    }
}

function createPageItem(text, page, active = false) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    if (active) li.classList.add("active");

    const a = document.createElement("a");
    a.classList.add("page-link");
    a.href = "#";
    a.innerText = text;

    a.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = page;
        loadPokedexPage(currentPage);
        createPaginationControls(totalPages);
    });

    li.appendChild(a);
    return li;
}

loadPokedexPage(currentPage);
createPaginationControls(totalPages);