// Controller : lie l'utilisateur et le system, il gère les interactions

class Controller {
    // Gère l'affichage des menu dropdown
    dropdownDisplay() {
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

    // Affiche des données reçu de toutes les recettes collectées dnas le model
    async recipeDisplay() {
        let model = new Model();
        let recipes = await model.getAllRecipes();

        let recipeView = new RecipesViews()
        recipeView.render(recipes)
    }
}
