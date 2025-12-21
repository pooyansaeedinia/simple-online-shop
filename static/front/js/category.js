(function syncCartCounts() {
    const mainCount = document.getElementById('cartCount');
    const footerCount = document.getElementById('footerCartCount');
    if (mainCount && footerCount) {
        footerCount.textContent = mainCount.textContent;
    }
})();

