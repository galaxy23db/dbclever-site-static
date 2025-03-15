/**
 * Neural Vendas - Modern SaaS Website JavaScript
 * This file contains all the interactive functionality and animations
 * for the Neural Vendas website using vanilla JavaScript.
 */

// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initAnimations();
    initPricingToggle();
    initFaqAccordion();
    initTestimonialSlider();
    initContactForm();
});

/**
 * Navigation functionality
 * - Mobile menu toggle
 * - Smooth scrolling for navigation links
 * - Header scroll effect
 */
function initNavigation() {
    // Elements
    const header = document.querySelector('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/**
 * Animations
 * - Fade-in elements on scroll
 */
function initAnimations() {
    // Fade-in animation for elements with 'fade-in' class
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Initially set all elements to appear if JavaScript is disabled
    fadeElements.forEach(element => {
        element.classList.add('appear');
    });
    
    // Function to check if an element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll animation
    function handleScrollAnimation() {
        fadeElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('appear');
            } else {
                element.classList.remove('appear');
            }
        });
    }
    
    // Remove the initial 'appear' class after a short delay
    setTimeout(() => {
        fadeElements.forEach(element => {
            element.classList.remove('appear');
        });
        
        // Initial check for elements in viewport
        handleScrollAnimation();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScrollAnimation);
    }, 100);
}

/**
 * Pricing Toggle
 * - Switch between monthly and annual pricing
 */
function initPricingToggle() {
    const pricingToggle = document.getElementById('pricingToggle');
    const monthlyPrices = document.querySelectorAll('.monthly');
    const annualPrices = document.querySelectorAll('.annually');
    
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            if (this.checked) {
                // Show annual prices
                monthlyPrices.forEach(price => price.style.display = 'none');
                annualPrices.forEach(price => price.style.display = 'inline');
            } else {
                // Show monthly prices
                monthlyPrices.forEach(price => price.style.display = 'inline');
                annualPrices.forEach(price => price.style.display = 'none');
            }
        });
    }
}

/**
 * FAQ Accordion
 * - Toggle FAQ answers
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.faq-toggle i');
                    if (icon) icon.className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Toggle icon
            const icon = item.querySelector('.faq-toggle i');
            if (icon) {
                if (item.classList.contains('active')) {
                    icon.className = 'fas fa-minus';
                } else {
                    icon.className = 'fas fa-plus';
                }
            }
        });
    });
}

/**
 * Testimonial Slider
 * - Simple slider for testimonials
 */
function initTestimonialSlider() {
    const slider = document.getElementById('testimonialSlider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Hide all slides except the first one
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
    
    // Function to show a specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Show the selected slide
        slides[index].style.display = 'block';
        
        // Update dots
        const dotElements = dots.querySelectorAll('.dot');
        dotElements.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Update current slide index
        currentSlide = index;
    }
    
    // Event listeners for next and previous buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newIndex = currentSlide - 1;
            if (newIndex < 0) newIndex = slideCount - 1;
            showSlide(newIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newIndex = currentSlide + 1;
            if (newIndex >= slideCount) newIndex = 0;
            showSlide(newIndex);
        });
    }
    
    // Add click event listeners to dots
    if (dots) {
        const dotElements = dots.querySelectorAll('.dot');
        dotElements.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
    }
    
    // Auto-advance slides every 5 seconds
    setInterval(function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slideCount) newIndex = 0;
        showSlide(newIndex);
    }, 5000);
}

/**
 * Contact Form
 * - Form validation and submission handling
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Simulate API call with timeout
            setTimeout(function() {
                // Reset form
                contactForm.reset();
                
                // Show success message
                alert('Thank you for your message! We will get back to you soon.');
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }, 1500);
        });
    }
}

/**
 * Utility Functions
 */

// Debounce function to limit how often a function can be called
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Throttle function to limit how often a function can be called
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}