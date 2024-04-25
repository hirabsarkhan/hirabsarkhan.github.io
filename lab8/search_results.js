// Retrieve the search query from the URL
const queryParams = new URLSearchParams(window.location.search);
const searchQuery = queryParams.get('query').toLowerCase();

// Fetch the recipes data from LocalStorage
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Function to render search results
function renderSearchResults() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear the existing results

    // Filter recipes based on search query
    const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchQuery) || recipe.ingredients.toLowerCase().includes(searchQuery));

    // Display filtered recipes
    filteredRecipes.forEach((recipe) => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');

        // Recipe title
        const title = document.createElement('h3');
        title.textContent = recipe.title;
        recipeItem.appendChild(title);

        // Recipe ingredients
        const ingredients = document.createElement('p');
        ingredients.textContent = `Ingredients: ${recipe.ingredients}`;
        recipeItem.appendChild(ingredients);

        // Recipe instructions
        const instructions = document.createElement('p');
        instructions.textContent = `Instructions: ${recipe.instructions}`;
        recipeItem.appendChild(instructions);

        // Recipe image
        if (recipe.image) {
            const image = document.createElement('img');
            image.src = recipe.image;
            image.alt = recipe.title;
            recipeItem.appendChild(image);
        }

        resultsContainer.appendChild(recipeItem);
    });
}

// Render search results when the page loads
window.addEventListener('DOMContentLoaded', renderSearchResults);
