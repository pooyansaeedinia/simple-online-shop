document.addEventListener('DOMContentLoaded', function() {
    // ==================== STAR RATING FIX ====================
    const starRating = document.querySelector('.star-rating-input');
    const ratingInput = document.getElementById('rating-value');
    
    if (starRating && ratingInput) {
        const stars = starRating.querySelectorAll('i');
        
        // تابع برای به‌روزرسانی ستاره‌ها
        function updateStars(value) {
            stars.forEach((star, index) => {
                if (index < value) {
                    star.classList.remove('bi-star');
                    star.classList.add('bi-star-fill');
                    star.style.color = '#fbbf24';
                } else {
                    star.classList.remove('bi-star-fill');
                    star.classList.add('bi-star');
                    star.style.color = '#cbd5e1';
                }
            });
        }
        
        // رویداد کلیک روی ستاره‌ها
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = parseInt(this.dataset.rating);
                ratingInput.value = rating;
                updateStars(rating);
            });
            
            // hover effect
            star.addEventListener('mouseenter', function() {
                const hoverRating = parseInt(this.dataset.rating);
                stars.forEach((s, index) => {
                    if (index < hoverRating) {
                        s.style.color = '#fbbf24';
                    } else {
                        s.style.color = '#cbd5e1';
                    }
                });
            });
            
            star.addEventListener('mouseleave', function() {
                const currentRating = ratingInput.value ? parseInt(ratingInput.value) : 0;
                updateStars(currentRating);
            });
        });
        
        // مقدار اولیه (اگه خطایی برگشته باشه)
        if (ratingInput.value) {
            updateStars(parseInt(ratingInput.value));
        }
    }
    
    // ==================== TABS ====================
    const tabItems = document.querySelectorAll('.tab-nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabItems.length) {
        tabItems.forEach(item => {
            item.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                
                tabItems.forEach(i => i.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                this.classList.add('active');
                document.getElementById(`tab-${tabId}`).classList.add('active');
            });
        });
    }
    
    // ==================== GUEST ADD TO CART ====================
    const addToCartGuest = document.getElementById('addToCartGuest');
    const loginMessage = document.getElementById('loginMessage');
    
    if (addToCartGuest) {
        addToCartGuest.addEventListener('click', function() {
            if (loginMessage) {
                loginMessage.style.display = 'flex';
            }
            setTimeout(() => {
                const next = encodeURIComponent(window.location.pathname + window.location.search);
                window.location.href = "/accounts/login/?next=" + next;
            }, 2000);
        });
    }
    
    // ==================== GUEST COMMENT ====================
    const guestCommentBtn = document.getElementById('guestCommentBtn');
    const commentLoginWarning = document.getElementById('comment-login-warning');
    
    if (guestCommentBtn) {
        guestCommentBtn.addEventListener('click', function() {
            if (commentLoginWarning) {
                commentLoginWarning.style.display = 'block';
            }
            setTimeout(() => {
                const next = encodeURIComponent(window.location.pathname + window.location.search);
                window.location.href = "/accounts/login/?next=" + next;
            }, 2000);
        });
    }
    
    // ==================== MOBILE CART TOGGLE ====================
    const mobileCartToggle = document.getElementById('mobileCartToggle');
    const mobileCartSidebar = document.getElementById('mobileCartSidebar');
    const closeMobileCart = document.getElementById('closeMobileCart');
    
    if (mobileCartToggle && mobileCartSidebar) {
        mobileCartToggle.addEventListener('click', function() {
            mobileCartSidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        if (closeMobileCart) {
            closeMobileCart.addEventListener('click', function() {
                mobileCartSidebar.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // بستن با کلیک بیرون
        document.addEventListener('click', function(e) {
            if (!mobileCartSidebar.contains(e.target) && !mobileCartToggle.contains(e.target) && mobileCartSidebar.classList.contains('active')) {
                mobileCartSidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ==================== WISHLIST TOGGLE ====================
    const wishlistBtn = document.getElementById('wishlistToggle');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('bi-heart')) {
                icon.classList.remove('bi-heart');
                icon.classList.add('bi-heart-fill');
                this.style.color = '#ef4444';
            } else {
                icon.classList.remove('bi-heart-fill');
                icon.classList.add('bi-heart');
                this.style.color = '';
            }
        });
    }
    
    // ==================== COMMENT FORM SUBMIT ====================
    const commentForm = document.getElementById('commentForm');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            const rating = document.getElementById('rating-value').value;
            if (!rating) {
                e.preventDefault();
                alert('Please select a rating');
            }
        });
    }
});