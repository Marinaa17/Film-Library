document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('signUp');
    btn.addEventListener("click", () => {

        document.getElementById("emailErrorMessage").innerText = "";
        document.getElementById("passwordErrorMessage").innerText = "";
        document.getElementById("confirmPasswordErrorMessage").innerText = "";
        
        validateAndRegister();
    });
});

function validateSignUp() {

    var passed = true;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        document.getElementById("emailErrorMessage").innerText = "Please enter a valid email address.";
        passed=false;
    }

    if (password.length < 6) {
        document.getElementById("passwordErrorMessage").innerText = "Password should be at least 6 characters.";
        passed=false;
    }

    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordErrorMessage").innerText = "Passwords do not match. Please confirm the password.";
        passed=false;
    }

    return passed;
}

function getUserData(email) {
    const userDataString = localStorage.getItem(email);

    return userDataString ? JSON.parse(userDataString) : null;
}

function registerUser(email, password) {
    if (getUserData(email)) {
        document.getElementById("signUpErrorMessage").innerText = "User with this email already exists.";
        return;
    }

    const userData = {
        email: email,
        password: password,
        favourites: [],
        watched: [],
        addedMovies: []
    };

    const userDataString = JSON.stringify(userData);
    debugger;
    localStorage.setItem(email, userDataString);

    window.location.href = "logIn.html";

    alert("You have registered successfully!");
}

function validateAndRegister() {
    if (validateSignUp()) {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        registerUser(email, password);
    }
}