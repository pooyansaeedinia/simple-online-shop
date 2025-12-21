document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        let isValid = true;
        let messages = [];

        // Fullname validation
        const fullname = form.querySelector("input[name='fullname']").value.trim();
        if (fullname.length < 3) {
            isValid = false;
            messages.push("Full name must be at least 3 characters long.");
        }

        // Address validation
        const address = form.querySelector("textarea[name='address']").value.trim();
        if (address.length < 10) {
            isValid = false;
            messages.push("Address must be at least 10 characters long.");
        }

        // Phone validation (example: must start with 09 and be 11 digits)
        const phone = form.querySelector("input[name='phone']").value.trim();
        const phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(phone)) {
            isValid = false;
            messages.push("Phone number is invalid. It must start with 09 and be 11 digits.");
        }

        // Payment method validation
        const payment = form.querySelector("input[name='payment']:checked");
        if (!payment) {
            isValid = false;
            messages.push("Please select a payment method.");
        }

        if (!isValid) {
            event.preventDefault();
            alert(messages.join("\n"));
        }
    });
});
