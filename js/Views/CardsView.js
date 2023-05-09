class CardsView {
    // Method to render cards based on the recipes data
    renderCard(recipesData) {
        // Select necessary DOM elements
        const recipeCardTemplate = document.querySelector(
            '[data-recipe-template]'
        );
        const listTemplate = document.querySelector('[data-list-template]');
        const recipeCardContainer = document.querySelector(
            '[data-recipe-card-container]'
        );

        // Map each recipe data to a card element and return an array with card data
        const cardData = recipesData.map((recipe) => {
            // Clone the card template
            const card = recipeCardTemplate.content.cloneNode(true).children[0];

            // Select card elements
            const name = card.querySelector('[data-name]');
            const time = card.querySelector('[data-time]');
            const description = card.querySelector('[data-description]');
            const ingredientContainer = card.querySelector(
                '[data-list-container]'
            );

            // Display ingredients inside the card
            recipe.ingredients.forEach((ingredient) => {
                // Clone the list template
                const list = listTemplate.content.cloneNode(true);
                const ingredientElement =
                    list.querySelector('[data-ingredient]');

                // Set ingredient text
                ingredientElement.textContent =
                    ingredient.ingredient +
                    (!!ingredient.quantity ? ' : ' : ' ');

                // Add quantity and unit, if available
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

                // Append the ingredient element to the ingredient container
                ingredientContainer.append(ingredientElement);
            });

            // Set card content
            name.textContent = recipe.name;
            time.textContent = recipe.time + ' min';
            description.textContent = recipe.description;

            // Append the card to the recipe card container
            recipeCardContainer.append(card);

            // Return an object containing recipe data and the card element
            return {
                name: recipe.name,
                ingredients: recipe.ingredients,
                description: recipe.description,
                appliance: recipe.appliance,
                ustensils: recipe.ustensils,
                element: card,
            };
        });

        return cardData;
    }
}
