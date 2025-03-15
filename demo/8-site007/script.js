document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        
        button.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all accordion items
            accordionItems.forEach(accItem => {
                accItem.classList.remove('active');
            });
            
            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Testimonial Slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    const prevButton = document.querySelector('.control-prev');
    const nextButton = document.querySelector('.control-next');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    let currentIndex = 0;
    const cardWidth = testimonialCards[0].offsetWidth + 30; // Card width + gap
    
    // Initialize slider position
    updateSliderPosition();
    
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
        }
    });
    
    nextButton.addEventListener('click', () => {
        if (currentIndex < testimonialCards.length - 1) {
            currentIndex++;
            updateSliderPosition();
        }
    });
    
    function updateSliderPosition() {
        testimonialSlider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update button states
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === testimonialCards.length - 1;
        
        // Update button opacity based on state
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex === testimonialCards.length - 1 ? '0.5' : '1';
    }
    
    // Responsive navigation
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
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
    
    // Add animation on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .integration-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .step, .pricing-card, .integration-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate, .step.animate, .pricing-card.animate, .integration-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .testimonial-slider {
            transition: transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);
});