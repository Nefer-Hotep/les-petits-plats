class Controller {
    async dropdownDisplay() {
        const recipesModel = new RecipesModel();
        const eventListeners = new EventListener();

        const recipesData = await recipesModel.getRecipes();

        eventListeners.addGlobalEventListener(
            'click',
            '[data-dropdown-input]',
            (e) => {
                let currentDropdown = e.target.closest('[data-dropdown]');
                currentDropdown.classList.toggle('active');

                const dropdownType = e.target.dataset.dropdownType;
                const dropdown = new Dropdown(dropdownType, recipesData);

                const dropdownMenu =
                    currentDropdown.querySelector('.dropdown-menu');
                dropdown.updateDropdownMenu(dropdownMenu);
            }
        );

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

        eventListeners.addGlobalEventListener('click', '*', (e) => {
            if (e.target.matches('[data-dropdown-input]')) return;

            let currentDropdown = e.target.closest('[data-dropdown]');
            if (currentDropdown) return;

            document
                .querySelectorAll('[data-dropdown].active')
                .forEach((dropdown) => {
                    dropdown.classList.remove('active');
                });
        });
    }

    async recipesDiplay() {
        let recipesModel = new RecipesModel();
        let recipesData = await recipesModel.getRecipes();

        let recipesView = new CardsView();
        recipesView.renderCard(recipesData);
    }
}
