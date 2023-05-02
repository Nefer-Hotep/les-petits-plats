class RecipeSearch {
    constructor(cardData) {
        // Initialize the card data array
        this.cardData = cardData;
        // Initialize the filters object with empty arrays for each filter type
        this.filters = {
            ingredients: [],
            utensils: [],
            devices: [],
        };
        // Initialize the search functionality
        this.initSearch();
        // Initialize the dropdown inputs
        this.initDropdowns();
    }

    // Initialize the search input event listener
    initSearch() {
        let event = new EventListener();
        event.addGlobalEventListener('input', '[data-search]', (e) => {
            const value = e.target.value.toLowerCase();
            // Check the length of the search value
            if (value.length > 3) {
                this.searchAndFilterCards(value);
            } else if (value.length < 3) {
                // Display all the recipes when the search value is empty
                this.searchAndFilterCards('');
            }
        });
    }

    // Initialize the dropdown inputs event listeners
    initDropdowns() {
        // Select all dropdown inputs with a "data-dropdown-input" attribute
        const dropdownInputs = document.querySelectorAll(
            '[data-dropdown-input]'
        );
        // Add an "input" event listener to each dropdown input
        dropdownInputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                // Get the filter type (ingredients, utensils, devices) from the data-dropdown-type attribute
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
        // Iterate over each recipe in the cardData array
        this.cardData.forEach((recipe) => {
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

            // Determine if the recipe should be visible based on the search value and ingredient filters
            const isVisible = matchesSearch && matchesIngredientsFilter;

            // Toggle the "hide" class on the recipe element based on its visibility
            recipe.element.classList.toggle('hide', !isVisible);
        });
    }

    // Method to update filters
    updateFilters(tagValue) {
        // You can choose the filter type based on the tagValue or any other criteria
        const filterType = 'utensils'; // or "utensils" or "devices"
        // Add the tagValue to the filters array for the specified filter type
        this.filters[filterType].push(tagValue.toLowerCase());
        // Re-filter the cards based on the updated filters
        this.searchAndFilterCards('');
    }

    // Method to remove a filter
    removeFilter(tagValue) {
        // Specify the type of filter to remove (e.g., "ingredients", "utensils", or "devices")
        const filterType = 'ingredients'; // or "utensils" or "devices"
        // Create a new array that includes all the filters except the one with the tagValue value
        this.filters[filterType] = this.filters[filterType].filter(
            (filter) => filter !== tagValue.toLowerCase()
        );
        // Re-filter the cards based on the updated filters
        this.searchAndFilterCards('');
    }
}
