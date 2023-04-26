// View : Créer la représentation visuel des cards

class CardsView {
    renderCard(recipesData) {
        const recipeCardTemplate = document.querySelector(
            '[data-recipe-template]'
        );
        const listTemplate = document.querySelector('[data-list-template]');
        const recipeCardContainer = document.querySelector(
            '[data-recipe-card-container]'
        );

        const cardData = recipesData.map((recipe) => {
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

                ingredientElement.textContent =
                    ingredient.ingredient +
                    (!!ingredient.quantity ? ' : ' : ' ');

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

                ingredientContainer.append(ingredientElement);
            });

            name.textContent = recipe.name;
            time.textContent = recipe.time + ' min';
            description.textContent = recipe.description;

            recipeCardContainer.append(card);

            return {
                name: recipe.name,
                ingredients: recipe.ingredients,
                description: recipe.description,
                element: card,
            };
        });

        //
        // SEARCH BAR
        //
        const searchInput = document.querySelector('[data-search]');

        searchInput.addEventListener('input', (e) => {
            const value = e.target.value.toLowerCase();

            cardData.forEach((recipe) => {
                // Check the recipe array return a boolean
                const isVisible =
                    recipe.name.toLowerCase().includes(value) ||
                    recipe.description.toLowerCase().includes(value) ||
                    recipe.ingredients.some((item) =>
                        item.ingredient.toLowerCase().includes(value)
                    );

                // Add or remove 'hide' from the element: card in the array
                recipe.element.classList.toggle('hide', !isVisible);
            });
        });
    }
}
