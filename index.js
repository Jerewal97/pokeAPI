const pokemonInput = document.getElementById("pokemon-input")
const searchPokemon = document.getElementById("searchButton")
const pokemonCard = document.getElementById("card-container");

searchPokemon.addEventListener("click", () => {
    const pokemonName = pokemonInput.value.toLowerCase();

    updateError();

    if (!pokemonName) {
        updateError("Por favor, ingresa un número válido");
        return;
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(apiUrl) 
        .then(response => {
            if (!response.ok) {
                updateError(`No se pudo encontrar al Pokémon ${response.statusText}`);
                throw new Error ("No se encontró al Pokémon");
            }
            return response.json();
        })
        .then(data => {
            if (data.id <= 0) {
                updateError("No se pudo encontrar al Pokémon");
            } else {
                const alturaEnMts = data.height / 10;
                const pesoEnKg = data.weight / 10;
    
                data.height = alturaEnMts;
                data.weight = pesoEnKg;
    
                renderPokemonCard(data);
            }
        })
        .catch(error => {
            console.log(error);
        })
});

function updateError(errorMessage = null) {
    const errorElement = document.getElementById("cardError");
    const cardContainer = document.getElementById("card-container");

    if (errorMessage) {
        errorElement.innerHTML = errorMessage;
        errorElement.classList.add("error-message");
        cardContainer.innerHTML = "";
    } else {
        errorElement.innerHTML = "";
        errorElement.classList.remove("error-message");
    }
}

function renderPokemonCard(pokemonData) {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const card = document.createElement("div");
    card.classList.add("pokemon-card");

    card.innerHTML = `
        <h2>${pokemonData.name}</h2>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>Altura: ${pokemonData.height} metros</p>
        <p>Peso: ${pokemonData.weight} kilogramos</p>
        <p>Tipo(s): ${pokemonData.types.map(type => type.type.name).join(", ")}</p>  
    `;
    cardContainer.appendChild(card);
};
