document.addEventListener('DOMContentLoaded', function () {

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

    var subnavPrev = document.querySelector('.js-subnav-prev');
    var subnavNext = document.querySelector('.js-subnav-next');
    var subnavScroll = document.querySelector('.js-subnav-scroll');
    if (subnavPrev && subnavNext && subnavScroll) {
        var scrollStep = 220;
        subnavPrev.addEventListener('click', function () {
            subnavScroll.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        });
        subnavNext.addEventListener('click', function () {
            subnavScroll.scrollBy({ left: scrollStep, behavior: 'smooth' });
        });
    }

    var subnavTabs = document.querySelectorAll('.js-subnav-tab');
    if (subnavTabs.length) {
        subnavTabs.forEach(function (tab) {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                subnavTabs.forEach(function (t) { t.classList.remove('is-active'); });
                this.classList.add('is-active');
            });
        });
    }

    var collTags = document.querySelectorAll('.js-coll-tag');
    if (collTags.length) {
        collTags.forEach(function (tag) {
            tag.addEventListener('click', function (e) {
                e.preventDefault();
                collTags.forEach(function (t) { t.classList.remove('is-active'); });
                this.classList.add('is-active');
            });
        });
    }

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
