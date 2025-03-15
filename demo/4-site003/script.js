// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Accordion functionality for FAQ section
    const accordionButtons = document.querySelectorAll('.accordion-button');
    
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active class on the button
            this.classList.toggle('active');
            
            // Get the content panel
            const content = this.nextElementSibling;
            
            // Toggle active class on the content
            content.classList.toggle('active');
            
            // Toggle the icon
            const icon = this.querySelector('i');
            if (content.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    // Testimonial slider functionality
    const testimonialDots = document.querySelectorAll('.dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            testimonialDots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            this.classList.add('active');
            
            // Calculate the scroll position
            const slider = document.querySelector('.testimonial-slider');
            const cardWidth = testimonialCards[0].offsetWidth + 30; // Card width + gap
            
            // Smooth scroll to the selected testimonial
            slider.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .footer-column a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if the link has a hash
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                
                // Get the target element
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Scroll to the target element
                    window.scrollTo({
                        top: targetElement.offsetTop - 100, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .step, .integration-item, .pricing-card, .dashboard-feature');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animation
    const elementsToAnimate = document.querySelectorAll('.feature-card, .step, .integration-item, .pricing-card, .dashboard-feature');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // Mobile menu toggle
    const createMobileMenu = function() {
        const navbar = document.querySelector('.navbar');
        
        // Create mobile menu button
        const mobileMenuButton = document.createElement('button');
        mobileMenuButton.classList.add('mobile-menu-button');
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Add mobile menu button to navbar
        navbar.appendChild(mobileMenuButton);
        
        // Get nav links
        const navLinks = document.querySelector('.nav-links');
        
        // Add event listener to mobile menu button
        mobileMenuButton.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    };
    
    // Check if screen width is less than 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    // Update on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-button')) {
            createMobileMenu();
        }
    });
});