const slider = document.querySelector('.image-slider');
const fadebtn = document.querySelector('#fade-btn');
const slideRight = document.querySelector('#slide-right');
const slideLeft = document.querySelector('#slide-left');
const invisRight = document.querySelector('.invis-right');
const invisLeft = document.querySelector('.invis-left');
var currImg = 0;
const imgs = ["img-1", "img-2", "img-3", "img-4"];
const dotBtn1 = document.querySelector('#dot-1');
const dotBtn2 = document.querySelector('#dot-2');
const dotBtn3 = document.querySelector('#dot-3');
const dotBtn4 = document.querySelector('#dot-4');
var dots = [];
var autoTimer = 5000;
var autoTimeout;

function setDots() {
    dots.push(dotBtn1.firstElementChild, dotBtn2.firstElementChild, dotBtn3.firstElementChild, dotBtn4.firstElementChild);
}

function slideNext() {
    var nextImg = currImg+1;
    if(currImg === 3) nextImg = 0;
    changeSlide(nextImg);
}

function slideLast() {
    var nextImg = currImg-1;
    if(currImg === 0) nextImg = 3;
    changeSlide(nextImg);
}

function jumpToSlide1() {
    changeSlide(0);
}

function jumpToSlide2() {
    changeSlide(1);
}

function jumpToSlide3() {
    changeSlide(2);
}

function jumpToSlide4() {
    changeSlide(3);
}

function changeSlide(nextImg) {
    slider.classList.remove(imgs[currImg]);
    slider.classList.add(imgs[nextImg]);
    dots[currImg].classList.remove('fas');
    dots[currImg].classList.add('far');
    dots[nextImg].classList.remove('far');
    dots[nextImg].classList.add('fas');
    currImg = nextImg;
    setAutoSlide();
}

function setAutoSlide() {
    clearTimeout(autoTimeout);
    autoTimeout = setTimeout(slideNext, autoTimer);
}

setDots();
setAutoSlide();
invisRight.addEventListener('click', slideNext);
invisLeft.addEventListener('click', slideLast);
slideRight.addEventListener('click', slideNext);
slideLeft.addEventListener('click', slideLast);
dotBtn1.addEventListener('click', jumpToSlide1);
dotBtn2.addEventListener('click', jumpToSlide2);
dotBtn3.addEventListener('click', jumpToSlide3);
dotBtn4.addEventListener('click', jumpToSlide4);
