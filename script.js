// Navigation and Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when nav link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').substring(1) === current) {
                item.classList.add('active');
            }
        });
    });
});

// Certificate Carousel
document.addEventListener('DOMContentLoaded', function() {
    const certificatesContainer = document.querySelector('.certificates-container');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const certificateCards = document.querySelectorAll('.certificate-card');
    const dotsContainer = document.querySelector('.certificate-dots');
    
    let currentIndex = 0;
    const cardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    const totalSlides = Math.ceil(certificateCards.length / cardsPerView);
    
    // Create dot indicators
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('certificate-dot');
        if (i === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.certificate-dot');
    
    // Set initial active state
    updateActiveState();
    
    // Create certificate viewing modal
    const modal = document.createElement('div');
    modal.classList.add('certificate-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal">&times;</button>
            <img src="" alt="Certificate">
        </div>
    `;
    document.body.appendChild(modal);
    
    const modalImg = modal.querySelector('img');
    const closeModal = modal.querySelector('.close-modal');
    
    // Add click event to certificate cards to open modal
    certificateCards.forEach(card => {
        const viewBtn = card.querySelector('.view-certificate-btn');
        const imgSrc = card.querySelector('.certificate-img img').src;
        
        viewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modalImg.src = imgSrc;
            modal.classList.add('open');
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('open');
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
        }
    });
    
    // Navigate left
    leftArrow.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            scrollCertificates();
            updateActiveState();
        }
    });
    
    // Navigate right
    rightArrow.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            scrollCertificates();
            updateActiveState();
        }
    });
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        scrollCertificates();
        updateActiveState();
    }
    
    // Scroll certificates to current position
    function scrollCertificates() {
        const cardWidth = certificateCards[0].offsetWidth + 20; // card width + gap
        const scrollAmount = cardWidth * currentIndex * cardsPerView;
        certificatesContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
    
    // Update active states for cards and dots
    function updateActiveState() {
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Update certificate cards
        certificateCards.forEach((card, index) => {
            const isInViewport = (index >= currentIndex * cardsPerView) && (index < (currentIndex + 1) * cardsPerView);
            card.classList.toggle('active', isInViewport);
        });
        
        // Update arrow states
        leftArrow.style.opacity = currentIndex === 0 ? '0.5' : '1';
        rightArrow.style.opacity = currentIndex === totalSlides - 1 ? '0.5' : '1';
    }
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const newCardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
        
        if (newCardsPerView !== cardsPerView) {
            // Reset and recalculate
            certificatesContainer.scrollLeft = 0;
            currentIndex = 0;
            
            // Clear dots and recreate
            dotsContainer.innerHTML = '';
            const newTotalSlides = Math.ceil(certificateCards.length / newCardsPerView);
            
            for (let i = 0; i < newTotalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('certificate-dot');
                if (i === 0) dot.classList.add('active');
                
                dot.addEventListener('click', () => {
                    goToSlide(i);
                });
                
                dotsContainer.appendChild(dot);
            }
            
            updateActiveState();
        }
    });
    
    // Enable swipe gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    certificatesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    certificatesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const minSwipeDistance = 50;
        
        if (touchEndX < touchStartX - minSwipeDistance) {
            // Swipe left
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                scrollCertificates();
                updateActiveState();
            }
        }
        
        if (touchEndX > touchStartX + minSwipeDistance) {
            // Swipe right
            if (currentIndex > 0) {
                currentIndex--;
                scrollCertificates();
                updateActiveState();
            }
        }
    }
});

// AI Tools Animation
document.addEventListener('DOMContentLoaded', function() {
    const aiTools = document.querySelectorAll('.ai-tool');
    
    // Add hover effect on tools
    aiTools.forEach(tool => {
        tool.addEventListener('mouseenter', function() {
            tool.style.backgroundColor = 'rgba(65, 105, 225, 0.05)';
            tool.querySelector('i').style.transform = 'scale(1.2)';
        });
        
        tool.addEventListener('mouseleave', function() {
            tool.style.backgroundColor = 'white';
            tool.querySelector('i').style.transform = 'scale(1)';
        });
    });
    
    // Animate AI tools on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    aiTools.forEach(tool => {
        tool.style.opacity = 0;
        tool.style.transform = 'translateY(20px)';
        tool.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(tool);
    });
});

// Resume Button
document.addEventListener('DOMContentLoaded', function() {
    const resumeBtn = document.querySelector('.resume-btn');
    
    if (resumeBtn) {
        resumeBtn.setAttribute('href', 'assets/Shreyas (1).pdf');
        resumeBtn.setAttribute('target', '_blank');
        resumeBtn.setAttribute('rel', 'noopener noreferrer');
        
        // Add PDF icon if not already present
        if (!resumeBtn.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-file-pdf';
            icon.style.marginLeft = '8px';
            resumeBtn.appendChild(icon);
        }
    }
});

// Animations for Sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        sectionObserver.observe(section);
    });
    
    // Add class when section is in viewport
    document.addEventListener('scroll', function() {
        sections.forEach(section => {
            if (isInViewport(section)) {
                section.classList.add('section-visible');
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            }
        });
    });
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});