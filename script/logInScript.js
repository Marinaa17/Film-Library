document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('logIn');
    btn.addEventListener("click", () => {
        loginUser();
    });
});


function getUserData(email) {
    // Get the data from local storage using the email as the key
    const userDataString = localStorage.getItem(email);

    // If user data is found, parse the JSON string back to an object
    return userDataString ? JSON.parse(userDataString) : null;
}

function loginUser() {
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = getUserData(email);

    // Check if the user exists
    if (!userData) {
        document.getElementById("emailErrorMessage").innerText = "User with this email does not exist.";
        return;
    }

    // Check if the entered password matches the stored password
    if (userData.password !== password) {
        document.getElementById("passwordErrorMessage").innerText = "Incorrect password.";
        return;
    }

    // Redirect to home.html
    window.location.href = "home.html";

    // Show alert after the page has fully loaded (window.onload event)
    //window.onload = function () {
    //    alert("You have logged in successfully!");
    //}
}