document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("checkoutForm");

    if (!form) return;

    // Real-time validation
    const fullnameInput = document.getElementById("fullname");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");
    const paymentInputs = document.querySelectorAll("input[name='payment']");

    // Fullname validation
    if (fullnameInput) {
        fullnameInput.addEventListener("input", function() {
            const errorElement = document.getElementById("fullname-error");
            if (this.value.trim().length < 3 && this.value.trim().length > 0) {
                this.classList.add("error");
                errorElement.textContent = "Full name must be at least 3 characters.";
            } else {
                this.classList.remove("error");
                errorElement.textContent = "";
            }
        });
    }

    // Phone validation
    if (phoneInput) {
        phoneInput.addEventListener("input", function() {
            const errorElement = document.getElementById("phone-error");
            const phoneRegex = /^09\d{9}$/;
            if (!phoneRegex.test(this.value.trim()) && this.value.trim().length > 0) {
                this.classList.add("error");
                errorElement.textContent = "Phone must start with 09 and be 11 digits.";
            } else {
                this.classList.remove("error");
                errorElement.textContent = "";
            }
        });
    }

    // Address validation
    if (addressInput) {
        addressInput.addEventListener("input", function() {
            const errorElement = document.getElementById("address-error");
            if (this.value.trim().length < 10 && this.value.trim().length > 0) {
                this.classList.add("error");
                errorElement.textContent = "Address must be at least 10 characters.";
            } else {
                this.classList.remove("error");
                errorElement.textContent = "";
            }
        });
    }

    // Form submission validation
    form.addEventListener("submit", function (event) {
        let isValid = true;
        let messages = [];

        // Clear all previous errors
        document.querySelectorAll(".checkout-error-message").forEach(el => el.textContent = "");
        document.querySelectorAll(".checkout-input").forEach(el => el.classList.remove("error"));

        // Fullname validation
        const fullname = fullnameInput.value.trim();
        if (fullname.length < 3) {
            isValid = false;
            document.getElementById("fullname-error").textContent = "Full name must be at least 3 characters.";
            fullnameInput.classList.add("error");
        }

        // Address validation
        const address = addressInput.value.trim();
        if (address.length < 10) {
            isValid = false;
            document.getElementById("address-error").textContent = "Address must be at least 10 characters.";
            addressInput.classList.add("error");
        }

        // Phone validation
        const phone = phoneInput.value.trim();
        const phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(phone)) {
            isValid = false;
            document.getElementById("phone-error").textContent = "Phone number must start with 09 and be 11 digits.";
            phoneInput.classList.add("error");
        }

        // Payment method validation
        const payment = document.querySelector("input[name='payment']:checked");
        if (!payment) {
            isValid = false;
            document.getElementById("payment-error").textContent = "Please select a payment method.";
        }

        if (!isValid) {
            event.preventDefault();

            // Scroll to first error
            const firstError = document.querySelector(".checkout-input.error");
            if (firstError) {
                firstError.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    });

    // Add loading state on submit
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        form.addEventListener("submit", function() {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Processing...</span> <i class="bi bi-hourglass-split"></i>';
        });
    }
});