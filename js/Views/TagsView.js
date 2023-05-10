class TagsView {
    // Method to render a tag if the currentTags value doesn't already exist in the tagContainer
    renderTag(currentTags, dropdownType) {
        // Select the tag container
        const tagContainer = document.querySelector('[data-container-tag]');

        // Select all existing tags within the tag container
        const existingTags = tagContainer.querySelectorAll(
            '[data-selected-tag]'
        );

        // Select the tag template
        const tagTemplate = document.querySelector('[data-template-tag]');

        // Clone the tag template
        const tag = tagTemplate.content.cloneNode(true);

        // Select the selectedTag element within the cloned tag
        const selectedTag = tag.querySelector('[data-selected-tag]');

        // Select the data-close-tag element within the cloned tag
        const dataType = tag.querySelector('[data-close-tag]');

        // Select the tag-box element within the cloned tag
        const tagBox = tag.querySelector('.tag-box');

        // Set the class attribute of the tagBox element
        tagBox.setAttribute('class', 'tag-box' + ' ' + dropdownType);

        // Set the data-dropdown-type attribute of the dataType element
        dataType.setAttribute('data-dropdown-type', dropdownType);

        // Set the text content and the data-selected-tag attribute of the selectedTag element
        selectedTag.textContent = currentTags;
        selectedTag.dataset.selectedTag = currentTags;

        // Initialize a flag to track whether the currentTags value already exists in the tagContainer
        let tagExists = false;

        // Iterate through the existingTags array
        for (const existingTag of existingTags) {
            // Check if the data-selected-tag attribute of the existingTag matches the currentTags value
            if (existingTag.dataset.selectedTag === currentTags) {
                // If a match is found, set tagExists to true and break the loop
                tagExists = true;
                break;
            }
        }

        // If the currentTags value doesn't already exist, append the new tag to the tagContainer
        if (!tagExists) {
            tagContainer.append(tag);
        } else {
            // If the currentTags value already exists, log a message to the console
            console.log('The tag with the same value already exists.');
        }
    }
}
