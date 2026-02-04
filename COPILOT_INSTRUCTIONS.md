# Copilot Instructions for Learning Bubble

## Project Overview

Learning Bubble is a responsive educational website built with vanilla HTML5, CSS3, and JavaScript. It features a modern design with course listings, detailed course pages, and an enrollment system with PHP backend for email and WhatsApp integration.

**Tech Stack:**
- Frontend: HTML5, CSS3 (Flexbox/Grid), Vanilla JavaScript
- Backend: PHP (mail functionality)
- Styling: Inter font, Font Awesome icons, CSS gradients
- No build tools, no frameworks — pure frontend with PHP for server operations

## Architecture & Key Files

### Core Structure

1. **Single-Page Navigation**
   - `index.html` - Landing page with hero, features, resources, announcements
   - `about.html`, `contact.html`, `resources.html` - Static pages
   - `courses.html` - Course listing from `courseData` array
   - `course-detail.html` - Individual course view (dynamic via `?id=X` parameter)
   - `enrollment.html` - Multi-course enrollment form with cart system

2. **Styling System**
   - `styles.css` - All CSS, includes responsive breakpoints at 768px (tablet) and 480px (mobile)
   - Design pattern: Gradient backgrounds for categories/sections, card-based layouts, glass morphism effects
   - Color scheme: Purple/blue primary gradients with accent colors per category

3. **JavaScript Modules**
   - `script.js` - Global features (navbar, animations, mobile menu) + courses page logic
   - `course-detail.js` - Course data + dynamic course detail rendering
   - `enrollment.js` - Cart management + form handling
   - Each file uses `DOMContentLoaded` event and Intersection Observer for scroll animations

4. **Backend (Deployment-Ready)**
   - `enrollment.php` - Processes enrollment form, sends emails, generates WhatsApp links
   - Requires configuration: `ADMIN_EMAIL` and `ADMIN_WHATSAPP` constants (see ENROLLMENT_SETUP.md)

### Data Flow

**Course Data:**
- `coursesData` array in `script.js` (32 courses across 10 categories) - used for courses.html listing
- `courseDetailData` array in `course-detail.js` (same data) - used for course detail pages
- Structure: `{id, name, category, fee, duration, ages, about, pricingOptions}`

**Category Colors:**
- `categoryColors` object in `script.js` maps categories to gradient strings for course cards
- `courseDetailColors` object in `course-detail.js` for detail page hero sections
- Applied to headers and cards for visual consistency

## Key Conventions & Patterns

### Navigation & Links

- Use `course-detail.html?id=X` for course links (X = numeric ID from coursesData)
- Internal links to sections use hash anchors: `href="#home"`, `href="#about"`
- Mobile menu closes automatically when nav links are clicked (handled by script.js)

### Responsive Design

Breakpoints in styles.css:
- **Desktop**: 1200px+ (full layout)
- **Tablet**: 768px–1199px (adjusted grids, reduced gaps)
- **Mobile**: Below 768px (single-column, hamburger menu, full-width cards)

Use `@media (max-width: 768px)` for tablet/mobile overrides.

### Animation & Interactivity

- **Scroll Animations**: Elements with class `fade-in-up` trigger on scroll via Intersection Observer
- **Navbar Effect**: `scrolled` class added to navbar when scroll > 50px, adds subtle shadow
- **Hover Effects**: Cards translate up 5-10px on hover, buttons have shadow/glow on hover
- **Mobile Menu**: Toggle with `hamburger.active` and `nav-menu.active` classes

### Form Handling

**Enrollment Form (`enrollment.js`):**
- Cart stored in `localStorage` with key `enrollmentCart` (JSON stringified array)
- Form validation: Name, Email, Phone required; email must be valid format
- AJAX submission to `enrollment.php` (no page reload)
- Sends: `name, email, phone, age, parentName, message, courseIds[]`

**Server-Side (`enrollment.php`):**
- Input sanitized via `sanitize_input()` to prevent XSS
- Auto-generates enrollment email for admin with WhatsApp contact button
- Pre-fills WhatsApp message with student name and course details
- Sends confirmation email to student

### CSS Organization

- **Utilities**: `.container`, `.section-header`, `.btn`, `.fade-in-up`
- **Components**: `.navbar`, `.card`, `.hero`, `.modal`, etc.
- **Page-Specific**: Selectors target specific page layouts (e.g., `.page-enrollment`)
- **Gradient Pattern**: Apply via `background: linear-gradient(135deg, #color1 0%, #color2 100%)`

### Course Display

- Courses on listing page (courses.html) show: name, category badge, age group, price, duration, and "View Course" link
- Course descriptions are **only shown on the detail page**, not in the card listing
- Related courses shown on detail page (3 from same category)
- Special handling for multi-tier pricing (IGCSE, IELTS, SAT) via `pricingOptions` array
- Prices formatted with rupee symbol (Rs.) and thousands separators

## Image Specifications

### Course Card Images (Listing Page & Detail Page)

**Single Image for Both Uses:**
You can use the **same 1200px × 600px image** in both locations:

1. **Course Card Header** (courses.html listing):
   - Current size: 300px wide × 180px tall
   - Using `background-size: cover` + `background-position: center`
   - Image scales down perfectly (no quality loss)

2. **Course Detail Hero Image** (course-detail.html):
   - Container size: ~550px wide × 300px tall (on desktop)
   - Same image, larger display
   - Uses `object-fit: cover` for responsive sizing
   - Responsive: Adapts to tablet (full width, ~400px tall) and mobile

**Master Image Resolution: 1200px × 600px** (16:9 aspect ratio)
- File Format: JPG, PNG, or WebP
- File Size: Keep under 200KB per image
- Color Depth: RGB (no alpha channel needed)
- Optimization: Use TinyPNG, ImageOptim, or similar tools

**Why 1200×600px Works for Both:**
- At 2× pixel density, displays crisply at any size
- 16:9 ratio works perfectly for both square-ish card headers and panoramic detail displays
- Scales down smoothly without distortion
- Scales up well without pixelation (due to high resolution)

**Implementation:**
- Listing cards: Replace gradient with `background-image: url('path/to/image.jpg')`
- Detail page: Already set up to use `<img>` tag with `object-fit: cover`
- Both use `background-position: center` / `object-fit: cover` to maintain aspect ratio

---

### Category Tile Images (Top of Courses Page)

**For Category Filter Tiles:**
- Current size: 200px wide × 200px tall (on desktop)
- Responsive: 180px × 150px (tablet), 150px × 120px (mobile)

**Recommended Resolution: 800px × 800px** (1:1 square aspect ratio)
- File Format: JPG, PNG, or WebP
- File Size: Keep under 150KB per image
- Color Depth: RGB

**Why 800×800px:**
- At 2× pixel density, perfect for 200px display (400px virtual pixels)
- Square format works best for square tiles
- Scales down well to smaller mobile sizes
- Center-aligned so composition stays intact at any size

**Implementation:**
- Replace the gradient backgrounds in HTML `data-category` tiles
- Use CSS: `background-image: url('path/to/category-image.jpg')`
- Already uses `background-size: cover` and `background-position: center`
- Tiles have `.category-tile-image` class for styling

---

### Summary: Image Assets You Need

| Asset | Quantity | Resolution | File Size | Note |
|-------|----------|-----------|-----------|------|
| Course Images | 32 courses | 1200×600px (16:9) | <200KB each | Use **same image** for both card + detail page |
| Category Images | 10 categories | 800×800px (1:1) | <150KB each | Optional (currently using gradients) |

**File Organization:**
```
assets/images/
├── courses/
│   ├── course-1.jpg
│   ├── course-2.jpg
│   └── ... (32 total)
└── categories/
    ├── literature.jpg
    ├── technology.jpg
    └── ... (10 total)
```

## Common Tasks

### Adding a New Course

1. Add entry to `coursesData` in `script.js`:
   ```javascript
   { 
     id: 33, 
     name: "Course Name", 
     category: "Category Name", 
     fee: 10000, 
     startingFee: 10000, 
     duration: "8 sessions | 2 months", 
     ages: "10–16", 
     about: "Description text (shown only on detail page)", 
     pricingOptions: null 
   }
   ```
2. Add same entry to `courseDetailData` in `course-detail.js`
3. Ensure category exists in both `categoryColors` (script.js) and `courseDetailColors` (course-detail.js)
4. Course now appears in listings and can be linked via `course-detail.html?id=33`

### Adding Course Images

1. Prepare image at 1200px × 600px resolution (16:9 aspect ratio)
2. Place in `assets/images/courses/` directory
3. Modify course card rendering in `script.js` to include image or update CSS gradient
4. Test responsiveness across mobile, tablet, and desktop

### Updating Page Styles

- Edit `styles.css` directly (no CSS preprocessor)
- For responsive changes, add `@media (max-width: 768px)` or `@media (max-width: 480px)` blocks
- Test across all breakpoints after changes

### Modifying Enrollment Email

- Edit email template in `enrollment.php` (search for `$emailBody =`)
- Modify WhatsApp pre-fill message in same file (search for `wa.me`)
- Remember to update both admin email and student confirmation email

### Adding Navigation Links

- Update `.nav-menu` in HTML files (or all files if shared header exists)
- Script automatically highlights active link based on current page filename
- For multi-page navbar, consider using server-side includes or templating

## Deployment Checklist

- [ ] Update `ADMIN_EMAIL` in `enrollment.php`
- [ ] Update `ADMIN_WHATSAPP` in `enrollment.php` (format: country code + number, e.g., 923001234567)
- [ ] Verify server has PHP mail() enabled or SMTP configured
- [ ] Test enrollment flow: course → cart → form → email confirmation
- [ ] Check all course IDs have associated data in both `coursesData` and `courseDetailData`
- [ ] Validate responsive design on mobile/tablet devices
- [ ] Test smooth scrolling and animations in target browsers
- [ ] Optimize and upload course card images (1200×600px @ <200KB each)

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

All modern CSS features (Flexbox, Grid, backdrop-filter) supported. No IE11 support.

## Documentation Files

- **COURSE_DETAIL_IMPLEMENTATION.md** - Course detail page structure and course data format
- **ENROLLMENT_SETUP.md** - Email/WhatsApp configuration and enrollment flow details
