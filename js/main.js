// ===================================
// Main JavaScript - Portfolio Website
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initBackToTop();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initActiveNavLink();
});

// ===================================
// Mobile Navigation Toggle
// ===================================

function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// ===================================
// Navigation Link Handling
// ===================================

function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;

            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'auto'
                });
            }
        });
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================

function initBackToTop() {
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    const scrollProgress = document.getElementById('scrollProgress');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Calculate scroll percentage
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (currentScroll / scrollHeight) * 100;

        // Update scroll progress indicator
        if (scrollProgress) {
            scrollProgress.style.height = scrollPercentage + '%';
            
            // Add active class when scrolling
            if (currentScroll > 50) {
                scrollProgress.classList.add('active');
            } else {
                scrollProgress.classList.remove('active');
            }
        }

        // Add shadow to navbar on scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Show/hide back to top button
        if (currentScroll > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        lastScroll = currentScroll;
    });

    // Back to top button click
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ===================================
// Active Navigation Link Highlighting
// ===================================

function initActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===================================
// Scroll Animations (Enhanced)
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    let ticking = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Use requestAnimationFrame for smoother animations
                requestAnimationFrame(() => {
                    entry.target.classList.add('visible');
                });
            } else {
                // Remove visible class when scrolling away (re-animates when scrolling back)
                requestAnimationFrame(() => {
                    entry.target.classList.remove('visible');
                });
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Hero section animation on load
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent) {
        heroContent.classList.add('animate-on-scroll', 'animate-fade-up');
        setTimeout(() => {
            heroContent.classList.add('visible');
        }, 100);
    }

    if (heroImage) {
        heroImage.classList.add('animate-on-scroll', 'animate-fade-up', 'animate-delay-2');
        setTimeout(() => {
            heroImage.classList.add('visible');
        }, 300);
    }

    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.classList.add('animate-on-scroll', 'animate-fade-up');
        observer.observe(title);
    });

    // Animate about section elements
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.classList.add('animate-on-scroll', 'animate-fade-left');
        observer.observe(aboutImage);
    }

    const aboutText = document.querySelector('.about-text');
    if (aboutText) {
        aboutText.classList.add('animate-on-scroll', 'animate-fade-right');
        observer.observe(aboutText);
    }

    // Animate project cards with stagger
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('animate-on-scroll', 'animate-fade-up', `animate-delay-${(index % 3) + 1}`);
        observer.observe(card);
    });

    // Animate timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll', 'animate-fade-left', `animate-delay-${(index % 3) + 1}`);
        observer.observe(item);
    });

    // Animate skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll', 'animate-fade-up', `animate-delay-${(index % 6) + 1}`);
        observer.observe(item);
    });

    // Animate contact items
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach((item, index) => {
        item.classList.add('animate-on-scroll', 'animate-fade-left', `animate-delay-${index + 1}`);
        observer.observe(item);
    });

    // Animate contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.classList.add('animate-on-scroll', 'animate-fade-right');
        observer.observe(contactForm);
    }

    // Animate social links
    const socialLinks = document.querySelectorAll('.social-links');
    socialLinks.forEach(links => {
        links.classList.add('animate-on-scroll', 'animate-scale');
        observer.observe(links);
    });

    // Animate footer sections
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach((section, index) => {
        section.classList.add('animate-on-scroll', 'animate-fade-up', `animate-delay-${index + 1}`);
        observer.observe(section);
    });
}

// ===================================
// Skill Bars Animation
// ===================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = targetWidth;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// ===================================
// Contact Form Handling
// ===================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Basic validation
            if (!data.name || !data.email || !data.subject || !data.message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission (replace with actual API call)
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// ===================================
// Email Validation Helper
// ===================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// Notification System
// ===================================

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 1.5rem',
        backgroundColor: type === 'success' ? '#000000' : type === 'error' ? '#dc2626' : '#404040',
        color: '#ffffff',
        border: '2px solid #000000',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        zIndex: '10000',
        animation: 'slideInRight 0.3s ease',
        maxWidth: '400px',
        fontSize: '0.875rem',
        fontWeight: '500'
    });

    // Add animation keyframes if not already added
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ===================================
// Utility: Debounce Function
// ===================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// Performance: Optimize scroll events
// ===================================

const optimizedScrollHandler = debounce(() => {
    // Any additional scroll-based logic can go here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// ===================================
// Easter Egg: Console Welcome Message
// ===================================

console.log('%c👋 Hello there, curious developer!', 'font-size: 20px; font-weight: bold;');
console.log('%cThanks for checking out the code. Feel free to reach out if you\'d like to collaborate!', 'font-size: 14px;');
console.log('%c📧 your.email@example.com', 'font-size: 12px; color: #666;');