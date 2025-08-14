// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Fungsi untuk menu aktif
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Hapus kelas active dari semua menu
        document.querySelectorAll('.nav-link').forEach(item => {
            item.classList.remove('active');
        });
        
        // Tambahkan kelas active ke menu yang diklik
        this.classList.add('active');
        
        // Jangan lupa untuk tetap mempertahankan scroll behavior
        const targetId = this.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Sesuaikan dengan tinggi navbar
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Set menu aktif berdasarkan scroll position
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 70;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    // Buka menu mobile
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Tutup menu mobile
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    mobileMenuClose.addEventListener('click', closeMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    
    // Tutup menu ketika link diklik
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

// Prevent closing when clicking inside mobile menu
mobileMenu.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInsideMobileMenu = mobileMenu.contains(e.target);
    const isClickOnMenuButton = mobileMenuBtn.contains(e.target);

    if (mobileMenu.classList.contains('active') && !isClickInsideMobileMenu && !isClickOnMenuButton) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Initialize room swipers
const roomSwipers = document.querySelectorAll('.room-swiper');
roomSwipers.forEach(swiper => {
    new Swiper(swiper, {
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});

// Initialize testimonial slider
const testimonialSlider = new Swiper('.testimonial-slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        }
    }
});

// Gallery lightbox
const galleryItems = [
    {
        src: 'images/home.jpeg',
        title: 'Fasade Homestay',
        description: 'Tampak depan Bintang Homestay'
    },
    {
        src: 'images/home2.jpeg',
        title: 'Area Lobby',
        description: 'Ruang tamu yang nyaman'
    },
    {
        src: 'images/home1.jpeg',
        title: 'Area Parkir',
        description: 'Parkir luas dan aman'
    },
    {
        src: 'images/home3.jpeg',
        title: 'Kamar Mandi',
        description: 'Bersih dengan air panas'
    },
    {
        src: 'images/home4.jpeg',
        title: 'Pemandangan',
        description: 'View dari kamar'
    },
    {
        src: 'images/home11.jpeg',
        title: 'Koridor Lantai 1',
        description: 'Akses ke kamar'
    },
    {
        src: 'images/home6.jpeg',
        title: 'Koridor Lantai 2',
        description: 'Area kamar lantai atas'
    },
    {
        src: 'images/home12.jpeg',
        title: 'Logo Homestay',
        description: 'Identitas kami'
    }
];

let lightboxSlider, lightboxThumbs;

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxSliderWrapper = document.querySelector('.lightbox-slider .swiper-wrapper');
    const lightboxThumbsWrapper = document.querySelector('.lightbox-thumbs .swiper-wrapper');

    // Clear existing slides
    lightboxSliderWrapper.innerHTML = '';
    lightboxThumbsWrapper.innerHTML = '';

    // Add slides
    galleryItems.forEach((item, i) => {
        // Main slide
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title;

        slide.appendChild(img);
        lightboxSliderWrapper.appendChild(slide);

        // Thumbnail
        const thumb = document.createElement('div');
        thumb.className = 'swiper-slide';

        const thumbImg = document.createElement('img');
        thumbImg.src = item.src;
        thumbImg.alt = item.title;

        thumb.appendChild(thumbImg);
        lightboxThumbsWrapper.appendChild(thumb);
    });

    // Initialize sliders if not already initialized
    if (!lightboxSlider) {
        lightboxSlider = new Swiper('.lightbox-slider', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    if (!lightboxThumbs) {
        lightboxThumbs = new Swiper('.lightbox-thumbs', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            centeredSlides: true,
            slideToClickedSlide: true,
        });

        // Connect thumbs to main slider
        lightboxSlider.controller.control = lightboxThumbs;
        lightboxThumbs.controller.control = lightboxSlider;
    }

    // Go to selected slide
    lightboxSlider.slideTo(index);

    // Show lightbox
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
}

// Close lightbox when clicking outside
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeLightbox();
    }
});

// Close lightbox with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('lightbox').style.display === 'flex') {
        closeLightbox();
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Pause video on mobile when not in view
const heroVideo = document.querySelector('.hero-video-container video');
if (window.innerWidth < 768) {
    heroVideo.pause();
}

// Play/pause video based on visibility
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            heroVideo.play();
        } else {
            heroVideo.pause();
        }
    });
}, {
    threshold: 0.5
});

observer.observe(heroVideo);