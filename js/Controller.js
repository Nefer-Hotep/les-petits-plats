// The Controller class is responsible for coordinating the different components of my application
class Controller {
    constructor() {
        this.recipeSearch = null; // Initializes the RecipeSearch instance to null
    }

    // Handles the display and interactions of tags
    tagDisplay() {
        const eventListeners = new EventListener();
        const tagsView = new TagsView();

        // Add an event listener to create a tag when an item in the dropdown menu is clicked
        eventListeners.addGlobalEventListener('click', '[data-tag]', (e) => {
            let currentTag = e.target.dataset.tag;
            tagsView.renderTag(currentTag); // Render the tag on the page
            // Update filters in the RecipeSearch class
            this.recipeSearch.updateFilters(currentTag);
        });

        // Add an event listener to remove a tag when the close button on a tag is clicked
        eventListeners.addGlobalEventListener(
            'click',
            '[data-close-tag]',
            (e) => {
                let tagElement = e.target.closest('.tag-box');
                let tagName = tagElement
                    .querySelector('[data-selected-tag]')
                    .textContent.trim();
                tagElement.remove(); // Remove the tag from the view
                // Remove the filter from the RecipeSearch class
                this.recipeSearch.removeFilter(tagName);
            }
        );
    }

    // Handles the display and interactions of the dropdown menus
    async dropdownDisplay() {
        const recipesModel = new RecipesModel();
        const eventListeners = new EventListener();

        const recipesData = await recipesModel.getRecipes(); // Fetch the recipes data

        // Add an event listener to toggle the visibility of the dropdown menu when the input is clicked
        eventListeners.addGlobalEventListener(
            'click',
            '[data-dropdown-input]',
            (e) => {
                let currentDropdown = e.target.closest('[data-dropdown]');
                currentDropdown.classList.toggle('active'); // Toggle the 'active' class on the dropdown menu

                const dropdownType = e.target.dataset.dropdownType;
                const dropdown = new Dropdown(dropdownType, recipesData);

                const dropdownMenu =
                    currentDropdown.querySelector('.dropdown-menu');
                dropdown.updateDropdownMenu(dropdownMenu); // Update the contents of the dropdown menu
            }
        );

        // Add an event listener to filter the items in the dropdown menu when the input changes
        eventListeners.addGlobalEventListener(
            'input',
            '[data-dropdown-input]',
            (e) => {
                const input = e.target;
                const filterValue = input.value;
                const currentDropdown = input.closest('[data-dropdown]');

                const dropdownType = input.dataset.dropdownType;
                const dropdown = new Dropdown(dropdownType, recipesData);

                const dropdownMenu =
                    currentDropdown.querySelector('.dropdown-menu');
                dropdown.updateDropdownMenuWithFilter(
                    dropdownMenu,
                    filterValue
                );
            }
        );

        // Add an event listener to close all active dropdown menus when a click occurs outside the menus
        eventListeners.addGlobalEventListener('click', '*', (e) => {
            if (
                e.target.matches('[data-dropdown-input]') ||
                e.target.matches('[data-search]')
            )
                return;

            let currentDropdown = e.target.closest('[data-dropdown]');
            if (currentDropdown) return;

            document
                .querySelectorAll('[data-dropdown].active')
                .forEach((dropdown) => {
                    dropdown.classList.remove('active');
                });
        });
    }

    // Fetches the recipes data and displays the recipe cards on the page
    async recipesDisplay() {
        let recipesModel = new RecipesModel();
        let recipesData = await recipesModel.getRecipes();

        let recipesView = new CardsView();
        // Render the cards and store the cardData
        const cardData = recipesView.renderCard(recipesData);

        // Initialize the RecipeSearch class
        this.recipeSearch = new RecipeSearch(cardData);
    }
}
