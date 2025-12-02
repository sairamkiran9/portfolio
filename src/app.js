// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const statCounters = document.querySelectorAll('.stat-value[data-count]');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80;
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Trigger counter animations when hero section is visible
            if (entry.target.id === 'hero') {
                statCounters.forEach(counter => {
                    const target = parseInt(counter.dataset.count);
                    animateCounter(counter, target);
                });
            }
        }
    });
}, observerOptions);

// Observe sections for animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    observer.observe(section);
});

// Project Cards Animation
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe project cards for stagger animations
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    projectObserver.observe(card);
});

// Observe other cards for animations
const cards = document.querySelectorAll('.about-card, .expertise-card, .skill-category');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1001;
        min-width: 300px;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: var(--color-success); color: white;' : ''}
        ${type === 'error' ? 'background: var(--color-error); color: white;' : ''}
        ${type === 'info' ? 'background: var(--color-info); color: white;' : ''}
    `;
    
    const notificationContent = notification.querySelector('.notification-content');
    notificationContent.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
    `;
    
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: inherit;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.opacity = '1';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.opacity = '0.8';
    });
    
    document.body.appendChild(notification);
    
    // Trigger animation
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Navbar background on scroll
function updateNavbarBackground() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(19, 52, 59, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(19, 52, 59, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
}

// Parallax effect for hero section
function updateParallax() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Project Card Interactive Effects
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add click tracking for project links
        const links = card.querySelectorAll('.project-links .btn');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const projectName = card.querySelector('h3').textContent;
                const linkType = link.textContent.toLowerCase().includes('github') ? 'github' : 
                               link.textContent.toLowerCase().includes('demo') ? 'demo' : 
                               link.textContent.toLowerCase().includes('paper') ? 'paper' : 'other';
                
                trackEvent('project_link_clicked', {
                    project: projectName,
                    linkType: linkType
                });
            });
        });

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Advanced scroll effects
function handleAdvancedScrollEffects() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('#hero');
    
    // Hero parallax effect
    if (heroSection && scrolled < window.innerHeight) {
        const heroContent = heroSection.querySelector('.hero-content');
        const heroInfo = heroSection.querySelector('.hero-info');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
        }
        
        if (heroInfo) {
            heroInfo.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
    
    // Project cards subtle parallax
    const visibleProjectCards = document.querySelectorAll('.project-card.visible');
    visibleProjectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isInViewport) {
            const scrollProgress = (window.innerHeight - rect.top) / window.innerHeight;
            const parallaxOffset = (scrollProgress - 0.5) * 20;
            card.style.transform = `translateY(${parallaxOffset}px)`;
        }
    });
}

// Event Listeners
window.addEventListener('scroll', throttle(() => {
    updateActiveNavLink();
    updateNavbarBackground();
    updateParallax();
    handleAdvancedScrollEffects();
}, 16));

window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Page load animations and initialization
window.addEventListener('load', () => {
    // Add loaded class to body for any load-specific animations
    document.body.classList.add('loaded');
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // Initialize navbar background
    updateNavbarBackground();
    
    // Initialize project card effects
    initProjectCardEffects();
    
    // Trigger initial parallax calculation
    updateParallax();
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Navigate between projects with arrow keys when focused
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains('project-card')) {
            e.preventDefault();
            const projectCards = Array.from(document.querySelectorAll('.project-card'));
            const currentIndex = projectCards.indexOf(focusedElement);
            
            if (e.key === 'ArrowDown' && currentIndex < projectCards.length - 1) {
                projectCards[currentIndex + 1].focus();
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                projectCards[currentIndex - 1].focus();
            }
        }
    }
});

// Add focus management for accessibility
navToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navToggle.click();
    }
});

// Make project cards focusable for keyboard navigation
projectCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const primaryLink = card.querySelector('.project-links .btn--primary');
            if (primaryLink) {
                primaryLink.click();
            }
        }
    });
});

// Add hover effects for interactive elements
const interactiveElements = document.querySelectorAll('.btn, .expertise-card, .about-card, .skill-category');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        if (!this.classList.contains('project-card')) {
            this.style.transform = 'translateY(-2px)';
        }
    });
    
    element.addEventListener('mouseleave', function() {
        if (!this.classList.contains('project-card')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Add CSS for active nav link and other dynamic styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--color-primary) !important;
        background: var(--color-secondary) !important;
    }
    
    .notification {
        font-family: var(--font-family-base);
        font-size: var(--font-size-md);
        line-height: 1.4;
    }
    
    .notification-message {
        flex: 1;
    }
    
    .project-card:focus {
        outline: var(--focus-outline);
        outline-offset: 2px;
    }
    
    body.loaded .hero-content {
        animation: fadeInUp 0.8s ease-out;
    }
    
    .project-card.visible {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    /* Enhanced project card animations */
    .project-card:nth-child(1).visible { animation-delay: 0s; }
    .project-card:nth-child(2).visible { animation-delay: 0.1s; }
    .project-card:nth-child(3).visible { animation-delay: 0.2s; }
    .project-card:nth-child(4).visible { animation-delay: 0.3s; }
    .project-card:nth-child(5).visible { animation-delay: 0.4s; }
    
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        .hero-content,
        .hero-info,
        .project-card {
            transform: none !important;
        }
    }
`;

document.head.appendChild(style);

// Analytics placeholder (for future implementation)
function trackEvent(eventName, properties = {}) {
    // Placeholder for analytics tracking
    console.log(`Event: ${eventName}`, properties);
}

// Track page sections viewed
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionName = entry.target.id || 'unknown';
            trackEvent('section_viewed', { section: sectionName });
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => {
    if (section.id) {
        sectionObserver.observe(section);
    }
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        const buttonText = e.target.textContent.trim();
        const buttonType = e.target.className.includes('btn--primary') ? 'primary' : 
                          e.target.className.includes('btn--outline') ? 'outline' : 'secondary';
        
        trackEvent('button_clicked', { 
            text: buttonText, 
            type: buttonType,
            section: e.target.closest('section')?.id || 'unknown'
        });
    }
});

// Performance monitoring
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
            trackEvent('page_load_time', { 
                loadTime: entry.loadEventEnd - entry.loadEventStart 
            });
        }
    }
});

try {
    perfObserver.observe({ entryTypes: ['navigation'] });
} catch (e) {
    // PerformanceObserver not supported in older browsers
    console.log('PerformanceObserver not supported');
}

// Initialize scroll-based animations on load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states for project cards
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    // Trigger animations when page loads
    setTimeout(() => {
        updateActiveNavLink();
        handleAdvancedScrollEffects();
    }, 100);
});

// Smooth reveal for skill items on scroll
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillItems = entry.target.querySelectorAll('.skill-item');
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }
    });
}, { threshold: 0.3 });

// Apply skill animation observer
document.querySelectorAll('.skill-category').forEach(category => {
    const skillItems = category.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });
    skillObserver.observe(category);
});