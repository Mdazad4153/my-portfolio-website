// Portfolio Website JavaScript
// Author: Md Azad

// DOM Elements
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('theme-toggle');
const contactForm = document.getElementById('contact-form');
const skillBars = document.querySelectorAll('.skill-progress');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const testimonialPrev = document.querySelector('.testimonial-prev');
const testimonialNext = document.querySelector('.testimonial-next');

// State
let currentTestimonial = 0;
let isMenuOpen = false;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeScrollEffects();
    initializeSkillBars();
    initializeTestimonials();
    initializeContactForm();
    initializeAnimations();
    checkImagesLoading();
    initializeCounters();
});

// Theme Management
function initializeTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', toggleTheme);
    
    // Log theme initialization
    console.log(`🎨 Theme initialized: ${savedTheme} mode`);
}

function setTheme(theme) {
    // Add transition class to body for smooth theme change
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update theme toggle icon with animation
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        console.log('🌙 Dark mode activated');
    } else {
        icon.className = 'fas fa-moon';
        console.log('☀️ Light mode activated');
    }
    
    // Show notification
    setTimeout(() => {
        showNotification(`${theme === 'dark' ? 'Dark' : 'Light'} mode activated!`, 'info');
    }, 100);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Navigation Management
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', toggleMobileMenu);
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function toggleMobileMenu() {
    isMenuOpen = !isMenuOpen;
    navMenu.classList.toggle('active', isMenuOpen);
    navToggle.classList.toggle('active', isMenuOpen);
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
}

function closeMobileMenu() {
    isMenuOpen = false;
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Scroll Effects
function initializeScrollEffects() {
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // Active navigation link highlighting
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Scroll animations
    window.addEventListener('scroll', handleScrollAnimations);
}

function handleNavbarScroll() {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Skill Bars Animation
function initializeSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                animateSkillCategories();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
}

function animateSkillBars() {
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
            
            // Add pulse effect on completion
            setTimeout(() => {
                bar.style.animation = 'pulse 0.5s ease-in-out';
            }, 2000);
        }, index * 100);
    });
}

function animateSkillCategories() {
    const categories = document.querySelectorAll('.skills-category');
    categories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '0';
            category.style.transform = 'translateY(30px)';
            category.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }, 50);
        }, index * 150);
    });
}

// Testimonials Carousel
function initializeTestimonials() {
    if (testimonialPrev && testimonialNext) {
        testimonialPrev.addEventListener('click', showPreviousTestimonial);
        testimonialNext.addEventListener('click', showNextTestimonial);
    }
    
    // Auto-rotate testimonials
    setInterval(showNextTestimonial, 5000);
}

function showNextTestimonial() {
    testimonialCards[currentTestimonial].classList.remove('active');
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    testimonialCards[currentTestimonial].classList.add('active');
}

function showPreviousTestimonial() {
    testimonialCards[currentTestimonial].classList.remove('active');
    currentTestimonial = currentTestimonial === 0 ? testimonialCards.length - 1 : currentTestimonial - 1;
    testimonialCards[currentTestimonial].classList.add('active');
}

// Contact Form
function initializeContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // Try to use Supabase if available
        if (window.SupabaseConfig && window.SupabaseConfig.initializeSupabase()) {
            await window.SupabaseConfig.submitContactForm(data);
        } else {
            // Fallback: simulate API call
            await simulateContactFormSubmission(data);
        }
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        
    } catch (error) {
        console.error('Error sending message:', error);
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Simulate contact form submission (replace with actual Supabase integration)
function simulateContactFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success/failure
            if (Math.random() > 0.1) { // 90% success rate for demo
                resolve(data);
            } else {
                reject(new Error('Simulated network error'));
            }
        }, 2000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Initialize Animations
function initializeAnimations() {
    // Add fade-in class to elements that should animate on scroll
    const animateElements = document.querySelectorAll(
        '.project-card, .blog-card, .resume-item, .skill-item, .testimonial-card, .contact-item'
    );
    
    animateElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Trigger initial scroll animation check
    handleScrollAnimations();
}

// Utility Functions
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
    };
}

// Optimize scroll events with throttling
window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
window.addEventListener('scroll', throttle(handleScrollAnimations, 50));

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
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
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Resume Download Handler
document.getElementById('download-resume')?.addEventListener('click', function(e) {
    // Let the default link behavior work for viewing
    // Show a helpful message
    setTimeout(() => {
        showNotification('Resume opened! You can view or download it from Google Drive.', 'success');
    }, 500);
    
    console.log('📄 Resume link opened: https://drive.google.com/file/d/1MR8UkXbUzMaaR33w9NieLUWrv0H_0kW-/view');
});

// Social Links Handler - Enhanced with tracking
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Don't prevent default - let the link open
        const platform = this.querySelector('i').className;
        const platformName = platform.includes('github') ? 'GitHub' : 
                            platform.includes('linkedin') ? 'LinkedIn' : 
                            platform.includes('twitter') ? 'Twitter/X' : 
                            platform.includes('instagram') ? 'Instagram' : 
                            platform.includes('facebook') ? 'Facebook' : 'Social';
        
        console.log(`🔗 Opening ${platformName} profile...`);
        
        // Show a quick notification without blocking the link
        setTimeout(() => {
            showNotification(`Opening ${platformName}...`, 'info');
        }, 100);
    });
});

// Project Links Handler - Enhanced
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const isGitHub = this.querySelector('i').className.includes('github');
        const isExternal = this.querySelector('i').className.includes('external');
        
        console.log(`🚀 Project link clicked: ${isGitHub ? 'GitHub' : 'Live Demo'}`);
        
        // Only show notification, don't prevent default if there's a valid href
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            showNotification('Project link coming soon!', 'info');
        }
    });
});

// Blog Links Handler - Enhanced
document.querySelectorAll('.blog-link').forEach(link => {
    link.addEventListener('click', function(e) {
        console.log('📰 Blog link clicked');
        
        // Only prevent if href is '#'
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            showNotification('Blog post coming soon!', 'info');
        }
    });
});

// Copy button functionality for code examples
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const codeBlock = this.closest('.code-example').querySelector('code');
        const text = codeBlock.textContent;
        
        navigator.clipboard.writeText(text).then(() => {
            // Show feedback
            const originalIcon = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.style.color = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalIcon;
                this.style.color = '';
            }, 2000);
            
            console.log('Code copied to clipboard');
        }).catch(err => {
            console.error('Failed to copy code: ', err);
            showNotification('Failed to copy code', 'error');
        });
    });
});

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setTheme,
        toggleTheme,
        showNotification,
        debounce,
        throttle
    };
}

// Counter Animation
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

// Image Loading Check
function checkImagesLoading() {
    const projectImages = document.querySelectorAll('.project-image img');
    const blogImages = document.querySelectorAll('.blog-image img');
    
    let loadedCount = 0;
    let totalImages = projectImages.length + blogImages.length;
    
    console.log(`🖼️ Loading ${totalImages} images...`);
    
    const checkImageLoad = (img, type, index) => {
        img.addEventListener('load', () => {
            loadedCount++;
            console.log(`✅ ${type} image ${index + 1} loaded successfully`);
            if (loadedCount === totalImages) {
                console.log(`🎉 All ${totalImages} images loaded successfully!`);
                showNotification('All images loaded successfully!', 'success');
            }
        });
        
        img.addEventListener('error', () => {
            console.warn(`⚠️ ${type} image ${index + 1} failed to load, using fallback`);
        });
    };
    
    projectImages.forEach((img, index) => checkImageLoad(img, 'Project', index));
    blogImages.forEach((img, index) => checkImageLoad(img, 'Blog', index));
}

// Console welcome message
console.log(`
%c🚀 Portfolio Website by Md Azad
%c📧 Email: azad79900@gmail.com
%c📱 Phone: +91 6299256892
%c🌐 Web UI Designer & Developer

%cThank you for visiting my portfolio!
%cToggle Dark/Light mode using the moon/sun icon in the navigation bar.
`,
  'color: #6366f1; font-size: 16px; font-weight: bold;',
  'color: #10b981; font-size: 14px;',
  'color: #10b981; font-size: 14px;',
  'color: #f59e0b; font-size: 14px; font-weight: bold;',
  'color: #6366f1; font-size: 14px; font-style: italic;',
  'color: #8b5cf6; font-size: 12px;'
);
