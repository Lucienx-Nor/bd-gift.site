/**
 * navigation.js - Handling navigation and scrolling for the birthday card
 */

// State variables
let currentPage = 0;
let currentPageId = ""; // Thêm biến lưu ID trang hiện tại
let pageIdToIndexMap = {}; // Ánh xạ từ ID trang đến chỉ số

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

    // Tắt scroll-snap
    if (pages) {
        pages.style.scrollSnapType = "none";
    }

    // Tạo ánh xạ từ ID trang đến chỉ số
    pageElements.forEach((page, index) => {
        pageIdToIndexMap[page.id] = index;
    });

    // Setup event listeners
    setupEventListeners(initPageEffectsCallback);

    // Initialize first page
    setTimeout(() => {
        if (pageElements.length > 0) {
            pageElements[0].classList.add("active");
        }
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
            checkVisibility(initPageEffectsCallback);
        }, 1000);
    });

    // Navigation items click events - sử dụng data-page attribute
    navItems.forEach((item) => {
        item.addEventListener("click", function () {
            const targetPageId = this.getAttribute("data-page");
            scrollToPageById(targetPageId);
        });
    });

    // Scroll event
    pages.addEventListener("scroll", function () {
        checkVisibility(initPageEffectsCallback);
    });
}

/**
 * Scroll to a specific page by ID
 * @param {string} pageId - ID of the page to scroll to
 */
function scrollToPageById(pageId) {
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.scrollIntoView({ behavior: "smooth" });
    }
}

/**
 * Check which page is currently visible
 * @param {Function} initPageEffectsCallback - Callback for initializing page specific effects
 */
function checkVisibility(initPageEffectsCallback) {
    let foundVisiblePage = false;

    pageElements.forEach((page) => {
        const rect = page.getBoundingClientRect();
        const isVisible =
            rect.top < window.innerHeight / 2 &&
            rect.bottom > window.innerHeight / 2;

        if (isVisible && !foundVisiblePage) {
            foundVisiblePage = true;
            currentPageId = page.id; // Lưu ID trang hiện tại
            currentPage = pageIdToIndexMap[page.id]; // Cập nhật chỉ số trang

            updateNavigation();

            // Kích hoạt nội dung trang
            pageElements.forEach((p) => p.classList.remove("active"));
            page.classList.add("active");

            // Khởi tạo hiệu ứng khi đến mỗi trang
            if (typeof initPageEffectsCallback === "function") {
                initPageEffectsCallback(currentPage);
            }
        }
    });
}

/**
 * Update navigation highlighting
 */
function updateNavigation() {
    navItems.forEach((item) => {
        const navPageId = item.getAttribute("data-page");
        if (navPageId === currentPageId) {
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

/**
 * Get current page ID
 * @returns {string} - Current page ID
 */
export function getCurrentPageId() {
    return currentPageId;
}
