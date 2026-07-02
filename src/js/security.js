document.addEventListener('DOMContentLoaded', function () {

    var oldInput     = document.getElementById('p-old');
    var newInput     = document.getElementById('p-new');
    var confirmInput = document.getElementById('p-confirm');
    var submitBtn    = document.querySelector('.js-sec-submit');
    var newField     = document.getElementById('newPassField');
    var confirmField = document.getElementById('confirmPassField');
    var passError    = document.getElementById('passError');

    document.querySelectorAll('.reg-field--pass').forEach(function (wrap) {
        var input = wrap.querySelector('.reg-field__input');
        var eye   = wrap.querySelector('.reg-field__eye');
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

    function updateSubmitBtn() {
        if (!submitBtn) return;
        submitBtn.disabled = !(
            oldInput.value.length > 0 &&
            newInput.value.length > 0 &&
            confirmInput.value.length > 0
        );
    }

    function clearErrors() {
        if (newField)     newField.classList.remove('reg-field--error');
        if (confirmField) confirmField.classList.remove('reg-field--error');
        if (passError)    passError.hidden = true;
    }

    var form = document.querySelector('.js-sec-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearErrors();

            if (newInput.value !== confirmInput.value) {
                if (newField)     newField.classList.add('reg-field--error');
                if (confirmField) confirmField.classList.add('reg-field--error');
                if (passError)    passError.hidden = false;
                return;
            }

            form.reset();
            document.querySelectorAll('.reg-field__eye').forEach(function (btn) { btn.hidden = true; });
            if (submitBtn) submitBtn.disabled = true;
            showToast('Пароль успешно изменен');
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
