document.addEventListener('DOMContentLoaded', function() {
    // ==================== QUANTITY CONTROLS ====================
    const quantityControls = document.querySelectorAll('.quantity-control');

    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.quantity-minus');
        const plusBtn = control.querySelector('.quantity-plus');
        const input = control.querySelector('.quantity-input');
        const itemId = input.dataset.itemId;
        const cartItem = document.querySelector(`.cart-item[data-item-id="${itemId}"]`);
        const price = parseFloat(cartItem.dataset.price);

        // تابع به‌روزرسانی total
        function updateTotal(quantity) {
            const totalElement = document.getElementById(`total-${itemId}`);
            const subtotalElement = document.getElementById('summary-subtotal');
            const grandTotalElement = document.getElementById('summary-total');

            // محاسبه total جدید برای این آیتم
            const newTotal = (price * quantity).toFixed(2);
            totalElement.textContent = `$${newTotal}`;

            // محاسبه جمع کل سبد خرید
            let cartTotal = 0;
            document.querySelectorAll('.cart-item').forEach(item => {
                const itemPrice = parseFloat(item.dataset.price);
                const itemQty = parseInt(item.querySelector('.quantity-input').value);
                cartTotal += itemPrice * itemQty;
            });

            subtotalElement.textContent = `$${cartTotal.toFixed(2)}`;
            grandTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
        }

        // دکمه منفی
        if (minusBtn) {
            minusBtn.addEventListener('click', function() {
                let currentValue = parseInt(input.value);
                if (currentValue > 1) {
                    const newValue = currentValue - 1;
                    input.value = newValue;

                    // غیرفعال کردن دکمه منفی اگه عدد به 1 رسید
                    if (newValue <= 1) {
                        minusBtn.disabled = true;
                    }

                    // فعال کردن دکمه مثبت (همیشه فعاله)
                    plusBtn.disabled = false;

                    // به‌روزرسانی total
                    updateTotal(newValue);

                    // ارسال درخواست به سرور برای به‌روزرسانی (اختیاری)
                    updateCartItem(itemId, newValue);
                }
            });
        }

        // دکمه مثبت
        if (plusBtn) {
            plusBtn.addEventListener('click', function() {
                let currentValue = parseInt(input.value);
                const newValue = currentValue + 1;
                input.value = newValue;

                // فعال کردن دکمه منفی (چون الان عدد > 1 هست)
                if (minusBtn.disabled) {
                    minusBtn.disabled = false;
                }

                // به‌روزرسانی total
                updateTotal(newValue);

                // ارسال درخواست به سرور برای به‌روزرسانی (اختیاری)
                updateCartItem(itemId, newValue);
            });
        }

        // بررسی اولیه برای غیرفعال کردن دکمه منفی
        if (parseInt(input.value) <= 1) {
            minusBtn.disabled = true;
        }
    });

    // ==================== UPDATE CART ITEM (AJAX) ====================
    function updateCartItem(itemId, quantity) {
        // اینجا می‌تونی درخواست AJAX بزنی به سرور
        // مثلاً:
        /*
        fetch(`/cart/update/${itemId}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify({ quantity: quantity })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Cart updated successfully');
            }
        });
        */
    }

    // ==================== CLEAR CART ====================
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                window.location.href = "{% url 'cart:clear_cart' %}"; // این رو باید بسازی
            }
        });
    }

    // ==================== HELPER: GET COOKIE ====================
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});