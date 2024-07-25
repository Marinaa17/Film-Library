document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('burger-menu-icon').addEventListener('click', function () {
        document.getElementById('burger-menu').classList.toggle('active');
        document.getElementById('overlay').classList.toggle('active');
    });
});



let currentSlide = 0;
const slides = document.querySelectorAll('.carousel__slide');
const totalSlides = slides.length;
const slideInterval = 5000; // 5 seconds

function showSlide(index) {
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    const newTransform = `translateX(-${currentSlide * 100}%)`;
    document.querySelector('.carousel__viewport').style.transform = newTransform;
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// Initialize the carousel to show the first slide
showSlide(currentSlide);

// Set interval to automatically change slides
setInterval(nextSlide, slideInterval);
