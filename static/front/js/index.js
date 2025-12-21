(function () {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-inner > a');
    const indicatorsContainer = document.getElementById('heroIndicators');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');

    let current = 0;
    let autoPlay = true;
    const intervalTime = 4000;
    let timer = null;

    slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        if (i === 0) btn.classList.add('active');
        btn.addEventListener('click', () => {
            showSlide(i);
            resetTimer();
        });
        indicatorsContainer.appendChild(btn);
    });

    const indicators = indicatorsContainer.querySelectorAll('button');

    function showSlide(index) {
        const newIndex = (index + slides.length) % slides.length;
        if (newIndex === current) return;
        slides[current].classList.remove('active');
        indicators[current].classList.remove('active');

        slides[newIndex].classList.add('active');
        indicators[newIndex].classList.add('active');

        current = newIndex;
    }

    prevBtn.addEventListener('click', () => {
        showSlide(current - 1);
        resetTimer();
    });

    nextBtn.addEventListener('click', () => {
        showSlide(current + 1);
        resetTimer();
    });

    function autoNext() {
        showSlide(current + 1);
    }

    function startTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(() => {
            if (autoPlay) autoNext();
        }, intervalTime);
    }

    function resetTimer() {
        startTimer();
    }

    carousel.addEventListener('mouseenter', () => autoPlay = false);
    carousel.addEventListener('mouseleave', () => autoPlay = true);

    slides.forEach((s, i) => {
        if (i === 0) s.classList.add('active');
        else s.classList.remove('active');
    });
    startTimer();
})();

function scrollRow(rowId, direction) {
    const row = document.getElementById(rowId);
    if (!row) return;
    const card = row.querySelector('.product-card');
    const cardWidth = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(row).gap || 16) : 240;
    const scrollAmount = cardWidth * 2 * direction;
    row.scrollBy({left: scrollAmount, behavior: 'smooth'});
}

(function syncCartCounts() {
    const mainCount = document.getElementById('cartCount');
    const footerCount = document.getElementById('footerCartCount');
    if (mainCount && footerCount) {
        footerCount.textContent = mainCount.textContent;
    }
})();

