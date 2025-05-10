/**
 * candles.js - Handling candle blowing effects for the birthday card
 */

import { initMicrophone } from "./microphoneHandler.js";

// State variables
let candleBlown = false;

// DOM Elements
let candleFlame;
let candleSvg;
let blowCandleBtn;
let resetCandlesBtn;
let candleMessage;
let micButton;
let micStatus;

/**
 * Initialize candle functionality
 * @param {Object} elements - DOM elements
 */
export function initCandles(elements) {
    // Store DOM elements
    candleFlame = elements.candleFlame;
    candleSvg = elements.candleSvg;
    blowCandleBtn = elements.blowCandleBtn;
    resetCandlesBtn = elements.resetCandlesBtn;
    candleMessage = elements.candleMessage;
    micButton = elements.micButton;
    micStatus = elements.micStatus;

    // Setup event listeners
    setupCandleEvents();

    // Initialize microphone with elements and callback
    if (micButton && micStatus) {
        initMicrophone(
            { micButton, micStatus },
            blowOutCandle // Pass the blow candle function as callback
        );
    }
}

/**
 * Setup candle related event listeners
 */
function setupCandleEvents() {
    // Hover effects for candle
    candleSvg.addEventListener("mouseover", function (e) {
        if (e.target.closest("#candle") && !candleBlown) {
            // Hiệu ứng lửa lúc hover
            const flame = document.getElementById("candle-flame");
            if (flame) {
                flame.classList.add("flicker");
            }
        }
    });

    candleSvg.addEventListener("mouseout", function (e) {
        if (e.target.closest("#candle") && !candleBlown) {
            // Tắt hiệu ứng lửa khi không hover
            const flame = document.getElementById("candle-flame");
            if (flame) {
                flame.classList.remove("flicker");
            }
        }
    });

    // Click event for candle
    candleSvg.addEventListener("click", function (e) {
        if (e.target.closest("#candle")) {
            blowOutCandle();
        }
    });

    // Blow candle button event
    if (blowCandleBtn) {
        blowCandleBtn.addEventListener("click", function () {
            blowOutCandle();
        });
    }

    // Reset candles button event
    resetCandlesBtn.addEventListener("click", function () {
        // Bật lại ngọn lửa
        candleFlame.style.opacity = 1;
        candleMessage.classList.remove("show");
        candleBlown = false;
    });
}

/**
 * Blow out the candle
 */
export function blowOutCandle() {
    if (!candleBlown) {
        // Tắt lửa nến
        candleFlame.style.opacity = 0;

        // Thêm hiệu ứng khói
        createSmokeEffect();

        // Hiển thị thông báo
        candleMessage.classList.add("show");

        // Đánh dấu nến đã tắt
        candleBlown = true;

        // Tạo pháo hoa nhỏ ăn mừng
        setTimeout(() => {
            createCelebrationFireworks();
        }, 500);
    }
}

/**
 * Create smoke effect when blowing the candle
 */
function createSmokeEffect() {
    // Tạo 5 đốm khói
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const smoke = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "ellipse"
            );
            smoke.setAttribute("cx", 200); // Vị trí của nến
            smoke.setAttribute("cy", 155);
            smoke.setAttribute("rx", 3 + Math.random() * 2);
            smoke.setAttribute("ry", 4 + Math.random() * 3);
            smoke.setAttribute("fill", "rgba(200, 200, 200, 0.5)");
            smoke.classList.add("smoke-effect");

            // Thêm animation
            const anim = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "animate"
            );
            anim.setAttribute("attributeName", "cy");
            anim.setAttribute("from", "155");
            anim.setAttribute("to", "125");
            anim.setAttribute("dur", "2s");
            anim.setAttribute("begin", "0s");
            anim.setAttribute("fill", "freeze");

            const animOpacity = document.createElementNS(
                "http://www.w3.org/2000/svg",
                "animate"
            );
            animOpacity.setAttribute("attributeName", "opacity");
            animOpacity.setAttribute("from", "0.5");
            animOpacity.setAttribute("to", "0");
            animOpacity.setAttribute("dur", "2s");
            animOpacity.setAttribute("begin", "0s");
            animOpacity.setAttribute("fill", "freeze");

            smoke.appendChild(anim);
            smoke.appendChild(animOpacity);

            candleSvg.appendChild(smoke);

            // Xóa đốm khói sau khi kết thúc animation
            setTimeout(() => {
                smoke.remove();
            }, 2000);
        }, i * 200);
    }
}

/**
 * Create small fireworks when blowing out candle
 */
function createCelebrationFireworks() {
    const fireworkColors = [
        "#FF5252",
        "#FFD54F",
        "#64B5F6",
        "#f8a5c2",
        "#a29bfe",
        "#74b9ff",
    ];

    // Tạo pháo hoa nhỏ ở vùng xung quanh bánh
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const firework = document.createElement("div");
            firework.className = "cake-firework";

            // Vị trí ngẫu nhiên xung quanh bánh
            const posX = 150 + Math.random() * 100; // Giữa bánh
            const posY = 100 + Math.random() * 100; // Trên bánh

            const colorIndex = Math.floor(
                Math.random() * fireworkColors.length
            );

            firework.style.left = `${posX}px`;
            firework.style.top = `${posY}px`;
            firework.style.backgroundColor = fireworkColors[colorIndex];

            const pageContent = document.querySelector(".page-2 .page-content");
            pageContent.appendChild(firework);

            // Tạo tia sáng cho pháo hoa nhỏ
            for (let j = 0; j < 8; j++) {
                const particle = document.createElement("div");
                particle.className = "cake-particle";

                const angle = (j / 8) * 360;
                particle.style.transform = `rotate(${angle}deg)`;

                const particleInner = document.createElement("div");
                particleInner.style.backgroundColor =
                    fireworkColors[colorIndex];

                particle.appendChild(particleInner);
                firework.appendChild(particle);
            }

            // Xóa pháo hoa sau khi animation kết thúc
            setTimeout(() => {
                firework.remove();
            }, 1500);
        }, i * 300);
    }
}

/**
 * Check if candle is blown
 * @returns {boolean} - Whether the candle is blown
 */
export function isCandleBlown() {
    return candleBlown;
}
