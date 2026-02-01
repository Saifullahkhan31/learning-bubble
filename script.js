// Learning Bubble Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links (only for same-page anchors)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Set active navigation link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Add a page-specific body class for pages where we want to tweak nav visuals
    if (currentPage === 'enrollment.html') {
        document.body.classList.add('page-enrollment');
    }

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animations
    const animateElements = document.querySelectorAll('.feature-card, .advantage-card, .announcement-card, .section-header');
    animateElements.forEach(el => observer.observe(el));

    // Counter animation for statistics (if we had any)
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 50);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.feature-card, .advantage-card, .partner-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Demo notification handler (opt-in only)
    // Add data-demo-notify="true" on any element to enable this temporary popup
    const demoButtons = document.querySelectorAll('[data-demo-notify="true"]');
    demoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = ripple.style.height = '100px';
            ripple.style.marginLeft = ripple.style.marginTop = '-50px';

            this.style.position = 'relative';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            showNotification('Feature coming soon!', 'info');
        });
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        // Set icon and colors based on type
        let icon = 'fa-info-circle';
        let bgColor = '#4F46E5';
        
        switch(type) {
            case 'success':
                icon = 'fa-check-circle';
                bgColor = '#10B981';
                break;
            case 'error':
                icon = 'fa-exclamation-circle';
                bgColor = '#EF4444';
                break;
            case 'warning':
                icon = 'fa-exclamation-triangle';
                bgColor = '#F59E0B';
                break;
            default:
                icon = 'fa-info-circle';
                bgColor = '#4F46E5';
        }
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // Manual close
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
    }

    // Add CSS animations for notifications
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
        }
        
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            gap: 1rem;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Simple fade-in effect for hero title (instead of typing effect)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        
        // Fade in the title
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }

    // Image lazy loading
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Add loading states to buttons (excluding filter buttons)
    document.querySelectorAll('button').forEach(button => {
        if (!button.classList.contains('age-filter-button')) {
            button.addEventListener('click', function() {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.disabled = true;
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.disabled = false;
                }, 2000);
            });
        }
    });

    // Theme switcher (optional feature)
    function createThemeToggle() {
        const themeToggle = document.createElement('button');
        themeToggle.innerHTML = '🌙';
        themeToggle.className = 'theme-toggle';
        themeToggle.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            background: #4F46E5;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            z-index: 1000;
        `;
        
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            this.innerHTML = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });
        
        document.body.appendChild(themeToggle);
    }

    // Initialize theme toggle
    createThemeToggle();

    // Check URL parameters for teacher application
    const urlParams = new URLSearchParams(window.location.search);
    const applicationType = urlParams.get('type');
    
    if (applicationType === 'teacher') {
        const subjectSelect = document.getElementById('subject');
        const messageTextarea = document.getElementById('message');
        const teacherSection = document.getElementById('teacher-info');
        
        if (subjectSelect) {
            subjectSelect.value = 'teacher';
            // Sync custom select UI if present
            const customWrapper = subjectSelect.closest('.custom-select');
            if (customWrapper) {
                const valEl = customWrapper.querySelector('.select-value');
                const opt = subjectSelect.options[subjectSelect.selectedIndex];
                if (valEl && opt) valEl.textContent = opt.text;
                customWrapper.querySelectorAll('.select-menu li').forEach(li => {
                    li.toggleAttribute('aria-selected', li.dataset.value === 'teacher');
                });
            }
        }
        
        if (messageTextarea) {
            messageTextarea.placeholder = 'Tell us about your teaching experience, subjects you specialize in, and why you want to join Learning Bubble...';
        }
        
        if (teacherSection) {
            teacherSection.style.display = 'block';
        }
        // Gently scroll the contact form into view so "Send us a Message" is at the top
        const contactFormContainer = document.querySelector('.contact-form-container');
        if (contactFormContainer) {
            setTimeout(() => {
                contactFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 600);
        }
    }
    
    // Transform modern selects into custom glass dropdowns
    (function initCustomSelects() {
        const selects = document.querySelectorAll('select.modern-select');
        selects.forEach(select => {
            // Build wrapper
            const wrapper = document.createElement('div');
            wrapper.className = 'custom-select';

            // Create toggle
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'select-toggle';
            btn.setAttribute('aria-haspopup', 'listbox');
            btn.setAttribute('aria-expanded', 'false');
            const val = document.createElement('span');
            val.className = 'select-value';
            val.textContent = select.options[select.selectedIndex]?.text || select.options[0]?.text || 'Select';
            const caret = document.createElement('span');
            caret.className = 'select-caret';
            btn.appendChild(val);
            btn.appendChild(caret);

            // Create menu
            const menu = document.createElement('ul');
            menu.className = 'select-menu';
            menu.setAttribute('role', 'listbox');
            Array.from(select.options).forEach((opt, i) => {
                const li = document.createElement('li');
                li.textContent = opt.text;
                li.dataset.value = opt.value;
                if (opt.selected) li.setAttribute('aria-selected', 'true');
                if (opt.value === '') li.style.color = '#6B7280';
                li.addEventListener('click', () => {
                    select.value = opt.value;
                    val.textContent = opt.text;
                    menu.querySelectorAll('li').forEach(el => el.removeAttribute('aria-selected'));
                    li.setAttribute('aria-selected', 'true');
                    btn.setAttribute('aria-expanded', 'false');
                    wrapper.classList.remove('open');
                    // Trigger change for downstream logic
                    const evt = new Event('change', { bubbles: true });
                    select.dispatchEvent(evt);
                });
                menu.appendChild(li);
            });

            // Toggle open
            btn.addEventListener('click', () => {
                const isOpen = wrapper.classList.toggle('open');
                btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            });

            // Click outside
            document.addEventListener('click', (e) => {
                if (!wrapper.contains(e.target)) {
                    wrapper.classList.remove('open');
                    btn.setAttribute('aria-expanded', 'false');
                }
            });

            // Insert into DOM
            select.parentNode.insertBefore(wrapper, select);
            wrapper.appendChild(select);
            wrapper.appendChild(btn);
            wrapper.appendChild(menu);
        });
    })();

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    console.log('Learning Bubble: Interactive features loaded successfully!');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimized scroll handler
const optimizedScroll = debounce(function() {
    // Add any scroll-based functionality here
}, 100);

// Course Data Structure
const coursesData = [
    // Literature, History & Storytelling
    { id: 1, name: "The World of Sherlock Holmes", category: "Literature, History & Storytelling", fee: 20000, startingFee: 20000, duration: "10 sessions | 2 months", ages: "12–16", about: "Step into the world of mystery, logic, and deduction through Holmes' lens.", pricingOptions: null },
    { id: 2, name: "History Mystery", category: "Literature, History & Storytelling", fee: 6000, startingFee: 6000, duration: "6 sessions | 1.5 months", ages: "12–16", about: "Explore untold stories and hidden corners of history.", pricingOptions: null },
    { id: 3, name: "Tales and Telling", category: "Literature, History & Storytelling", fee: 10000, startingFee: 10000, duration: "8 sessions | 2 months", ages: "8–14", about: "Develop storytelling skills, imagination, and confidence.", pricingOptions: null },
    
    // Technology & Coding
    { id: 4, name: "Artificial Intelligence for Kids", category: "Technology & Coding", fee: 18000, startingFee: 18000, duration: "10 sessions | 2 months", ages: "12–16", about: "", pricingOptions: null },
    { id: 5, name: "Fun with Coding", category: "Technology & Coding", fee: 10000, startingFee: 10000, duration: "8 sessions | 2 months", ages: "10–16", about: "An engaging introduction to programming.", pricingOptions: null },
    { id: 6, name: "Learn Python", category: "Technology & Coding", fee: 10000, startingFee: 10000, duration: "8 sessions | 2 months", ages: "", about: "A beginner-friendly Python programming course.", pricingOptions: null },
    { id: 7, name: "Graphic Designing using Canva & Illustrator", category: "Technology & Coding", fee: 8000, startingFee: 8000, duration: "8 sessions | 2 months", ages: "10–16", about: "Learn the basics of digital design.", pricingOptions: null },
    { id: 8, name: "MS Office for Kids", category: "Technology & Coding", fee: 8000, startingFee: 8000, duration: "8 sessions | 2 months", ages: "10–16", about: "Word, PowerPoint, Excel — kid-friendly and practical.", pricingOptions: null },
    
    // Creative Writing & Literature Development
    { id: 9, name: "Poet's Corner", category: "Creative Writing & Literature Development", fee: 8000, startingFee: 8000, duration: "8 sessions | 2 months", ages: "10–14", about: "", pricingOptions: null },
    { id: 10, name: "Poet's Corner", category: "Creative Writing & Literature Development", fee: 16000, startingFee: 16000, duration: "10 sessions | 3 months", ages: "15–20", about: "", pricingOptions: null },
    { id: 11, name: "Creative Writing", category: "Creative Writing & Literature Development", fee: 8000, startingFee: 8000, duration: "8 sessions | 2 months", ages: "8–10", about: "", pricingOptions: null },
    { id: 12, name: "Creative Writing", category: "Creative Writing & Literature Development", fee: 10000, startingFee: 10000, duration: "8 sessions | 2 months", ages: "11–14", about: "", pricingOptions: null },
    { id: 13, name: "Creative Writing", category: "Creative Writing & Literature Development", fee: 10000, startingFee: 10000, duration: "8 sessions | 2 months", ages: "15–18", about: "", pricingOptions: null },
    { id: 14, name: "Vocabulary Quest", category: "Creative Writing & Literature Development", fee: 10000, startingFee: 10000, duration: "10 sessions (40 minutes each)", ages: "14–18", about: "", pricingOptions: null },
    
    // Arts & Creativity
    { id: 15, name: "Art Rebels", category: "Arts & Creativity", fee: 12000, startingFee: 12000, duration: "8 sessions | 2 months", ages: "12–18", about: "A bold journey for young artists to experiment and express.", pricingOptions: null },
    { id: 16, name: "Bubbles and Beakers Club (Science)", category: "Arts & Creativity", fee: 10000, startingFee: 10000, duration: "8 sessions | 2 months", ages: "10–16", about: "Hands-on science experiments in a virtual lab.", pricingOptions: null },
    
    // Math, Logic & Skills
    { id: 17, name: "Math Magic!", category: "Math, Logic & Skills", fee: 8000, startingFee: 8000, duration: "8 sessions | 2 months", ages: "6–10", about: "Fun numbers, puzzles, and patterns.", pricingOptions: null },
    { id: 18, name: "Young Entrepreneurs", category: "Math, Logic & Skills", fee: 8000, startingFee: 8000, duration: "6 sessions | 1.5 months", ages: "10–14", about: "Build entrepreneurial mindset and skills.", pricingOptions: null },
    { id: 19, name: "Financial Literacy", category: "Math, Logic & Skills", fee: 8000, startingFee: 8000, duration: "1 month | 4–5 sessions", ages: "10–14", about: "", pricingOptions: null },
    { id: 20, name: "Financial Literacy", category: "Math, Logic & Skills", fee: 14000, startingFee: 14000, duration: "8 sessions | 2 months", ages: "15–18", about: "For every financial literacy course you would sign up for, we would teach one underprivileged kid about financial literacy.", pricingOptions: null },
    { id: 21, name: "Become a Climate Activist – Beginner", category: "Math, Logic & Skills", fee: 12000, startingFee: 12000, duration: "2 months", ages: "8–12", about: "", pricingOptions: null },
    
    // IGCSE ACADEMICS
    { id: 22, name: "IGCSE ACADEMICS", category: "IGCSE ACADEMICS", fee: 1500, startingFee: 1500, duration: "Per class / 8–10 sessions per month", ages: "", about: "Focus on concept clarity, past papers, and exam readiness. Subjects: Physics, Biology, Chemistry, Mathematics, English, Islamiat, Pakistan Studies, Accounting, Economics, Business Studies. Group size: 2–5 students.", pricingOptions: [
        { label: "Individual Class", price: 1500, description: "PKR 1,500 per class" },
        { label: "Group Class", price: 8000, description: "PKR 8,000 per month (8–10 sessions)" }
    ]},
    
    // Test Preparation
    { id: 23, name: "IELTS Academic", category: "Test Preparation", fee: 1500, startingFee: 1500, duration: "Flexible", ages: "", about: "", pricingOptions: [
        { label: "Per Hour", price: "1,500–5,000", description: "PKR 1,500–5,000 per hour" },
        { label: "One Module", price: 30000, description: "PKR 30,000 for one module" },
        { label: "Four Modules", price: 60000, description: "PKR 60,000 for 4 modules" }
    ]},
    { id: 24, name: "IELTS General", category: "Test Preparation", fee: 1200, startingFee: 1200, duration: "Flexible", ages: "", about: "", pricingOptions: [
        { label: "Per Hour", price: "1,200–4,000", description: "PKR 1,200–4,000 per hour" },
        { label: "One Module", price: 25000, description: "PKR 25,000 for 1 module" },
        { label: "All Modules", price: 75000, description: "PKR 75,000 for all 4 modules" }
    ]},
    { id: 25, name: "SAT Prep (Group Tuition)", category: "Test Preparation", fee: 50000, startingFee: 50000, duration: "4 months", ages: "", about: "Group size: 4–10 students. University admission test plans coming soon.", pricingOptions: null },
    
    // English Language Courses
    { id: 26, name: "English Language – Basic", category: "English Language Courses", fee: 10000, startingFee: 10000, duration: "10 sessions", ages: "", about: "", pricingOptions: null },
    { id: 27, name: "English Language – Intermediate", category: "English Language Courses", fee: 12000, startingFee: 12000, duration: "10 sessions", ages: "", about: "", pricingOptions: null },
    { id: 28, name: "English Language – Advanced", category: "English Language Courses", fee: 12000, startingFee: 12000, duration: "8 sessions", ages: "", about: "", pricingOptions: null },
    
    // Workshops
    { id: 29, name: "Poetry Writing Workshop (2 days)", category: "Workshops", fee: 3000, startingFee: 3000, duration: "2 days", ages: "", about: "Fee: PKR 3,000 or $12", pricingOptions: null },
    { id: 30, name: "Explore Shakespeare (1 day)", category: "Workshops", fee: 3000, startingFee: 3000, duration: "1 day", ages: "", about: "Fee: PKR 3,000 or $12", pricingOptions: null },
    { id: 31, name: "Creative Writing Workshop (2 days)", category: "Workshops", fee: 3500, startingFee: 3500, duration: "2 days", ages: "", about: "", pricingOptions: null },
    { id: 32, name: "Professional Email Writing (2 days)", category: "Workshops", fee: 5000, startingFee: 5000, duration: "2 days", ages: "", about: "", pricingOptions: null }
];

// Category colors for placeholder images
const categoryColors = {
    "All Categories": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "Literature, History & Storytelling": "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "Technology & Coding": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "Creative Writing & Literature Development": "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "Arts & Creativity": "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    "Math, Logic & Skills": "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    "IGCSE ACADEMICS": "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
    "Test Preparation": "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    "English Language Courses": "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    "Workshops": "linear-gradient(135deg, #ffd89b 0%, #19547b 100%)"
};

// Courses Page Functionality
function initCoursesPage() {
    const categoryTiles = document.querySelectorAll('.category-tile');
    const categoryTilesSection = document.querySelector('.category-tiles-section');
    const scrollIndicator = document.querySelector('.category-scroll-indicator');
    const ageFilterDropdown = document.querySelector('.age-filter-dropdown');
    const ageFilterButton = document.querySelector('.age-filter-button');
    const ageFilterMenu = document.querySelector('.age-filter-menu');
    const ageCheckboxes = document.querySelectorAll('.age-checkbox');
    const coursesContainer = document.querySelector('.courses-grid-container');
    
    let selectedCategory = 'All Categories';
    let selectedAges = ['All Ages'];
    
    // Initialize: Show all courses
    renderCourses(coursesData);
    
    // Handle scroll indicator visibility
    function updateScrollIndicator() {
        if (!categoryTilesSection || !scrollIndicator) return;
        
        const isScrollable = categoryTilesSection.scrollWidth > categoryTilesSection.clientWidth;
        const isAtStart = categoryTilesSection.scrollLeft <= 10;
        const isAtEnd = categoryTilesSection.scrollLeft + categoryTilesSection.clientWidth >= categoryTilesSection.scrollWidth - 10;
        
        if (isScrollable) {
            if (!isAtEnd) {
                // Show right arrow
                scrollIndicator.classList.add('visible');
                scrollIndicator.classList.remove('left');
                scrollIndicator.querySelector('i').className = 'fas fa-chevron-right';
            } else if (!isAtStart) {
                // Show left arrow
                scrollIndicator.classList.add('visible');
                scrollIndicator.classList.add('left');
                scrollIndicator.querySelector('i').className = 'fas fa-chevron-left';
            } else {
                scrollIndicator.classList.remove('visible');
            }
        } else {
            scrollIndicator.classList.remove('visible');
        }
    }
    
    // Check on load and resize
    updateScrollIndicator();
    window.addEventListener('resize', updateScrollIndicator);
    
    // Check after a short delay to ensure content is fully rendered
    setTimeout(updateScrollIndicator, 100);
    
    // Check on scroll
    if (categoryTilesSection) {
        categoryTilesSection.addEventListener('scroll', updateScrollIndicator);
    }
    
    // Scroll indicator click handler
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            if (categoryTilesSection) {
                if (scrollIndicator.classList.contains('left')) {
                    categoryTilesSection.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    categoryTilesSection.scrollTo({ left: categoryTilesSection.scrollWidth, behavior: 'smooth' });
                }
            }
        });
    }
    
    // Category tile click handlers
    if (categoryTiles.length > 0) {
        categoryTiles.forEach(tile => {
            tile.addEventListener('click', function() {
                const category = this.dataset.category;
                selectedCategory = category;
                
                // Update active state
                categoryTiles.forEach(t => {
                    if (t.dataset.category === category) {
                        t.classList.add('active');
                    } else {
                        t.classList.remove('active');
                    }
                });
                
                // Filter and render courses
                filterAndRenderCourses();
            });
        });
    }
    
    // Age filter dropdown toggle
    if (ageFilterButton && ageFilterMenu && ageFilterDropdown) {
        ageFilterButton.addEventListener('click', function(e) {
            e.stopPropagation();
            ageFilterDropdown.classList.toggle('open');
            ageFilterMenu.classList.toggle('open');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!ageFilterDropdown.contains(e.target)) {
                ageFilterDropdown.classList.remove('open');
                ageFilterMenu.classList.remove('open');
            }
        });
    }
    
    // Age checkbox handlers - don't apply immediately, just update UI
    if (ageCheckboxes.length > 0) {
        ageCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const ageValue = this.value;
                
                if (ageValue === 'all') {
                    // If "All Ages" is checked, uncheck others
                    if (this.checked) {
                        ageCheckboxes.forEach(cb => {
                            if (cb.value !== 'all') cb.checked = false;
                        });
                    }
                } else {
                    // If specific age is checked, uncheck "All Ages"
                    const allAgesCheckbox = document.querySelector('.age-checkbox[value="all"]');
                    if (allAgesCheckbox && this.checked) {
                        allAgesCheckbox.checked = false;
                    }
                }
                
                // Update button preview (but don't apply filter yet)
                updateAgeFilterButtonPreview();
            });
        });
    }
    
    // Apply filter button handler
    const applyFilterButton = document.querySelector('.age-filter-apply-button');
    if (applyFilterButton) {
        applyFilterButton.addEventListener('click', function() {
            // Get selected ages from checkboxes
            const checkedBoxes = Array.from(ageCheckboxes).filter(cb => cb.checked);
            
            if (checkedBoxes.length === 0 || checkedBoxes.some(cb => cb.value === 'all')) {
                selectedAges = ['All Ages'];
            } else {
                selectedAges = checkedBoxes.map(cb => cb.value);
            }
            
            // Apply the filter
            updateAgeFilterButton();
            filterAndRenderCourses();
            
            // Close dropdown
            if (ageFilterMenu && ageFilterDropdown) {
                ageFilterMenu.classList.remove('open');
                ageFilterDropdown.classList.remove('open');
            }
        });
    }
    
    function updateAgeFilterButtonPreview() {
        if (ageFilterButton) {
            const checkedBoxes = Array.from(ageCheckboxes).filter(cb => cb.checked && cb.value !== 'all');
            const count = checkedBoxes.length;
            
            ageFilterButton.querySelector('.filter-text').textContent = 'Filter by Age Group';
            if (count === 0 || document.querySelector('.age-checkbox[value="all"]').checked) {
                ageFilterButton.querySelector('.filter-count').textContent = '';
            } else {
                ageFilterButton.querySelector('.filter-count').textContent = `(${count})`;
            }
        }
    }
    
    function updateAgeFilterButton() {
        if (ageFilterButton) {
            const count = selectedAges.length;
            ageFilterButton.querySelector('.filter-text').textContent = 'Filter by Age Group';
            if (selectedAges.includes('All Ages') || count === 0) {
                ageFilterButton.querySelector('.filter-count').textContent = '';
            } else {
                ageFilterButton.querySelector('.filter-count').textContent = `(${count})`;
            }
        }
    }
    
    function filterAndRenderCourses() {
        let filtered = coursesData;
        
        // Filter by category
        if (selectedCategory !== 'All Categories') {
            filtered = filtered.filter(course => course.category === selectedCategory);
        }
        
        // Filter by age
        if (!selectedAges.includes('All Ages') && selectedAges.length > 0) {
            filtered = filtered.filter(course => {
                if (!course.ages) return false; // Exclude courses without specified age when filtering
                return selectedAges.some(ageRange => {
                    const [minAge, maxAge] = ageRange.split('-').map(Number);
                    // Handle both en dash (–) and hyphen (-)
                    const courseAges = course.ages.split(/[–-]/).map(a => parseInt(a.trim()));
                    if (courseAges.length === 2) {
                        const [courseMin, courseMax] = courseAges;
                        // Check if age ranges overlap
                        return (courseMin <= maxAge && courseMax >= minAge);
                    }
                    return false;
                });
            });
        }
        
        renderCourses(filtered);
    }
    
    function renderCourses(courses) {
        if (!coursesContainer) return;
        
        if (courses.length === 0) {
            coursesContainer.innerHTML = `
                <div class="no-courses-message">
                    <i class="fas fa-search"></i>
                    <h3>No courses found</h3>
                    <p>Try adjusting your filters to see more courses.</p>
                </div>
            `;
            return;
        }
        
        coursesContainer.innerHTML = courses.map(course => {
            const categoryColor = categoryColors[course.category] || categoryColors["All Categories"];
            const ageDisplay = course.ages ? `<span class="course-age"><i class="fas fa-user"></i> ${course.ages} years</span>` : '';
            const aboutDisplay = course.about ? `<p class="course-about">${course.about}</p>` : '';
            
            return `
                <div class="course-card-new" data-course-id="${course.id}">
                    <div class="course-card-header" style="background: ${categoryColor}">
                        <span class="course-category-badge">${course.category}</span>
                    </div>
                    <div class="course-card-body">
                        <h3 class="course-name">${course.name}</h3>
                        ${ageDisplay}
                        <div class="course-meta-info">
                            <span class="course-fee">Rs. ${course.startingFee.toLocaleString()}</span>
                            <span class="course-duration-new"><i class="fas fa-clock"></i> ${course.duration}</span>
                        </div>
                        ${aboutDisplay}
                        <a href="course-detail.html?id=${course.id}" class="btn-view-course">View Course</a>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Initialize courses page when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.courses-page-container')) {
        initCoursesPage();
    }
});