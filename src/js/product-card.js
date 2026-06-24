document.addEventListener('DOMContentLoaded', function () {

    var mainImg = document.getElementById('js-pdp-img');
    var thumbs = document.querySelectorAll('.js-pdp-thumb');
    var dots = document.querySelectorAll('.js-pdp-dot');

    function switchPdpImage(src) {
        if (!mainImg || !src) return;
        mainImg.src = src;
    }

    function setActiveThumb(activeSrc) {
        thumbs.forEach(function (t) {
            t.classList.toggle('is-active', t.dataset.img === activeSrc);
        });
        dots.forEach(function (d) {
            d.classList.toggle('is-active', d.dataset.img === activeSrc);
        });
    }

    thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
            var src = this.dataset.img;
            switchPdpImage(src);
            setActiveThumb(src);
        });
    });

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            var src = this.dataset.img;
            switchPdpImage(src);
            setActiveThumb(src);
        });
    });

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
