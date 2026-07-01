document.addEventListener('DOMContentLoaded', function () {

    // ── Orders data ───────────────────────────────────────────────
    var ordersData = {
        o1: {
            num: '4452', total: '100 000 ₽', status: 'delivered', statusText: 'ДОСТАВЛЕН',
            payment: 'наличные', date: '12.01.2026', address: 'г. Москва, ул. Тверская, дом 1',
            items: [
                {
                    img: 'files/ch.png',
                    name: 'Кровать односпальная с ящиком «Соломон»',
                    price: '100 000 ₽',
                    specs: ['Размер: 430 × 330 / 900 мм', 'Цвет: бежевый / белый', 'Кол-во: 1 шт.']
                }
            ]
        },
        o2: {
            num: '4452', total: '125 000 ₽', status: 'in-work', statusText: 'В РАБОТЕ',
            payment: 'наличные', date: '12.01.2026', address: 'г. Москва, ул. Тверская, дом 1',
            items: [
                {
                    img: 'files/ch.png',
                    name: 'Стул «Красный»',
                    price: '42 000 ₽',
                    specs: ['Размер: 450 × 450 × 860 мм', 'Цвет: красный матовый', 'Кол-во: 2 шт.']
                },
                {
                    img: 'files/ch.png',
                    name: 'Столик кофейный «Красный»',
                    price: '41 000 ₽',
                    specs: ['Размер: 600 × 600 × 400 мм', 'Цвет: красный матовый', 'Кол-во: 1 шт.']
                }
            ]
        },
        o3: {
            num: '4564', total: '278 000 ₽', status: 'in-work', statusText: 'В РАБОТЕ',
            payment: 'наличные', date: '12.01.2026', address: 'г. Москва, ул. Тверская, дом 1',
            items: [
                {
                    img: 'files/ch.png',
                    name: 'Кровать «Облако»',
                    price: '228 000 ₽',
                    specs: ['Размер: 430 × 330 / 900 мм', 'Цвет: пепельный белый', 'Кол-во: 1 шт.']
                },
                {
                    img: 'files/ch.png',
                    name: 'Табурет «Ластонка»',
                    price: '28 000 ₽',
                    specs: ['Размер: 750 × 450 × 460 мм', 'Цвет: античный чёрный', 'Кол-во: 1 шт.']
                },
                {
                    img: 'files/ch.png',
                    name: 'Стол рабочий',
                    price: '22 000 ₽',
                    specs: ['Размер: 1200 × 600 × 750 мм', 'Цвет: нордик белый', 'Кол-во: 1 шт.']
                }
            ]
        },
        o4: {
            num: '8646', total: '298 000 ₽', status: 'cancelled', statusText: 'ОТМЕНЕН',
            payment: 'наличные', date: '12.01.2026', address: 'г. Москва, ул. Тверская, дом 1',
            items: [
                {
                    img: 'files/ch.png',
                    name: 'Тумба чёрная',
                    price: '148 000 ₽',
                    specs: ['Размер: 400 × 400 × 600 мм', 'Цвет: чёрный матовый', 'Кол-во: 1 шт.']
                },
                {
                    img: 'files/ch.png',
                    name: 'Кровать «Золото»',
                    price: '150 000 ₽',
                    specs: ['Размер: 160 × 200 см', 'Цвет: натуральное дерево', 'Кол-во: 1 шт.']
                }
            ]
        }
    };

    // ── Filter tab switching ──────────────────────────────────────
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

    // ── Order detail drawer ───────────────────────────────────────
    var drawer     = document.getElementById('orderDrawer');
    var drawerScroll = document.getElementById('drawerScroll');

    function buildItemHtml(item) {
        var specsHtml = item.specs.map(function (s) {
            return '<p class="order-drawer__item-spec">' + s + '</p>';
        }).join('');
        return '<div class="order-drawer__item">' +
            '<div class="order-drawer__item-img"><img src="' + item.img + '" alt=""></div>' +
            '<div class="order-drawer__item-info">' +
                '<p class="order-drawer__item-name">' + item.name + '</p>' +
                '<p class="order-drawer__item-price">' + item.price + '</p>' +
                specsHtml +
            '</div>' +
        '</div>';
    }

    function openDrawer(orderId) {
        var order = ordersData[orderId];
        if (!order || !drawer || !drawerScroll) return;

        var itemsHtml = order.items.map(buildItemHtml).join('');

        drawerScroll.innerHTML =
            '<div class="order-drawer__header">' +
                '<span class="order-card__badge order-card__badge--' + order.status + '">' + order.statusText + '</span>' +
                '<h2 class="order-drawer__title">ЗАКАЗ №' + order.num + '</h2>' +
                '<p class="order-drawer__total">' + order.total + '</p>' +
                '<div class="order-drawer__meta">' +
                    '<p>Способ оплаты: <span>' + order.payment + '</span></p>' +
                    '<p>Дата заказа: <span>' + order.date + '</span></p>' +
                    '<p>Доставка: <span>' + order.address + '</span></p>' +
                '</div>' +
                '<hr class="order-drawer__sep">' +
            '</div>' +
            '<div class="order-drawer__items">' + itemsHtml + '</div>';

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
            openDrawer(this.dataset.orderId);
        });
    });

    document.querySelectorAll('.js-drawer-close').forEach(function (el) {
        el.addEventListener('click', closeDrawer);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer && !drawer.hidden) closeDrawer();
    });

    // ── Logout modal ──────────────────────────────────────────────
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
