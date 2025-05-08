// DOM Elements
const menuToggle = document.querySelector('.menu-toggle');
const sideNav = document.querySelector('.side-nav');
const navClose = document.querySelector('.nav-close');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');
const themeSwitch = document.getElementById('theme-switch');
const scrollArrowLeft = document.querySelector('.scroll-arrow.left');
const scrollArrowRight = document.querySelector('.scroll-arrow.right');
const certContainer = document.querySelector('.cert-container');
const certItems = document.querySelectorAll('.cert-image');
const certModal = document.getElementById('cert-modal');
const certImage = document.getElementById('cert-image');
const closeModal = document.querySelector('.close-modal');

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active section
    showSection('about-section');
    
    // Add event listeners
    initializeEventListeners();
    
    // Apply animations
    animateElements();
});

// Initialize event listeners
function initializeEventListeners() {
    // Menu toggle
    menuToggle.addEventListener('click', toggleMenu);
    navClose.addEventListener('click', closeMenu);
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
            setActiveNavLink(this);
            
            // Close menu on mobile after clicking
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });
    
    // Theme switch
    themeSwitch.addEventListener('change', toggleTheme);
    
    // Certificate scroller
    scrollArrowLeft.addEventListener('click', () => scrollCerts('left'));
    scrollArrowRight.addEventListener('click', () => scrollCerts('right'));
    
    // Certificate modal
    certItems.forEach(item => {
        item.addEventListener('click', function() {
          const imgUrl = this.getAttribute('data-certificate');
            // Fall back to the src of the thumbnail if data-img is not available
            const imgSrc = imgUrl || this.querySelector('img').src;
            openCertModal(imgSrc);
        });
    });
    
    closeModal.addEventListener('click', closeCertModal);
    window.addEventListener('click', (e) => {
        if (e.target === certModal) {
            closeCertModal();
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (sideNav.classList.contains('active') && 
            !sideNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
}

// Toggle menu function
function toggleMenu() {
    sideNav.classList.toggle('active');
}

// Close menu function
function closeMenu() {
    sideNav.classList.remove('active');
}

// Show section function
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    // Update URL hash
    window.location.hash = sectionId;
}

// Set active nav link
function setActiveNavLink(activeLink) {
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    activeLink.classList.add('active');
}

// Toggle theme function
function toggleTheme() {
    document.body.classList.toggle('light-theme');
    // You can add more theme-related changes here
}

// Scroll certificates
function scrollCerts(direction) {
    const scrollAmount = 340; // width of cert-item + gap
    
    if (direction === 'left') {
        certContainer.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        certContainer.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Open certificate modal
function openCertModal(imgUrl) {
    certImage.src = imgUrl;
    certModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close certificate modal
function closeCertModal() {
    certModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Handle window resize
function handleResize() {
    if (window.innerWidth > 768 && sideNav.classList.contains('active')) {
        // Keep menu open on larger screens
    } else if (window.innerWidth <= 768) {
        // Close menu on smaller screens
        closeMenu();
    }
}

// Check URL hash on load
function checkUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const section = document.getElementById(hash);
        if (section) {
            showSection(hash);
            
            // Set active nav link
            const activeLink = document.querySelector(`.nav-link[data-section="${hash}"]`);
            if (activeLink) {
                setActiveNavLink(activeLink);
            }
        }
    }
}

// Animate elements function
function animateElements() {
    // Add animation classes or implement animations here
    // For example, fade-in effects for sections
    
    // Animate profile image
    const profileImage = document.querySelector('.image-container');
    if (profileImage) {
        profileImage.style.animation = 'fadeIn 1s ease-in-out';
    }
}

// Check URL hash when page loads
window.addEventListener('load', checkUrlHash);

// Handle hash change
window.addEventListener('hashchange', () => {
    checkUrlHash();
});