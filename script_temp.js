document.addEventListener("DOMContentLoaded", function () {
    // Variables
    let currentPage = 0;
    const totalPages = 4;
    let flowersBloom = false;
    let fireworksStarted = false;
    let candleBlown = false;

    // DOM Elements
    const cover = document.getElementById("cover");
    const openBookBtn = document.getElementById("open-book");
    const pages = document.getElementById("pages");
    const pageElements = document.querySelectorAll(".page");
    const navItems = document.querySelectorAll(".nav-item");
    const surpriseButton = document.getElementById("surprise-button");
    const modalOverlay = document.getElementById("modal-overlay");
    const modalClose = document.getElementById("modal-close");
    const resetCandlesBtn = document.getElementById("reset-candles");
    const candleMessage = document.getElementById("candle-message");
    const startFireworksBtn = document.getElementById("start-fireworks");
    const fireworksContainer = document.getElementById("fireworks-container");
    const bloomFlowersBtn = document.getElementById("bloom-flowers");
    const bouquet = document.getElementById("bouquet");
    const flowers = document.querySelectorAll(".flower");

    // Thêm lấy phần tử SVG của nến và lửa
    const candleFlame = document.getElementById("candle-flame");
    const candleSvg = document.getElementById("cake-svg");
    const blowCandleBtn = document.getElementById("blow-candle");

    // Open book
    openBookBtn.addEventListener("click", function () {
        cover.classList.add("open");
        setTimeout(() => {
            pages.style.overflowY = "auto";
            checkVisibility();
        }, 1000);
    });

    // Navigation
    navItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            scrollToPage(index);
        });
    });

    // Scroll to specific page
    function scrollToPage(index) {
        pageElements[index].scrollIntoView({ behavior: "smooth" });
    }

    // Check which page is visible
    function checkVisibility() {
        pageElements.forEach((page, index) => {
            const rect = page.getBoundingClientRect();
            const isVisible =
                rect.top < window.innerHeight / 2 &&
                rect.bottom > window.innerHeight / 2;

            if (isVisible) {
                currentPage = index;
                updateNavigation();

                // Activate page content
                page.classList.add("active");
            }
        });
    }

    // Update navigation
    function updateNavigation() {
        navItems.forEach((item, index) => {
            if (index === currentPage) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    // Scroll event
    pages.addEventListener("scroll", function () {
        checkVisibility();
    });

    // === CẢI TIẾN TRANG 2: THÊM CHỨC NĂNG THỔI NẾN ===

    // Thêm hiệu ứng khi hover vào nến
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

    // Thêm sự kiện thổi nến
    candleSvg.addEventListener("click", function (e) {
        if (e.target.closest("#candle")) {
            blowOutCandle();
        }
    });

    // Thêm sự kiện cho nút thổi nến
    if (blowCandleBtn) {
        blowCandleBtn.addEventListener("click", function () {
            blowOutCandle();
        });
    }

    // Hàm thổi tắt nến
    function blowOutCandle() {
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

    // Tạo hiệu ứng khói
    function createSmokeEffect() {
        // Tính vị trí của nến
        const candle = document.getElementById("candle");
        const candleRect = candle.getBoundingClientRect();

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

    // Reset candles
    resetCandlesBtn.addEventListener("click", function () {
        // Bật lại ngọn lửa
        candleFlame.style.opacity = 1;
        candleMessage.classList.remove("show");
        candleBlown = false;
    });

    // Hiệu ứng pháo hoa nhỏ khi thổi nến
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

                const pageContent = document.querySelector(
                    ".page-2 .page-content"
                );
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

    // === CẢI TIẾN TRANG 3: PHÁO HOA RỰC RỠ HƠN ===

    // Start fireworks
    startFireworksBtn.addEventListener("click", function () {
        if (!fireworksStarted) {
            fireworksStarted = true;
            createEnhancedFireworks(15);

            // Change button text
            this.textContent = "Thêm Pháo Hoa";

            // Thêm hiệu ứng âm thanh (tuỳ chọn - thêm file âm thanh)
            playFireworkSound();
        } else {
            createEnhancedFireworks(8);
        }
    });

    // Tạo hiệu ứng pháo hoa nâng cao
    function createEnhancedFireworks(count) {
        // Các màu rực rỡ cho pháo hoa
        const vibrantColors = [
            "#FF5252",
            "#FFD54F",
            "#64B5F6",
            "#f8a5c2",
            "#a29bfe",
            "#74b9ff",
            "#ff9ff3",
            "#55efc4",
            "#fdcb6e",
            "#fab1a0",
            "#ff6b6b",
            "#48dbfb",
            "#1dd1a1",
            "#00d2d3",
            "#54a0ff",
            "#5f27cd",
            "#c8d6e5",
            "#576574",
        ];

        // Các loại pháo hoa
        const fireworkTypes = ["circular", "spiral", "heart", "star", "burst"];

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                // Chọn ngẫu nhiên một loại pháo hoa
                const typeIndex = Math.floor(
                    Math.random() * fireworkTypes.length
                );
                const fireworkType = fireworkTypes[typeIndex];

                // Tạo pháo hoa với màu ngẫu nhiên
                const colorIndex = Math.floor(
                    Math.random() * vibrantColors.length
                );
                const color = vibrantColors[colorIndex];

                // Vị trí ngẫu nhiên
                const posX = Math.random() * fireworksContainer.offsetWidth;
                const posY =
                    Math.random() * (fireworksContainer.offsetHeight - 100) +
                    50;

                // Kích thước ngẫu nhiên cho pháo hoa
                const size = 5 + Math.random() * 3;

                // Tạo phần tử pháo hoa
                const firework = document.createElement("div");
                firework.className = `firework ${fireworkType}`;
                firework.style.left = `${posX}px`;
                firework.style.top = `${posY}px`;
                firework.style.backgroundColor = color;
                firework.style.width = `${size}px`;
                firework.style.height = `${size}px`;

                fireworksContainer.appendChild(firework);

                // Tạo hạt cho pháo hoa dựa trên loại
                createParticlesForFirework(firework, fireworkType, color);

                // Thêm ánh sáng cho pháo hoa
                addFireworkGlow(firework, color);

                // Xóa pháo hoa sau khi kết thúc
                setTimeout(() => {
                    firework.remove();
                }, 1500);
            }, i * 300);
        }
    }

    // Thêm ánh sáng cho pháo hoa
    function addFireworkGlow(firework, color) {
        const glow = document.createElement("div");
        glow.className = "firework-glow";
        glow.style.backgroundColor = color;
        firework.appendChild(glow);
    }

    // Tạo hạt cho pháo hoa dựa trên loại
    function createParticlesForFirework(firework, type, color) {
        let particleCount;

        switch (type) {
            case "circular":
                particleCount = 20;
                break;
            case "spiral":
                particleCount = 24;
                break;
            case "heart":
                particleCount = 15;
                break;
            case "star":
                particleCount = 16;
                break;
            case "burst":
                particleCount = 30;
                break;
            default:
                particleCount = 12;
        }

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = `particle ${type}-particle`;

            let angle;
            let distance;

            // Tùy chỉnh góc và khoảng cách tùy theo loại pháo hoa
            switch (type) {
                case "circular":
                    angle = (i / particleCount) * 360;
                    particle.style.transform = `rotate(${angle}deg)`;
                    break;

                case "spiral":
                    angle = (i / particleCount) * 720; // 2 vòng
                    distance = 50 + (i / particleCount) * 50;
                    particle.style.transform = `rotate(${angle}deg)`;
                    particle.style.width = `${distance}px`;
                    break;

                case "heart":
                    // Công thức hình trái tim
                    const t = (i / particleCount) * 2 * Math.PI;
                    const x = 16 * Math.pow(Math.sin(t), 3);
                    const y =
                        13 * Math.cos(t) -
                        5 * Math.cos(2 * t) -
                        2 * Math.cos(3 * t) -
                        Math.cos(4 * t);
                    angle = (Math.atan2(y, x) * 180) / Math.PI;
                    particle.style.transform = `rotate(${angle}deg)`;
                    break;

                case "star":
                    // Hình ngôi sao 5 cánh
                    const step = Math.floor(i / (particleCount / 5));
                    angle =
                        ((i % (particleCount / 5)) / (particleCount / 5)) * 72 +
                        step * 144;
                    particle.style.transform = `rotate(${angle}deg)`;
                    break;

                case "burst":
                    // Bùng nổ ngẫu nhiên
                    angle = Math.random() * 360;
                    particle.style.transform = `rotate(${angle}deg)`;
                    break;

                default:
                    angle = (i / particleCount) * 360;
                    particle.style.transform = `rotate(${angle}deg)`;
            }

            // Tạo hạt bên trong
            const particleInner = document.createElement("div");

            // Làm cho màu hạt hơi khác để tạo hiệu ứng ánh sáng
            const hue = getHue(color);
            const newHue = (hue + Math.random() * 30 - 15) % 360;
            particleInner.style.backgroundColor = `hsl(${newHue}, 100%, 65%)`;

            // Thêm hiệu ứng lấp lánh
            if (Math.random() > 0.7) {
                particleInner.classList.add("sparkle");
            }

            particle.appendChild(particleInner);
            firework.appendChild(particle);
        }
    }

    // Lấy giá trị màu Hue từ mã màu hex
    function getHue(hexColor) {
        // Chuyển mã hex thành RGB
        let r = 0,
            g = 0,
            b = 0;

        if (hexColor.startsWith("#")) {
            const hex = hexColor.substring(1);
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        } else if (hexColor.startsWith("rgb")) {
            const rgbMatch = hexColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (rgbMatch) {
                r = parseInt(rgbMatch[1]);
                g = parseInt(rgbMatch[2]);
                b = parseInt(rgbMatch[3]);
            }
        }

        // Chuyển RGB thành HSL
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;

        if (max === min) {
            h = 0; // achromatic
        } else {
            const d = max - min;
            switch (max) {
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }

        return h * 360;
    }

    // Phát âm thanh pháo hoa (tuỳ chọn - thêm file âm thanh)
    function playFireworkSound() {
        // Giả định có file âm thanh
        // const sound = new Audio('sounds/firework-sound.mp3');
        // sound.volume = 0.4;
        // sound.play();
        console.log("Đang phát âm thanh pháo hoa");
    }

    // Bloom flowers
    bloomFlowersBtn.addEventListener("click", function () {
        if (!flowersBloom) {
            flowersBloom = true;
            bouquet.classList.add("animate");

            // Bloom flowers one by one
            flowers.forEach((flower, index) => {
                setTimeout(() => {
                    flower.classList.add("bloom");

                    // Create a small firework effect for each flower
                    if (index % 2 === 0) {
                        createEnhancedFireworks(1);
                    }
                }, index * 300);
            });

            // Change button text
            this.textContent = "Tuyệt Đẹp!";
            this.disabled = true;
        }
    });

    // Surprise button
    surpriseButton.addEventListener("click", function () {
        modalOverlay.classList.add("active");
        setTimeout(() => {
            createEnhancedFireworks(5);
        }, 500);
    });

    // Close modal
    modalClose.addEventListener("click", function () {
        modalOverlay.classList.remove("active");
    });

    // Initialize
    setTimeout(() => {
        pageElements[0].classList.add("active");
    }, 500);
});
