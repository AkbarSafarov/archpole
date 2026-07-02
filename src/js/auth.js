document.addEventListener('DOMContentLoaded', function () {

    var emailInput  = document.getElementById('authEmail');
    var passInput   = document.getElementById('authPass');
    var submitBtn   = document.querySelector('.js-auth-submit');
    var emailField  = document.querySelector('.js-auth-email-field');
    var emailError  = document.getElementById('authEmailError');
    var eyeBtn      = document.querySelector('.js-auth-eye');
    var eyeOpen     = eyeBtn  ? eyeBtn.querySelector('.js-eye-open')   : null;
    var eyeClosed   = eyeBtn  ? eyeBtn.querySelector('.js-eye-closed') : null;

    function updateBtn() {
        if (!submitBtn) return;
        var ok = emailInput.value.trim().length > 0 && passInput.value.length > 0;
        submitBtn.disabled = !ok;
    }

    function clearEmailError() {
        if (emailField) emailField.classList.remove('reg-field--error');
        if (emailError) emailError.hidden = true;
    }

    if (emailInput) {
        emailInput.addEventListener('input', function () {
            updateBtn();
            clearEmailError();
        });
    }

    if (passInput) {
        passInput.addEventListener('input', function () {
            updateBtn();
            if (eyeBtn) eyeBtn.hidden = this.value.length === 0;
        });
    }

    if (eyeBtn) {
        eyeBtn.addEventListener('click', function () {
            var isHidden = passInput.type === 'password';
            passInput.type = isHidden ? 'text' : 'password';
            if (eyeOpen)   eyeOpen.hidden   = isHidden;
            if (eyeClosed) eyeClosed.hidden = !isHidden;
        });
    }

    var form = document.querySelector('.js-auth-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearEmailError();

            var email = emailInput ? emailInput.value.trim() : '';
            var validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!validEmail) {
                if (emailField) emailField.classList.add('reg-field--error');
                if (emailError) emailError.hidden = false;
                return;
            }

            window.location.href = 'profile.html';
        });
    }

});
