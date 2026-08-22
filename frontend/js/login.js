// ======================================
// KASUMET V1
// BUYER LOGIN
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const form =
        document.getElementById("buyerLoginForm");

    const message =
        document.getElementById("loginMessage");


    // ======================================
    // CHECK FORM
    // ======================================

    if (!form) {
        return;
    }


    // ======================================
    // LOGIN SUBMIT
    // ======================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        // ======================================
        // VALIDATION
        // ======================================

        if (!email) {

            showMessage(
                "Please enter your email address.",
                "error"
            );

            return;
        }


        if (!password) {

            showMessage(
                "Please enter your password.",
                "error"
            );

            return;
        }


        // ======================================
        // GET TEMPORARY BUYER
        // ======================================

        const savedBuyer =
            localStorage.getItem("kasumetBuyer");


        if (!savedBuyer) {

            showMessage(
                "No buyer account found. Please register first.",
                "error"
            );

            return;
        }


        let buyer;

        try {

            buyer = JSON.parse(savedBuyer);

        } catch (error) {

            showMessage(
                "Account data is invalid. Please register again.",
                "error"
            );

            return;
        }


        // ======================================
        // CHECK EMAIL
        // ======================================

        if (
            buyer.email.toLowerCase() !==
            email.toLowerCase()
        ) {

            showMessage(
                "Email or password is incorrect.",
                "error"
            );

            return;
        }


        // ======================================
        // DEMO LOGIN
        // ======================================

        /*
            IMPORTANT:

            This is only a frontend demo.

            We are NOT storing the password
            in localStorage.

            Real authentication will be added
            later using a secure backend,
            hashed passwords and database.
        */


        localStorage.setItem(
            "kasumetLoggedIn",
            "true"
        );


        localStorage.setItem(
            "kasumetUserType",
            "buyer"
        );


        // ======================================
        // SUCCESS
        // ======================================

        showMessage(
            "Login successful. Welcome to KASUMET!",
            "success"
        );


        // Go back to homepage after a short delay

        setTimeout(function () {

            window.location.href =
                "index.html";

        }, 1200);

    });


    // ======================================
    // MESSAGE FUNCTION
    // ======================================

    function showMessage(text, type) {

        if (!message) {
            return;
        }

        message.textContent = text;

        message.className =
            "register-message " + type;

    }

});
