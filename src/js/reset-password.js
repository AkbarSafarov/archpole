document.addEventListener('DOMContentLoaded', function () {

    var passInput    = document.getElementById('rpPass');
    var confirmInput = document.getElementById('rpConfirm');
    var submitBtn    = document.querySelector('.js-rp-submit');
    var step1        = document.getElementById('rpStep1');
    var success      = document.getElementById('rpSuccess');
    var title        = document.querySelector('.js-rp-title');

    if (!passInput || !confirmInput || !submitBtn) return;

    function setupEye(input, eyeBtn) {
        if (!input || !eyeBtn) return;

        input.addEventListener('input', function () {
            eyeBtn.hidden = this.value.length === 0;
            updateBtn();
        });

        eyeBtn.addEventListener('click', function () {
            var show   = input.type === 'password';
            input.type = show ? 'text' : 'password';
            var open   = eyeBtn.querySelector('.js-eye-open');
            var closed = eyeBtn.querySelector('.js-eye-closed');
            if (open)   open.hidden   = show;
            if (closed) closed.hidden = !show;
        });
    }

    setupEye(passInput,    document.getElementById('rpPassEye'));
    setupEye(confirmInput, document.getElementById('rpConfirmEye'));

    function updateBtn() {
        submitBtn.disabled = !(
            passInput.value.length >= 6 &&
            confirmInput.value.length >= 6
        );
    }

    confirmInput.addEventListener('input', updateBtn);

    submitBtn.addEventListener('click', function () {
        step1.hidden   = true;
        success.hidden = false;
        if (title) title.textContent = 'ВОССТАНОВЛЕНИЕ ПАРОЛЯ';
    });

});
