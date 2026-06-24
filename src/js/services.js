document.addEventListener('DOMContentLoaded', function () {

    var section  = document.querySelector('.js-services-section');
    var tabs     = document.querySelectorAll('.js-service-tab');
    var swiperEl = document.querySelector('.js-services-swiper');

    if (!section || !tabs.length || !swiperEl || typeof Swiper === 'undefined') return;

    var colors = [
        '#2d3c35', // Ремонт под ключ
        '#3e2d1e', // Кухни на заказ
        '#3d2020', // Дизайн проект
        '#5c3010', // Реставрация мебели
        '#3a3820', // Trade-in
        '#1e2d3a', // Мебель в аренду
        '#2d1a0e', // Нестандартные изделия
    ];

    var swiper = new Swiper(swiperEl, {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        loop: false,
        speed: 600,
        allowTouchMove: true,
        autoHeight: true,
        on: {
            slideChange: function () {
                activate(this.activeIndex, false);
            }
        }
    });

    function activate(index, goToSlide) {
        tabs.forEach(function (t, i) {
            t.classList.toggle('is-active', i === index);
        });
        section.style.setProperty('--service-bg', colors[index] || colors[0]);
        if (goToSlide !== false) {
            swiper.slideTo(index);
        }
    }

    tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { activate(i); });
    });

    activate(0, false);
});
