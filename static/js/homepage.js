document.addEventListener("DOMContentLoaded", function () {

    const slides = document.querySelectorAll(".hero-slide");
    const indicators = document.getElementById("heroIndicators");
    const prev = document.getElementById("heroPrev");
    const next = document.getElementById("heroNext");

    if (!slides.length) return;

    let current = 0;

    function show(index) {
        slides.forEach(s => s.classList.remove("active"));
        indicators.querySelectorAll("span")
            .forEach(d => d.classList.remove("active"));

        slides[index].classList.add("active");
        indicators.children[index].classList.add("active");
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        show(current);
    }

    function prevSlide() {
        current = (current - 1 + slides.length) % slides.length;
        show(current);
    }

    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => {
            current = i;
            show(current);
        });
        indicators.appendChild(dot);
    });

    show(0);

    next.addEventListener("click", nextSlide);
    prev.addEventListener("click", prevSlide);

    setInterval(nextSlide, 5000);
});