class Model {
    // Récupère les données de l'API
    async getAllRecipes() {
        return fetch('../data/recipes.js')
            .then((res) => res.json())
            .then((data) => {
                return data;
            })
            .catch((err) => console.log('an error occurs' + err));
        }

}
