document.addEventListener('DOMContentLoaded', function () {

    var emailInput = document.getElementById('fpEmail');
    var submitBtn  = document.querySelector('.js-fp-submit');
    var step1      = document.getElementById('fpStep1');
    var step2      = document.getElementById('fpStep2');

    if (!emailInput || !submitBtn) return;

    emailInput.addEventListener('input', function () {
        submitBtn.disabled = this.value.trim().length === 0;
    });

    submitBtn.addEventListener('click', function () {
        step1.hidden = true;
        step2.hidden = false;
    });

});
