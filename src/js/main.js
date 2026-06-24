document.addEventListener("DOMContentLoaded", function() {

    function updateStickerHeight() {
        const header = document.querySelector('.header');
        if (header) {
            document.documentElement.style.setProperty('--v-header-height', `${header.offsetHeight}px`);
        }
    }

    updateStickerHeight();
    window.addEventListener('resize', updateStickerHeight);

    function accordion() {
        const accordionRows = document.querySelectorAll('.accordion_row');
        if (!accordionRows.length) return;

        function closeAllAccordions() {
            accordionRows.forEach(row => row.classList.remove('opened'));
        }

        function toggleAccordion(row) {
            const isOpened = row.classList.contains('opened');
            closeAllAccordions();
            if (!isOpened) row.classList.add('opened');
        }

        accordionRows.forEach(row => {
            const btn = row.querySelector('.accordion_btn');
            if (btn) {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    toggleAccordion(row);
                });
            }

            const body = row.querySelector('.accordion_body');
            if (body) {
                body.addEventListener('click', function(e) { e.stopPropagation(); });
            }
        });

        document.addEventListener('click', function(e) {
            if (!Array.from(accordionRows).some(r => r.contains(e.target))) {
                closeAllAccordions();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeAllAccordions();
        });

        const resetButtons = document.querySelectorAll('.accordion_body_btn .btn_button.border');
        resetButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const accordionBody = this.closest('.accordion_body');
                if (!accordionBody) return;
                accordionBody.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(i => i.checked = false);
                accordionBody.querySelectorAll('.price_feild input').forEach(i => i.value = '');
                const accordionRow = accordionBody.closest('.accordion_row');
                if (accordionRow) updateCounter(accordionRow);
            });
        });

        const showButtons = document.querySelectorAll('.accordion_body_btn .btn_button.black');
        showButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const accordionRow = this.closest('.accordion_row');
                if (accordionRow) {
                    updateCounter(accordionRow);
                    accordionRow.classList.remove('opened');
                }
            });
        });

        function updateCounter(accordionRow) {
            if (!accordionRow || !accordionRow.classList.contains('add')) return;
            const count = accordionRow.querySelectorAll('input[type="checkbox"]:checked').length;
            const counter = accordionRow.querySelector('.accordion_btn .count');
            if (counter) {
                counter.textContent = count > 0 ? ` ${count}` : '';
                counter.style.display = count > 0 ? 'inline' : 'none';
            }
        }

        document.querySelectorAll('.accordion_row.add input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const row = this.closest('.accordion_row');
                if (row) updateCounter(row);
            });
        });

        accordionRows.forEach(row => { if (row.classList.contains('add')) updateCounter(row); });
    }

    function showCheckbox() {
        const MAX_VISIBLE_ITEMS = 5;
        document.querySelectorAll('.filter_field').forEach(filterField => {
            const innerField = filterField.querySelector('.inner_field');
            if (!innerField) return;
            const checkboxFields = innerField.querySelectorAll('.checkbox_field');
            if (checkboxFields.length <= MAX_VISIBLE_ITEMS) return;

            checkboxFields.forEach((checkbox, index) => {
                if (index >= MAX_VISIBLE_ITEMS) {
                    checkbox.style.display = 'none';
                    checkbox.classList.add('hidden-checkbox');
                }
            });

            const showMoreBtn = document.createElement('button');
            showMoreBtn.className = 'show_more_btn';
            showMoreBtn.type = 'button';
            showMoreBtn.innerHTML = `<i class="bi bi-chevron-down"></i><span class="show-text">Показать все</span><span class="hide-text" style="display:none">Скрыть</span>`;
            innerField.appendChild(showMoreBtn);

            showMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const isExpanded = this.classList.contains('expanded');
                const hidden = innerField.querySelectorAll('.checkbox_field.hidden-checkbox');
                this.querySelector('.show-text').style.display = isExpanded ? 'inline' : 'none';
                this.querySelector('.hide-text').style.display = isExpanded ? 'none' : 'inline';
                this.querySelector('.bi').style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
                hidden.forEach(c => c.style.display = isExpanded ? 'none' : 'block');
                this.classList.toggle('expanded');
            });
        });
    }

    accordion();
    showCheckbox();

    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length) {
        const colorLabel = document.querySelector('.color-label span');
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                colorOptions.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                if (colorLabel) colorLabel.textContent = option.getAttribute('title');
            });
        });
    }

    document.querySelectorAll('.favorite_add, .js-wish').forEach(btn => {
        btn.addEventListener('click', function(e) { e.preventDefault(); this.classList.toggle('active'); this.classList.toggle('is-active'); });
    });

    document.querySelectorAll('.compare_add').forEach(btn => {
        btn.addEventListener('click', function() { this.classList.toggle('active'); });
    });

    document.querySelectorAll('.buy_btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const wrap = btn.closest('.product-actions');
            if (wrap) wrap.classList.add('active');
            this.classList.toggle('active');
        });
    });

    document.querySelectorAll('.amount_block').forEach(block => {
        const minus = block.querySelector('.minus');
        const plus  = block.querySelector('.plus');
        const input = block.querySelector('input');
        if (!minus || !plus || !input) return;

        minus.addEventListener('click', () => {
            const v = parseInt(input.value);
            if (v > 1) input.value = v - 1;
        });
        plus.addEventListener('click', () => { input.value = parseInt(input.value) + 1; });
        input.addEventListener('input', () => {
            const v = parseInt(input.value);
            if (isNaN(v) || v < 1) input.value = 1;
        });
    });

    document.querySelectorAll('.tech-card').forEach(card => {
        card.addEventListener('click', function() { this.classList.add('active'); });
        const close = card.querySelector('.close_tech');
        if (close) {
            close.addEventListener('click', function(e) {
                e.stopPropagation();
                card.classList.remove('active');
            });
        }
    });

    // Footer accordion (tablet/mobile only)
    document.querySelectorAll('.footer__col .footer__col-head').forEach(btn => {
        btn.addEventListener('click', function() {
            if (window.innerWidth >= 992) return;
            this.closest('.footer__col').classList.toggle('is-open');
        });
    });
});
