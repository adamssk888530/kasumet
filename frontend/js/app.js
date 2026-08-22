// ===============================
// KASUMET V1
// Main JavaScript
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // BUYER REGISTER BUTTON
    // ===============================

    const buyerRegisterBtn =
        document.getElementById("buyerRegisterBtn");

    if (buyerRegisterBtn) {

        buyerRegisterBtn.addEventListener("click", function () {

            alert(
                "KASUMET BUYER REGISTRATION\n\n" +
                "Buyer registration page zai zo a mataki na gaba."
            );

        });

    }


    // ===============================
    // SELLER REGISTER BUTTON
    // ===============================

    const sellerRegisterBtn =
        document.getElementById("sellerRegisterBtn");

    if (sellerRegisterBtn) {

        sellerRegisterBtn.addEventListener("click", function () {

            alert(
                "KASUMET SELLER REGISTRATION\n\n" +
                "Seller verification system zai zo a mataki na gaba."
            );

        });

    }


    // ===============================
    // CONSOLE MESSAGE
    // ===============================

    console.log(
        "KASUMET V1 loaded successfully."
    );

});
