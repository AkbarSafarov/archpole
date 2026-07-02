document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.orders-tabs__btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var tab = this.dataset.tab;

            document.querySelectorAll('.orders-tabs__btn').forEach(function (b) {
                b.classList.remove('is-active');
            });
            document.querySelectorAll('.orders-panel').forEach(function (p) {
                p.classList.remove('is-active');
            });

            this.classList.add('is-active');
            var panel = document.getElementById('panel-' + tab);
            if (panel) panel.classList.add('is-active');
        });
    });

    var drawer      = document.getElementById('orderDrawer');
    var drawerScroll = document.getElementById('drawerScroll');

    function openDrawer(card) {
        var detail = card.querySelector('.js-order-detail');
        if (!detail || !drawer || !drawerScroll) return;

        drawerScroll.innerHTML = detail.innerHTML;
        drawer.hidden = false;
        document.body.style.overflow = 'hidden';
        drawerScroll.scrollTop = 0;
    }

    function closeDrawer() {
        if (!drawer) return;
        drawer.hidden = true;
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.js-order-card').forEach(function (card) {
        card.addEventListener('click', function () {
            openDrawer(this);
        });
    });

    document.querySelectorAll('.js-drawer-close').forEach(function (el) {
        el.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer && !drawer.hidden) closeDrawer();
    });

    var logoutModal = document.getElementById('logoutModal');
    if (logoutModal) {
        document.querySelectorAll('.js-logout-trigger').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.preventDefault();
                logoutModal.hidden = false;
            });
        });
        logoutModal.querySelectorAll('.js-modal-close').forEach(function (el) {
            el.addEventListener('click', function () {
                logoutModal.hidden = true;
            });
        });
    }

});
