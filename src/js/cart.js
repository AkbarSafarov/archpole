document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.service-section .form-check-input[type="checkbox"]').forEach(function(toggle) {
        const section = toggle.closest('.service-section');
        if (!section) return;

        section.classList.toggle('is-active', toggle.checked);

        toggle.addEventListener('change', function() {
            section.classList.toggle('is-active', this.checked);

            const collapseId = section.querySelector('.section-header').dataset.bsTarget;
            if (collapseId) {
                const collapseEl = document.querySelector(collapseId);
                if (collapseEl) {
                    const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseEl, { toggle: false });
                    this.checked ? bsCollapse.show() : bsCollapse.hide();
                }
            }
        });
    });

    document.querySelectorAll('.tooltip-item').forEach(function(item) {
        const content = item.dataset.tooltip;
        if (content) {
            tippy(item, { theme: 'light', allowHTML: true, content, placement: 'top', arrow: true });
        }
    });

});
