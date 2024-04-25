// Array to store recipes data
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

// Pagination variables
let currentPage = 1;
const recipesPerPage = 5; // Number of recipes to display per page

// Function to render recipes on the page
function renderRecipes() {
    const recipeList = document.getElementById('recipes');
    recipeList.innerHTML = ''; // Clear the existing list

    const searchQuery = document.getElementById('searchInput').value.toLowerCase();

    // Filter recipes based on search query
    const filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(searchQuery) || recipe.ingredients.toLowerCase().includes(searchQuery));

    // Calculate total pages
    const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

    // Update pagination controls
    document.getElementById('totalPages').textContent = totalPages;
    document.getElementById('currentPage').textContent = currentPage;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;

    // Calculate the starting index for the current page
    const startIndex = (currentPage - 1) * recipesPerPage;

    // Calculate the ending index for the current page
    const endIndex = startIndex + recipesPerPage;

    // Render the recipes for the current page
    filteredRecipes.slice(startIndex, endIndex).forEach((recipe, index) => {
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

        // Edit and delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editRecipe(startIndex + index));
        recipeItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteRecipe(startIndex + index));
        recipeItem.appendChild(deleteButton);

        recipeList.appendChild(recipeItem);
    });
}

// Function to add a new recipe
function addRecipe(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    const image = document.getElementById('image').files[0];

    const reader = new FileReader();
    reader.onload = function() {
        const recipe = {
            title,
            ingredients,
            instructions,
            image: reader.result
        };

        // Add the new recipe to the data structure
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Reset the form
        document.getElementById('recipeForm').reset();

        // Render the recipes list
        renderRecipes();
    };

    if (image) {
        reader.readAsDataURL(image);
    } else {
        const recipe = {
            title,
            ingredients,
            instructions,
            image: null
        };

        // Add the new recipe to the data structure
        recipes.push(recipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));

        // Reset the form
        document.getElementById('recipeForm').reset();

        // Render the recipes list
        renderRecipes();
    }
}

// Function to edit a recipe
function editRecipe(index) {
    const recipe = recipes[index];

    // Fill the form with recipe data
    document.getElementById('title').value = recipe.title;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('instructions').value = recipe.instructions;

    // Remove the recipe from the array
    recipes.splice(index, 1);

    // Save the updated recipes array
    localStorage.setItem('recipes', JSON.stringify(recipes));
    renderRecipes();
}

// Function to delete a recipe
function deleteRecipe(index) {
    // Remove the recipe from the array
    recipes.splice(index, 1);

    // Save the updated recipes array
    localStorage.setItem('recipes', JSON.stringify(recipes));
    renderRecipes();
}

// Function to handle search input
function handleSearch() {
    currentPage = 1; // Reset to the first page when searching
    renderRecipes();
}

// Event listener for form submission
document.getElementById('recipeForm').addEventListener('submit', addRecipe);

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', handleSearch);

// Event listeners for pagination controls
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderRecipes();
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    const totalPages = parseInt(document.getElementById('totalPages').textContent, 10);
    if (currentPage < totalPages) {
        currentPage++;
        renderRecipes();
    }
});

// Render recipes when the page loads
window.addEventListener('DOMContentLoaded', renderRecipes);
