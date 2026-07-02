document.addEventListener('DOMContentLoaded', function () {

    var dateInput = document.getElementById('p-birth');
    if (dateInput && typeof IMask !== 'undefined') {
        IMask(dateInput, { mask: '00.00.0000' });
    }

    var phoneInput   = document.getElementById('p-phone');
    var phoneSendBtn = document.querySelector('.js-phone-send');
    var smsRow       = document.getElementById('smsRow');
    var smsInput     = document.getElementById('p-sms');
    var verifyBtn    = document.querySelector('.js-phone-verify');

    if (phoneInput && typeof IMask !== 'undefined') {
        var phoneMask = IMask(phoneInput, { mask: '+7 000 000-00-00' });

        phoneMask.on('accept', function () {
            if (phoneSendBtn) {
                phoneSendBtn.hidden = phoneMask.unmaskedValue.length < 10;
            }
        });
    }

    if (phoneSendBtn && smsRow) {
        phoneSendBtn.addEventListener('click', function () {
            phoneSendBtn.hidden = true;
            smsRow.hidden = false;
            if (smsInput) smsInput.focus();
        });
    }

    if (smsInput && verifyBtn) {
        smsInput.addEventListener('input', function () {
            verifyBtn.disabled = this.value.trim().length === 0;
        });
    }

    if (verifyBtn) {
        verifyBtn.addEventListener('click', function () {
            if (smsRow) smsRow.hidden = true;
            showToast('Номер телефона добавлен');
        });
    }

    var personalForm = document.querySelector('.js-personal-form');
    if (personalForm) {
        personalForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showToast('Данные успешно изменены');
        });
    }

    var toast     = document.getElementById('profileToast');
    var toastText = document.getElementById('profileToastText');
    var toastTimer;

    function showToast(message) {
        if (!toast) return;
        if (toastText) toastText.textContent = message || 'Данные успешно изменены';
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
