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
                    const icon = otherItem.querySelector('.faq-toggle i');
                    icon.className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            const icon = item.querySelector('.faq-toggle i');
            
            if (item.classList.contains('active')) {
                icon.className = 'fas fa-minus';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    });
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialSlider && testimonials.length > 0 && dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                // Update active dot
                dots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                // Scroll to the corresponding testimonial
                const testimonialWidth = testimonials[0].offsetWidth;
                testimonialSlider.scrollTo({
                    left: testimonialWidth * index,
                    behavior: 'smooth'
                });
            });
        });
        
        // Auto-scroll testimonials every 5 seconds
        let currentIndex = 0;
        
        function autoScroll() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            
            // Update active dot
            dots.forEach(d => d.classList.remove('active'));
            dots[currentIndex].classList.add('active');
            
            // Scroll to the next testimonial
            const testimonialWidth = testimonials[0].offsetWidth;
            testimonialSlider.scrollTo({
                left: testimonialWidth * currentIndex,
                behavior: 'smooth'
            });
        }
        
        // Set interval for auto-scrolling
        const scrollInterval = setInterval(autoScroll, 5000);
        
        // Pause auto-scrolling when user interacts with the slider
        testimonialSlider.addEventListener('mouseenter', () => {
            clearInterval(scrollInterval);
        });
        
        // Resume auto-scrolling when user stops interacting
        testimonialSlider.addEventListener('mouseleave', () => {
            clearInterval(scrollInterval);
            setInterval(autoScroll, 5000);
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header effect
    const navbar = document.querySelector('.navbar');
    let scrollPosition = window.scrollY;
    
    window.addEventListener('scroll', function() {
        scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Animation on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .integration-card');
    
    function checkIfInView() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Initial check
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
});