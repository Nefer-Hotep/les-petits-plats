// The Controller class is responsible for coordinating the different components of my application
class Controller {
    constructor() {
        this.recipeSearch = null; // Initializes the RecipeSearch instance to null
    }

    // Handles the display and interactions of tags
    async tagDisplay() {
        let eventListeners = new EventListener();
        let tagsView = new TagsView();
        let recipesModel = new RecipesModel();

        let recipesData = await recipesModel.getRecipes(); // Fetch the recipes data

        //
        // CREATE TAG
        // Add an event listener to create a tag when an item in the dropdown menu is clicked
        eventListeners.addGlobalEventListener('click', '[data-tag]', (e) => {
            const currentTag = e.target.dataset.tag;

            const currentDropdown = e.target.closest('[data-dropdown]');
            const dropdownMenu =
                currentDropdown.querySelector('.dropdown-menu');
            const dropdownType = currentDropdown.querySelector(
                '[data-dropdown-type]'
            ).dataset.dropdownType;

            // Update filters in the RecipeSearch class
            this.recipeSearch.updateFilters(currentTag, dropdownType);

            // Update filters in the Dropdown class
            // const dropdown = new Dropdown(dropdownType, recipesData);
            // dropdown.updateDropdownMenuWithInputValue(dropdownMenu, currentTag);

            tagsView.renderTag(currentTag, dropdownType); // Render the tag on the page
        });

        //
        // REMOVE TAG
        // Add an event listener to remove a tag when the close button on a tag is clicked
        eventListeners.addGlobalEventListener(
            'click',
            '[data-close-tag]',
            (e) => {
                const tagElement = e.target.closest('.tag-box');
                const tagName = tagElement
                    .querySelector('[data-selected-tag]')
                    .textContent.trim();
                const tagType = tagElement.querySelector('[data-dropdown-type]')
                    .dataset.dropdownType;

                tagElement.remove(); // Remove the tag from the view
                // Remove the filter from the RecipeSearch class
                this.recipeSearch.removeFilter(tagName, tagType);
            }
        );
    }

    // Handles the display and interactions of the dropdown menus
    async dropdownDisplay() {
        const recipesModel = new RecipesModel();
        const eventListeners = new EventListener();

        const recipesData = await recipesModel.getRecipes(); // Fetch the recipes data

        //
        // OPEN DROPDOWN
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
                dropdown.displayDropdownMenu(dropdownMenu); // Update the contents of the dropdown menu
            }
        );

        //
        // FILTER MENU ON DROPDOWN INPUT CHANGE
        // Add an event listener to filter the items in the dropdown menu when the input changes
        eventListeners.addGlobalEventListener(
            'input',
            '[data-dropdown-input]',
            (e) => {
                const input = e.target;
                const currentDropdown = input.closest('[data-dropdown]');

                const dropdownType = input.dataset.dropdownType;
                const dropdown = new Dropdown(dropdownType, recipesData);

                const dropdownMenu =
                    currentDropdown.querySelector('.dropdown-menu');
                dropdown.updateDropdownMenuWithInputValue(
                    dropdownMenu,
                    input.value
                );
            }
        );

        //
        // CLOSE DROPDOWN
        // Add an event listener to close all active dropdown menus when a click occurs outside the menus
        eventListeners.addGlobalEventListener('click', '*', (e) => {
            if (
                e.target.matches('[data-dropdown-input]') ||
                e.target.matches('[data-search]')
            )
                return;

            const currentDropdown = e.target.closest('[data-dropdown]');
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
