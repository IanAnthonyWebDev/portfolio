const menuButton = document.querySelector('#menu-button');
const bars = document.querySelector('#bars');
const times = document.querySelector('#times');
const menuImg = document.querySelector('.menu-img');
const menuLinksDiv = document.querySelector('.menu-links');
const viewWorkButton = document.querySelector('#view-work-btn');
const menuLinks = document.querySelectorAll('.menu-links ul li');
const linkHome = document.querySelector('#link-home');
const linkAbout = document.querySelector('#link-about');
const linkWork = document.querySelector('#link-work');
const linkContact = document.querySelector('#link-contact');
var timeouts = [''];



function openMenu() {
    //unhideMenu();
    bars.classList.remove('default-bars');
    times.classList.remove('default-times');

    menuButton.classList.add('rotated-menu');
    bars.classList.add('fade-out');
    bars.classList.remove('fade-in');
    times.classList.add('fade-in');
    times.classList.remove('fade-out');
    menuButton.removeEventListener('click', openMenu);
    menuButton.addEventListener('click', closeMenu);
    // Move Nav Menu Onscreen
    menuImg.classList.remove('menu-img-off');
    menuLinksDiv.classList.remove('menu-links-off');
    clearTimeouts();
    animateLinks();
}

function closeMenu() {
    times.classList.add('fade-out');
    times.classList.remove('fade-in');
    menuButton.classList.remove('rotated-menu');
    bars.classList.add('fade-in');
    bars.classList.remove('fade-out');
    menuButton.removeEventListener('click', closeMenu);
    menuButton.addEventListener('click', openMenu);
    // Move Nav Menu Offscreen
    menuLinksDiv.classList.add('menu-links-off');
    menuImg.classList.add('menu-img-off');
    clearTimeouts();
    resetLinks();
}

function animateLinks() {
    var delay = 200;
    /*for(var i = 0; i < menuLinks.length; i++) {
        var newlink = menuLinks[i];
        var newTimeout = setTimeout(() => {
            var link = newlink;
            console.log('link = '+link);
            addAnimateClass(link);
        }, delay);
        delay += 100;
    }*/

    var time1 = setTimeout(() => {
        addAnimateClass(linkHome);
    }, delay);
    delay += 100;
    var time2 = setTimeout(() => {
        addAnimateClass(linkAbout);
    }, delay);
    delay += 100;
    var time3 = setTimeout(() => {
        addAnimateClass(linkWork);
    }, delay);
    delay += 100;
    var time4 = setTimeout(() => {
        addAnimateClass(linkContact);
    }, delay);
    delay += 100;
    timeouts.push(time1, time2, time3, time4);
}

function resetLinks() {
    var delay = 500;

    var time1 = setTimeout(() => {
        removeAnimateClass(linkHome);
    }, delay);
    delay += 100;
    var time2 = setTimeout(() => {
        removeAnimateClass(linkAbout);
    }, delay);
    delay += 100;
    var time3 = setTimeout(() => {
        removeAnimateClass(linkWork);
    }, delay);
    delay += 100;
    var time4 = setTimeout(() => {
        removeAnimateClass(linkContact);
    }, delay);
    delay += 100;
    timeouts.push(time1, time2, time3, time4);
}

function addAnimateClass(link) {
    link.classList.add('menu-link-onscreen');
}

function removeAnimateClass(link) {
    link.classList.remove('menu-link-onscreen');
}

function clearTimeouts() {
    if(timeouts !== undefined) {
        if(timeouts.length > 0) {
            for(var i = 0; i < timeouts.length; i++) {
                if(timeouts[i] !== undefined) {
                    clearTimeout(timeouts[i]);
                }
            }
        }
        timeouts.splice(0, timeouts.length);
    }
}

function hideMenu() {
    //menuImg.classList.add('hide');
    menuImg.style.transition = 'all 0s';
    menuImg.style.opacity = 0;
    menuLinksDiv.style.transition = 'all 0s';
    menuLinksDiv.style.opacity = 0;
    setTimeout(() => {
        unhideMenu();
    }, 500);
}

function unhideMenu() {
    //menuImg.classList.add('hide');
    menuImg.style.opacity = 1;
    menuImg.style.transition = 'all 0.6s';
    menuLinksDiv.style.opacity = 1;
    menuLinksDiv.style.transition = 'all 0.6s';
}

function init() {
    menuButton.addEventListener('click', openMenu);
    viewWorkButton.addEventListener('click', openMenu);
    linkHome.firstChild.addEventListener('click', () => {
        hideMenu();
        closeMenu();
    });
    linkAbout.firstChild.addEventListener('click', () => {
        hideMenu();
        closeMenu();
    });
    linkWork.firstChild.addEventListener('click', () => {
        hideMenu();
        closeMenu();
    });
    linkContact.firstChild.addEventListener('click', () => {
        hideMenu();
        closeMenu();
    });
}

init();