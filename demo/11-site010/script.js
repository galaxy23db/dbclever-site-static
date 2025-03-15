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
    const monthlyPrices = ['49', '149'];
    const yearlyPrices = ['39', '119'];
    
    pricingToggle.addEventListener('change', function() {
        const isYearly = this.checked;
        
        pricingAmounts.forEach((amount, index) => {
            if (index < monthlyPrices.length) { // Skip "Custom" pricing
                // Add animation class
                amount.classList.add('fade-in');
                
                // Update price
                amount.textContent = isYearly ? yearlyPrices[index] : monthlyPrices[index];
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    amount.classList.remove('fade-in');
                }, 1000);
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
    
    // Add animation classes on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .benefit, .feature, .step, .stat, .pricing-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    // Run once on load
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Mobile menu toggle (placeholder for future implementation)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav');
    nav.appendChild(mobileMenuButton);
    
    mobileMenuButton.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('show');
    });
    
    // Add CSS for mobile menu button and show class
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--text-color);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block;
            }
            
            .nav-links.show {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                padding: 1rem;
                box-shadow: var(--shadow-md);
                z-index: 100;
            }
            
            .nav-links.show li {
                margin: 0.5rem 0;
            }
        }
    `;
    
    document.head.appendChild(style);
});