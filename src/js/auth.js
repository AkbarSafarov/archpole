document.addEventListener('DOMContentLoaded', function () {

    var emailInput  = document.getElementById('authEmail');
    var passInput   = document.getElementById('authPass');
    var submitBtn   = document.querySelector('.js-auth-submit');
    var emailField  = document.querySelector('.js-auth-email-field');
    var emailError  = document.getElementById('authEmailError');
    var eyeBtn      = document.querySelector('.js-auth-eye');
    var eyeOpen     = eyeBtn  ? eyeBtn.querySelector('.js-eye-open')   : null;
    var eyeClosed   = eyeBtn  ? eyeBtn.querySelector('.js-eye-closed') : null;

    // ── Enable / disable submit ───────────────────────────────────────
    function updateBtn() {
        if (!submitBtn) return;
        var ok = emailInput.value.trim().length > 0 && passInput.value.length > 0;
        submitBtn.disabled = !ok;
    }

    // ── Clear email error ─────────────────────────────────────────────
    function clearEmailError() {
        if (emailField) emailField.classList.remove('auth__field--error');
        if (emailError) emailError.hidden = true;
    }

    // ── Email input ───────────────────────────────────────────────────
    if (emailInput) {
        emailInput.addEventListener('input', function () {
            updateBtn();
            clearEmailError();
        });
    }

    // ── Password input ────────────────────────────────────────────────
    if (passInput) {
        passInput.addEventListener('input', function () {
            updateBtn();
            if (eyeBtn) eyeBtn.hidden = this.value.length === 0;
        });
    }

    // ── Eye toggle ─────────────────────────────────────────────────────
    if (eyeBtn) {
        eyeBtn.addEventListener('click', function () {
            var isHidden = passInput.type === 'password';
            passInput.type = isHidden ? 'text' : 'password';
            if (eyeOpen)   eyeOpen.hidden   = isHidden;
            if (eyeClosed) eyeClosed.hidden = !isHidden;
        });
    }

    // ── Form submit ───────────────────────────────────────────────────
    var form = document.querySelector('.js-auth-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearEmailError();

            var email = emailInput ? emailInput.value.trim() : '';
            var validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

            if (!validEmail) {
                if (emailField) emailField.classList.add('auth__field--error');
                if (emailError) emailError.hidden = false;
                return;
            }

            // Success → go to profile
            window.location.href = 'profile.html';
        });
    }

});
