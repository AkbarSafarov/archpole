document.addEventListener('DOMContentLoaded', function () {

    // ── Sort dropdown ─────────────────────────────────────────────────────────

    document.querySelectorAll('.js-sort-toggle').forEach(function (btn) {
        var wrap = btn.closest('.js-sort-wrap');
        if (!wrap) return;
        var list = wrap.querySelector('.js-sort-list');
        if (!list) return;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = !list.hidden;
            document.querySelectorAll('.js-sort-list').forEach(function (l) { l.hidden = true; });
            document.querySelectorAll('.js-sort-toggle').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
            if (!isOpen) {
                list.hidden = false;
                btn.setAttribute('aria-expanded', 'true');
            }
        });

        list.querySelectorAll('.js-sort-opt').forEach(function (opt) {
            opt.addEventListener('click', function () {
                list.querySelectorAll('.js-sort-opt').forEach(function (o) { o.classList.remove('is-active'); });
                this.classList.add('is-active');
                var label = btn.querySelector('.js-sort-label');
                if (label) label.textContent = this.textContent.trim();
                list.hidden = true;
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    });

    document.addEventListener('click', function () {
        document.querySelectorAll('.js-sort-list').forEach(function (l) { l.hidden = true; });
        document.querySelectorAll('.js-sort-toggle').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    });

    // ── Collection tabs ───────────────────────────────────────────────────────

    var tabs = document.querySelectorAll('.collection-pg__tab');
    if (tabs.length) {
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                tabs.forEach(function (t) { t.classList.remove('is-active'); });
                this.classList.add('is-active');
            });
        });
    }

});
