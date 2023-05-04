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
        let items;

        // If the dropdown type is 'ingredients', extract unique ingredient names.
        if (this.dropdownType === 'ingredients') {
            items = this.recipesData
                .flatMap((recipe) =>
                    // Map each ingredient object to its name.
                    recipe[this.dropdownType].map(
                        (ingredient) => ingredient.ingredient
                    )
                )
                // Filter the items array to keep only unique items.
                .filter((item, index, arr) => arr.indexOf(item) === index);
        } else {
            // If the dropdown type is not 'ingredients', extract unique items directly.
            items = this.recipesData
                .flatMap((recipe) => recipe[this.dropdownType])
                // Filter the items array to keep only unique items.
                .filter((item, index, arr) => arr.indexOf(item) === index);
        }

        // Return the unique items array.
        return items;
    }

    // Define a method to display the dropdown menu with the unique items.
    displayDropdownMenu(dropdownMenu) {
        // Get the unique items for the dropdown menu.
        const items = this.getDropdownItems();
        // Clear the existing content of the dropdown menu.
        dropdownMenu.innerHTML = '';

        // Append each unique item as a list item to the dropdown menu.
        items.forEach((item) => {
            const li = document.createElement('li');
            li.setAttribute('data-tag', item);
            li.textContent = item;
            dropdownMenu.appendChild(li);
        });
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
            li.textContent = item;
            dropdownMenu.appendChild(li);
        });
    }
}
