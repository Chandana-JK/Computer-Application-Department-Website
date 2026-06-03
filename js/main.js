// Navigation items used for header and footer links
const pages = [
    { href: "index.html", label: "Home" },
    { href: "about.html", label: "About" },
    { href: "events.html", label: "Events" },
    { href: "gallery.html", label: "Gallery" },
    { href: "contact.html", label: "Contact" }
];

// Detect the current HTML file name so the active menu item can be highlighted
const currentPage = window.location.pathname.split("/").pop() || "index.html";

// Build the main navigation menu with an active state for the current page
function createNavigationLinks() {
    return pages
        .map((page) => {
            const isActive = page.href === currentPage;
            const activeClass = isActive ? " class=\"active\"" : "";
            const ariaCurrent = isActive ? " aria-current=\"page\"" : "";

            return `<li><a href="${page.href}"${activeClass}${ariaCurrent}>${page.label}</a></li>`;
        })
        .join("");
}

// Build the footer navigation links using the same page list
function createFooterLinks() {
    return pages
        .map((page) => `<li><a href="${page.href}">${page.label}</a></li>`)
        .join("");
}

// Render the header content into the page header placeholder
function renderHeader() {
    const siteHeader = document.querySelector("#site-header");

    if (!siteHeader) {
        return;
    }

    siteHeader.innerHTML = `
        <section class="container header-content" aria-label="Site header">
            <a class="brand" href="index.html" aria-label="Computer Applications Department home">
                <img class="site-logo" src="assets/images/jain-logo.png" alt="Jain University Logo">
                <div class="brand-text">
                    <span class="site-title">Computer Applications Department</span>
                    <span class="site-subtitle">Jain University &bull; MCA Program</span>
                </div>
            </a>

            <nav class="site-nav" aria-label="Main navigation">
                <ul>
                    ${createNavigationLinks()}
                </ul>
            </nav>
        </section>
    `;
}

// Render the footer content into the page footer placeholder
function renderFooter() {
    const siteFooter = document.querySelector("#site-footer");

    if (!siteFooter) {
        return;
    }

    // Footer structure: 3-column grid (branding-heavy col 1, links col 2, contact col 3)
    siteFooter.innerHTML = `
        <div class="footer-main">
            <div class="container footer-content">

                <!-- Column 1: Branding — visual anchor of the footer -->
                <div class="footer-column footer-brand-col">
                    <a href="index.html" class="footer-brand-link" aria-label="Computer Applications Department home">
                        <div class="footer-logo-wrap">
                            <img class="footer-logo" src="assets/images/jain-logo.png" alt="Jain University Logo">
                        </div>
                        <div class="footer-brand-text">
                            <span class="footer-dept-name">Computer Applications Department</span>
                            <span class="footer-univ-name">Jain University &bull; MCA Program</span>
                        </div>
                    </a>
                    <p class="footer-tagline">Cultivating technology leaders through rigorous academics, hands-on innovation, and purposeful learning.</p>
                    <div class="footer-brand-rule"></div>
                    <p class="footer-location-line">&#128205; Bengaluru, Karnataka, India</p>
                </div>

                <!-- Column 2: Quick Links -->
                <div class="footer-column footer-links-col">
                    <h4 class="footer-col-heading">Quick Links</h4>
                    <nav class="footer-nav" aria-label="Footer navigation">
                        <ul>
                            ${createFooterLinks()}
                        </ul>
                    </nav>
                </div>

                <!-- Column 3: Contact Information -->
                <div class="footer-column footer-contact-col">
                    <h4 class="footer-col-heading">Contact Information</h4>
                    <ul class="footer-contact-list">
                        <li class="footer-contact-item">
                            <span class="footer-contact-icon" aria-hidden="true">&#9993;</span>
                            <a href="mailto:admissions@jainuniversity.ac.in">admissions@jainuniversity.ac.in</a>
                        </li>
                        <li class="footer-contact-item">
                            <span class="footer-contact-icon" aria-hidden="true">&#128222;</span>
                            <a href="tel:+918046501755">+91 80 4650 1755</a>
                        </li>
                        <li class="footer-contact-item">
                            <span class="footer-contact-icon" aria-hidden="true">&#127760;</span>
                            <a href="http://www.jainuniversity.ac.in" target="_blank" rel="noopener noreferrer">www.jainuniversity.ac.in</a>
                        </li>
                        <li class="footer-contact-item">
                            <span class="footer-contact-icon" aria-hidden="true">&#127968;</span>
                            <span>Jain University, Bengaluru, Karnataka, India</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

        <!-- Copyright bottom bar -->
        <div class="footer-bottom">
            <div class="container footer-bottom-inner">
                <p class="footer-copyright">&copy; ${new Date().getFullYear()} Computer Applications Department &nbsp;|&nbsp; Jain University. All Rights Reserved.</p>
            </div>
        </div>
    `;
}

// Create and attach a mobile menu button for narrow screens
function setupMobileMenu() {
    const headerContent = document.querySelector(".header-content");
    const siteNav = document.querySelector(".site-nav");

    if (!headerContent || !siteNav) {
        return;
    }

    const menuButton = document.createElement("button");
    menuButton.className = "menu-toggle";
    menuButton.type = "button";
    menuButton.textContent = "Menu";
    menuButton.setAttribute("aria-label", "Toggle navigation");
    menuButton.setAttribute("aria-expanded", "false");

    headerContent.appendChild(menuButton);

    function toggleMenu() {
        const isOpen = siteNav.classList.toggle("nav-open");
        menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    menuButton.addEventListener("click", toggleMenu);

    // Close menu when a navigation link is clicked
    const navLinks = siteNav.querySelectorAll("a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (siteNav.classList.contains("nav-open")) {
                toggleMenu();
            }
        });
    });
}

// Smooth scrolling for internal anchor links and same-page navigation clicks
function setupSmoothScrolling() {
    document.addEventListener("click", (event) => {
        const link = event.target.closest("a[href]");

        if (!link) {
            return;
        }

        const href = link.getAttribute("href");

        if (href.startsWith("#")) {
            const target = document.querySelector(href);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        }

        if (href === currentPage) {
            const mainContent = document.querySelector("#main-content");

            if (mainContent) {
                event.preventDefault();
                mainContent.scrollIntoView({ behavior: "smooth" });
            }
        }
    });
}

// Add a brief visual feedback effect to buttons when they are clicked
function setupButtonClickEffect() {
    const buttons = document.querySelectorAll(".button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            button.classList.add("is-clicked");

            setTimeout(() => {
                button.classList.remove("is-clicked");
            }, 180);
        });
    });
}

// Form validation for the contact page to improve user experience
function setupContactFormValidation() {
    const form = document.querySelector(".contact-form");

    if (!form) {
        return;
    }

    form.setAttribute("novalidate", "");

    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");
    const submitButton = form.querySelector("button[type=\"submit\"]");
    const statusMessage = document.createElement("p");

    statusMessage.id = "form-status";
    statusMessage.className = "form-status";
    statusMessage.setAttribute("aria-live", "polite");
    statusMessage.hidden = true;
    form.setAttribute("aria-describedby", "form-status");
    submitButton.parentElement.insertBefore(statusMessage, submitButton);

    function showMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.className = `form-status ${type}`;
        statusMessage.hidden = false;
    }

    function setInvalidField(input) {
        input.setAttribute("aria-invalid", "true");
        input.focus();
    }

    function clearInvalidStates() {
        [nameInput, emailInput, messageInput].forEach((input) => {
            input.removeAttribute("aria-invalid");
        });
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearInvalidStates();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        if (name === "") {
            showMessage("Please enter your name.", "error");
            setInvalidField(nameInput);
            return;
        }

        if (email === "") {
            showMessage("Please enter your email address.", "error");
            setInvalidField(emailInput);
            return;
        }

        if (!isValidEmail(email)) {
            showMessage("Please enter a valid email address.", "error");
            setInvalidField(emailInput);
            return;
        }

        if (message === "") {
            showMessage("Please enter your message.", "error");
            setInvalidField(messageInput);
            return;
        }

        showMessage("Thank you! Your message has been submitted successfully.", "success");
        form.reset();
    });
}

// Hero image slider with auto-rotate and navigation controls
function setupHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    const indicators = document.querySelectorAll(".hero-indicator");
    const prevBtn = document.querySelector(".hero-prev");
    const nextBtn = document.querySelector(".hero-next");

    if (slides.length === 0) {
        return;
    }

    let currentIndex = 0;
    let autoSlideInterval = null;

    // Show slide at specified index and update active states
    function showSlide(index) {
        slides.forEach((slide) => slide.classList.remove("hero-slide-active"));
        indicators.forEach((indicator) => indicator.classList.remove("hero-indicator-active"));

        currentIndex = index % slides.length;
        slides[currentIndex].classList.add("hero-slide-active");
        indicators[currentIndex].classList.add("hero-indicator-active");
        indicators[currentIndex].setAttribute("aria-current", "true");
    }

    // Move to next slide with infinite loop wrapping
    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    // Move to previous slide with infinite loop wrapping
    function prevSlide() {
        showSlide(currentIndex - 1 + slides.length);
    }

    // Auto-advance slides every 4 seconds
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    // Stop auto-slide temporarily
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    // Stop, perform action, then resume auto-slide
    function pauseAndResume(callback) {
        stopAutoSlide();
        callback();
        startAutoSlide();
    }

    // Attach click handlers to navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            pauseAndResume(prevSlide);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            pauseAndResume(nextSlide);
        });
    }

    // Attach click handlers to indicator dots
    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            pauseAndResume(() => showSlide(index));
        });
    });

    // Start the auto-slide on page load
    startAutoSlide();
}

// Filter event cards by category on the Events page
function setupEventFilter() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const eventCards = document.querySelectorAll(".event-card");

    if (filterBtns.length === 0 || eventCards.length === 0) {
        return;
    }

    // Attach click handler to each filter button
    filterBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            // Remove active class from all buttons
            filterBtns.forEach((button) => button.classList.remove("filter-btn-active"));

            // Add active class to clicked button
            btn.classList.add("filter-btn-active");

            // Get the selected filter category
            const selectedFilter = btn.getAttribute("data-filter");

            // Show or hide event cards based on filter
            eventCards.forEach((card) => {
                const cardCategory = card.getAttribute("data-category");

                // Show all cards if filter is "all", otherwise match categories
                if (selectedFilter === "all" || cardCategory === selectedFilter) {
                    card.classList.remove("hidden");
                } else {
                    card.classList.add("hidden");
                }
            });
        });
    });
}

// Setup dark mode / light mode toggle
function setupThemeToggle() {
    // Create the theme toggle button
    const themeBtn = document.createElement("button");
    themeBtn.id = "theme-toggle";
    themeBtn.className = "theme-toggle-btn";
    themeBtn.setAttribute("aria-label", "Toggle dark mode");
    themeBtn.type = "button";

    // Get saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem("theme") || "light";

    // Apply saved theme on page load
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeBtn.innerHTML = '<span aria-hidden="true">&#9728;</span><span>Light Mode</span>';
        themeBtn.setAttribute("aria-label", "Switch to light mode");
    } else {
        themeBtn.innerHTML = '<span aria-hidden="true">&#9790;</span><span>Dark Mode</span>';
        themeBtn.setAttribute("aria-label", "Switch to dark mode");
    }

    // Insert button into navigation
    const siteNav = document.querySelector(".site-nav ul");
    if (siteNav) {
        const navItem = document.createElement("li");
        navItem.appendChild(themeBtn);
        siteNav.appendChild(navItem);
    }

    // Handle theme toggle on click
    themeBtn.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");

        // Update button text
        if (isDarkMode) {
            themeBtn.innerHTML = '<span aria-hidden="true">&#9728;</span><span>Light Mode</span>';
            themeBtn.setAttribute("aria-label", "Switch to light mode");
            localStorage.setItem("theme", "dark");
        } else {
            themeBtn.innerHTML = '<span aria-hidden="true">&#9790;</span><span>Dark Mode</span>';
            themeBtn.setAttribute("aria-label", "Switch to dark mode");
            localStorage.setItem("theme", "light");
        }
    });
}

// Setup scroll reveal animations using IntersectionObserver
function setupScrollReveal() {
    // Elements to animate on scroll
    const revealElements = document.querySelectorAll(
        ".info-panel, .content-card, .event-card, .highlight-card, .gallery-item, .page-section, .intro-section, .highlights, .contact-form, .contact-details"
    );

    if (revealElements.length === 0) {
        return;
    }

    // Configure IntersectionObserver options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    // Create IntersectionObserver callback
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Trigger animation when element enters viewport
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                // Stop observing after animation triggers (animate only once)
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    revealElements.forEach((element) => {
        element.classList.add("reveal-hidden");
        revealObserver.observe(element);
    });
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    setupThemeToggle();
    setupScrollReveal();
    setupHeroSlider();
    setupEventFilter();
});

renderHeader();
setupMobileMenu();
renderFooter();
setupSmoothScrolling();
setupButtonClickEffect();
setupContactFormValidation();
