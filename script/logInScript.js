document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('logIn');
    btn.addEventListener("click", () => {
        loginUser();
    });
});

function getUserData(email) {
    const usersString = localStorage.getItem("users");
    const users = usersString ? JSON.parse(usersString) : [];

    const user = users.find(user => user.email === email);

    return user || null;
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

    storeLoggedInUserEmail(userData.username);
    window.location.href = "home.html";
}

function storeLoggedInUserEmail(username) {
    localStorage.setItem('loggedInUser', username);
}