// Define a Dropdown class to manage dropdown menus in a user interface.
class Dropdown {
    // The constructor accepts two arguments: dropdownType and recipesData.
    constructor(dropdownType, recipesData) {
        // Store the type of dropdown (e.g., 'ingredients', 'ustensils') as an instance property.
        this.dropdownType = dropdownType;
        // Store the array of recipe data objects as an instance property.
        this.recipesData = recipesData;
    }

    // Define a method to get the unique items for the dropdown menu based on the type.
    getDropdownItems() {
        // Declare a variable to store the unique items.
        let items;

        // Use a switch statement to handle different dropdown types.
        switch (this.dropdownType) {
            // If the dropdown type is 'ingredients':
            case 'ingredients':
                items = this.recipesData
                    // Flatten the nested arrays of ingredients and map each ingredient object to its name in lowercase.
                    .flatMap((recipe) =>
                        recipe[this.dropdownType].map((ingredient) =>
                            ingredient.ingredient.toLowerCase()
                        )
                    )
                    // Filter the items array to keep only unique items.
                    .filter((item, index, arr) => arr.indexOf(item) === index);
                break;
            // If the dropdown type is 'appliance':
            case 'appliance':
                items = this.recipesData
                    // Flatten the nested arrays of appliances.
                    .flatMap((recipe) => recipe[this.dropdownType])
                    // Filter the items array to keep only unique items.
                    .filter((item, index, arr) => arr.indexOf(item) === index);
                break;
            // If the dropdown type is 'ustensils':
            case 'ustensils':
                items = this.recipesData
                    // Flatten the nested arrays of utensils.
                    .flatMap((recipe) => recipe[this.dropdownType])
                    // Map each utensil to its lowercase version.
                    .map((utensil) => utensil.toLowerCase())
                    // Filter the items array to keep only unique items.
                    .filter((item, index, arr) => arr.indexOf(item) === index);
                break;
            // If the dropdown type is not one of the expected values, log an error.
            default:
                console.error('Bad dropdownType');
        }

        // Return the unique items array.
        return items;
    }

    // Define a method to display the dropdown menu with the unique items.
    displayDropdownMenu(dropdownMenu) {
        // Get the unique items for the dropdown menu.
        const items = this.getDropdownItems();

        // Check if the dropdown is empty
        if (dropdownMenu.innerHTML === '') {
            // Append each unique item as a list item to the dropdown menu.
            items.forEach((item) => {
                const li = document.createElement('li');
                li.setAttribute('data-tag', item);
                li.textContent = item.toLowerCase();
                dropdownMenu.appendChild(li);
            });
        }
    }

    // Define a method to update the dropdown menu with filtered items based on the input value.
    updateDropdownMenuWithInputValue(dropdownMenu, inputValue) {
        // Get the unique items for the dropdown menu and filter them based on the input value.
        const items = this.getDropdownItems().filter((item) =>
            item.toLowerCase().includes(inputValue.toLowerCase())
        );

        // Clear the existing content of the dropdown menu.
        dropdownMenu.innerHTML = '';

        // Append each filtered item as a list item to the dropdown menu.
        items.forEach((item) => {
            const li = document.createElement('li');
            li.setAttribute('data-tag', item);
            li.textContent = item.toLowerCase();
            dropdownMenu.appendChild(li);
        });
    }

    // Method to update the dropdown menu with the matched items
    displayUpdatedDropdownMenu(dropdownType, items) {
        // Get the dropdown menu with the specified dropdownType
        const dropdownMenu = document.querySelector(
            `.dropdown-menu.${dropdownType}`
        );

        // Clear the existing items in the dropdown menu
        dropdownMenu.innerHTML = '';

        // Add new items to the dropdown menu
        items.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = item;
            listItem.setAttribute('data-tag', item);
            dropdownMenu.appendChild(listItem);
        });
    }

    updateDropdownsWithFilteredRecipes(filteredRecipes) {
        // Get the unique ingredients, appliances, and utensils from the filtered recipes
        let ingredients = [];
        let appliances = [];
        let ustensils = [];

        filteredRecipes.forEach((recipe) => {
            // Ingredients
            recipe.ingredients.forEach((ingredient) => {
                if (
                    !ingredients.includes(ingredient.ingredient.toLowerCase())
                ) {
                    ingredients.push(ingredient.ingredient.toLowerCase());
                }
            });
            // Appliances
            if (!appliances.includes(recipe.appliance.toLowerCase())) {
                appliances.push(recipe.appliance.toLowerCase());
            }
            // Ustensils
            recipe.ustensils.forEach((ustensil) => {
                if (!ustensils.includes(ustensil.toLowerCase())) {
                    ustensils.push(ustensil.toLowerCase());
                }
            });
        });

        // Update the dropdown menus with the unique items
        this.displayUpdatedDropdownMenu('ingredients', ingredients);
        this.displayUpdatedDropdownMenu('appliance', appliances);
        this.displayUpdatedDropdownMenu('ustensils', ustensils);
    }
}
