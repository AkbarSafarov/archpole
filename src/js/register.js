document.addEventListener('DOMContentLoaded', function () {

    var nameInput    = document.getElementById('regName');
    var surnameInput = document.getElementById('regSurname');
    var emailInput   = document.getElementById('regEmail');
    var phoneInput   = document.getElementById('regPhone');
    var passInput    = document.getElementById('regPass');
    var confirmInput = document.getElementById('regConfirm');
    var consentCheck = document.querySelector('.js-reg-consent');
    var submitBtn    = document.querySelector('.js-reg-submit');
    var passError    = document.getElementById('regPassError');

    var required = [nameInput, surnameInput, emailInput, phoneInput, passInput, confirmInput];

    // ── Enable / disable submit ───────────────────────────────────────
    function updateBtn() {
        if (!submitBtn) return;
        var allFilled = required.every(function (el) {
            return el && el.value.trim().length > 0;
        });
        var agreed = consentCheck && consentCheck.checked;
        submitBtn.disabled = !(allFilled && agreed);
    }

    // ── Simple text inputs ────────────────────────────────────────────
    [nameInput, surnameInput, emailInput].forEach(function (el) {
        if (el) el.addEventListener('input', updateBtn);
    });

    // ── Phone mask ────────────────────────────────────────────────────
    if (typeof IMask !== 'undefined' && phoneInput) {
        IMask(phoneInput, { mask: '+{7} 000 000-00-00' });
    }
    if (phoneInput) phoneInput.addEventListener('input', updateBtn);

    // ── Eye toggles ───────────────────────────────────────────────────
    function setupEye(input, eyeBtn) {
        if (!input || !eyeBtn) return;

        input.addEventListener('input', function () {
            eyeBtn.hidden = this.value.length === 0;
            updateBtn();
        });

        eyeBtn.addEventListener('click', function () {
            var show = input.type === 'password';
            input.type = show ? 'text' : 'password';
            var open   = eyeBtn.querySelector('.js-eye-open');
            var closed = eyeBtn.querySelector('.js-eye-closed');
            if (open)   open.hidden   = show;
            if (closed) closed.hidden = !show;
        });
    }

    setupEye(passInput,    document.getElementById('regPassEye'));
    setupEye(confirmInput, document.getElementById('regConfirmEye'));

    // ── Consent checkbox ──────────────────────────────────────────────
    if (consentCheck) consentCheck.addEventListener('change', updateBtn);

    // ── Form submit ───────────────────────────────────────────────────
    var form = document.querySelector('.js-reg-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            if (passInput.value !== confirmInput.value) {
                if (passError) passError.hidden = false;
                if (passInput)    passInput.closest('.reg-field').classList.add('reg-field--error');
                if (confirmInput) confirmInput.closest('.reg-field').classList.add('reg-field--error');
                return;
            }

            if (passError) passError.hidden = true;
            if (passInput)    passInput.closest('.reg-field').classList.remove('reg-field--error');
            if (confirmInput) confirmInput.closest('.reg-field').classList.remove('reg-field--error');

            window.location.href = 'profile.html';
        });
    }

});
