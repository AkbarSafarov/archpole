document.addEventListener('DOMContentLoaded', function () {

    var MONTHS = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];

    function generateCode() {
        var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        var code = '';
        for (var i = 0; i < 6; i++) {
            code += chars[Math.floor(Math.random() * chars.length)];
        }
        return code;
    }

    function formatDate(val) {
        var parts = val.split('.');
        if (parts.length !== 3 || parts[2].length < 4) return val;
        var d = parseInt(parts[0], 10);
        var m = parseInt(parts[1], 10) - 1;
        if (m < 0 || m > 11 || !d) return val;
        return d + ' ' + MONTHS[m] + ' ' + parts[2];
    }

    var COPY_SVG = '<svg width="13" height="15" viewBox="0 0 13 15" fill="none" aria-hidden="true">' +
        '<rect x="3.5" y="3.5" width="8.5" height="10.5" rx="0.8" stroke="currentColor" stroke-width="1.3"/>' +
        '<path d="M3.5 3.5V2C3.5 1.44772 3.05228 1 2.5 1H1C0.447715 1 0 1.44772 0 2V11C0 11.5523 0.447715 12 1 12H3.5" stroke="currentColor" stroke-width="1.3"/>' +
        '</svg>';

    function makeCopyBtn(code) {
        return '<button class="promo-copy js-promo-copy" data-code="' + code + '" type="button" title="Скопировать">' + COPY_SVG + '</button>';
    }

    var modal       = document.getElementById('promoModal');
    var clientInput = document.getElementById('promoClient');
    var discountInput = document.getElementById('promoDiscount');
    var dateInput   = document.getElementById('promoDate');

    if (dateInput && typeof IMask !== 'undefined') {
        IMask(dateInput, { mask: '00.00.0000' });
    }

    document.querySelectorAll('.js-promo-add').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (modal) modal.hidden = false;
        });
    });

    document.querySelectorAll('.js-promo-modal-close').forEach(function (el) {
        el.addEventListener('click', function () {
            if (modal) modal.hidden = true;
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && !modal.hidden) modal.hidden = true;
    });

    var promoEmpty     = document.getElementById('promoEmpty');
    var promoTable     = document.getElementById('promoTable');
    var promoTableBody = document.getElementById('promoTableBody');
    var promoCards     = document.getElementById('promoCards');

    var form = document.querySelector('.js-promo-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var client   = clientInput   ? clientInput.value.trim()   : '';
            var discount = discountInput ? discountInput.value.trim() : '';
            var date     = dateInput     ? dateInput.value.trim()     : '';
            if (!client || !discount || !date) return;

            var code        = generateCode();
            var displayDate = formatDate(date);
            var pct         = discount.replace('%', '') + '%';

            if (promoTableBody) {
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>' + client + '</td>' +
                    '<td>' + pct + '</td>' +
                    '<td>' + displayDate + '</td>' +
                    '<td>' + code + ' ' + makeCopyBtn(code) + '</td>' +
                    '<td><span class="promo-badge promo-badge--unused">НЕ ПРИМЕНЕН</span></td>';
                promoTableBody.appendChild(tr);
                bindCopy(tr);
            }

            if (promoCards) {
                var card = document.createElement('div');
                card.className = 'promo-card';
                card.innerHTML =
                    '<div class="promo-card__row">' +
                        '<span class="promo-card__name">' +
                            client + ' <span class="promo-card__dot">·</span> ' + code + ' ' + makeCopyBtn(code) +
                        '</span>' +
                        '<span class="promo-badge promo-badge--unused">НЕ ПРИМЕНЕН</span>' +
                    '</div>' +
                    '<p class="promo-card__info">Скидка <span>' + pct + '</span></p>' +
                    '<p class="promo-card__info">Дата окончания <span>' + displayDate + '</span></p>';
                promoCards.appendChild(card);
                bindCopy(card);
            }

            if (promoEmpty) promoEmpty.hidden = true;
            if (promoTable) promoTable.hidden = false;
            if (promoCards) promoCards.hidden = false;

            form.reset();
            if (modal) modal.hidden = true;
        });
    }

    var toast     = document.getElementById('profileToast');
    var toastText = document.getElementById('profileToastText');
    var toastTimer;

    function showToast(message) {
        if (!toast) return;
        if (toastText) toastText.textContent = message;
        toast.hidden = false;
        toast.classList.remove('is-hiding');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(hideToast, 3000);
    }

    function hideToast() {
        if (!toast) return;
        toast.classList.add('is-hiding');
        setTimeout(function () {
            toast.hidden = true;
            toast.classList.remove('is-hiding');
        }, 300);
    }

    var toastClose = document.querySelector('.js-toast-close');
    if (toastClose) toastClose.addEventListener('click', hideToast);

    function bindCopy(container) {
        container.querySelectorAll('.js-promo-copy').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var code = this.dataset.code;
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(code).catch(function () {});
                }
                showToast('Промокод скопирован');
            });
        });
    }

    bindCopy(document);

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
