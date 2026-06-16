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

    // ── Intersection Observer — scroll-triggered reveals ─────────────────
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // fire once
            }
        });
    }, observerOptions);

    // Observe section cards
    document.querySelectorAll('.feature-card, .advantage-card, .announcement-card, .section-header')
        .forEach(el => observer.observe(el));

    // Vision & Mission tiles — staggered
    document.querySelectorAll('.vm-tile').forEach((tile, i) => {
        tile.style.opacity = '0';
        tile.style.transform = 'translateY(28px)';
        const vmObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    setTimeout(() => {
                        tile.style.transition = 'opacity 0.65s ease, transform 0.65s cubic-bezier(0.22,1,0.36,1)';
                        tile.style.opacity = '1';
                        tile.style.transform = 'translateY(0)';
                    }, i * 140);
                    vmObs.unobserve(tile);
                }
            });
        }, { threshold: 0.12 });
        vmObs.observe(tile);
    });



    // ── Learning Approach — animated stat counters ────────────────────────
    const laSection = document.querySelector('.learning-approach');
    if (laSection) {
        // Scroll-reveal for the whole section
        laSection.style.opacity = '0';
        laSection.style.transform = 'translateY(32px)';
        const laObs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    // Fade the section in
                    laSection.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.22,1,0.36,1)';
                    laSection.style.opacity = '1';
                    laSection.style.transform = 'translateY(0)';

                    // Animate each stat counter
                    laSection.querySelectorAll('.la-stat-value').forEach((el, i) => {
                        const target = parseInt(el.dataset.target, 10);
                        setTimeout(() => {
                            let current = 0;
                            const duration = 1200; // ms
                            const steps = 60;
                            const inc = target / steps;
                            const interval = duration / steps;
                            const timer = setInterval(() => {
                                current += inc;
                                if (current >= target) {
                                    el.textContent = target + '%';
                                    clearInterval(timer);
                                } else {
                                    el.textContent = Math.floor(current) + '%';
                                }
                            }, interval);
                        }, i * 180);
                    });

                    laObs.unobserve(laSection);
                }
            });
        }, { threshold: 0.15 });
        laObs.observe(laSection);
    }

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
        let bgColor = '#1c2f72';
        
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
                bgColor = '#1c2f72';
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

    // ── Hero entry animations (staggered by data-delay) ──────────────────
    const heroAnimEls = document.querySelectorAll('.hero-animate');
    if (heroAnimEls.length) {
        const BASE_DELAY = 120;

        heroAnimEls.forEach(el => {
            const extra = parseInt(el.dataset.delay || '0', 10);

            if (el.classList.contains('hero-animate--right')) {
                // Wait for the hero image to load before sliding it in
                const img = el.querySelector('img');
                const triggerSlide = () => {
                    setTimeout(() => {
                        el.classList.add('is-visible'); // slide-in + start float
                    }, BASE_DELAY + extra);
                };
                if (img && !img.complete) {
                    img.addEventListener('load',  triggerSlide, { once: true });
                    img.addEventListener('error', triggerSlide, { once: true }); // still animate on broken img
                } else {
                    triggerSlide(); // already in cache
                }
            } else {
                setTimeout(() => el.classList.add('is-visible'), BASE_DELAY + extra);
            }
        });
    }

    // ── Cycling synonyms on the hero highlight word ───────────────────────
    const highlightEl = document.querySelector('.hero-title .highlight');
    if (highlightEl) {
        const words = ['Fulfilling', 'Enriching', 'Rewarding', 'Inspiring', 'Empowering'];
        let idx = 0;

        setInterval(() => {
            // Fade & slide out
            highlightEl.style.opacity   = '0';
            highlightEl.style.transform = 'translateY(-8px)';

            setTimeout(() => {
                idx = (idx + 1) % words.length;
                highlightEl.textContent = words[idx];
                // Reset to bottom before fading in
                highlightEl.style.transform = 'translateY(8px)';

                // Force a reflow so the transition fires
                void highlightEl.offsetWidth;

                highlightEl.style.opacity   = '1';
                highlightEl.style.transform = 'translateY(0)';
            }, 320); // matches the CSS transition duration
        }, 2800); // swap every 2.8 s
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
        // Restore saved preference (applied to <html> so anti-flash script works)
        const saved = localStorage.getItem('lb-theme');
        if (saved === 'dark') document.documentElement.classList.add('dark-theme');

        const themeToggle = document.createElement('button');
        themeToggle.className = 'theme-toggle';
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');
        themeToggle.setAttribute('title', 'Toggle dark mode');
        const isDark = () => document.documentElement.classList.contains('dark-theme');
        const updateIcon = () => {
            themeToggle.innerHTML = isDark()
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        };
        updateIcon();

        themeToggle.addEventListener('click', function () {
            document.documentElement.classList.toggle('dark-theme');
            localStorage.setItem('lb-theme', isDark() ? 'dark' : 'light');
            updateIcon();
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

// Course Data and Category Colors are now loaded from courses-data.js


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
            
            // Try to load course image, fallback to gradient if not found
            const courseImagePath = `assets/images/courses/course-${course.id}.jpg`;
            
            return `
                <div class="course-card-new" data-course-id="${course.id}">
                    <div class="course-card-header" style="background-image: url('${courseImagePath}'), ${categoryColor}; background-size: cover; background-position: center;">
                        <!-- category badge removed to avoid blocking image -->
                    </div>
                    <div class="course-card-body">
                        <h3 class="course-name">${course.name}</h3>
                        ${ageDisplay}
                        <div class="course-meta-info">
                            <span class="course-fee">Rs. ${course.startingFee.toLocaleString()}</span>
                            <span class="course-duration-new"><i class="fas fa-clock"></i> ${course.duration}</span>
                        </div>
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
    
    // Initialize Featured Courses Carousel
    initFeaturedCoursesCarousel();
});

// Featured Courses Carousel
function initFeaturedCoursesCarousel() {
    const carouselSlides = document.getElementById('carousel-slides');
    const carouselDots = document.getElementById('carousel-dots');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    
    if (!carouselSlides) return; // Exit if carousel not on page
    
    // Featured courses: select 5 diverse courses
    const featuredCourseIds = [1, 4, 9, 15, 18]; // Diverse course selection
    const featuredCourses = coursesData.filter(course => featuredCourseIds.includes(course.id));
    
    let currentSlide = 0;
    let autoplayTimer = null;
    const AUTOPLAY_INTERVAL = 5000; // 5 seconds
    
    // Map course ID to its banner image
    const courseImages = {
        1:  'assets/images/courses/course-1.jpg',
        4:  'assets/images/courses/course-4.jpg',
        9:  'assets/images/courses/course-9.jpg',
        15: 'assets/images/courses/course-15.jpg',
        18: 'assets/images/courses/course-18.jpg'
    };
    
    // Populate slides
    carouselSlides.innerHTML = featuredCourses.map((course, index) => {
        const imgSrc = courseImages[course.id] || null;
        const categoryGradient = categoryColors[course.category] || categoryColors['All Categories'];
        
        return `
            <div class="carousel-slide" data-slide="${index}">
                <a href="course-detail.html?id=${course.id}" class="featured-course-card" aria-label="View ${course.name}">
                    ${imgSrc
                        ? `<img src="${imgSrc}" alt="${course.name}" class="featured-course-bg-img" loading="${index === 0 ? 'eager' : 'lazy'}">`
                        : `<div class="featured-course-bg-gradient" style="background: ${categoryGradient};"></div>`
                    }
                    <div class="featured-course-hover-overlay">
                        <span class="featured-course-hover-btn">
                            <i class="fas fa-arrow-right"></i> View Course
                        </span>
                    </div>
                </a>
            </div>
        `;
    }).join('');
    
    // Populate dots
    carouselDots.innerHTML = featuredCourses.map((_, index) => `
        <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}" aria-label="Go to slide ${index + 1}"></button>
    `).join('');
    
    // Show slide function
    function showSlide(n) {
        const slides = carouselSlides.querySelectorAll('.carousel-slide');
        const dots = carouselDots.querySelectorAll('.carousel-dot');
        
        // Wrap around
        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }
        
        // Update transform
        carouselSlides.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update active dot and restart progress animation
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
                dot.classList.remove('paused');
                // Trigger animation restart by removing and re-adding the animation
                dot.style.animation = 'none';
                setTimeout(() => {
                    dot.style.animation = '';
                }, 10);
            } else {
                dot.classList.remove('active', 'paused');
            }
        });
    }
    
    // Auto-advance slides
    function startAutoplay() {
        autoplayTimer = setInterval(() => {
            showSlide(currentSlide + 1);
        }, AUTOPLAY_INTERVAL);
    }
    
    function stopAutoplay() {
        if (autoplayTimer) {
            clearInterval(autoplayTimer);
            autoplayTimer = null;
        }
        // Pause the progress animation on active dot
        const activeDot = carouselDots.querySelector('.carousel-dot.active');
        if (activeDot) {
            activeDot.classList.add('paused');
        }
    }
    
    function resumeAutoplay() {
        // Resume the progress animation on active dot
        const activeDot = carouselDots.querySelector('.carousel-dot.active');
        if (activeDot) {
            activeDot.classList.remove('paused');
        }
        startAutoplay();
    }
    
    // Dot click listeners
    carouselDots.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoplay();
            showSlide(index);
            resumeAutoplay();
        });
    });
    
    // Pause autoplay on hover, resume on mouse leave
    carouselWrapper?.addEventListener('mouseenter', stopAutoplay);
    carouselWrapper?.addEventListener('mouseleave', resumeAutoplay);
    
    // Initialize first slide and start autoplay
    showSlide(0);
    startAutoplay();
}