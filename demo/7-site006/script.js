document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    // Set initial state
    updateSlider();
    
    // Handle dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });
    
    // Auto-advance slides every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialCards.length;
        updateSlider();
    }, 5000);
    
    function updateSlider() {
        // Update slider position
        testimonialSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .footer-column a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if the link is an anchor link
            if (href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add fixed navigation on scroll
    const navbar = document.querySelector('.navbar');
    let scrollPosition = 0;
    
    window.addEventListener('scroll', () => {
        scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            navbar.classList.add('fixed');
        } else {
            navbar.classList.remove('fixed');
        }
    });
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .step, .integration-card, .pricing-card, .dashboard-feature');
    
    // Initial check for elements in viewport
    checkElementsInViewport();
    
    // Check on scroll
    window.addEventListener('scroll', checkElementsInViewport);
    
    function checkElementsInViewport() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (elementPosition.top < windowHeight * 0.9) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .navbar.fixed {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: white;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            padding: 15px 20px;
            animation: slideDown 0.3s ease;
        }
        
        @keyframes slideDown {
            from { transform: translateY(-100%); }
            to { transform: translateY(0); }
        }
        
        .feature-card, .step, .integration-card, .pricing-card, .dashboard-feature {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.animate, .step.animate, .integration-card.animate, .pricing-card.animate, .dashboard-feature.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .testimonial-slider {
            transition: transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});