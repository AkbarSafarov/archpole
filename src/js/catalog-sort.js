document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.js-sort-toggle').forEach(function (btn) {
        var wrap = btn.closest('.js-sort-wrap');
        if (!wrap) return;
        var list = wrap.querySelector('.js-sort-list');
        if (!list) return;

        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = !list.hidden;
            document.querySelectorAll('.js-sort-list').forEach(function (l) { l.hidden = true; });
            document.querySelectorAll('.js-sort-toggle').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
            if (!isOpen) {
                list.hidden = false;
                btn.setAttribute('aria-expanded', 'true');
            }
        });

        list.querySelectorAll('.js-sort-opt').forEach(function (opt) {
            opt.addEventListener('click', function () {
                list.querySelectorAll('.js-sort-opt').forEach(function (o) { o.classList.remove('is-active'); });
                this.classList.add('is-active');
                var label = btn.querySelector('.js-sort-label');
                if (label) label.textContent = this.textContent.trim();
                list.hidden = true;
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    });

    document.addEventListener('click', function () {
        document.querySelectorAll('.js-sort-list').forEach(function (l) { l.hidden = true; });
        document.querySelectorAll('.js-sort-toggle').forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
    });

    var subnavPrev = document.querySelector('.js-subnav-prev');
    var subnavNext = document.querySelector('.js-subnav-next');
    var subnavScroll = document.querySelector('.js-subnav-scroll');
    if (subnavScroll) {
        var updateSubnavArrows = function () {
            if (!subnavPrev && !subnavNext) return;
            var maxScroll = subnavScroll.scrollWidth - subnavScroll.clientWidth;
            if (subnavPrev) subnavPrev.classList.toggle('is-disabled', subnavScroll.scrollLeft <= 0);
            if (subnavNext) subnavNext.classList.toggle('is-disabled', subnavScroll.scrollLeft >= maxScroll - 1);
        };

        if (subnavPrev && subnavNext) {
            var scrollStep = 220;
            subnavPrev.addEventListener('click', function () {
                subnavScroll.scrollBy({ left: -scrollStep, behavior: 'smooth' });
            });
            subnavNext.addEventListener('click', function () {
                subnavScroll.scrollBy({ left: scrollStep, behavior: 'smooth' });
            });
            subnavScroll.addEventListener('scroll', updateSubnavArrows);
            window.addEventListener('resize', updateSubnavArrows);
            updateSubnavArrows();
        }

        var isDown = false;
        var dragged = false;
        var startX = 0;
        var startScrollLeft = 0;
        var DRAG_THRESHOLD = 6;

        var stopDragging = function () {
            isDown = false;
            subnavScroll.classList.remove('is-dragging');
        };

        subnavScroll.addEventListener('mousedown', function (e) {
            if (e.button !== 0) return;
            isDown = true;
            dragged = false;
            startX = e.pageX;
            startScrollLeft = subnavScroll.scrollLeft;
            subnavScroll.classList.add('is-dragging');
            e.preventDefault();
        });

        subnavScroll.addEventListener('dragstart', function (e) {
            e.preventDefault();
        });

        window.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            var delta = e.pageX - startX;
            if (Math.abs(delta) > DRAG_THRESHOLD) dragged = true;
            if (dragged) {
                e.preventDefault();
                subnavScroll.scrollLeft = startScrollLeft - delta;
            }
        });

        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('blur', stopDragging);

        subnavScroll.addEventListener('click', function (e) {
            if (dragged) {
                e.preventDefault();
                e.stopPropagation();
                dragged = false;
            }
        }, true);

        subnavScroll.addEventListener('wheel', function (e) {
            if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
            subnavScroll.scrollLeft += e.deltaY;
            e.preventDefault();
        }, { passive: false });
    }

    var subnavTabs = document.querySelectorAll('.js-subnav-tab');
    if (subnavTabs.length) {
        subnavTabs.forEach(function (tab) {
            tab.addEventListener('click', function (e) {
                subnavTabs.forEach(function (t) { t.classList.remove('is-active'); });
                this.classList.add('is-active');
            });
        });
    }

    var collTags = document.querySelectorAll('.js-coll-tag');
    if (collTags.length) {
        var collRight = document.querySelector('.cat5-collections__right');
        var collPhoto = collRight && collRight.querySelector('.cat5-collections__photo img');
        var collCardImg = collRight && collRight.querySelector('.product-card__image img');
        var collCardName = collRight && collRight.querySelector('.product-card__name');
        var collCardPrice = collRight && collRight.querySelector('.product-card__price');
        var collCardNew = collRight && collRight.querySelector('.product-card__image .new');

        collTags.forEach(function (tag) {
            tag.addEventListener('click', function (e) {
                e.preventDefault();
                collTags.forEach(function (t) { t.classList.remove('is-active'); });
                this.classList.add('is-active');

                var photo = this.dataset.photo;
                var productImg = this.dataset.productImg;
                var productName = this.dataset.productName;
                var productPrice = this.dataset.productPrice;
                var isNew = this.dataset.new === 'true';

                if (collRight) collRight.classList.add('is-loading');

                if (collPhoto && photo) {
                    collPhoto.src = photo;
                    collPhoto.onload = function () {
                        if (collRight) collRight.classList.remove('is-loading');
                    };
                }
                if (collCardImg && productImg) {
                    collCardImg.src = productImg;
                    collCardImg.alt = productName || '';
                }
                if (collCardName && productName) collCardName.textContent = productName;
                if (collCardPrice && productPrice) collCardPrice.textContent = productPrice;
                if (collCardNew) collCardNew.style.display = isNew ? '' : 'none';
            });
        });
    }



    var promoEl = document.querySelector('.cat6-promo__swiper');
    if (promoEl) {
        var promoPhoto = document.querySelector('.cat6-promo__photo img');

        function updatePromoPhoto(swiper) {
            var activeSlide = swiper.slides[swiper.activeIndex];
            var photo = activeSlide && activeSlide.dataset.photo;
            if (photo && promoPhoto) promoPhoto.src = photo;
        }

        new Swiper(promoEl, {
            loop: true,
            slidesPerView: 1,
            speed: 500,
            navigation: {
                prevEl: '.cat6-promo .arrow_btn.prev',
                nextEl: '.cat6-promo .arrow_btn.next'
            },
            pagination: {
                el: '.cat6-promo__dots',
                clickable: true
            },
            on: {
                init: function () {
                    updatePromoPhoto(this);
                },
                slideChange: function () {
                    updatePromoPhoto(this);
                }
            }
        });
    }

    var tabs = document.querySelectorAll('.collection-pg__tab');
    if (tabs.length) {
        tabs.forEach(function (tab) {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                tabs.forEach(function (t) { t.classList.remove('is-active'); });
                this.classList.add('is-active');
            });
        });
    }

});
