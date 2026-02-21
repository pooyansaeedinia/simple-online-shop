// Guest add to cart – show login message and redirect after 2s
var addToCartGuest = document.getElementById("addToCartGuest");
if (addToCartGuest) {
    addToCartGuest.addEventListener("click", function () {
        var msg = document.getElementById("loginMessage");
        if (msg) msg.style.display = "block";
        setTimeout(function () {
            var next = encodeURIComponent(window.location.pathname + window.location.search);
            window.location.href = "/accounts/login/?next=" + next;
        }, 2000);
    });
}

// Guest add comment – show message then redirect to login after 2s
var guestCommentBtn = document.getElementById("guestCommentBtn");
if (guestCommentBtn) {
    guestCommentBtn.addEventListener("click", function () {
        var msg = document.getElementById("comment-login-warning");
        if (msg) msg.style.display = "block";
        setTimeout(function () {
            var next = encodeURIComponent(window.location.pathname + window.location.search);
            window.location.href = "/accounts/login/?next=" + next;
        }, 2000);
    });
}

// Comment form – star rating (only when form exists)
var commentForm = document.getElementById("commentForm");
if (commentForm) {
    var ratingInput = document.getElementById("rating-value");
    var stars = commentForm.querySelectorAll(".star-rating .star");

    function setRating(value) {
        if (!ratingInput) return;
        ratingInput.value = value;
        stars.forEach(function (star, index) {
            if (index < value) {
                star.classList.add("active");
            } else {
                star.classList.remove("active");
            }
        });
    }

    stars.forEach(function (star) {
        star.addEventListener("click", function () {
            var value = parseInt(this.getAttribute("data-value"), 10);
            setRating(value);
        });
    });

    commentForm.addEventListener("submit", function (e) {
        if (!ratingInput || !ratingInput.value || parseInt(ratingInput.value, 10) < 1) {
            e.preventDefault();
            alert("Please select a rating (1–5 stars).");
            return false;
        }
    });

    // Restore star selection when form is re-displayed after validation error
    if (ratingInput && ratingInput.value) {
        var initial = parseInt(ratingInput.value, 10);
        if (initial >= 1 && initial <= 5) setRating(initial);
    }
}
