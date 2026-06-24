document.addEventListener('DOMContentLoaded', function(){
    const btnCopy = document.querySelectorAll('.btn-copy');

    if(btnCopy.length) {
        btnCopy.forEach(btn => {
            btn.addEventListener('click', function () {
                const orderNumberEl = this.closest('.order-number')?.querySelector('.id-order');

                if (!orderNumberEl) {
                    console.warn('Элемент .id-order не найден');
                    return;
                }

                const orderNumber = orderNumberEl.textContent.trim();

                if (!orderNumber) {
                    console.warn('Номер заказа пустой');
                    return;
                }

                const span = this.querySelector('span');

                const onSuccess = () => {
                    span.textContent = 'Скопировано!';
                    setTimeout(() => span.textContent = 'Скопировать', 2000);
                };

                const onError = () => {
                    span.textContent = 'Ошибка!';
                    setTimeout(() => span.textContent = 'Скопировать', 2000);
                };

                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(orderNumber).then(onSuccess).catch(onError);
                } else {
                    // Fallback для старых браузеров
                    try {
                        const textarea = document.createElement('textarea');
                        textarea.value = orderNumber;
                        textarea.style.position = 'fixed';
                        textarea.style.opacity = '0';
                        document.body.appendChild(textarea);
                        textarea.focus();
                        textarea.select();
                        const success = document.execCommand('copy');
                        document.body.removeChild(textarea);
                        success ? onSuccess() : onError();
                    } catch (err) {
                        console.error('Ошибка копирования:', err);
                        onError();
                    }
                }
            });
        });
    }
})