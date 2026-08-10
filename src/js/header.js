document.addEventListener('DOMContentLoaded', function () {

    var header = document.querySelector('.header');
    if (!header) return;

    function setHeaderHeight() {
        document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    }

    setHeaderHeight();
    window.addEventListener('resize', setHeaderHeight);

    if (window.ResizeObserver) {
        new ResizeObserver(setHeaderHeight).observe(header);
    }

    var announce      = header.querySelector('.js-announce');
    var announceClose = header.querySelector('.js-announce-close');

    if (announceClose && announce) {
        announceClose.addEventListener('click', function () {
            announce.hidden = true;
            setHeaderHeight();
            try {
                localStorage.setItem('announceClosed', '1');
            } catch (e) {}
        });
    }

    var searchToggle = header.querySelector('.js-search-toggle');

    if (searchToggle) {
        searchToggle.addEventListener('click', function () {
            var searchWrap = header.querySelector('.header__right');
            if (searchWrap) {
                searchWrap.classList.toggle('is-search-open');
                if (searchWrap.classList.contains('is-search-open')) {
                    var input = searchWrap.querySelector('.header__search-input');
                    if (input) input.focus();
                }
            }
        });
    }

    var burgerMenu    = document.querySelector('.js-burger-menu');
    var burgerBtn     = header.querySelector('.js-burger');
    var burgerClose   = burgerMenu ? burgerMenu.querySelector('.js-burger-close') : null;
    var burgerOverlay = burgerMenu ? burgerMenu.querySelector('.js-burger-overlay') : null;

    function openMenu() {
        if (!burgerMenu) return;
        burgerMenu.classList.add('is-open');
        burgerMenu.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        if (!burgerMenu) return;
        burgerMenu.classList.remove('is-open');
        burgerMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (burgerBtn) burgerBtn.setAttribute('aria-expanded', 'false');
        setTimeout(function () {
            burgerMenu.querySelectorAll('.burger-menu__sub-list.is-open').forEach(function (ul) {
                ul.classList.remove('is-open');
            });
        }, 320);
    }

    if (burgerBtn)     burgerBtn.addEventListener('click', openMenu);
    if (burgerClose)   burgerClose.addEventListener('click', closeMenu);
    if (burgerOverlay) burgerOverlay.addEventListener('click', closeMenu);

    if (burgerMenu) {
        burgerMenu.querySelectorAll('.js-burger-toggle').forEach(function (link) {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                var subList = this.parentElement.querySelector(':scope > .burger-menu__sub-list');
                if (subList) subList.classList.add('is-open');
            });
        });

        burgerMenu.querySelectorAll('.js-burger-back').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var subList = this.closest('.burger-menu__sub-list');
                if (subList) subList.classList.remove('is-open');
            });
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && burgerMenu && burgerMenu.classList.contains('is-open')) {
            closeMenu();
        }
    });
});
