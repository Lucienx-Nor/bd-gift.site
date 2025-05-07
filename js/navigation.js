/**
 * navigation.js - Handling navigation and scrolling for the birthday card
 */

// State variables
let currentPage = 0;
const totalPages = 4;

// DOM Elements references
let cover;
let openBookBtn;
let pages;
let pageElements;
let navItems;

/**
 * Initialize navigation functionality
 * @param {Object} elements - DOM elements
 * @param {Function} initPageEffectsCallback - Callback for initializing page specific effects
 */
export function initNavigation(elements, initPageEffectsCallback) {
    // Store DOM elements
    cover = elements.cover;
    openBookBtn = elements.openBookBtn;
    pages = elements.pages;
    pageElements = elements.pageElements;
    navItems = elements.navItems;

    // Setup event listeners
    setupEventListeners(initPageEffectsCallback);

    // Initialize first page
    setTimeout(() => {
        pageElements[0].classList.add("active");
    }, 500);
}

/**
 * Setup event listeners for navigation
 * @param {Function} initPageEffectsCallback - Callback for initializing page specific effects
 */
function setupEventListeners(initPageEffectsCallback) {
    // Open book event
    openBookBtn.addEventListener("click", function () {
        cover.classList.add("open");
        setTimeout(() => {
            pages.style.overflowY = "auto";
            checkVisibility(initPageEffectsCallback);
        }, 1000);
    });

    // Navigation items click events
    navItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            scrollToPage(index);
        });
    });

    // Scroll event
    pages.addEventListener("scroll", function () {
        checkVisibility(initPageEffectsCallback);
    });
}

/**
 * Scroll to a specific page
 * @param {number} index - Page index to scroll to
 */
function scrollToPage(index) {
    pageElements[index].scrollIntoView({ behavior: "smooth" });
}

/**
 * Check which page is currently visible
 * @param {Function} initPageEffectsCallback - Callback for initializing page specific effects
 */
function checkVisibility(initPageEffectsCallback) {
    pageElements.forEach((page, index) => {
        const rect = page.getBoundingClientRect();
        const isVisible =
            rect.top < window.innerHeight / 2 &&
            rect.bottom > window.innerHeight / 2;

        if (isVisible) {
            currentPage = index;
            updateNavigation();

            // Kích hoạt nội dung trang
            page.classList.add("active");

            // Khởi tạo hiệu ứng khi đến mỗi trang
            if (typeof initPageEffectsCallback === "function") {
                initPageEffectsCallback(index);
            }
        }
    });
}

/**
 * Update navigation highlighting
 */
function updateNavigation() {
    navItems.forEach((item, index) => {
        if (index === currentPage) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
}

/**
 * Get current page
 * @returns {number} - Current page index
 */
export function getCurrentPage() {
    return currentPage;
}
