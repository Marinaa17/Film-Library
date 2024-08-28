document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('signUp');
    btn.addEventListener("click", () => {

        document.getElementById("usernameErrorMessage").innerText = "";
        document.getElementById("emailErrorMessage").innerText = "";
        document.getElementById("passwordErrorMessage").innerText = "";
        document.getElementById("confirmPasswordErrorMessage").innerText = "";
        
        validateAndRegister();
    });
});

function validateSignUp() {

    var passed = true;
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var usernameAndPasswordRegex = /^[A-Za-z0-9]+$/;

    if (username === "") {
        document.getElementById("usernameErrorMessage").innerText = "Username is required.";
        passed = false;
    } 
    else if (username.length < 3) {
        document.getElementById("usernameErrorMessage").innerText = "Username should be at least 3 characters.";
        passed=false;
    }
    else if (!usernameAndPasswordRegex.test(username)) { 
        document.getElementById("usernameErrorMessage").innerText = "The username should contain only Latin letters or numbers.";
        passed = false;
    }

    if (email === "") {
        document.getElementById("emailErrorMessage").innerText = "Email is required.";
        passed = false;
    } 
    else if (!emailRegex.test(email)) {
        document.getElementById("emailErrorMessage").innerText = "Please enter a valid email address.";
        passed=false;
    }


    if (password === "") {
        document.getElementById("passwordErrorMessage").innerText = "Password is required.";
        passed = false;
    } 
    else if (password.length < 6) {
        document.getElementById("passwordErrorMessage").innerText = "Password should be at least 6 characters.";
        passed=false;
    }
    else if (!usernameAndPasswordRegex.test(password)) { 
        document.getElementById("passwordErrorMessage").innerText = "The password should contain only Latin letters or numbers.";
        passed = false;
    }

    if (confirmPassword === "") {
        document.getElementById("confirmPasswordErrorMessage").innerText = "Password is required.";
        passed = false;
    } 
    else if (password !== confirmPassword) {
        document.getElementById("confirmPasswordErrorMessage").innerText = "Passwords do not match. Please confirm the password.";
        passed=false;
    }

    return passed;
}

function registerUser(username, email, password) {

    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : [];

    const usernameExists = users.some(user => user.username === username);
    const emailExist = users.some(user => user.email === email);

    if (usernameExists) {
        document.getElementById("signUpErrorMessage").innerText = "User with this username already exists.";
        return;
    }

    if (emailExist) {
        document.getElementById("signUpErrorMessage").innerText = "User with this email already exists.";
        return;
    }

    const userData = {
        username: username,
        email: email,
        password: password,
        favourites: [],
        watched: [],
        addedMovies: []
    };


    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "logIn.html";

    alert("You have registered successfully!");
}

function validateAndRegister() {
    if (validateSignUp()) {
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        registerUser(username, email, password);
    }
}