document.addEventListener('DOMContentLoaded', function () {
    const burgerMenu = document.getElementById('burger-menu');
    const overlay = document.getElementById('overlay');
    document.getElementById('burger-menu-icon').addEventListener('click', function () {
        burgerMenu.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) { 
            burgerMenu.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

