const currentImg = document.querySelector('#current');
const imgs = document.querySelectorAll('.imgs img');
const selectedImg = imgs[0];
imgs.forEach(img => img.addEventListener('click', imgClick));
selectedImg.style.opacity = 0.6;

function imgClick(e) {
    imgs.forEach(img => (img.style.opacity = 1));
    currentImg.src = e.target.src;
    e.target.style.opacity = 0.6;
    currentImg.classList.add('fade-in');
    setTimeout(() => currentImg.classList.remove('fade-in'), 500);
}