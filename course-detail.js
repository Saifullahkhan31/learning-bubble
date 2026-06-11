// Course Detail Page Handler

// Course Data and Category Colors are now loaded from courses-data.js


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

    const course = coursesData.find(c => c.id === courseId);

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
    const categoryColor = categoryColors[course.category] || categoryColors["All Categories"];

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

        // Update course image container with image, fallback to gradient
        const imageContainer = document.getElementById('courseImageContainer');
        if (imageContainer) {
            const courseImagePath = `assets/images/courses/course-${course.id}.jpg`;
            // Set background image with gradient fallback
            imageContainer.style.backgroundImage = `url('${courseImagePath}'), ${categoryColor}`;
            imageContainer.style.backgroundSize = 'cover';
            imageContainer.style.backgroundPosition = 'center';

            // Also set the img src if it exists (for <img> tag)
            const imgEl = imageContainer.querySelector('.course-image');
            if (imgEl) {
                imgEl.src = courseImagePath;
                imgEl.style.objectFit = 'cover';
            }
        }
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
                select.addEventListener('change', function () {
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
        enrollBtn.addEventListener('click', function () {
            // If a price option is selected, pass it to enrollment page
            const priceSelect = document.getElementById('priceSelect');
            const selectedPrice = priceSelect && priceSelect.value ? priceSelect.value : '';
            handleEnroll(course.id, selectedPrice);
        });
    }
}

function displayRelatedCourses(currentCourse) {
    // Get courses in the same category, excluding the current one
    const relatedCourses = coursesData
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

    const categoryColor = categoryColors[currentCourse.category] || categoryColors["All Categories"];

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

    switch (type) {
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
