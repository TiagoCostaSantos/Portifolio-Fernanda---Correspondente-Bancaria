// Menu Mobile Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('mobile-open');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
    });
});

// Smooth Scroll for internal anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.hash && this.hash !== '#') {
            const target = document.querySelector(this.hash);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Carousel Navigation
const carouselArrows = document.querySelectorAll('.carousel-arrow');

function updateArrowVisibility(carouselId) {
    const carousel = document.getElementById(carouselId);
    if(!carousel) return;
    
    const prevArrow = carousel.parentElement.querySelector('.carousel-arrow.prev');
    const nextArrow = carousel.parentElement.querySelector('.carousel-arrow.next');
    
    if(carousel.scrollLeft <= 0) {
        prevArrow.classList.add('hidden');
    } else {
        prevArrow.classList.remove('hidden');
    }
    
    const scrollableWidth = carousel.scrollWidth - carousel.clientWidth;
    if(carousel.scrollLeft >= scrollableWidth - 10) {
        nextArrow.classList.add('hidden');
    } else {
        nextArrow.classList.remove('hidden');
    }
}

carouselArrows.forEach(arrow => {
    arrow.addEventListener('click', function() {
        const carouselId = this.getAttribute('data-carousel');
        const carousel = document.getElementById(carouselId);
        if(!carousel) return;
        
        const scrollAmount = 420;
        if(this.classList.contains('prev')) {
            carousel.scrollLeft -= scrollAmount;
        } else {
            carousel.scrollLeft += scrollAmount;
        }
        
        setTimeout(() => updateArrowVisibility(carouselId), 100);
    });
});

// Initialize Carousels
['carousel-emprestimos', 'carousel-financiamentos'].forEach(carouselId => {
    const carousel = document.getElementById(carouselId);
    if(!carousel) return;
    
    updateArrowVisibility(carouselId);
    carousel.addEventListener('scroll', () => updateArrowVisibility(carouselId));

    let startX = 0;
    carousel.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; });
    carousel.addEventListener('touchmove', (e) => {
        const currentX = e.touches[0].clientX;
        carousel.scrollLeft += startX - currentX;
        startX = currentX;
    });
});
