document.addEventListener('DOMContentLoaded', function () {

    var links   = document.querySelectorAll('.js-cat-link');
    var preview = document.querySelector('.js-cat-preview');

    if (!links.length || !preview) return;

    function setActive(link) {
        links.forEach(function (l) { l.classList.remove('is-active'); });
        link.classList.add('is-active');
        preview.style.opacity = '0';
        preview.src = link.dataset.icon;
        preview.onload = function () { preview.style.opacity = '1'; };
    }

    links.forEach(function (link) {
        link.addEventListener('mouseenter', function () { setActive(this); });
    });

    setActive(links[0]);
});
