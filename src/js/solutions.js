document.addEventListener('DOMContentLoaded', function () {
    var tabs    = document.querySelectorAll('.js-space-tab');
    var bgImg   = document.querySelector('.js-space-bg');
    var subtitle = document.querySelector('.js-space-sub');

    if (!tabs.length) return;

    function activate(tab) {
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');

        var text = tab.dataset.text;
        if (subtitle && text) subtitle.textContent = text;

        var imgPath = tab.dataset.img;
        if (bgImg && imgPath) {
            bgImg.style.opacity = '0';
            var next = new Image();
            next.onload = function () {
                bgImg.src = next.src;
                bgImg.style.opacity = '1';
            };
            next.onerror = function () {
                bgImg.style.opacity = '1';
            };
            next.src = imgPath;
        }
    }

    tabs.forEach(function (tab) {
        tab.addEventListener('click', function (e) {
            e.preventDefault();
            activate(this);
        });
    });
});
