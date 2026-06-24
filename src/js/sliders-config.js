function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const SWIPER_CONFIGS = {
    baseFadeConfig: {
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        fadeEffect: { crossFade: true },
        speed: 1000
    },

    baseProductsConfig: {
        slidesPerView: 4,
        spaceBetween: 24,
        loop: true,
        autoplay: { delay: 5000, disableOnInteraction: false },
        breakpoints: {
            0:    { slidesPerView: 1 },
            580:  { slidesPerView: 2 },
            768:  { slidesPerView: 2 },
            992:  { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
        }
    },

    baseMobileSwiper: {
        slidesPerView: 'auto',
        spaceBetween: 12,
        loop: true
    }
};

const SLIDER_CONFIGS = {
    '.mySwiper_banner': {
        ...SWIPER_CONFIGS.baseFadeConfig,
        pagination: { el: '.slider_top_block .swiper-pagination', clickable: true },
        navigation: { nextEl: '.slider_top_block .arrow_btn.next', prevEl: '.slider_top_block .arrow_btn.prev' }
    },
    '.new_products .mySwiper_products': {
        ...SWIPER_CONFIGS.baseProductsConfig,
        pagination: { el: '.new_products .swiper-pagination', clickable: true },
        navigation: { nextEl: '.new_products .arrow_btn.next', prevEl: '.new_products .arrow_btn.prev' }
    },
    '.hit_products .mySwiper_products': {
        ...SWIPER_CONFIGS.baseProductsConfig,
        pagination: { el: '.hit_products .swiper-pagination', clickable: true },
        navigation: { nextEl: '.hit_products .arrow_btn.next', prevEl: '.hit_products .arrow_btn.prev' }
    },
    '.technologies_section .mySwiper_technologies': {
        ...SWIPER_CONFIGS.baseProductsConfig,
        navigation: { nextEl: '.technologies_section .arrow_btn.next', prevEl: '.technologies_section .arrow_btn.prev' }
    },
    '.comparison-products-wrap .mySwiper_products-comparison': {
        ...SWIPER_CONFIGS.baseProductsConfig,
        loop: false,
        autoplay: false,
        navigation: { nextEl: '.comparison-products-wrap .arrow_btn.next', prevEl: '.comparison-products-wrap .arrow_btn.prev' }
    }
};

class SwiperManager {
    constructor() {
        this.swiperInstances = new Map();
        this.initUniversalSwipers();
    }

    initUniversalSwipers() {
        this.initDataAttributeSwipers();
        this.initLegacySwipers();
    }

    initDataAttributeSwipers() {
        document.querySelectorAll('[data-swiper]').forEach(el => this.initSwiperFromAttributes(el));
    }

    initSwiperFromAttributes(element) {
        try {
            const config = this.buildConfigFromAttributes(element);
            this.applyNavigation(element, config);
            this.applyPagination(element, config);
            const swiper = new Swiper(element, config);
            const id = `swiper-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            this.swiperInstances.set(id, swiper);
            element.dataset.swiperInstanceId = id;
        } catch (error) {
            console.error('Error initializing swiper:', error, element);
        }
    }

    buildConfigFromAttributes(element) {
        const config = {};
        config.loop = element.dataset.swiperLoop !== 'false';
        config.speed = parseInt(element.dataset.swiperSpeed) || 500;
        config.spaceBetween = parseInt(element.dataset.swiperSpace) || 0;

        if (element.dataset.swiperAutoplay === 'true') {
            config.autoplay = { delay: parseInt(element.dataset.swiperAutoplayDelay) || 5000, disableOnInteraction: false };
        }

        if (element.dataset.swiperEffect) {
            config.effect = element.dataset.swiperEffect;
            if (element.dataset.swiperEffect === 'fade') config.fadeEffect = { crossFade: true };
        }

        if (element.dataset.swiperPerView) {
            config.slidesPerView = element.dataset.swiperPerView === 'auto' ? 'auto' : parseInt(element.dataset.swiperPerView);
        }

        if (element.dataset.swiperDirection) config.direction = element.dataset.swiperDirection;
        if (element.dataset.swiperCentered === 'true') config.centeredSlides = true;

        if (element.dataset.swiperBreakpoints) {
            try {
                config.breakpoints = JSON.parse(element.dataset.swiperBreakpoints);
            } catch (e) {
                config.breakpoints = { 0: { slidesPerView: 'auto' }, 768: { slidesPerView: 2 }, 992: { slidesPerView: 3 } };
            }
        }

        return config;
    }

    applyNavigation(element, config) {
        const container = element.closest('[data-swiper-container]') || element.parentElement;
        const nextEl = container.querySelector('.swiper-button-next, .arrow_btn.next, [data-swiper-next]');
        const prevEl = container.querySelector('.swiper-button-prev, .arrow_btn.prev, [data-swiper-prev]');
        if (nextEl && prevEl) config.navigation = { nextEl, prevEl };
        if (element.dataset.swiperNext && element.dataset.swiperPrev) {
            config.navigation = { nextEl: element.dataset.swiperNext, prevEl: element.dataset.swiperPrev };
        }
    }

    applyPagination(element, config) {
        if (element.dataset.swiperPagination) {
            const el = document.querySelector(element.dataset.swiperPagination);
            if (el) config.pagination = { el, clickable: true, type: element.dataset.swiperPaginationType || 'bullets' };
        }
    }

    initLegacySwipers() {
        Object.keys(SLIDER_CONFIGS).forEach(selector => {
            const element = document.querySelector(selector);
            if (element && !element.hasAttribute('data-swiper')) {
                this.swiperInstances.set(selector, new Swiper(element, SLIDER_CONFIGS[selector]));
            }
        });
    }

    getSwiper(element) {
        if (element.dataset.swiperInstanceId) return this.swiperInstances.get(element.dataset.swiperInstanceId);
        for (const [key, swiper] of this.swiperInstances) {
            if (key.startsWith('.') && element.matches(key)) return swiper;
        }
        return null;
    }

    destroyAll() {
        this.swiperInstances.forEach(s => s.destroy());
        this.swiperInstances.clear();
    }

    addSwiper(element, customConfig = {}) {
        if (!element) return null;
        if (element.hasAttribute('data-swiper')) return this.initSwiperFromAttributes(element);
        const swiper = new Swiper(element, { loop: true, ...customConfig });
        const id = `dynamic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        this.swiperInstances.set(id, swiper);
        element.dataset.swiperInstanceId = id;
        return swiper;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.swiperManager = new SwiperManager();
});

window.initSwiper = (element, customConfig = {}) => {
    if (!window.swiperManager) window.swiperManager = new SwiperManager();
    return window.swiperManager.addSwiper(element, customConfig);
};

window.destroyAllSwipers = () => {
    if (window.swiperManager) window.swiperManager.destroyAll();
};
