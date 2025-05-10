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
// import { initFlowers, createEnhancedBouquet } from "./flowers.js";

/**
 * Initialize the birthday card when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", function () {
    // Get all DOM elementss
    const elements = {
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

        // Fireworks elements
        startFireworksBtn: document.getElementById("start-fireworks"),
        fireworksContainer: document.getElementById("fireworks-container"),

        // Flowers elements
        bloomFlowersBtn: document.getElementById("bloom-flowers"),
        bouquet: document.getElementById("bouquet"),
    };

    // Initialize all modules
    initNavigation(elements, initPageEffects);
    initCandles(elements);
    initFireworks(elements);
    // initFlowers(elements);

    // Setup surprise button
    setupSurpriseButton(elements);
});

/**
 * Initialize page specific effects when page becomes visible
 * @param {number} pageIndex - Index of the page
 */
function initPageEffects(pageIndex) {
    const fireworksContainer = document.getElementById("fireworks-container");
    const bouquet = document.getElementById("bouquet");

    switch (pageIndex) {
        case 2: // Trang pháo hoa
            // Tạo hiệu ứng sao nền
            if (!fireworksContainer.querySelector(".background-star")) {
                createBackgroundEffects(fireworksContainer);
                createBackgroundLight(fireworksContainer);
            }
            break;

        // case 3: // Trang bó hoa
        //     // Tạo bố cục hoa đẹp và cân đối
        //     if (!bouquet.querySelector(".flower")) {
        //         const flowers = createEnhancedBouquet(bouquet);
        //         // Lưu trạng thái đã tạo hoa
        //         bouquet.dataset.flowers = true;
        //     }
        //     break;
    }
}

/**
 * Setup surprise button functionality
 * @param {Object} elements - DOM elements
 */
function setupSurpriseButton(elements) {
    // Surprise button event
    elements.surpriseButton.addEventListener("click", function () {
        elements.modalOverlay.classList.add("active");
        setTimeout(() => {
            // Use enhanced fireworks
            import("./fireworks.js").then((module) => {
                module.createEnhancedFireworks(elements.fireworksContainer, 5);
            });
        }, 500);
    });

    // Close modal event
    elements.modalClose.addEventListener("click", function () {
        elements.modalOverlay.classList.remove("active");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Main page elements
    const cover = document.getElementById("cover");
    const openButton = document.getElementById("open-book");
    const pages = document.querySelectorAll(".page");
    const navItems = document.querySelectorAll(".nav-item");
    const pagesContainer = document.getElementById("pages");

    // Modal elements
    const surpriseButton = document.getElementById("surprise-button");
    const modalOverlay = document.getElementById("modal-overlay");
    const modalClose = document.getElementById("modal-close");

    // Page specific elements
    const blowCandleBtn = document.getElementById("blow-candle");
    const resetCandlesBtn = document.getElementById("reset-candles");
    const candleMessage = document.getElementById("candle-message");
    const candleFlame = document.getElementById("candle-flame");
    const startFireworksBtn = document.getElementById("start-fireworks");
    const fireworksContainer = document.getElementById("fireworks-container");
    const bloomFlowersBtn = document.getElementById("bloom-flowers");
    const nightFlowers = document.querySelector(".night-flowers");

    // Open book animation
    if (openButton) {
        openButton.addEventListener("click", function () {
            cover.classList.add("open");
            // Set the first page as active
            pages[0].classList.add("active");
        });
    }

    // Page navigation
    if (navItems.length > 0) {
        navItems.forEach(function (item) {
            item.addEventListener("click", function () {
                const targetPage = this.getAttribute("data-page");

                // Update navigation
                navItems.forEach(function (nav) {
                    nav.classList.remove("active");
                });
                this.classList.add("active");

                // Update page visibility
                pages.forEach(function (page) {
                    page.classList.remove("active");
                    if (page.id === targetPage) {
                        page.classList.add("active");

                        // Auto-trigger page-specific animations
                        if (targetPage === "page-4") {
                            // Auto-bloom flowers on page 4
                            setTimeout(bloomFlowers, 500);
                        }
                    }
                });

                // Scroll to page
                document.getElementById(targetPage).scrollIntoView({
                    behavior: "smooth",
                });
            });
        });
    }

    // Intersection Observer for page transitions
    const observerOptions = {
        root: pagesContainer,
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
                navItems.forEach(function (nav) {
                    nav.classList.remove("active");
                    if (nav.getAttribute("data-page") === targetId) {
                        nav.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all pages
    pages.forEach(function (page) {
        observer.observe(page);
    });

    // Surprise modal
    if (surpriseButton && modalOverlay && modalClose) {
        surpriseButton.addEventListener("click", function () {
            modalOverlay.classList.add("active");
        });

        modalClose.addEventListener("click", function () {
            modalOverlay.classList.remove("active");
        });

        // Close modal on click outside
        modalOverlay.addEventListener("click", function (e) {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove("active");
            }
        });
    }

    // Candle interactions on page 2
    if (blowCandleBtn && resetCandlesBtn && candleFlame) {
        // Blow out candles
        blowCandleBtn.addEventListener("click", function () {
            candleFlame.style.opacity = 0;
            candleMessage.textContent =
                "Chúc mừng sinh nhật! Ước nguyện của cậu sẽ thành hiện thực!";
            blowCandleBtn.disabled = true;
            resetCandlesBtn.style.display = "block";
        });

        // Reset candles
        resetCandlesBtn.addEventListener("click", function () {
            candleFlame.style.opacity = 1;
            candleMessage.textContent = "Chúc bạn những điều tốt đẹp nhất!";
            blowCandleBtn.disabled = false;
            resetCandlesBtn.style.display = "none";
        });

        // Initially hide the reset button
        resetCandlesBtn.style.display = "none";
    }

    // Fireworks function for page 3
    if (startFireworksBtn && fireworksContainer) {
        startFireworksBtn.addEventListener("click", startFireworks);

        function startFireworks() {
            // Clear existing fireworks
            fireworksContainer.innerHTML = "";
            startFireworksBtn.disabled = true;
            startFireworksBtn.textContent = "Đang hiển thị...";

            // Create 15 fireworks with different colors, sizes, and timings
            for (let i = 0.0; i < 15; i++) {
                createFirework();
            }

            // Reset button after animation completes
            setTimeout(function () {
                startFireworksBtn.disabled = false;
                startFireworksBtn.textContent = "Bắt Đầu Pháo Hoa";
            }, 5000);
        }

        function createFirework() {
            const firework = document.createElement("div");
            firework.className = "firework";

            // Random positions
            const left = Math.random() * 100;
            const top = 30 + Math.random() * 60;

            // Random colors
            const colors = [
                "#FF5252",
                "#FF4081",
                "#E040FB",
                "#7C4DFF",
                "#536DFE",
                "#448AFF",
                "#40C4FF",
                "#64FFDA",
                "#FFD740",
                "#FFAB40",
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Random sizes
            const size = 4 + Math.random() * 8;

            // Random delay
            const delay = Math.random() * 2;

            // Apply styles
            firework.style.left = `${left}%`;
            firework.style.top = `${top}%`;
            firework.style.backgroundColor = color;
            firework.style.width = `${size}px`;
            firework.style.height = `${size}px`;
            firework.style.animationDelay = `${delay}s`;

            // Add particles for explosion effect
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement("div");
                particle.className = "particle";
                particle.style.backgroundColor = color;
                particle.style.animationDelay = `${delay}s`;
                firework.appendChild(particle);
            }

            fireworksContainer.appendChild(firework);
        }
    }

    // Night Flowers animation for page 4
    function bloomFlowers() {
        if (nightFlowers) {
            // Remove not-loaded class to start animations
            nightFlowers.classList.remove("not-loaded");

            // Add growing animation classes to elements
            const flowers = document.querySelectorAll(".flower");
            flowers.forEach((flower, index) => {
                flower.style.setProperty("--d", 0.5 + index * 0.2 + "s");
                if (!flower.classList.contains("grow-ans")) {
                    flower.classList.add("grow-ans");
                }
            });

            // Update button text and appearance
            if (bloomFlowersBtn) {
                bloomFlowersBtn.textContent = "Hoa Đang Nở!";
                bloomFlowersBtn.disabled = true;

                // Reset button after animation completes
                setTimeout(() => {
                    bloomFlowersBtn.textContent = "Làm Nở Hoa";
                    bloomFlowersBtn.disabled = false;
                }, 4000);
            }
        }
    }

    // Event listener for bloom button
    if (bloomFlowersBtn) {
        bloomFlowersBtn.addEventListener("click", bloomFlowers);
    }
});
