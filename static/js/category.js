document.addEventListener('DOMContentLoaded', function () {
    // // Newsletter form submission
    // const newsletterForm = document.getElementById('newsletterForm');
    // if (newsletterForm) {
    //     newsletterForm.addEventListener('submit', function (e) {
    //         e.preventDefault();
    //         const email = this.querySelector('input[type="email"]').value;
    //         if (email) {
    //             alert('Thank you for subscribing!');
    //             this.querySelector('input[type="email"]').value = '';
    //         }
    //     });
    // }

    // Animation for cards
    const cards = document.querySelectorAll('.category-card, .promo-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {threshold: 0.1});

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
