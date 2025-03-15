// Modern SaaS Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Pricing toggle functionality
    const billingToggle = document.getElementById('billing-toggle');
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            // Toggle between monthly and annual pricing
            pricingCards.forEach(card => {
                const priceElement = card.querySelector('.amount');
                if (!priceElement || priceElement.textContent === 'Custom pricing') return;
                
                const currentPrice = priceElement.textContent.replace('$', '').replace(',', '');
                let newPrice;
                
                if (this.checked) {
                    // Annual pricing (20% discount)
                    newPrice = Math.round(parseInt(currentPrice) * 12 * 0.8);
                    priceElement.nextElementSibling.textContent = '/year';
                } else {
                    // Monthly pricing
                    newPrice = Math.round(parseInt(currentPrice) / 12 / 0.8);
                    priceElement.nextElementSibling.textContent = '/month';
                }
                
                // Animate price change
                animateValue(priceElement, parseInt(currentPrice), newPrice, 500);
            });
        });
    }
    
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
    
    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider && testimonialSlider.children.length > 1) {
        let currentSlide = 0;
        const slides = testimonialSlider.children;
        const totalSlides = slides.length;
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
            dotsContainer.appendChild(dot);
        }
        
        testimonialSlider.parentNode.insertBefore(dotsContainer, testimonialSlider.nextSibling);
        
        // Initially hide all slides except the first one
        for (let i = 1; i < totalSlides; i++) {
            slides[i].style.display = 'none';
        }
        
        // Function to go to a specific slide
        function goToSlide(index) {
            slides[currentSlide].style.display = 'none';
            document.querySelectorAll('.slider-dots .dot')[currentSlide].classList.remove('active');
            
            currentSlide = index;
            
            slides[currentSlide].style.display = 'block';
            document.querySelectorAll('.slider-dots .dot')[currentSlide].classList.add('active');
        }
        
        // Auto-advance slides every 5 seconds
        setInterval(() => {
            goToSlide((currentSlide + 1) % totalSlides);
        }, 5000);
        
        // Add CSS for the dots
        const style = document.createElement('style');
        style.textContent = `
            .slider-dots {
                display: flex;
                justify-content: center;
                margin-top: 1.5rem;
            }
            .dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: var(--neutral-300);
                margin: 0 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }
            .dot.active {
                background-color: var(--primary-color);
            }
        `;
        document.head.appendChild(style);
    }
    
    // Animate value changes (for pricing)
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = '$' + currentValue.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
    
    // Add scroll animations
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        element.classList.add('animate-element');
        observer.observe(element);
    });
    
    // Add CSS for animations
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Mobile navigation toggle
    const createMobileNav = () => {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (!nav || !navLinks) return;
        
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-nav-toggle';
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        nav.querySelector('.nav-wrapper').appendChild(mobileToggle);
        
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Add CSS for mobile navigation
        const mobileNavStyle = document.createElement('style');
        mobileNavStyle.textContent = `
            .mobile-nav-toggle {
                display: none;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: var(--neutral-700);
            }
            
            @media (max-width: 768px) {
                .mobile-nav-toggle {
                    display: block;
                }
                
                .nav-links {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background-color: white;
                    flex-direction: column;
                    padding: 1rem;
                    box-shadow: var(--shadow-md);
                    z-index: 100;
                }
                
                .nav-links.active {
                    display: flex;
                }
                
                .nav-links li {
                    margin: 0.5rem 0;
                }
            }
        `;
        document.head.appendChild(mobileNavStyle);
    };
    
    createMobileNav();
    
    // Add sticky header effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Add CSS for sticky header
        const headerStyle = document.createElement('style');
        headerStyle.textContent = `
            header {
                transition: box-shadow 0.3s ease, padding 0.3s ease;
            }
            
            header.scrolled {
                box-shadow: var(--shadow-md);
                padding: 0.5rem 0;
            }
        `;
        document.head.appendChild(headerStyle);
    }
});