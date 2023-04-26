class Dropdown {
    constructor(dropdownType, recipesData) {
        this.dropdownType = dropdownType;
        this.recipesData = recipesData;
    }

    getDropdownItems() {
        let items;

        if (this.dropdownType === 'ingredients') {
            items = this.recipesData
                .flatMap((recipe) =>
                    recipe[this.dropdownType].map(
                        (ingredient) => ingredient.ingredient
                    )
                )
                .filter((item, index, arr) => arr.indexOf(item) === index);
        } else {
            items = this.recipesData
                .flatMap((recipe) => recipe[this.dropdownType])
                .filter((item, index, arr) => arr.indexOf(item) === index);
        }

        return items;
    }

    updateDropdownMenu(dropdownMenu) {
        const items = this.getDropdownItems();
        dropdownMenu.innerHTML = '';

        items.forEach((item) => {
            const li = document.createElement('li');
            li.setAttribute('data-type', item)
            li.textContent = item;
            dropdownMenu.appendChild(li);
        });
    }

    updateDropdownMenuWithFilter(dropdownMenu, filterValue) {
        const items = this.getDropdownItems().filter((item) =>
            item.toLowerCase().includes(filterValue.toLowerCase())
        );
        dropdownMenu.innerHTML = '';

        items.forEach((item) => {
            const li = document.createElement('li');
            li.setAttribute('data-type', item);
            li.textContent = item;
            dropdownMenu.appendChild(li);
        });
    }
}
