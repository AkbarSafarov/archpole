document.addEventListener('DOMContentLoaded', function () {

    var thumbsEl = document.querySelector('.pdp-hero__thumbs-swiper');
    var mainEl = document.querySelector('.pdp-hero__main-swiper');

    if (mainEl) {
        var thumbsSwiper = thumbsEl ? new Swiper(thumbsEl, {
            direction: 'vertical',
            slidesPerView: 'auto',
            spaceBetween: 8,
            watchSlidesProgress: true,
            freeMode: {
                enabled: true,
                momentum: true,
                momentumRatio: 0.8,
                momentumVelocityRatio: 0.8,
            },
            mousewheel: {
                forceToAxis: true,
                sensitivity: 0.5,
                releaseOnEdges: true,
            },
            speed: 500,
        }) : null;

        new Swiper(mainEl, {
            slidesPerView: 1,
            thumbs: thumbsSwiper ? { swiper: thumbsSwiper } : undefined,
            pagination: {
                el: '.pdp-hero__dots',
                clickable: true,
            },
        });
    }

    function closeAllOptionPanels(except) {
        document.querySelectorAll('.pdp-hero__option-panel').forEach(function (p) {
            if (p !== except) p.hidden = true;
        });
        document.querySelectorAll('.js-pdp-opt').forEach(function (b) {
            var panel = b.closest('.pdp-hero__option').querySelector('.pdp-hero__option-panel');
            if (panel !== except) b.setAttribute('aria-expanded', 'false');
        });
    }

    document.querySelectorAll('.js-pdp-opt').forEach(function (btn) {
        var panel = btn.closest('.pdp-hero__option').querySelector('.pdp-hero__option-panel');
        if (!panel) return;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = !panel.hidden;
            closeAllOptionPanels(isOpen ? null : panel);
            panel.hidden = isOpen;
            btn.setAttribute('aria-expanded', String(!isOpen));
        });
    });

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.pdp-hero__option')) closeAllOptionPanels(null);
    });

    function formatPrice(n) {
        return n.toLocaleString('ru-RU') + ' ₽';
    }

    function recalcPrice() {
        var priceEl = document.querySelector('.js-pdp-total-price');
        var breakdownEl = document.querySelector('.js-pdp-price-breakdown');
        if (!priceEl) return;

        var base = parseInt(priceEl.dataset.basePrice, 10) || 0;
        var total = base;
        var lines = [{ label: 'Базовое состояние', amount: base, isBase: true }];

        document.querySelectorAll('.pdp-hero__option').forEach(function (optRow) {
            var labelEl = optRow.querySelector('.pdp-hero__option-label');
            var groupLabel = labelEl ? labelEl.textContent.replace(/:\s*$/, '') : '';

            var checkedRadio = optRow.querySelector('.js-pdp-radio:checked');
            if (checkedRadio) {
                var radioPrice = parseInt(checkedRadio.dataset.price, 10) || 0;
                if (radioPrice > 0) {
                    lines.push({ label: groupLabel, amount: radioPrice });
                    total += radioPrice;
                }
            }

            var activeSwatch = optRow.querySelector('.js-pdp-swatch.is-active');
            if (activeSwatch) {
                var swatchPrice = parseInt(activeSwatch.dataset.price, 10) || 0;
                if (swatchPrice > 0) {
                    lines.push({ label: groupLabel, amount: swatchPrice });
                    total += swatchPrice;
                }
            }

            optRow.querySelectorAll('.js-pdp-checkbox:checked').forEach(function (cb) {
                var cbPrice = parseInt(cb.dataset.price, 10) || 0;
                if (cbPrice > 0) {
                    var textEl = cb.parentElement.querySelector('.pdp-hero__checkbox-text');
                    lines.push({ label: textEl ? textEl.textContent : groupLabel, amount: cbPrice });
                    total += cbPrice;
                }
            });
        });

        priceEl.textContent = formatPrice(total);

        if (breakdownEl) {
            breakdownEl.innerHTML = '';
            lines.forEach(function (line) {
                var row = document.createElement('div');
                row.className = 'pdp-hero__price-line';
                var amountText = (line.isBase ? '' : '+') + formatPrice(line.amount);
                row.innerHTML = '<span>' + line.label + ':</span> <strong>' + amountText + '</strong>';
                breakdownEl.appendChild(row);
            });
        }
    }

    var priceToggle = document.querySelector('.js-pdp-price-toggle');
    var priceBreakdown = document.querySelector('.js-pdp-price-breakdown');
    if (priceToggle && priceBreakdown) {
        priceToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = !priceBreakdown.hidden;
            priceBreakdown.hidden = isOpen;
            priceToggle.setAttribute('aria-expanded', String(!isOpen));
        });
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.pdp-hero__price-row')) {
                priceBreakdown.hidden = true;
                priceToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    document.querySelectorAll('.js-pdp-radio').forEach(function (input) {
        input.addEventListener('change', function () {
            var panel = this.closest('.pdp-hero__option-panel');
            var btn = panel.closest('.pdp-hero__option').querySelector('.js-pdp-opt');
            var valEl = btn.querySelector('.pdp-hero__option-val');
            if (valEl) valEl.textContent = this.dataset.val;
            recalcPrice();
        });
    });

    document.querySelectorAll('.js-pdp-checkbox').forEach(function (input) {
        input.addEventListener('change', function () {
            var panel = this.closest('.pdp-hero__option-panel');
            var btn = panel.closest('.pdp-hero__option').querySelector('.js-pdp-opt');
            var valEl = btn.querySelector('.js-pdp-opt-summary');
            if (valEl) {
                var checked = Array.prototype.slice.call(panel.querySelectorAll('.js-pdp-checkbox:checked'))
                    .map(function (c) { return c.dataset.val; });
                valEl.textContent = checked.length ? checked.join(' · ') : valEl.dataset.emptyText;
                valEl.classList.toggle('pdp-hero__option-val--muted', checked.length === 0);
            }
            recalcPrice();
        });
    });

    document.querySelectorAll('.js-pdp-swatch').forEach(function (swatch) {
        swatch.addEventListener('click', function () {
            var grid = this.closest('.pdp-hero__swatch-grid');
            var panel = this.closest('.pdp-hero__option-panel');
            var btn = panel.closest('.pdp-hero__option').querySelector('.js-pdp-opt');
            var val = this.dataset.val;
            var color = this.dataset.color;
            var price = parseInt(this.dataset.price, 10) || 0;
            var valEl = btn.querySelector('.pdp-hero__option-val');
            var swatchEl = btn.querySelector('.pdp-hero__option-swatch');
            var previewEl = panel.querySelector('.pdp-hero__swatch-preview');
            var previewPriceEl = panel.querySelector('.pdp-hero__swatch-preview-price');
            if (valEl) valEl.textContent = val;
            if (swatchEl && color) swatchEl.style.background = color;
            if (previewEl && color) previewEl.style.background = color;
            if (previewPriceEl) previewPriceEl.textContent = price > 0 ? '+' + formatPrice(price) : '';
            grid.querySelectorAll('.js-pdp-swatch').forEach(function (s) { s.classList.remove('is-active'); });
            this.classList.add('is-active');
            recalcPrice();
        });
    });

    recalcPrice();

    document.querySelectorAll('.js-pdp-accordion').forEach(function (item) {
        var btn = item.querySelector('.pdp-accordion__toggle');
        var body = item.querySelector('.pdp-accordion__body');
        if (!btn || !body) return;

        btn.addEventListener('click', function () {
            var isOpen = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!isOpen));
            body.hidden = isOpen;
            item.classList.toggle('is-open', !isOpen);
        });
    });

});
