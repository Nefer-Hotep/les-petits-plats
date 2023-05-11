class RecipeSearch {
    constructor(cardData) {
        // Initialize the card data array
        this.cardData = cardData;
        // Initialize the filters object with empty arrays for each filter type
        this.filters = {
            ingredients: [],
            ustensils: [],
            appliance: [],
        };
        this.initSearch();
        this.initDropdownsSearchCards();
    }

    // Initialize the search input event listener
    initSearch() {
        let event = new EventListener();
        event.addGlobalEventListener('input', '[data-search]', (e) => {
            const value = e.target.value.toLowerCase();
            // Check the length of the search value
            if (value.length > 2) {
                this.searchAndFilterCards(value);
            } else if (value.length < 2) {
                // Display all the recipes when the search value is empty
                this.searchAndFilterCards('');
            }
        });
    }

    // Initialize the dropdown inputs event listeners
    initDropdownsSearchCards() {
        // Select all dropdown inputs with a "data-dropdown-input" attribute
        const dropdownInputs = document.querySelectorAll(
            '[data-dropdown-input]'
        );
        // Add an "input" event listener to each dropdown input
        dropdownInputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                // Get the filter type (ingredients, ustensils, appliance) from the data-dropdown-type attribute
                const type = e.target.dataset.dropdownType;
                // Get the filter value from the input value and convert it to lowercase
                const value = e.target.value.toLowerCase();
                // Update the filters object with the new filter value for the specified filter type
                this.filters[type] = [value];
                // Re-filter the cards based on the updated filters
                this.searchAndFilterCards('');
            });
        });
    }

    searchAndFilterCards(searchValue) {
        const dropdown = new Dropdown();
        // Create an array to store the filtered recipes
        const filteredRecipes = [];

        // Iterate over each recipe in the cardData array
        for (let i = 0; i < this.cardData.length; i++) {
            
            // Declare a recipe object
            const recipe = this.cardData[i];
            
            // Check if the recipe matches the search value
            const matchesSearch =
                recipe.name.toLowerCase().includes(searchValue) || // Check if the recipe name includes the search value
                recipe.description.toLowerCase().includes(searchValue) || // Check if the recipe description includes the search value
                recipe.ingredients.some(
                    (
                        item // Check if any ingredient in the recipe includes the search value
                    ) => item.ingredient.toLowerCase().includes(searchValue)
                );

            // Check if the recipe matches all the ingredient filters
            const matchesIngredientsFilter = this.filters.ingredients.every(
                (ingredient) =>
                    recipe.ingredients.some((item) =>
                        item.ingredient
                            .toLowerCase()
                            .includes(ingredient.toLowerCase())
                    )
            );
            // Check if the recipe matches all the appliance filters
            const matchesApplianceFilter = this.filters.appliance.every(
                (appliance) =>
                    recipe.appliance
                        .toLowerCase()
                        .includes(appliance.toLowerCase())
            );

            // Check if the recipe matches all the ustensils filters
            const matchesUstensilsFilter = this.filters.ustensils.every(
                (ustensil) =>
                    recipe.ustensils.some((item) =>
                        item.toLowerCase().includes(ustensil.toLowerCase())
                    )
            );

            // Determine if the recipe should be visible based on the search value and filters
            const isVisible =
                matchesSearch &&
                matchesIngredientsFilter &&
                matchesApplianceFilter &&
                matchesUstensilsFilter;

            // If the recipe is visible, add it to the filteredRecipes array
            if (isVisible) {
                filteredRecipes.push(recipe);
            }

            // Toggle the "hide" class on the recipe element based on its visibility
            recipe.element.classList.toggle('hide', !isVisible);
        }
        // Update the dropdown menu with the filtered recipes
        dropdown.updateDropdownsWithFilteredRecipes(filteredRecipes);

        this.initDisplayError();
    }

    initDisplayError() {
        // Display an error message if no cards are visible
        const errorTemplate = document.querySelector('[data-template-error]');
        const cardContainer = document.querySelector(
            '[data-recipe-card-container]'
        );
        // Check if an error message is already displayed
        const errorMessage = cardContainer.querySelector(
            '[data-error-message]'
        );

        // Count the number of elements in the object
        let hiddenCards = document.getElementsByClassName('hide').length;

        if (hiddenCards === this.cardData.length) {
            // If there is no error message, create and display one
            if (!errorMessage) {
                const newErrorMessage = errorTemplate.content.cloneNode(true);
                newErrorMessage.querySelector('[data-error-message]');
                cardContainer.append(newErrorMessage);
            }
        } else {
            if (errorMessage) {
                // If there is an error message, remove it
                errorMessage.remove();
            }
        }
    }

    // Method to update filters
    updateFilters(tagValue, dropdownType) {
        // Specify the type of filter to remove (e.g., "ingredients", "ustensils", or "appliance")
        // Add the tagValue to the filters array for the specified filter type
        this.filters[dropdownType].push(tagValue.toLowerCase());
        // Re-filter the cards based on the updated filters
        this.searchAndFilterCards('');
    }

    // Method to remove a filter
    removeFilter(tagValue, dropdownType) {
        // Specify the type of filter to remove (e.g., "ingredients", "ustensils", or "appliance")
        // Create a new array that includes all the filters except the one with the tagValue value
        this.filters[dropdownType] = this.filters[dropdownType].filter(
            (filter) => filter !== tagValue.toLowerCase()
        );
        // Re-filter the cards based on the updated filters
        this.searchAndFilterCards('');
    }
}
