/**
 * main.js - Main entry point for the birthday card
 */

import { initNavigation } from "./navigation.js";
import { initCandles } from "./candles.js";
import {
    initFireworks,
    createBackgroundEffects,
    createBackgroundLight,
} from "./fireworks.js";
// import { initFlowers } from "./flowers.js";

/**
 * Initialize the birthday card when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function () {
    // Initialize all components
    initBirthdayCard();
});

/**
 * Main initialization function
 */
function initBirthdayCard() {
    // Get all DOM elements
    const elements = getDOMElements();

    // Set up navigation and page effects
    initNavigation(elements, handlePageEffects);

    // Initialize candles with microphone support
    initCandles(elements);

    // Initialize fireworks if available
    if (elements.startFireworksBtn && elements.fireworksContainer) {
        initFireworks(elements);
    }

    // Initialize surprise button if available
    if (elements.surpriseButton && elements.modalOverlay) {
        setupSurpriseButton(elements);
    }

    // Set up page-specific event listeners
    setupPageEventListeners(elements);

    // Initialize intersection observer for page transitions
    setupPageObserver(elements);

    console.log("Birthday card initialized successfully!");
}

/**
 * Collect all DOM elements needed for the application
 * @returns {Object} Object containing all DOM element references
 */
function getDOMElements() {
    return {
        // Navigation elements
        cover: document.getElementById("cover"),
        openBookBtn: document.getElementById("open-book"),
        pages: document.getElementById("pages"),
        pageElements: document.querySelectorAll(".page"),
        navItems: document.querySelectorAll(".nav-item"),

        // Surprise button elements
        surpriseButton: document.getElementById("surprise-button"),
        modalOverlay: document.getElementById("modal-overlay"),
        modalClose: document.getElementById("modal-close"),

        // Candle elements
        candleFlame: document.getElementById("candle-flame"),
        candleSvg: document.getElementById("cake-svg"),
        blowCandleBtn: document.getElementById("blow-candle"),
        resetCandlesBtn: document.getElementById("reset-candles"),
        candleMessage: document.getElementById("candle-message"),

        // Microphone elements
        micButton: document.getElementById("mic-button"),
        micStatus: document.getElementById("mic-status"),

        // Fireworks elements
        startFireworksBtn: document.getElementById("start-fireworks"),
        fireworksContainer: document.getElementById("fireworks-container"),

        // Flowers elements
        bloomFlowersBtn: document.getElementById("bloom-flowers"),
        nightFlowers: document.querySelector(".night-flowers"),
    };
}

/**
 * Handle page-specific effects when a page becomes visible
 * @param {number} pageIndex - Index of the page
 */
function handlePageEffects(pageIndex) {
    const fireworksContainer = document.getElementById("fireworks-container");

    // No need to proceed if elements don't exist
    if (!fireworksContainer) return;

    switch (pageIndex) {
        case 2: // Fireworks page
            // Create background effects if they don't exist yet
            if (!fireworksContainer.querySelector(".background-star")) {
                createBackgroundEffects(fireworksContainer);
                createBackgroundLight(fireworksContainer);
            }
            break;
    }
}

/**
 * Setup surprise button functionality
 * @param {Object} elements - DOM elements
 */
function setupSurpriseButton(elements) {
    // Skip if elements are missing
    if (
        !elements.surpriseButton ||
        !elements.modalOverlay ||
        !elements.modalClose
    ) {
        return;
    }

    // Surprise button event
    elements.surpriseButton.addEventListener("click", function () {
        elements.modalOverlay.classList.add("active");

        // Create enhanced fireworks with a delay
        if (elements.fireworksContainer) {
            setTimeout(() => {
                import("./fireworks.js").then((module) => {
                    module.createEnhancedFireworks(
                        elements.fireworksContainer,
                        5
                    );
                });
            }, 500);
        }
    });

    // Close modal event
    elements.modalClose.addEventListener("click", function () {
        elements.modalOverlay.classList.remove("active");
    });

    // Close modal on click outside
    elements.modalOverlay.addEventListener("click", function (e) {
        if (e.target === elements.modalOverlay) {
            elements.modalOverlay.classList.remove("active");
        }
    });
}

/**
 * Set up page-specific event listeners
 * @param {Object} elements - DOM elements
 */
function setupPageEventListeners(elements) {
    // Open book animation
    if (elements.openBookBtn && elements.cover && elements.pageElements) {
        elements.openBookBtn.addEventListener("click", function () {
            elements.cover.classList.add("open");

            // Set the first page as active
            if (elements.pageElements.length > 0) {
                elements.pageElements[0].classList.add("active");
            }

            // Show pages container
            if (elements.pages) {
                elements.pages.classList.add("show");
            }
        });
    }

    // Page navigation
    if (elements.navItems && elements.navItems.length > 0) {
        elements.navItems.forEach(function (item) {
            item.addEventListener("click", function () {
                const targetPage = this.getAttribute("data-page");
                if (!targetPage) return;

                // Update navigation
                elements.navItems.forEach(function (nav) {
                    nav.classList.remove("active");
                });
                this.classList.add("active");

                // Update page visibility
                elements.pageElements.forEach(function (page) {
                    page.classList.remove("active");
                    if (page.id === targetPage) {
                        page.classList.add("active");

                        // Auto-trigger page-specific animations
                        if (targetPage === "page-4" && elements.nightFlowers) {
                            // Auto-bloom flowers on page 4
                            setTimeout(function () {
                                bloomFlowers(elements);
                            }, 500);
                        }
                    }
                });

                // Scroll to page
                const targetElement = document.getElementById(targetPage);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                    });
                }
            });
        });
    }

    // Event listener for bloom button
    if (elements.bloomFlowersBtn) {
        elements.bloomFlowersBtn.addEventListener("click", function () {
            bloomFlowers(elements);
        });
    }
}

/**
 * Set up intersection observer for page transitions
 * @param {Object} elements - DOM elements
 */
function setupPageObserver(elements) {
    if (
        !elements.pageElements ||
        !elements.pageElements.length ||
        !elements.pages
    ) {
        return;
    }

    const observerOptions = {
        root: elements.pages,
        rootMargin: "0px",
        threshold: 0.7,
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                // Update page active state
                const targetId = entry.target.id;
                entry.target.classList.add("active");

                // Update navigation
                if (elements.navItems) {
                    elements.navItems.forEach(function (nav) {
                        nav.classList.remove("active");
                        if (nav.getAttribute("data-page") === targetId) {
                            nav.classList.add("active");
                        }
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all pages
    elements.pageElements.forEach(function (page) {
        observer.observe(page);
    });
}

/**
 * Handle flowers blooming animation
 * @param {Object} elements - DOM elements
 */
function bloomFlowers(elements) {
    if (!elements.nightFlowers) return;

    // Remove not-loaded class to start animations
    elements.nightFlowers.classList.remove("not-loaded");

    // Add growing animation classes to elements
    const flowers = document.querySelectorAll(".flower");
    flowers.forEach((flower, index) => {
        flower.style.setProperty("--d", 0.5 + index * 0.2 + "s");
        if (!flower.classList.contains("grow-ans")) {
            flower.classList.add("grow-ans");
        }
    });

    // Update button text and appearance
    if (elements.bloomFlowersBtn) {
        elements.bloomFlowersBtn.textContent = "Hoa Đang Nở!";
        elements.bloomFlowersBtn.disabled = true;

        // Reset button after animation completes
        setTimeout(() => {
            elements.bloomFlowersBtn.textContent = "Làm Nở Hoa";
            elements.bloomFlowersBtn.disabled = false;
        }, 4000);
    }

    // Create sparkles effect if function exists
    if (typeof createRandomSparkles === "function") {
        createRandomSparkles();
    }
}
