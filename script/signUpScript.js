document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('signUp');
    btn.addEventListener("click", () => {
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
    // Get the data from local storage using the email as the key
    const userDataString = localStorage.getItem(email);

    // If user data is found, parse the JSON string back to an object
    return userDataString ? JSON.parse(userDataString) : null;
}

// Function to save user data after registration
function registerUser(email, password) {
    // Check if the user already exists
    if (getUserData(email)) {
        document.getElementById("signUpErrorMessage").innerText = "User with this email already exists.";
        return;
    }

    const userData = {
        email: email,
        password: password
    };

    // Convert the data to a JSON string
    const userDataString = JSON.stringify(userData);

    // Save the data to local storage using the email as the key
    localStorage.setItem(email, userDataString);

    window.location.href = "home.html";
    alert("You have registered successfully!");
}

function validateAndRegister() {
    if (validateSignUp()) {
        // Validation successful, proceed with registration
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        registerUser(email, password);
    } else {
        // Validation failed, handle accordingly (e.g., show an error message)
        // alert("Sign-up validation failed. Please check your inputs.");
    }
}