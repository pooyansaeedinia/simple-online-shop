document.getElementById("addToCartGuest").addEventListener("click", function () {

    // نمایش پیام
    let msg = document.getElementById("loginMessage");
    msg.style.display = "block";

    // انتقال بعد از 2 ثانیه
    setTimeout(function () {
        window.location.href = "/accounts/login/";
    }, 2000);

});
