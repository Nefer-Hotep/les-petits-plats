class TagsView {
    renderTag(currentTags) {
        const tagContainer = document.querySelector('[data-container-tag]');
        const tagTemplate = document.querySelector('[data-template-tag]');

        const tag = tagTemplate.content.cloneNode(true);

        const selectTag = tag.querySelector('[data-selected-tag]');
        selectTag.textContent = currentTags;
        tagContainer.append(tag);
    }
}
