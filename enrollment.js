// Enrollment Page Handler

// Get the course data from script.js (if available)
let enrollmentCart = [];

// Helper: format fee for display (handles numbers and strings)
function formatFee(fee) {
    if (typeof fee === 'number') return fee.toLocaleString();
    if (typeof fee === 'string') {
        // If string contains only digits and commas, return as-is; otherwise try to extract number
        const numeric = parseInt(fee.replace(/\D/g, ''));
        if (!isNaN(numeric) && String(fee).match(/\d/)) {
            return numeric.toLocaleString();
        }
        return fee;
    }
    return String(fee);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a course ID in URL params (coming from course detail page)
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = parseInt(urlParams.get('id'));

    // Get course data from script.js's coursesData
    if (typeof coursesData !== 'undefined' && courseId) {
        const course = coursesData.find(c => c.id === courseId);
        if (course) {
            const priceParam = urlParams.get('price');
            if (priceParam) {
                const numeric = parseInt(String(priceParam).replace(/\D/g, ''));
                const courseCopy = Object.assign({}, course);
                if (!isNaN(numeric) && numeric > 0) {
                    courseCopy.startingFee = numeric;
                }
                addCourseToCart(courseCopy);
            } else {
                addCourseToCart(course);
            }
        }
    }

    // Render initial cart
    renderCart();
    populateCategories();

    // Event listeners
    document.getElementById('btnAddMore').addEventListener('click', openCoursesModal);
    document.getElementById('closeModal').addEventListener('click', closeCoursesModal);
    document.getElementById('enrollmentForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('courseSearch').addEventListener('input', filterCourses);
    document.getElementById('categoryFilter').addEventListener('change', filterCourses);

    // Close modal when clicking outside
    document.getElementById('coursesModal').addEventListener('click', function(e) {
        if (e.target === this) closeCoursesModal();
    });
});

// Add course to cart
function addCourseToCart(course) {
    // Check if course already in cart
    if (enrollmentCart.find(c => c.id === course.id)) {
        alert('This course is already in your cart!');
        return;
    }

    enrollmentCart.push({
        id: course.id,
        name: course.name,
        category: course.category,
        startingFee: course.startingFee
    });

    renderCart();
    // Re-render modal to update button states for all courses
    filterCourses();
}

// Remove course from cart
function removeCourseFromCart(courseId) {
    enrollmentCart = enrollmentCart.filter(c => c.id !== courseId);
    renderCart();
}

// Render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');

    if (enrollmentCart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>No courses selected yet</p>
                <small>Click "Add More Courses" to start</small>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = enrollmentCart.map(course => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${course.name}</h4>
                    <p class="cart-item-category">${course.category}</p>
                    <p class="cart-item-price">Rs. ${formatFee(course.startingFee)}</p>
                </div>
                <button type="button" class="btn-remove" onclick="removeCourseFromCart(${course.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    }

    updateCartSummary();
}

// Update cart summary totals
function updateCartSummary() {
    // Parse numeric values robustly (handles numeric strings, ranges, or values with commas)
    const subtotal = enrollmentCart.reduce((sum, course) => {
        const val = String(course.startingFee || '0');
        const numeric = parseInt(val.replace(/\D/g, '')) || 0;
        return sum + numeric;
    }, 0);
    document.getElementById('subtotal').textContent = `Rs. ${subtotal.toLocaleString()}`;
    document.getElementById('totalAmount').textContent = `Rs. ${subtotal.toLocaleString()}`;
}

// Open courses modal
function openCoursesModal() {
    document.getElementById('coursesModal').style.display = 'flex';
    if (typeof coursesData !== 'undefined') {
        renderCoursesInModal(coursesData);
    }
}

// Close courses modal
function closeCoursesModal() {
    document.getElementById('coursesModal').style.display = 'none';
}

// Render courses in modal
function renderCoursesInModal(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    coursesGrid.innerHTML = courses.map(course => {
        const isInCart = enrollmentCart.find(c => c.id === course.id);
        return `
            <div class="course-card-enrollment">
                <div class="course-card-header" style="background: ${getCategoryColor(course.category)}">
                    <span class="course-category-badge">${course.category}</span>
                </div>
                <div class="course-card-body">
                    <h3 class="course-name">${course.name}</h3>
                    ${course.ages ? `<span class="course-age"><i class="fas fa-user"></i> ${course.ages}</span>` : ''}
                    <div class="course-meta-info">
                        <span class="course-fee">Rs. ${course.startingFee.toLocaleString()}</span>
                        <span class="course-duration"><i class="fas fa-clock"></i> ${course.duration}</span>
                    </div>
                    <button type="button" class="btn-add-course ${isInCart ? 'added' : ''}" 
                            onclick="addCourseToCart(${JSON.stringify(course).replace(/"/g, '&quot;')})"
                            ${isInCart ? 'disabled' : ''}>
                        ${isInCart ? '<i class="fas fa-check"></i> Added' : '<i class="fas fa-plus"></i> Add to Cart'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// Get category color (using categoryColors from script.js if available)
function getCategoryColor(category) {
    if (typeof categoryColors !== 'undefined') {
        return categoryColors[category] || categoryColors["All Categories"];
    }
    // Fallback colors if categoryColors not available
    const colors = {
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
    return colors[category] || colors["All Categories"];
}

// Populate category filter dropdown
function populateCategories() {
    if (typeof coursesData === 'undefined') return;

    const categories = [...new Set(coursesData.map(c => c.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Filter courses in modal
function filterCourses() {
    if (typeof coursesData === 'undefined') return;

    const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;

    const filtered = coursesData.filter(course => {
        const matchesSearch = course.name.toLowerCase().includes(searchTerm) || 
                            course.category.toLowerCase().includes(searchTerm);
        const matchesCategory = !selectedCategory || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    renderCoursesInModal(filtered);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();

    // Validate cart
    if (enrollmentCart.length === 0) {
        alert('Please add at least one course to your cart!');
        return;
    }

    // Get form data
    const formData = new FormData(document.getElementById('enrollmentForm'));
    
    // Add cart data
    formData.append('courses', JSON.stringify(enrollmentCart));
    formData.append('totalAmount', document.getElementById('totalAmount').textContent);

    // Submit to PHP handler
    fetch('enrollment.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show success modal
            document.getElementById('successPhone').textContent = formData.get('phone');
            document.getElementById('successModal').style.display = 'flex';
            
            // Reset form
            document.getElementById('enrollmentForm').reset();
            enrollmentCart = [];
            renderCart();
        } else {
            alert('Error: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
}

// Close success modal
document.addEventListener('DOMContentLoaded', function() {
    const successModal = document.getElementById('successModal');
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    }
});
