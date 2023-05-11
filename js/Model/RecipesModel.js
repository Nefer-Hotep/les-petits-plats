// Model : gère les données d'une application (l'ajout, la modification, la suppression...)

class RecipesModel {
    // Récupère les données de l'API
    async getRecipes() {
        return fetch('./data/recipes.js')
            .then((res) => res.json())
            .then((data) => {
                return data;
            });
    }
}
