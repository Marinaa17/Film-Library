document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('logIn');
    btn.addEventListener("click", () => {
        loginUser();
    });
});

function getUserData(email) {
    const userDataString = localStorage.getItem(email);
    return userDataString ? JSON.parse(userDataString) : null;
}

function loginUser() {
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const userData = getUserData(email);

    if (!userData) {
        document.getElementById("emailErrorMessage").innerText = "User with this email does not exist.";
        return;
    }

    if (userData.password !== password) {
        document.getElementById("passwordErrorMessage").innerText = "Incorrect password.";
        return;
    }

    storeLoggedInUserEmail(email);
    window.location.href = "home.html";
}

function storeLoggedInUserEmail(email) {
    localStorage.setItem('loggedInUserEmail', email);
}