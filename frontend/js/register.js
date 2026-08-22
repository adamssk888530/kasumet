// ======================================
// KASUMET V1
// BUYER REGISTRATION
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("buyerRegisterForm");

    const message =
        document.getElementById("registerMessage");


    // ======================================
    // CHECK FORM
    // ======================================

    if (!form) {
        return;
    }


    // ======================================
    // SUBMIT REGISTRATION
    // ======================================

    form.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get values
        const fullName =
            document.getElementById("fullName").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const agreeTerms =
            document.getElementById("agreeTerms").checked;


        // ======================================
        // VALIDATION
        // ======================================

        if (!fullName) {

            showMessage(
                "Please enter your full name.",
                "error"
            );

            return;
        }


        if (!phone) {

            showMessage(
                "Please enter your phone number.",
                "error"
            );

            return;
        }


        if (!email) {

            showMessage(
                "Please enter your email address.",
                "error"
            );

            return;
        }


        if (password.length < 8) {

            showMessage(
                "Password must be at least 8 characters.",
                "error"
            );

            return;
        }


        if (password !== confirmPassword) {

            showMessage(
                "Passwords do not match.",
                "error"
            );

            return;
        }


        if (!agreeTerms) {

            showMessage(
                "You must agree to the KASUMET Terms.",
                "error"
            );

            return;
        }


        // ======================================
        // TEMPORARY DEMO
        // ======================================

        const buyer = {

            fullName: fullName,

            phone: phone,

            email: email,

            createdAt: new Date().toISOString(),

            accountType: "buyer"

        };


        // Save temporary buyer information
        // This is ONLY for frontend testing.
        localStorage.setItem(
            "kasumetBuyer",
            JSON.stringify(buyer)
        );


        // ======================================
        // SUCCESS
        // ======================================

        showMessage(
            "Registration information accepted. Verification will be added next.",
            "success"
        );


        // Clear password fields
        document.getElementById("password").value = "";

        document.getElementById("confirmPassword").value = "";


        console.log(
            "KASUMET Buyer:",
            buyer
        );

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
