// Course Detail Page Handler

// ============================================
// COURSE DATA - DEFINED FIRST
// ============================================
const courseDetailData = [
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

// Category colors
const courseDetailColors = {
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

// ============================================
// INITIALIZATION FUNCTION
// ============================================
function initCourseDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));

    if (!courseId) {
        console.error('No course ID provided');
        window.location.href = 'courses.html';
        return;
    }

    const course = courseDetailData.find(c => c.id === courseId);
    
    if (!course) {
        console.error('Course not found with ID:', courseId);
        window.location.href = 'courses.html';
        return;
    }

    // Function to safely display content (checks if DOM is ready)
    const safeDisplay = () => {
        try {
            if (document.getElementById('courseNameHero')) {
                displayCourseDetails(course);
                displayRelatedCourses(course);
            } else {
                setTimeout(safeDisplay, 100);
            }
        } catch (error) {
            console.error('Error displaying course details:', error);
        }
    };

    // If DOM is still loading, wait for it
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', safeDisplay);
    } else {
        safeDisplay();
    }
}

// ============================================
// DISPLAY FUNCTIONS
// ============================================

function displayCourseDetails(course) {
    const categoryColor = courseDetailColors[course.category] || courseDetailColors["All Categories"];
    
    try {
        // Update breadcrumb
        const breadcrumbEl = document.getElementById('courseBreadcrumb');
        if (breadcrumbEl) breadcrumbEl.textContent = course.name;

        // Update hero section - populate the static HTML elements
        const nameEl = document.getElementById('courseNameHero');
        if (nameEl) nameEl.textContent = course.name;
        
        const categoryEl = document.getElementById('courseCategoryHero');
        if (categoryEl) categoryEl.textContent = course.category;
        
        document.getElementById('courseDurationHero').textContent = course.duration;
        document.getElementById('courseAgeHero').textContent = course.ages || 'All Ages';
        document.getElementById('coursePriceHero').textContent = `Rs. ${course.startingFee.toLocaleString()}`;
        
        // Update course image container background with gradient
        const imageContainer = document.getElementById('courseImageContainer');
        if (imageContainer) imageContainer.style.background = categoryColor;
    } catch (error) {
        console.error('Error in displayCourseDetails:', error);
    }
    
    try {
        // Update course info cards
        document.getElementById('courseCategory').textContent = course.category;
        document.getElementById('courseDuration').textContent = course.duration;
        document.getElementById('courseAgeGroup').textContent = course.ages || 'All Ages';

        // Update description with placeholder if needed
        const description = course.about || `This is a comprehensive course designed to help students master ${course.name}. Through engaging lessons and hands-on activities, you'll develop essential skills and knowledge in this subject. Our experienced instructors will guide you through each step of your learning journey, ensuring you get the most out of this course.`;
        document.getElementById('courseDescription').textContent = description;

        // Update sidebar
        const sidebarPriceEl = document.getElementById('sidebarPrice');
        if (sidebarPriceEl) sidebarPriceEl.textContent = `Rs. ${course.startingFee.toLocaleString()}`;
        document.getElementById('sidebarDuration').textContent = course.duration;
        document.getElementById('sidebarAgeGroup').textContent = course.ages || 'All Ages';

        // Handle pricing options: inject dropdown into enrollment card when there are multiple options
        const priceOptionsContainer = document.getElementById('priceOptionsContainer');
        if (priceOptionsContainer) {
            priceOptionsContainer.innerHTML = '';
            if (course.pricingOptions && course.pricingOptions.length > 0) {
                const selectId = 'priceSelect';
                const select = document.createElement('select');
                select.id = selectId;
                select.className = 'price-select';

                // Add default label option
                const defaultOpt = document.createElement('option');
                defaultOpt.value = '';
                defaultOpt.textContent = 'Select price option';
                select.appendChild(defaultOpt);

                course.pricingOptions.forEach((opt, idx) => {
                    const o = document.createElement('option');
                    // store both machine price and human label
                    o.value = typeof opt.price === 'number' ? opt.price : opt.price.toString();
                    o.textContent = `${opt.label} — ${opt.price}`;
                    o.dataset.label = opt.label;
                    select.appendChild(o);
                });

                priceOptionsContainer.appendChild(select);

                // Update sidebar price when selection changes
                select.addEventListener('change', function() {
                    const val = this.value;
                    if (!val) {
                        sidebarPriceEl.textContent = `Rs. ${course.startingFee.toLocaleString()}`;
                    } else {
                        // show chosen value (keep formatting if numeric)
                        const numeric = parseInt(String(val).replace(/\D/g, ''));
                        sidebarPriceEl.textContent = isNaN(numeric) ? val : `Rs. ${numeric.toLocaleString()}`;
                    }
                });
            } else {
                // No multiple pricing options — keep container empty to avoid duplicate price display
                priceOptionsContainer.innerHTML = '';
            }
        }
    } catch (error) {
        console.error('Error updating course details:', error);
    }

    // Setup enroll button
    const enrollBtn = document.getElementById('enrollBtn');
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function() {
            // If a price option is selected, pass it to enrollment page
            const priceSelect = document.getElementById('priceSelect');
            const selectedPrice = priceSelect && priceSelect.value ? priceSelect.value : '';
            handleEnroll(course.id, selectedPrice);
        });
    }
}

function displayRelatedCourses(currentCourse) {
    // Get courses in the same category, excluding the current one
    const relatedCourses = courseDetailData
        .filter(course => course.category === currentCourse.category && course.id !== currentCourse.id)
        .slice(0, 3); // Show only 3 related courses

    const relatedCoursesGrid = document.getElementById('relatedCoursesGrid');

    if (relatedCourses.length === 0) {
        relatedCoursesGrid.innerHTML = `
            <div class="no-courses-message" style="grid-column: 1 / -1;">
                <p>No other courses available in this category at the moment.</p>
            </div>
        `;
        return;
    }

    const categoryColor = courseDetailColors[currentCourse.category] || courseDetailColors["All Categories"];

    relatedCoursesGrid.innerHTML = relatedCourses.map(course => `
        <div class="course-card-new">
            <div class="course-card-header" style="background: ${categoryColor}">
                <span class="course-category-badge">${course.category}</span>
            </div>
            <div class="course-card-body">
                <h3 class="course-name">${course.name}</h3>
                ${course.ages ? `<span class="course-age"><i class="fas fa-user"></i> ${course.ages} years</span>` : ''}
                <div class="course-meta-info">
                    <span class="course-fee">Rs. ${course.startingFee.toLocaleString()}</span>
                    <span class="course-duration-new"><i class="fas fa-clock"></i> ${course.duration}</span>
                </div>
                ${course.about ? `<p class="course-about">${course.about}</p>` : ''}
                <a href="course-detail.html?id=${course.id}" class="btn-view-course">View Course</a>
            </div>
        </div>
    `).join('');
}

function handleEnroll(courseId, selectedPrice = '') {
    // Redirect to enrollment page with course ID and optional price override
    let url = `enrollment.html?id=${courseId}`;
    if (selectedPrice) {
        // encode price (could be numeric or string range)
        url += `&price=${encodeURIComponent(selectedPrice)}`;
    }
    window.location.href = url;
}

// Notification function (reuse from main script)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// ============================================
// RUN INITIALIZATION
// ============================================
// Ensure initialization runs after DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCourseDetail);
} else {
    // DOM is already loaded
    initCourseDetail();
}
