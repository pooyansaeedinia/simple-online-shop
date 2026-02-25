/**
 * Zentrix Homepage JavaScript
 * Ultra Simple Version - Guaranteed to Work
 */

document.addEventListener("DOMContentLoaded", function() {
    initSimpleCarousel();
    initScrollButtons();
});

/**
 * Super Simple Carousel - No complexity
 */
function initSimpleCarousel() {
    // دریافت المان‌ها
    const slides = document.querySelectorAll(".hero-slide");
    const prevBtn = document.getElementById("heroPrev");
    const nextBtn = document.getElementById("heroNext");
    const indicators = document.getElementById("heroIndicators");

    // اگر اسلایدی نیست، خارج شو
    if (!slides.length) return;

    let currentSlide = 0;
    let autoPlayTimer;

    // ایجاد ایندیکیتورها
    if (indicators) {
        indicators.innerHTML = '';
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('span');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                goToSlide(index);
                resetTimer();
            });
            indicators.appendChild(dot);
        }
    }

    // نمایش اسلاید اول
    goToSlide(0);

    // رویداد دکمه بعدی
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
            resetTimer();
        });
    }

    // رویداد دکمه قبلی
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(currentSlide);
            resetTimer();
        });
    }

    // تابع رفتن به اسلاید مشخص
    function goToSlide(index) {
        // مخفی کردن همه اسلایدها
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // غیرفعال کردن همه ایندیکیتورها
        if (indicators) {
            indicators.querySelectorAll('span').forEach(dot => {
                dot.classList.remove('active');
            });
        }

        // نمایش اسلاید مورد نظر
        slides[index].classList.add('active');

        // فعال کردن ایندیکیتور مربوطه
        if (indicators && indicators.children[index]) {
            indicators.children[index].classList.add('active');
        }

        // به‌روزرسانی اسلاید جاری
        currentSlide = index;
    }

    // اتوپلی
    function startTimer() {
        autoPlayTimer = setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            goToSlide(currentSlide);
        }, 5000);
    }

    function resetTimer() {
        clearInterval(autoPlayTimer);
        startTimer();
    }

    // شروع اتوپلی
    startTimer();

    // توقف اتوپلی هنگام hover
    const carousel = document.querySelector('.modern-hero');
    if (carousel) {
        carousel.addEventListener('mouseenter', function() {
            clearInterval(autoPlayTimer);
        });

        carousel.addEventListener('mouseleave', function() {
            startTimer();
        });
    }
}

/**
 * Scroll buttons for product rows
 */
function initScrollButtons() {
    window.scrollRow = function(elementId, direction) {
        const container = document.getElementById(elementId);
        if (container) {
            const scrollAmount = 300;
            container.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    };
}