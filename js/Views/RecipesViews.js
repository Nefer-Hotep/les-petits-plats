class RecipesViews {
    render(recipes) {
        for (let i = 0; i < recipes.length; i++) {
            let recipesView = document.querySelector('.grid');
            recipesView.innerHTML += `
            <div class="card">
                <div class="card__image">
                    <img src="" alt="" />
                </div>
                <div class="card__content">
                    <div class="card__header">
                        <h2>${recipes[i].name}</h2>
                        <div class="card__timer">
                            <img src="./assets/time.svg" alt="" />
                            <span>${recipes[i].time} min</span>
                        </div>
                    </div>
                    <div class="card__text">
                        <ul class="card__recipe-list">
                              ${recipes[i].ingredients
                                  .map(
                                      (ingredient) => `
                                <li>
                                    <span class="card__recipe-list-name">
                                    ${ingredient.ingredient}
                                    </span>
                                    ${
                                        !!ingredient.quantity
                                            ? ' :' + ' ' + ingredient.quantity
                                            : ''
                                    }  
                                    ${!!ingredient.unit ? ingredient.unit : ''} 
                                </li>
                            `
                                  )
                                  .join('')}
                        </ul>
                        <p class="card__recipe-instruction">
                                    ${recipes[i].description}
                        </p>
                    </div>
                </div>
        `;
        }
    }
}
