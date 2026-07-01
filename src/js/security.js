document.addEventListener('DOMContentLoaded', function () {

    var oldInput     = document.getElementById('p-old');
    var newInput     = document.getElementById('p-new');
    var confirmInput = document.getElementById('p-confirm');
    var submitBtn    = document.querySelector('.js-sec-submit');
    var newField     = document.getElementById('newPassField');
    var confirmField = document.getElementById('confirmPassField');
    var passError    = document.getElementById('passError');

    // ── Eye toggle + enable-button trigger ───────────────────────
    document.querySelectorAll('.sec-field').forEach(function (wrap) {
        var input = wrap.querySelector('.sec-field__input');
        var eye   = wrap.querySelector('.sec-field__eye');
        if (!input || !eye) return;

        input.addEventListener('input', function () {
            eye.hidden = this.value.length === 0;
            updateSubmitBtn();
            clearErrors();
        });

        eye.addEventListener('click', function () {
            input.type = input.type === 'password' ? 'text' : 'password';
        });
    });

    // ── Submit button: grey (disabled) / black (enabled) ─────────
    function updateSubmitBtn() {
        if (!submitBtn) return;
        submitBtn.disabled = !(
            oldInput.value.length > 0 &&
            newInput.value.length > 0 &&
            confirmInput.value.length > 0
        );
    }

    // ── Clear error state ─────────────────────────────────────────
    function clearErrors() {
        if (newField)     newField.classList.remove('sec-field--error');
        if (confirmField) confirmField.classList.remove('sec-field--error');
        if (passError)    passError.hidden = true;
    }

    // ── Form submit ───────────────────────────────────────────────
    var form = document.querySelector('.js-sec-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();

            if (newInput.value !== confirmInput.value) {
                if (newField)     newField.classList.add('sec-field--error');
                if (confirmField) confirmField.classList.add('sec-field--error');
                if (passError)    passError.hidden = false;
                return;
            }

            form.reset();
            document.querySelectorAll('.sec-field__eye').forEach(function (btn) { btn.hidden = true; });
            if (submitBtn) submitBtn.disabled = true;
            showToast('Пароль успешно изменен');
        });
    }

    // ── Toast ─────────────────────────────────────────────────────
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
