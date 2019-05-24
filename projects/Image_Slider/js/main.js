const prev = document.querySelector('#prev');
const next = document.querySelector('#next');
var currentSlide = document.querySelector('.current');
var currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const auto = true;
var currentTimeout;

var slideHandler = {
    nextSlide: function() {
        currentSlide.classList.remove('current');
        var newIndex = currentSlideIndex+1;
        if(currentSlideIndex === 5) newIndex = 0;
        currentSlide = slides[newIndex];
        currentSlideIndex = newIndex;
        currentSlide.classList.add('current');
        autoSlide.resetAuto();
    },
    prevSlide: function() {
        currentSlide.classList.remove('current');
        var newIndex = currentSlideIndex-1;
        if(currentSlideIndex === 0) newIndex = 5;
        currentSlide = slides[newIndex];
        currentSlideIndex = newIndex;
        currentSlide.classList.add('current');
        autoSlide.resetAuto();
    }
}

var autoSlide = {
    init: function() {
        // Create First Timeout if auto === true
        if(auto === true) {
            currentTimeout = setTimeout(autoSlide.autoNextSlide,5000);
        }
    },
    autoNextSlide: function() {
        // Scroll to Next Slide Automatically and Set Next Timeout
        slideHandler.nextSlide();
    },
    resetAuto: function() {
        clearTimeout(currentTimeout);
        currentTimeout = setTimeout(autoSlide.autoNextSlide,5000);
    }
}

prev.addEventListener('click', slideHandler.prevSlide);
next.addEventListener('click', slideHandler.nextSlide);
autoSlide.init();



// Refactor Following the Tutorial
/*const intervalTime = 5000;
let slideInterval;

const nextSlide = () => {
    const current = document.querySelector('.current');
    current.classList.remove('current');
    if(current.nextElementSibling) {
        current.nextElementSibling.classList.add('current');
    }
    else {
        slides[0].classList.add('current');
    }
    setTimeout(() =>  current.classList.remove('current'));
}

const prevSlide = () => {
    const current = document.querySelector('.current');
    current.classList.remove('current');
    if(current.previousElementSibling) {
        current.previousElementSibling.classList.add('current');
    }
    else {
        slides[slides.length-1].classList.add('current');
    }
    setTimeout(() =>  current.classList.remove('current'));
}

prev.addEventListener('click', e => {
    prevSlide();
    if(auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }
});
next.addEventListener('click', e=> {
    nextSlide();
    if(auto) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide,intervalTime);
    }
});

if(auto) {
    slideInterval = setInterval(nextSlide, intervalTime);
}*/