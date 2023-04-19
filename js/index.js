// Gère l'affichage des menu dropdown
function dropdownDisplay() {
    document.addEventListener('click', (e) => {
        const isDropdownInput = e.target.matches('[data-dropdown-input]');

        if (!isDropdownInput && e.target.closest('[data-dropdown]') != null)
            return;

        let currentDropdown;
        if (isDropdownInput) {
            currentDropdown = e.target.closest('[data-dropdown]');
            currentDropdown.classList.toggle('active');
        }

        document
            .querySelectorAll('[data-dropdown].active')
            .forEach((dropdown) => {
                if (dropdown === currentDropdown) return;
                dropdown.classList.remove('active');
            });
    });
}

const recipeCardTemplate = document.querySelector('[data-recipe-template]');
const listTemplate = document.querySelector('[data-list-template]');
const recipeCardContainer = document.querySelector(
    '[data-recipe-card-container]'
);

// Récupère les données de l'API
fetch('../data/recipes.js')
    .then((res) => res.json())
    .then((data) => {
        data.forEach((recipe) => {
            const listContainer = document.querySelector(
                '[data-list-container]'
            );

            const card = recipeCardTemplate.content.cloneNode(true);
            const name = card.querySelector('[data-name]');
            const time = card.querySelector('[data-time]');
            const description = card.querySelector('[data-description]');

            recipe.ingredients.forEach((ingredient) => {
                const list = listTemplate.content.cloneNode(true);
                const ingredients = card.querySelector('[data-ingredients]');

                // listContainer.append(list);
            });

            name.textContent = recipe.name;
            time.textContent = recipe.time + ' min';
            description.textContent = recipe.description;

            recipeCardContainer.append(card);
        });
    })
    .catch((err) => console.log('an error occurs' + err));

const searchInput = document.querySelector('[data-search]');

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();

    if (value.length > 2) {
        recipes.forEach((recipe) => {
            const isVisible = recipe.name.toLowerCase().includes(value);
        });
    }
});
