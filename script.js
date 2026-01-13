// ==========================================
// PORTFOLIO WEBSITE - MAIN JAVASCRIPT
// ==========================================

// DOM Elements
const cursorOuter = document.querySelector('.cursor-outer');
const cursorInner = document.querySelector('.cursor-inner');
const pageLoader = document.querySelector('.page-loader');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const portfolioModal = document.getElementById('portfolioModal');
const modalClose = document.getElementById('modalClose');
const currentYear = document.getElementById('currentYear');
const skillsGrid = document.querySelector('.skills-grid');
const toolsGrid = document.querySelector('.tools-grid');
const portfolioGrid = document.querySelector('.portfolio-grid');
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
const statNumbers = document.querySelectorAll('.stat-number');

// Data
const skills = [
    { icon: 'fas fa-paint-brush', title: 'Graphic Design', desc: 'Creating visual concepts to communicate ideas' },
    { icon: 'fas fa-signature', title: 'Logo Design', desc: 'Designing unique and memorable brand identities' },
    { icon: 'fas fa-palette', title: 'Branding Design', desc: 'Developing comprehensive brand systems' },
    { icon: 'fas fa-book', title: 'Brand Guideline Design', desc: 'Creating detailed brand usage manuals' },
    { icon: 'fas fa-address-card', title: 'Business Card Design', desc: 'Designing professional contact materials' },
    { icon: 'fas fa-id-card', title: 'ID Card Design', desc: 'Creating secure and professional identification' },
    { icon: 'fas fa-newspaper', title: 'Flyer Design', desc: 'Designing attention-grabbing promotional materials' },
    { icon: 'fas fa-book-open', title: 'Brochure Design', desc: 'Creating informative and attractive brochures' },
    { icon: 'fas fa-tshirt', title: 'T-Shirt Design', desc: 'Designing custom apparel graphics' },
    { icon: 'fas fa-hashtag', title: 'Social Media Design', desc: 'Creating engaging social media content' },
    { icon: 'fas fa-image', title: 'Cover Photo Design', desc: 'Designing professional profile and cover images' },
    { icon: 'fas fa-laptop', title: 'UI/UX Design', desc: 'Designing intuitive user interfaces and experiences' },
    { icon: 'fas fa-font', title: 'Typography', desc: 'Expert selection and arrangement of type' },
    { icon: 'fas fa-fill-drip', title: 'Color Theory', desc: 'Strategic color selection for brand impact' },
    { icon: 'fas fa-eye', title: 'Visual Identity Design', desc: 'Creating cohesive visual brand systems' },
    { icon: 'fas fa-print', title: 'Print Design', desc: 'Designing materials for physical production' },
    { icon: 'fas fa-desktop', title: 'Digital Design', desc: 'Creating designs for digital platforms' },
    { icon: 'fas fa-bullhorn', title: 'Marketing Design', desc: 'Designing materials for marketing campaigns' }
];

const tools = [
    { icon: 'fab fa-adobe', name: 'Adobe Illustrator' },
    { icon: 'fab fa-adobe', name: 'Adobe Photoshop' },
    { icon: 'fab fa-adobe', name: 'Adobe InDesign' },
    { icon: 'fab fa-figma', name: 'Figma' },
    { icon: 'fab fa-canva', name: 'Canva' }
];

const portfolioItems = [
    { category: 'Branding', title: 'TechVision Identity', image: 'tech' },
    { category: 'UI/UX', title: 'Finance App Design', image: 'finance' },
    { category: 'Print', title: 'Corporate Brochure', image: 'brochure' },
    { category: 'Social Media', title: 'Campaign Graphics', image: 'campaign' },
    { category: 'Logo', title: 'Startup Brand Identity', image: 'startup' },
    { category: 'Packaging', title: 'Product Packaging', image: 'packaging' }
];

let currentTestimonial = 0;

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize skills
    initializeSkills();
    
    // Initialize tools
    initializeTools();
    
    // Initialize portfolio
    initializePortfolio();
    
    // Initialize page loader
    setTimeout(() => {
        pageLoader.classList.add('hidden');
        
        // Animate hero text
        animateHeroText();
        
        // Start counting stats
        startCountingStats();
    }, 2000);
    
    // Initialize scroll reveal
    initializeScrollReveal();
});

// ==========================================
// CUSTOM CURSOR
// ==========================================

document.addEventListener('mousemove', (e) => {
    cursorOuter.style.left = e.clientX + 'px';
    cursorOuter.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorInner.style.left = e.clientX + 'px';
        cursorInner.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor hover effects
const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .skill-card, .tool-icon');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorOuter.style.width = '70px';
        cursorOuter.style.height = '70px';
        cursorOuter.style.borderColor = 'var(--primary)';
        cursorInner.style.width = '10px';
        cursorInner.style.height = '10px';
        cursorInner.style.backgroundColor = 'var(--primary)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorOuter.style.width = '40px';
        cursorOuter.style.height = '40px';
        cursorOuter.style.borderColor = 'var(--primary)';
        cursorInner.style.width = '6px';
        cursorInner.style.height = '6px';
        cursorInner.style.backgroundColor = 'var(--primary)';
    });
});

// ==========================================
// NAVIGATION
// ==========================================

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        
        // Update active nav link
        navLinksItems.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
    
    // Show/hide back to top button
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Back to top button
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// INITIALIZE SECTIONS
// ==========================================

function initializeSkills() {
    skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3 class="skill-title">${skill.title}</h3>
            <p class="skill-description">${skill.desc}</p>
        `;
        skillsGrid.appendChild(skillCard);
    });
}

function initializeTools() {
    tools.forEach(tool => {
        const toolItem = document.createElement('div');
        toolItem.className = 'tool-item';
        toolItem.innerHTML = `
            <div class="tool-icon">
                <i class="${tool.icon}"></i>
            </div>
            <div class="tool-name">${tool.name}</div>
        `;
        toolsGrid.appendChild(toolItem);
    });
}

function initializePortfolio() {
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.dataset.index = index;
        
        // Generate placeholder image color based on index
        const colors = ['#00d9ff', '#9d4edd', '#ff6b6b', '#51cf66', '#ffd43b', '#339af0'];
        const color = colors[index % colors.length];
        
        portfolioItem.innerHTML = `
            <div class="portfolio-image" style="background: ${color}"></div>
            <div class="portfolio-overlay">
                <span class="portfolio-category">${item.category}</span>
                <h3 class="portfolio-title">${item.title}</h3>
            </div>
        `;
        
        portfolioItem.addEventListener('click', () => openPortfolioModal(index));
        portfolioGrid.appendChild(portfolioItem);
    });
}

// ==========================================
// ANIMATIONS
// ==========================================

function animateHeroText() {
    const typingText = document.querySelector('.typing-text');
    const texts = ['Graphic Designer', 'Brand Strategist', 'Visual Storyteller'];
    let currentIndex = 0;
    
    function typeText() {
        typingText.textContent = '';
        const text = texts[currentIndex];
        let charIndex = 0;
        
        const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
                typingText.textContent += text.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    deleteText();
                }, 2000);
            }
        }, 100);
    }
    
    function deleteText() {
        const text = typingText.textContent;
        let charIndex = text.length;
        
        const deletingInterval = setInterval(() => {
            if (charIndex >= 0) {
                typingText.textContent = text.substring(0, charIndex);
                charIndex--;
            } else {
                clearInterval(deletingInterval);
                currentIndex = (currentIndex + 1) % texts.length;
                setTimeout(() => {
                    typeText();
                }, 500);
            }
        }, 50);
    }
    
    typeText();
}

function startCountingStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// ==========================================
// TESTIMONIAL SLIDER
// ==========================================

function showTestimonial(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        showTestimonial(index);
    });
});

prevBtn.addEventListener('click', () => {
    let newIndex = currentTestimonial - 1;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    showTestimonial(newIndex);
});

nextBtn.addEventListener('click', () => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
});

// Auto slide testimonials
setInterval(() => {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
}, 5000);

// ==========================================
// CONTACT FORM
// ==========================================

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1500);
});

// ==========================================
// PORTFOLIO MODAL
// ==========================================

function openPortfolioModal(index) {
    const item = portfolioItems[index];
    
    const modalBody = portfolioModal.querySelector('.modal-body');
    modalBody.innerHTML = `
        <div class="modal-image" style="background: #00d9ff; height: 300px; border-radius: var(--border-radius); margin-bottom: 30px;"></div>
        <h2 class="modal-title">${item.title}</h2>
        <div class="modal-category">${item.category}</div>
        <div class="modal-description">
            <p>This project showcases a comprehensive design solution for a client in the ${item.category.toLowerCase()} category. The work involved strategic planning, creative concept development, and meticulous execution to deliver a visually stunning result that meets all client objectives.</p>
            <p>Key features include modern aesthetics, user-centered design principles, and attention to detail that sets this project apart from competitors in the market.</p>
        </div>
        <div class="modal-tags">
            <span class="modal-tag">${item.category}</span>
            <span class="modal-tag">Design</span>
            <span class="modal-tag">Creative</span>
            <span class="modal-tag">Branding</span>
        </div>
    `;
    
    portfolioModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', () => {
    portfolioModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
portfolioModal.addEventListener('click', (e) => {
    if (e.target === portfolioModal) {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.skill-card, .process-step, .portfolio-item, .tool-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ==========================================
// RIPPLE BUTTON EFFECT
// ==========================================

document.addEventListener('click', (e) => {
    if (e.target.closest('.btn')) {
        const btn = e.target.closest('.btn');
        const ripple = document.createElement('span');
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;
        
        btn.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);