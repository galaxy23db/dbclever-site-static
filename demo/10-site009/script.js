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
                    otherItem.querySelector('.toggle-icon').textContent = '+';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const toggleIcon = item.querySelector('.toggle-icon');
            toggleIcon.textContent = item.classList.contains('active') ? '−' : '+';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .timeline-step, .pricing-card, .testimonial-card, .integration-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = element.classList.contains('pricing-card') && element.classList.contains('featured') 
                    ? 'scale(1.05) translateY(0)' 
                    : 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.feature-card, .timeline-step, .pricing-card, .testimonial-card, .integration-card');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on page load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    
    // Mobile menu toggle (for responsive design)
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
        
        // Add mobile menu button to navbar
        navbar.insertBefore(mobileMenuBtn, navLinks);
        
        // Toggle mobile menu
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    };
    
    // Add mobile menu if screen width is less than 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    // Update on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        } else if (window.innerWidth >= 768 && document.querySelector('.mobile-menu-btn')) {
            document.querySelector('.mobile-menu-btn').remove();
            document.querySelector('.nav-links').classList.remove('active');
        }
    });
});