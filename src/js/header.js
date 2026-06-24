document.addEventListener('DOMContentLoaded', function () {

    var header = document.querySelector('.header');
    if (!header) return;

    // ── Announcement close ────────────────────────────────────────────────────
    var announce      = header.querySelector('.js-announce');
    var announceClose = header.querySelector('.js-announce-close');

    if (announceClose && announce) {
        announceClose.addEventListener('click', function () {
            announce.hidden = true;
        });
    }

    // ── Mobile burger / drawer ────────────────────────────────────────────────
    var burger = header.querySelector('.js-burger');
    var drawer = header.querySelector('.js-drawer');

    if (burger && drawer) {
        burger.addEventListener('click', function () {
            var open = !drawer.hidden;
            drawer.hidden = open;
            burger.setAttribute('aria-expanded', String(!open));
        });
    }

    // ── Search toggle (mobile) ────────────────────────────────────────────────
    var searchToggle = header.querySelector('.js-search-toggle');

    if (searchToggle) {
        searchToggle.addEventListener('click', function () {
            var input = header.querySelector('.header__search-input');
            if (input) {
                var searchEl = header.querySelector('.header__search');
                if (searchEl) {
                    searchEl.style.display = searchEl.style.display === 'flex' ? 'none' : 'flex';
                }
                input.focus();
            }
        });
    }

    // ── Close drawer on outside click ─────────────────────────────────────────
    document.addEventListener('click', function (e) {
        if (drawer && !drawer.hidden && !header.contains(e.target)) {
            drawer.hidden = true;
            if (burger) burger.setAttribute('aria-expanded', 'false');
        }
    });

    // ── Close on Escape ───────────────────────────────────────────────────────
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer && !drawer.hidden) {
            drawer.hidden = true;
            if (burger) burger.setAttribute('aria-expanded', 'false');
        }
    });
});
