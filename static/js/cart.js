document.querySelectorAll(".cart-item").forEach(item => {

    const minus = item.querySelector(".minus");
    const plus = item.querySelector(".plus");
    const input = item.querySelector(".qty-input");

    minus.addEventListener("click", () => {
        let val = parseInt(input.value);
        if (val > 1) input.value = val - 1;
    });

    plus.addEventListener("click", () => {
        let val = parseInt(input.value);
        input.value = val + 1;
    });

});

