document.addEventListener('DOMContentLoaded', function () {

    var thumbsEl = document.querySelector('.pdp-hero__thumbs-swiper');
    var mainEl = document.querySelector('.pdp-hero__main-swiper');

    if (mainEl) {
        var thumbsSwiper = thumbsEl ? new Swiper(thumbsEl, {
            direction: 'vertical',
            slidesPerView: 'auto',
            spaceBetween: 8,
            watchSlidesProgress: true,
            freeMode: true,
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

    function closeAllOptLists() {
        document.querySelectorAll('.pdp-hero__option-list').forEach(function (l) { l.hidden = true; });
        document.querySelectorAll('.js-pdp-opt').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    }

    document.querySelectorAll('.js-pdp-opt').forEach(function (btn) {
        var list = btn.closest('.pdp-hero__option-select').querySelector('.pdp-hero__option-list');
        if (!list) return;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = !list.hidden;
            closeAllOptLists();
            if (!isOpen) {
                list.hidden = false;
                btn.setAttribute('aria-expanded', 'true');
            }
        });

        list.querySelectorAll('.js-pdp-opt-item').forEach(function (item) {
            item.addEventListener('click', function () {
                var val = this.dataset.val;
                var color = this.dataset.color;
                var valEl = btn.querySelector('.pdp-hero__option-val');
                var swatchEl = btn.querySelector('.pdp-hero__option-swatch');
                if (valEl) valEl.textContent = val;
                if (swatchEl && color) swatchEl.style.background = color;
                list.querySelectorAll('.js-pdp-opt-item').forEach(function (i) { i.classList.remove('is-active'); });
                this.classList.add('is-active');
                list.hidden = true;
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    });

    document.addEventListener('click', closeAllOptLists);

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
