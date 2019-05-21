const menuButton = document.querySelector('#menu-button');
const bars = document.querySelector('#bars');
const times = document.querySelector('#times');
const menuImg = document.querySelector('.menu-img');
const menuLinks = document.querySelector('.menu-links');
const viewWorkButton = document.querySelector('#view-work-btn');


function openMenu() {
    bars.classList.remove('default-bars');
    times.classList.remove('default-times');

    menuButton.classList.add('rotated-menu');
    bars.classList.add('fade-out');
    bars.classList.remove('fade-in');
    times.classList.add('fade-in');
    times.classList.remove('fade-out');
    menuButton.removeEventListener('click', openMenu);
    menuButton.addEventListener('click', closeMenu);
    // Unhide Nav Menu
    menuImg.classList.remove('menu-img-off');
    menuLinks.classList.remove('menu-links-off');
}

function closeMenu() {
    times.classList.add('fade-out');
    times.classList.remove('fade-in');
    menuButton.classList.remove('rotated-menu');
    bars.classList.add('fade-in');
    bars.classList.remove('fade-out');
    menuButton.removeEventListener('click', closeMenu);
    menuButton.addEventListener('click', openMenu);
    // Hide Nav Menu
    menuLinks.classList.add('menu-links-off');
    menuImg.classList.add('menu-img-off');
}

function init() {
    menuButton.addEventListener('click', openMenu);
    viewWorkButton.addEventListener('click', openMenu);
}

init();
