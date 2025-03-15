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
    
    // Pricing Toggle
    const pricingToggle = document.getElementById('pricing-toggle');
    const pricingAmounts = document.querySelectorAll('.amount');
    const monthlyPrices = ['$49', '$149', 'Custom'];
    const yearlyPrices = ['$39', '$119', 'Custom'];
    
    pricingToggle.addEventListener('change', function() {
        pricingAmounts.forEach((amount, index) => {
            if (this.checked) {
                // Yearly pricing
                if (monthlyPrices[index] !== 'Custom') {
                    amount.textContent = yearlyPrices[index];
                }
            } else {
                // Monthly pricing
                if (yearlyPrices[index] !== 'Custom') {
                    amount.textContent = monthlyPrices[index];
                }
            }
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
    
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = 'var(--shadow-lg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = 'var(--shadow-md)';
        });
    });
    
    // Add active class to first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // Mobile menu toggle (for responsive design)
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.classList.add('mobile-menu-btn');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        const mobileMenu = document.createElement('div');
        mobileMenu.classList.add('mobile-menu');
        
        // Clone nav links and buttons for mobile menu
        const navLinks = document.querySelector('.nav-links').cloneNode(true);
        const navButtons = document.querySelector('.nav-buttons').cloneNode(true);
        
        mobileMenu.appendChild(navLinks);
        mobileMenu.appendChild(navButtons);
        
        nav.appendChild(mobileMenuBtn);
        document.body.appendChild(mobileMenu);
        
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            if (mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };
    
    // Only create mobile menu if screen width is less than 768px
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    // Add scroll animation for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .benefit, .step, .pricing-card, .stat');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements on scroll
    window.addEventListener('scroll', animateOnScroll);
});