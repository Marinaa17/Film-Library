document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('burger-menu-icon').addEventListener('click', function () {
        document.getElementById('burger-menu').classList.toggle('active');
        document.getElementById('overlay').classList.toggle('active');
    });
});