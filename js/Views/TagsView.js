class TagsView {
    renderTag(currentTags, dropdownType) {
        const tagContainer = document.querySelector('[data-container-tag]');
        const tagTemplate = document.querySelector('[data-template-tag]');

        const tag = tagTemplate.content.cloneNode(true);
        const tagBox = tag.querySelector('.tag-box');
        tagBox.setAttribute('class', 'tag-box' + ' ' + dropdownType);

        const dataType = tag.querySelector('[data-close-tag]');
        dataType.setAttribute('data-dropdown-type', dropdownType);

        const selectTag = tag.querySelector('[data-selected-tag]');
        selectTag.setAttribute('data-type', currentTags);
        selectTag.textContent = currentTags;
        tagContainer.append(tag);
    }
}
