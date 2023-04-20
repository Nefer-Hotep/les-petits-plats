// Gère l'affichage des menu dropdown
document.addEventListener('click', (e) => {
    const isDropdownInput = e.target.matches('[data-dropdown-input]');

    if (!isDropdownInput && e.target.closest('[data-dropdown]') != null) return;

    let currentDropdown;
    if (isDropdownInput) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    }

    document.querySelectorAll('[data-dropdown].active').forEach((dropdown) => {
        if (dropdown === currentDropdown) return;
        dropdown.classList.remove('active');
    });
});

const recipeCardTemplate = document.querySelector('[data-recipe-template]');
const listTemplate = document.querySelector('[data-list-template]');
const recipeCardContainer = document.querySelector(
    '[data-recipe-card-container]'
);

let recipes = [];

fetch('../data/recipes.js')
    .then((res) => res.json())
    .then((data) => {
        recipes = data.map((recipe) => {
            const card = recipeCardTemplate.content.cloneNode(true).children[0];
            const name = card.querySelector('[data-name]');
            const time = card.querySelector('[data-time]');
            const description = card.querySelector('[data-description]');
            const ingredientContainer = card.querySelector(
                '[data-list-container]'
            );

            // Display ingredients inside the card
            recipe.ingredients.forEach((ingredient) => {
                const list = listTemplate.content.cloneNode(true);
                const ingredientElement =
                    list.querySelector('[data-ingredient]');
                // const quantityElement = list.querySelector('[data-quantity]');
                ingredientElement.textContent =
                    ingredient.ingredient +
                    (!!ingredient.quantity ? ' : ' : ' ');
                // quantityElement.textContent = ingredient.quantity;

                if (ingredient.quantity) {
                    const quantityElement = document.createElement('span');
                    quantityElement.setAttribute(
                        'class',
                        'card__recipe-list-quantity'
                    );
                    quantityElement.textContent =
                        ingredient.quantity +
                        ' ' +
                        (!!ingredient.unit ? ingredient.unit : '');
                    ingredientElement.appendChild(quantityElement);
                }

                // console.log(ingredientElement);
                ingredientContainer.append(ingredientElement);
            });

            name.textContent = recipe.name;
            time.textContent = recipe.time + ' min';
            description.textContent = recipe.description;

            recipeCardContainer.append(card);

            return {
                name: recipe.name,
                ingredients: recipe.ingredients,
                element: card,
            };
        });
    })
    .catch((err) => console.error('an error occurs ' + err));

const searchInput = document.querySelector('[data-search]');

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();

    // if (value.length > 3) {
    recipes.forEach((recipe) => {
        const isVisible =
            recipe.name.toLowerCase().includes(value) ||
            recipe.ingredients.filter((obj) =>
           { console.log(obj)
                obj.ingredient.toLowerCase().includes(value)}
            );

        recipe.element.classList.toggle('hide', !isVisible);
    });
    // } else {
    //     recipes.forEach((recipe) => {
    //         const isVisible =
    //             recipe.name.toLowerCase().includes(value) ||
    //             recipe.ingredients.some((obj) => {
    //                 console.log("else");
    //                 obj.ingredient.toLowerCase().includes(value);
    //             });

    //         recipe.element.classList.toggle('hide', !isVisible);
    //     });
    // }
});
