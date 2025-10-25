document.addEventListener('DOMContentLoaded', () => {
    const advancedContent = document.getElementById('advanced-filters-content');
    const toggleButton = document.getElementById('toggle-filters-btn');

    if (toggleButton && advancedContent) {

        advancedContent.style.maxHeight = '0px';
        advancedContent.style.overflow = 'hidden';

        function updateButtonText(isExpanded) {
            const icon = toggleButton.querySelector('img');
            const newText = isExpanded ? 'Ocultar Filtros' : 'Filtros Avanzados';

            toggleButton.innerHTML = '';
            if (icon) {
                toggleButton.appendChild(icon.cloneNode(true));
            }
            toggleButton.appendChild(document.createTextNode(newText));
        }

        updateButtonText(false);

        toggleButton.addEventListener('click', function () {
            const isCollapsing = advancedContent.style.maxHeight !== '0px';

            if (isCollapsing) {
                advancedContent.style.maxHeight = `${advancedContent.scrollHeight}px`;

                window.getComputedStyle(advancedContent).maxHeight;

                advancedContent.style.maxHeight = '0px';

                updateButtonText(false);

            } else {
                advancedContent.style.maxHeight = `${advancedContent.scrollHeight}px`;

                advancedContent.addEventListener('transitionend', function handler() {
                    if (advancedContent.style.maxHeight !== '0px') {
                        advancedContent.style.maxHeight = 'none';
                    }
                    advancedContent.removeEventListener('transitionend', handler);
                }, { once: true });

                updateButtonText(true);
            }
        });
    }
});