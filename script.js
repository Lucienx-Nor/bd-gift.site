/**
 * Thiệp sinh nhật nâng cao - Script tất cả trong một
 */

document.addEventListener("DOMContentLoaded", function () {
    //=============================================================================
    // PHẦN 1: CẤU HÌNH VÀ BIẾN TOÀN CỤC
    //=============================================================================

    // Biến trạng thái
    let currentPage = 0;
    const totalPages = 4;
    let flowersBloom = false;
    let fireworksStarted = false;
    let candleBlown = false;

    // Cấu hình cho pháo hoa
    const FIREWORK_TYPES = [
        "circular", // Hình tròn cổ điển
        "spiral", // Xoắn ốc
        "heart", // Hình trái tim
        "star", // Hình ngôi sao
        "burst", // Bùng nổ
        "palm", // Cây cọ
        "ring", // Vòng tròn
        "chrysanthemum", // Hoa cúc
        "crossette", // Tia chéo
        "willow", // Cây liễu rủ
        "cascade", // Thác nước (mới)
        "peony", // Hoa mẫu đơn (mới)
        "galaxy", // Hình thiên hà (mới)
        "crown", // Hình vương miện (mới)
        "glitter", // Lấp lánh (mới)
    ];

    // Bảng màu sắc rực rỡ và hài hòa cho pháo hoa (mở rộng)
    const VIBRANT_COLORS = [
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
        "#FF9AA2",
        "#FFB7B2",
        "#FFDAC1",
        "#E2F0CB",
        "#B5EAD7",
        "#C7CEEA",
        "#F1C0E8",
        "#CFBAF0",
        "#A3C4F3",
        "#90DBF4",
        "#8EECF5",
        "#98F5E1",
        "#ffbe0b",
        "#fb5607",
        "#ff006e",
        "#8338ec",
        "#3a86ff",
        "#38b000",
        "#FF81AE",
        "#FF9E80",
        "#80D8FF",
        "#B388FF",
        "#EA80FC",
        "#AEF4A4",
        // Thêm màu sắc rực rỡ mới
        "#FF1744",
        "#F50057",
        "#D500F9",
        "#651FFF",
        "#3D5AFE",
        "#2979FF",
        "#00B0FF",
        "#00E5FF",
        "#1DE9B6",
        "#00E676",
        "#76FF03",
        "#C6FF00",
        "#FFEA00",
        "#FFC400",
        "#FF9100",
        "#FF3D00",
        "#FF6D00",
        "#FFD600",
        "#FFE57F",
        "#C5E1A5",
        "#B2DFDB",
        "#B2EBF2",
        "#BBDEFB",
        "#D1C4E9",
        "#E1BEE7",
        "#F8BBD0",
        "#FFCDD2",
        "#FFE0B2",
        "#FFCCBC",
        "#D7CCC8",
        "#FED2D2",
        "#FED7E2",
        "#FAE8FF",
        "#E9D8FD",
        "#D6BCFA",
        "#B794F4",
    ];

    // Cấu hình cho hoa (mở rộng với thêm loại hoa và màu sắc)
    const FLOWER_COLORS = {
        rose: [
            "#f8a5c2",
            "#ff9ff3",
            "#ff85a2",
            "#ff77a9",
            "#f368e0",
            "#ff0080",
        ], // Các sắc hồng
        bluebell: [
            "#74b9ff",
            "#5c95ff",
            "#6488ea",
            "#7fa9f9",
            "#0984e3",
            "#4287f5",
        ], // Các sắc xanh dương
        tulip: [
            "#a29bfe",
            "#8c7ae6",
            "#9980FA",
            "#b19cd9",
            "#6c5ce7",
            "#8e44ad",
        ], // Các sắc tím
        daisy: [
            "#55efc4",
            "#00d2d3",
            "#2ecc71",
            "#1abc9c",
            "#20bf6b",
            "#0fb9b1",
        ], // Các sắc xanh lá
        sunflower: [
            "#fdcb6e",
            "#ffeaa7",
            "#f1c40f",
            "#f39c12",
            "#feca57",
            "#fed330",
        ], // Các sắc vàng
        poppy: [
            "#fab1a0",
            "#ff9a76",
            "#ff7675",
            "#e74c3c",
            "#eb3b5a",
            "#e66767",
        ], // Các sắc đỏ, cam
        orchid: [
            "#e056fd",
            "#be2edd",
            "#d568f2",
            "#b33de4",
            "#9818d6",
            "#8854d0",
        ], // Lan (mới)
        carnation: [
            "#ff5e57",
            "#ff3f34",
            "#ff4d4d",
            "#ff3838",
            "#ff5252",
            "#ff3131",
        ], // Cẩm chướng (mới)
        lily: [
            "#ffffff",
            "#f5f6fa",
            "#dfe4ea",
            "#ced6e0",
            "#a4b0be",
            "#eaeaea",
        ], // Hoa loa kèn (mới)
        peony: [
            "#ff9ff3",
            "#f78fb3",
            "#f8a5c2",
            "#f38fb3",
            "#fd79a8",
            "#e84393",
        ], // Mẫu đơn (mới)
    };

    // Cấu hình vị trí hoa (mở rộng, thêm nhiều vị trí hơn để tạo bó hoa dày đặc và lộng lẫy)
    const FLOWER_POSITIONS = [
        { bottom: 350, left: 0 }, // Chính giữa, cao nhất
        { bottom: 330, left: -50 }, // Trái cao
        { bottom: 330, left: 50 }, // Phải cao
        { bottom: 300, left: -30 }, // Giữa trái
        { bottom: 300, left: 30 }, // Giữa phải
        { bottom: 290, left: -80 }, // Trái xa
        { bottom: 290, left: 80 }, // Phải xa
        { bottom: 270, left: 0 }, // Giữa thấp
        { bottom: 250, left: -60 }, // Thấp trái
        { bottom: 250, left: 60 }, // Thấp phải
        { bottom: 240, left: -20 }, // Trước trái
        { bottom: 240, left: 20 }, // Trước phải
        // Thêm vị trí hoa mới để tạo bố cục dày đặc hơn
        { bottom: 360, left: -15 }, // Tầng cao nhất gần trung tâm trái
        { bottom: 360, left: 15 }, // Tầng cao nhất gần trung tâm phải
        { bottom: 340, left: -80 }, // Trái cao xa
        { bottom: 340, left: 80 }, // Phải cao xa
        { bottom: 315, left: -65 }, // Tầng giữa cao trái
        { bottom: 315, left: 65 }, // Tầng giữa cao phải
        { bottom: 285, left: -50 }, // Tầng giữa trái
        { bottom: 285, left: 50 }, // Tầng giữa phải
        { bottom: 265, left: -35 }, // Tầng giữa thấp trái
        { bottom: 265, left: 35 }, // Tầng giữa thấp phải
        { bottom: 230, left: -55 }, // Tầng thấp xa trái
        { bottom: 230, left: 55 }, // Tầng thấp xa phải
    ];

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

    // Thêm lấy phần tử SVG của nến và lửa
    const candleFlame = document.getElementById("candle-flame");
    const candleSvg = document.getElementById("cake-svg");
    const blowCandleBtn = document.getElementById("blow-candle");

    //=============================================================================
    // PHẦN 2: CHỨC NĂNG ĐIỀU HƯỚNG & THANH CUỘN
    //=============================================================================

    // Mở cuốn sách
    openBookBtn.addEventListener("click", function () {
        cover.classList.add("open");
        setTimeout(() => {
            pages.style.overflowY = "auto";
            checkVisibility();
        }, 1000);
    });

    // Sự kiện điều hướng
    navItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            scrollToPage(index);
        });
    });

    // Cuộn đến trang cụ thể
    function scrollToPage(index) {
        pageElements[index].scrollIntoView({ behavior: "smooth" });
    }

    // Kiểm tra trang nào đang hiển thị
    function checkVisibility() {
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
                initPageEffects(index);
            }
        });
    }

    // Khởi tạo hiệu ứng cho từng trang khi lần đầu xem
    function initPageEffects(pageIndex) {
        switch (pageIndex) {
            case 2: // Trang pháo hoa
                // Tạo hiệu ứng sao nền
                if (!fireworksContainer.querySelector(".background-star")) {
                    createBackgroundEffects(fireworksContainer);
                    createBackgroundLight(fireworksContainer);
                }
                break;

            case 3: // Trang bó hoa
                // Tạo bố cục hoa đẹp và cân đối
                if (!bouquet.querySelector(".flower")) {
                    const flowers = createEnhancedBouquet(bouquet);
                    // Lưu trạng thái đã tạo hoa
                    bouquet.dataset.flowers = true;
                }
                break;
        }
    }

    // Cập nhật thanh điều hướng
    function updateNavigation() {
        navItems.forEach((item, index) => {
            if (index === currentPage) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });
    }

    // Sự kiện cuộn trang
    pages.addEventListener("scroll", function () {
        checkVisibility();
    });

    //=============================================================================
    // PHẦN 3: HIỆU ỨNG NẾN SINH NHẬT (TRANG 2)
    //=============================================================================

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

    // Reset nến
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

    //=============================================================================
    // PHẦN 4: HIỆU ỨNG PHÁO HOA RỰC RỠ (TRANG 3)
    //=============================================================================

    // Sự kiện bắt đầu pháo hoa
    startFireworksBtn.addEventListener("click", function () {
        if (!fireworksStarted) {
            fireworksStarted = true;
            createEnhancedFireworks(fireworksContainer, 20); // Tăng số lượng pháo hoa ban đầu

            // Thay đổi nội dung nút
            this.textContent = "Thêm Pháo Hoa";
        } else {
            // Tạo thêm pháo hoa với số lượng ít hơn
            createEnhancedFireworks(fireworksContainer, 12); // Tăng số lượng pháo hoa khi click thêm
        }
    });

    // Tạo hiệu ứng pháo hoa nâng cao
    function createEnhancedFireworks(container, count = 10, interval = 300) {
        // Xác định kích thước container để định vị tốt hơn
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Thêm hiệu ứng phản chiếu nước (tùy chọn)
        if (!container.querySelector(".water-reflection")) {
            const reflection = document.createElement("div");
            reflection.className = "water-reflection";
            container.appendChild(reflection);
        }

        // Tạo từng pháo hoa với độ trễ
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                // Chọn loại pháo hoa ngẫu nhiên
                const typeIndex = Math.floor(
                    Math.random() * FIREWORK_TYPES.length
                );
                const fireworkType = FIREWORK_TYPES[typeIndex];

                // Chọn màu chính và màu phụ
                const primaryColorIndex = Math.floor(
                    Math.random() * VIBRANT_COLORS.length
                );
                const secondaryColorIndex =
                    (primaryColorIndex + Math.floor(Math.random() * 10) + 1) %
                    VIBRANT_COLORS.length;
                const tertiaryColorIndex =
                    (secondaryColorIndex + Math.floor(Math.random() * 10) + 1) %
                    VIBRANT_COLORS.length;

                const primaryColor = VIBRANT_COLORS[primaryColorIndex];
                const secondaryColor = VIBRANT_COLORS[secondaryColorIndex];
                const tertiaryColor = VIBRANT_COLORS[tertiaryColorIndex];

                // Vị trí ngẫu nhiên (nhưng tránh quá gần các cạnh)
                const padding = 50;
                const posX =
                    padding + Math.random() * (containerWidth - padding * 2);
                const posY =
                    padding + Math.random() * (containerHeight - padding * 2);

                // Kích thước ngẫu nhiên
                const size = 5 + Math.random() * 3;

                // Tạo hiệu ứng tia lửa bay lên (tuỳ chọn)
                if (Math.random() > 0.3) {
                    // Tăng tỷ lệ hiệu ứng bay lên
                    createRiseEffect(container, posX, posY, primaryColor);
                }

                // Tạo pháo hoa
                const firework = createFireworkElement(
                    container,
                    posX,
                    posY,
                    size,
                    primaryColor,
                    fireworkType
                );

                // Tạo các hạt cho pháo hoa
                createParticlesForFirework(
                    firework,
                    fireworkType,
                    primaryColor,
                    secondaryColor,
                    tertiaryColor
                );

                // Tạo hiệu ứng ánh sáng
                createFireworkLight(firework, primaryColor);

                // Tạo âm thanh (hiệu ứng thị giác)
                createAudioVisualEffect(container, posX, posY);

                // Thêm hiệu ứng nổ 3D (mới)
                if (Math.random() > 0.7) {
                    createExplosionEffect(container, posX, posY, primaryColor);
                }

                // Xóa pháo hoa sau khi kết thúc
                setTimeout(() => {
                    firework.remove();
                }, 2500);
            }, i * (interval - Math.random() * 100)); // Ngẫu nhiên hóa thời gian delay giữa các pháo hoa
        }
    }

    // Tạo phần tử pháo hoa
    function createFireworkElement(container, posX, posY, size, color, type) {
        const firework = document.createElement("div");
        firework.className = `firework ${type}-firework`;

        firework.style.left = `${posX}px`;
        firework.style.top = `${posY}px`;
        firework.style.backgroundColor = color;
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;

        // Thêm thuộc tính tùy chỉnh cho mỗi loại pháo hoa
        switch (type) {
            case "ring":
                firework.style.borderRadius = "50%";
                firework.style.border = `2px solid ${color}`;
                firework.style.backgroundColor = "transparent";
                break;
            case "star":
                firework.style.clip =
                    "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";
                break;
            case "heart":
                firework.style.transform = "rotate(45deg)";
                break;
            case "willow":
                firework.style.borderRadius = "50% 50% 0 0";
                break;
            case "cascade":
                firework.style.borderRadius = "50%";
                firework.style.clipPath =
                    "polygon(0 0, 100% 0, 100% 50%, 0 100%)";
                break;
            case "peony":
                firework.style.borderRadius =
                    "30% 70% 70% 30% / 30% 30% 70% 70%";
                break;
            case "galaxy":
                firework.style.clipPath = "circle(50% at 50% 50%)";
                firework.style.background = `radial-gradient(circle, ${color} 10%, transparent 70%)`;
                break;
            case "crown":
                firework.style.clipPath =
                    "polygon(50% 0%, 90% 20%, 100% 60%, 75% 90%, 25% 90%, 0% 60%, 10% 20%)";
                break;
            case "glitter":
                firework.style.borderRadius = "50%";
                firework.style.background = `radial-gradient(circle, white 10%, ${color} 30%, transparent 70%)`;
                firework.style.boxShadow = `0 0 20px ${color}, 0 0 40px white`;
                break;
        }

        container.appendChild(firework);
        return firework;
    }

    // Tạo hiệu ứng tia lửa bay lên
    function createRiseEffect(container, targetX, targetY, color) {
        const startY = container.offsetHeight;
        const trail = document.createElement("div");
        trail.className = "firework-trail";

        trail.style.left = `${targetX}px`;
        trail.style.bottom = "0px";
        trail.style.backgroundColor = color;

        container.appendChild(trail);

        // Hiệu ứng animation bay lên
        trail.animate(
            [
                { bottom: "0px", opacity: 0.7, height: "5px" },
                { bottom: `${startY - targetY}px`, opacity: 0, height: "2px" },
            ],
            {
                duration: 700,
                easing: "cubic-bezier(0.5, 0, 0.75, 0)",
            }
        ).onfinish = () => {
            trail.remove();
        };

        // Tạo các tia lửa nhỏ dọc theo đường bay
        for (let i = 0; i < 5; i++) {
            // Tăng số lượng tia lửa nhỏ
            setTimeout(() => {
                const sparkY = startY - ((startY - targetY) * (i + 1)) / 6;

                for (let j = 0; j < 6; j++) {
                    // Tăng số lượng tia lửa nhỏ tại mỗi vị trí
                    const spark = document.createElement("div");
                    spark.className = "firework-spark";

                    const angle = Math.random() * 360;
                    const distance = 5 + Math.random() * 15; // Tăng khoảng cách

                    spark.style.left = `${
                        targetX + Math.cos(angle) * distance
                    }px`;
                    spark.style.bottom = `${
                        sparkY + Math.sin(angle) * distance
                    }px`;
                    spark.style.backgroundColor = color;
                    spark.style.width = `${1 + Math.random() * 2}px`; // Kích thước ngẫu nhiên
                    spark.style.height = `${1 + Math.random() * 2}px`;

                    container.appendChild(spark);

                    spark.animate(
                        [
                            { transform: "scale(1)", opacity: 1 },
                            { transform: "scale(0)", opacity: 0 },
                        ],
                        {
                            duration: 300 + Math.random() * 200,
                            easing: "ease-out",
                        }
                    ).onfinish = () => {
                        spark.remove();
                    };
                }
            }, i * 120);
        }
    }

    // Tạo các hạt cho pháo hoa
    function createParticlesForFirework(
        firework,
        type,
        primaryColor,
        secondaryColor,
        tertiaryColor
    ) {
        let particleCount;

        // Điều chỉnh số lượng hạt tùy theo loại pháo hoa
        switch (type) {
            case "circular":
                particleCount = 24;
                break;
            case "spiral":
                particleCount = 30;
                break;
            case "heart":
                particleCount = 24;
                break;
            case "star":
                particleCount = 20;
                break;
            case "burst":
                particleCount = 36;
                break;
            case "palm":
                particleCount = 16;
                break;
            case "ring":
                particleCount = 30;
                break;
            case "chrysanthemum":
                particleCount = 48;
                break;
            case "crossette":
                particleCount = 20;
                break;
            case "willow":
                particleCount = 28;
                break;
            case "cascade":
                particleCount = 42;
                break;
            case "peony":
                particleCount = 60;
                break;
            case "galaxy":
                particleCount = 70;
                break;
            case "crown":
                particleCount = 36;
                break;
            case "glitter":
                particleCount = 80;
                break;
            default:
                particleCount = 32;
        }

        const useSecondaryParticles = Math.random() > 0.3; // Tăng xác suất sử dụng hạt thứ hai
        const useTertiaryParticles = Math.random() > 0.6; // Thêm xác suất sử dụng lớp hạt thứ ba

        // Tạo các hạt chính
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            particle.className = `particle ${type}-particle`;

            // Thiết lập các thuộc tính theo từng loại
            setupParticleByType(particle, type, i, particleCount, primaryColor);

            // Thêm hiệu ứng lấp lánh cho một số hạt
            if (i % 3 === 0 || Math.random() > 0.6) {
                // Tăng tỷ lệ lấp lánh
                const particleInner = particle.firstChild;
                if (particleInner) {
                    particleInner.classList.add("sparkle");
                }
            }

            firework.appendChild(particle);
        }

        // Tạo lớp hạt thứ hai (tùy chọn) với màu khác
        if (useSecondaryParticles) {
            const secondaryParticleCount = Math.floor(particleCount * 0.7); // Tăng tỷ lệ hạt thứ hai

            for (let i = 0; i < secondaryParticleCount; i++) {
                const particle = document.createElement("div");
                particle.className = `particle ${type}-particle secondary`;

                // Thiết lập các thuộc tính theo từng loại
                setupParticleByType(
                    particle,
                    type,
                    i,
                    secondaryParticleCount,
                    secondaryColor
                );

                // Thêm hiệu ứng lấp lánh cho một số hạt
                if (i % 3 === 0 || Math.random() > 0.6) {
                    const particleInner = particle.firstChild;
                    if (particleInner) {
                        particleInner.classList.add("sparkle");
                    }
                }

                firework.appendChild(particle);
            }
        }

        // Tạo lớp hạt thứ ba (mới)
        if (useTertiaryParticles) {
            const tertiaryParticleCount = Math.floor(particleCount * 0.5);

            for (let i = 0; i < tertiaryParticleCount; i++) {
                const particle = document.createElement("div");
                particle.className = `particle ${type}-particle tertiary`;

                // Thiết lập các thuộc tính theo từng loại
                setupParticleByType(
                    particle,
                    type,
                    i,
                    tertiaryParticleCount,
                    tertiaryColor
                );

                // Thêm hiệu ứng đặc biệt (hạt nhỏ, quỹ đạo khác)
                particle.style.animationDelay = `${Math.random() * 0.2}s`;
                particle.style.animationDuration = `${1.2 + Math.random()}s`;

                firework.appendChild(particle);
            }
        }
    }

    // Thiết lập thuộc tính hạt tùy theo loại pháo hoa
    function setupParticleByType(particle, type, index, total, color) {
        const particle_inner = document.createElement("div");
        particle_inner.style.backgroundColor = color;

        switch (type) {
            case "circular":
                // Hạt phân bố đều theo hình tròn
                const angle = (index / total) * 360;
                particle.style.transform = `rotate(${angle}deg)`;
                break;

            case "spiral":
                // Hạt theo dạng xoắn ốc
                const spiralAngle = (index / total) * 720; // 2 vòng
                const distance = 50 + (index / total) * 50;
                particle.style.transform = `rotate(${spiralAngle}deg)`;
                particle.style.width = `${distance}px`;
                break;

            case "heart":
                // Hạt theo hình trái tim
                const heartT = (index / total) * 2 * Math.PI;
                const x = 16 * Math.pow(Math.sin(heartT), 3);
                const y =
                    13 * Math.cos(heartT) -
                    5 * Math.cos(2 * heartT) -
                    2 * Math.cos(3 * heartT) -
                    Math.cos(4 * heartT);
                const heartAngle = (Math.atan2(y, x) * 180) / Math.PI;
                particle.style.transform = `rotate(${heartAngle}deg)`;
                particle.style.setProperty("--tx", `${x * 3}px`);
                particle.style.setProperty("--ty", `${-y * 3}px`);
                break;

            case "star":
                // Hạt theo hình sao 5 cánh
                const step = Math.floor(index / (total / 5));
                const starAngle =
                    ((index % (total / 5)) / (total / 5)) * 72 + step * 144;
                particle.style.transform = `rotate(${starAngle}deg)`;
                break;

            case "burst":
                // Bùng nổ ngẫu nhiên
                const burstAngle = Math.random() * 360;
                const burstDist = 50 + Math.random() * 50;
                particle.style.transform = `rotate(${burstAngle}deg)`;
                particle.style.setProperty(
                    "--tx",
                    `${Math.cos((burstAngle * Math.PI) / 180) * burstDist}px`
                );
                particle.style.setProperty(
                    "--ty",
                    `${Math.sin((burstAngle * Math.PI) / 180) * burstDist}px`
                );
                break;

            case "palm":
                // Hạt theo hình cây cọ
                const palmAngle = (index / total) * 210 - 15;
                particle.style.transform = `rotate(${palmAngle}deg)`;
                particle.style.width = `${110 + Math.random() * 20}px`;
                break;

            case "ring":
                // Hạt theo vòng tròn đồng tâm
                const ringIndex = Math.floor(index / 10);
                const ringAngle = ((index % 10) / 10) * 360;
                const ringDist = 30 + ringIndex * 30;
                particle.style.transform = `rotate(${ringAngle}deg)`;
                particle.style.width = `${ringDist}px`;
                break;

            case "chrysanthemum":
                // Hạt theo hình hoa cúc (nhiều lớp)
                const layer = Math.floor(index / 12);
                const chrysAngle = ((index % 12) / 12) * 360;
                particle.style.transform = `rotate(${chrysAngle}deg)`;
                particle.style.width = `${60 + layer * 30}px`;
                break;

            case "crossette":
                // Hạt theo hình chéo
                if (index < 4) {
                    const crossAngle = index * 90;
                    particle.style.transform = `rotate(${crossAngle}deg)`;

                    // Tạo thêm các tia phụ
                    if (index % 2 === 0) {
                        setTimeout(() => {
                            createCrossetteChildren(particle, color);
                        }, 200);
                    }
                } else {
                    const crossAngle = ((index - 4) / (total - 4)) * 360;
                    particle.style.transform = `rotate(${crossAngle}deg)`;
                }
                break;

            case "willow":
                // Hạt theo hình liễu rủ
                const willowAngle = (index / total) * 270 - 45;
                particle.style.transform = `rotate(${willowAngle}deg)`;
                particle.classList.add("willow-particle");
                break;

            case "cascade":
                // Tạo hiệu ứng thác nước (mới)
                const cascadeAngle = (index / total) * 180 - 90;
                particle.style.transform = `rotate(${cascadeAngle}deg)`;
                particle.classList.add("cascade-particle");
                particle.style.width = `${80 + Math.random() * 40}px`;
                break;

            case "peony":
                // Hoa mẫu đơn (nhiều lớp tròn)
                const peonyLayer = Math.floor(index / 15);
                const peonyAngle = ((index % 15) / 15) * 360;
                particle.style.transform = `rotate(${peonyAngle}deg)`;
                particle.style.width = `${40 + peonyLayer * 25}px`;
                particle.classList.add("peony-particle");
                break;

            case "galaxy":
                // Hiệu ứng thiên hà (xoắn ốc đặc biệt)
                const galaxyAngle = (index / total) * 1080; // 3 vòng
                const galaxyDistance = 20 + (index / total) * 100;
                particle.style.transform = `rotate(${galaxyAngle}deg)`;
                particle.style.width = `${galaxyDistance}px`;
                particle.classList.add("galaxy-particle");
                break;

            case "crown":
                // Hiệu ứng vương miện
                const crownAngle = (index / total) * 360;
                const crownDist =
                    60 + Math.sin((index / total) * Math.PI * 6) * 20;
                particle.style.transform = `rotate(${crownAngle}deg)`;
                particle.style.width = `${crownDist}px`;
                particle.classList.add("crown-particle");
                break;

            case "glitter":
                // Hiệu ứng lấp lánh (nhiều điểm sáng nhỏ)
                const glitterAngle = Math.random() * 360;
                const glitterDist = 20 + Math.random() * 80;
                particle.style.transform = `rotate(${glitterAngle}deg)`;
                particle.style.width = `${Math.random() * 40 + 20}px`;
                particle.classList.add("glitter-particle");
                break;

            default:
                const defaultAngle = (index / total) * 360;
                particle.style.transform = `rotate(${defaultAngle}deg)`;
        }

        // Thêm phần tử con cho hạt
        particle.appendChild(particle_inner);
    }

    // Tạo các tia phụ cho hiệu ứng chéo (crossette)
    function createCrossetteChildren(parentParticle, color) {
        if (!parentParticle || !parentParticle.parentElement) return;

        for (let i = 0; i < 3; i++) {
            const childParticle = document.createElement("div");
            childParticle.className = "particle-child";

            const angle = i * 30 - 30;
            childParticle.style.transform = `rotate(${angle}deg)`;
            childParticle.style.backgroundColor = color;

            parentParticle.appendChild(childParticle);
        }
    }

    // Tạo hiệu ứng ánh sáng cho pháo hoa
    function createFireworkLight(firework, color) {
        const light = document.createElement("div");
        light.className = "firework-glow";
        light.style.backgroundColor = color;
        firework.appendChild(light);
    }

    // Tạo hiệu ứng nền
    function createBackgroundEffects(container) {
        // Tạo các đốm sáng ngẫu nhiên trên nền
        for (let i = 0; i < 40; i++) {
            // Tăng số lượng ngôi sao
            const star = document.createElement("div");
            star.className = "background-star";

            // Vị trí ngẫu nhiên
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;

            star.style.left = `${posX}%`;
            star.style.top = `${posY}%`;

            // Kích thước và độ sáng ngẫu nhiên
            const size = 1 + Math.random() * 3; // Tăng kích thước sao
            const opacity = 0.3 + Math.random() * 0.7;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = opacity;

            // Hiệu ứng nhấp nháy
            const duration = 1 + Math.random() * 5; // Thời gian nhấp nháy đa dạng hơn
            star.style.animation = `twinkle ${duration}s infinite alternate ${
                Math.random() * 3
            }s`;

            container.appendChild(star);
        }

        // Tạo hiệu ứng sao băng
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                createShootingStar(container);
            }, i * 3000 + Math.random() * 5000);
        }
    }

    // Tạo sao băng (mới)
    function createShootingStar(container) {
        const star = document.createElement("div");
        star.className = "shooting-star";

        // Vị trí bắt đầu (từ trên cùng bên trái)
        const startX = Math.random() * 30;
        const startY = Math.random() * 30;

        star.style.left = `${startX}%`;
        star.style.top = `${startY}%`;

        container.appendChild(star);

        // Animation sao băng
        star.animate(
            [
                {
                    left: `${startX}%`,
                    top: `${startY}%`,
                    opacity: 1,
                    width: "3px",
                    height: "3px",
                    boxShadow:
                        "0 0 10px 2px white, 0 0 20px 5px rgba(255, 255, 255, 0.5)",
                },
                {
                    left: `${startX + 70}%`,
                    top: `${startY + 40}%`,
                    opacity: 0,
                    width: "1px",
                    height: "1px",
                    boxShadow:
                        "0 0 5px 1px white, 0 0 10px 2px rgba(255, 255, 255, 0.2)",
                },
            ],
            {
                duration: 2000,
                easing: "cubic-bezier(0.1, 0.3, 0.1, 1)",
            }
        ).onfinish = () => {
            star.remove();
            // Tạo sao băng mới sau khi kết thúc
            setTimeout(() => {
                createShootingStar(container);
            }, Math.random() * 8000 + 5000);
        };
    }

    // Tạo hiệu ứng ánh sáng nền
    function createBackgroundLight(container) {
        // Tạo ánh sáng mờ ở đáy
        const bottomLight = document.createElement("div");
        bottomLight.className = "background-light bottom-light";
        container.appendChild(bottomLight);

        // Tạo ánh sáng mờ ở các góc
        const positions = [
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
        ];
        const colors = [
            "rgba(255,82,82,0.2)",
            "rgba(255,213,79,0.2)",
            "rgba(100,181,246,0.2)",
            "rgba(248,165,194,0.2)",
        ];

        positions.forEach((pos, index) => {
            const cornerLight = document.createElement("div");
            cornerLight.className = `background-light ${pos}-light`;
            cornerLight.style.background = `radial-gradient(circle at ${pos.replace(
                "-",
                " "
            )}, ${colors[index]}, transparent 70%)`;
            container.appendChild(cornerLight);
        });

        // Thêm hiệu ứng mây mờ di chuyển (mới)
        const cloudCount = 3;
        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement("div");
            cloud.className = "bg-cloud";

            // Vị trí và kích thước ngẫu nhiên
            cloud.style.top = `${10 + Math.random() * 60}%`;
            cloud.style.left = `${-20 + Math.random() * 10}%`;
            cloud.style.width = `${150 + Math.random() * 100}px`;
            cloud.style.height = `${80 + Math.random() * 40}px`;
            cloud.style.opacity = 0.05 + Math.random() * 0.08;

            // Animation di chuyển từ trái sang phải
            const duration = 60 + Math.random() * 40;
            cloud.style.animation = `cloudMove ${duration}s linear infinite ${
                Math.random() * 40
            }s`;

            container.appendChild(cloud);
        }
    }

    // Tạo hiệu ứng thị giác cho âm thanh
    function createAudioVisualEffect(container, x, y) {
        const ripple = document.createElement("div");
        ripple.className = "audio-ripple";

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        container.appendChild(ripple);

        // Xóa hiệu ứng sau khi hoàn thành
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Tạo hiệu ứng nổ 3D (mới)
    function createExplosionEffect(container, x, y, color) {
        // Tạo đốm sáng trung tâm
        const explosion = document.createElement("div");
        explosion.className = "explosion-effect";
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;
        explosion.style.backgroundColor = color;

        container.appendChild(explosion);

        // Tạo các tia sáng bắn ra
        const rayCount = 12;
        for (let i = 0; i < rayCount; i++) {
            const ray = document.createElement("div");
            ray.className = "explosion-ray";

            const angle = (i / rayCount) * 360;
            const length = 40 + Math.random() * 30;

            ray.style.left = `${x}px`;
            ray.style.top = `${y}px`;
            ray.style.width = `${length}px`;
            ray.style.height = `2px`;
            ray.style.backgroundColor = color;
            ray.style.transform = `rotate(${angle}deg)`;
            ray.style.transformOrigin = "0 0";

            container.appendChild(ray);

            // Animation biến mất
            ray.animate(
                [
                    { opacity: 1, transform: `rotate(${angle}deg) scaleX(1)` },
                    {
                        opacity: 0,
                        transform: `rotate(${angle}deg) scaleX(0.3)`,
                    },
                ],
                {
                    duration: 700,
                    easing: "ease-out",
                }
            ).onfinish = () => {
                ray.remove();
            };
        }

        // Animation biến mất cho đốm sáng trung tâm
        explosion.animate(
            [
                { opacity: 1, transform: "scale(1)" },
                { opacity: 0, transform: "scale(2)" },
            ],
            {
                duration: 800,
                easing: "ease-out",
            }
        ).onfinish = () => {
            explosion.remove();
        };
    }

    // Lấy giá trị màu Hue từ mã màu hex (cho phần pháo hoa)
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

    //=============================================================================
    // PHẦN 5: HIỆU ỨNG BÓ HOA ĐA DẠNG (TRANG 4)
    //=============================================================================

    // Sự kiện nở hoa
    bloomFlowersBtn.addEventListener("click", function () {
        if (!flowersBloom) {
            flowersBloom = true;

            // Animation cho bó hoa
            animateBouquet(bouquet);

            // Lấy tất cả các hoa từ bouquet
            const flowers = bouquet.querySelectorAll(".flower");

            // Hiệu ứng nở hoa
            bloomBouquet(flowers);

            // Thay đổi nội dung nút
            this.textContent = "Tuyệt Đẹp!";
            this.disabled = true;

            // Thêm hiệu ứng bướm bay (mới)
            setTimeout(() => {
                addButterflyEffect(bouquet.parentElement);
            }, 1500);
        }
    });

    // Tạo bố cục hoa trong bó
    function createEnhancedBouquet(container) {
        // Xóa các hoa cũ nếu có
        clearExistingFlowers(container);

        // Tạo mảng lưu hoa để có thể truy cập sau này
        const flowers = [];

        // Tạo các loại hoa khác nhau trong bó
        const flowerTypes = Object.keys(FLOWER_COLORS);

        // Thêm hiệu ứng nơ ruy băng nổi bật
        enhanceBouquetRibbon(container);

        FLOWER_POSITIONS.forEach((position, index) => {
            // Chọn loại hoa và màu sắc
            const flowerType = flowerTypes[index % flowerTypes.length];
            const colorArray = FLOWER_COLORS[flowerType];
            const colorIndex = index % colorArray.length;
            const petalColor = colorArray[colorIndex];

            // Chọn màu trung tâm hoa (tạo độ tương phản)
            const centerColors = [
                "#ffeaa7",
                "#fdcb6e",
                "#ffbe76",
                "#ffffff",
                "#fff8e1",
                "#fffde7",
            ];
            const centerColor = centerColors[index % centerColors.length];

            // Tạo hoa với loại cụ thể
            const flower = createFlowerByType(
                flowerType,
                position,
                petalColor,
                centerColor,
                index
            );

            // Thêm hoa vào container
            container.appendChild(flower);
            flowers.push(flower);
        });

        // Thêm hiệu ứng ánh sáng lấp lánh cho bó hoa
        addGlitterToBouquet(container);

        return flowers;
    }

    // Tạo hiệu ứng nơ ruy băng nổi bật (mới)
    function enhanceBouquetRibbon(container) {
        // Thêm lớp ánh sáng cho ruy băng
        const ribbonGlow = document.createElement("div");
        ribbonGlow.className = "ribbon-glow";
        container.appendChild(ribbonGlow);

        // Thêm trang trí cho ruy băng
        const ribbonDecor = document.createElement("div");
        ribbonDecor.className = "ribbon-decoration";
        container.appendChild(ribbonDecor);
    }

    // Thêm hiệu ứng lấp lánh cho bó hoa (mới)
    function addGlitterToBouquet(container) {
        const glitterCount = 12;
        for (let i = 0; i < glitterCount; i++) {
            setTimeout(() => {
                const glitter = document.createElement("div");
                glitter.className = "bouquet-glitter";

                // Vị trí ngẫu nhiên
                const posX = -100 + Math.random() * 200;
                const posY = 100 + Math.random() * 250;

                glitter.style.left = `calc(50% + ${posX}px)`;
                glitter.style.bottom = `${posY}px`;
                glitter.style.animationDelay = `${Math.random() * 2}s`;

                container.appendChild(glitter);

                // Xóa sau một thời gian
                setTimeout(() => {
                    glitter.remove();
                }, 4000);
            }, i * 300);
        }
    }

    // Xóa hoa cũ trong container
    function clearExistingFlowers(container) {
        const existingFlowers = container.querySelectorAll(".flower");
        existingFlowers.forEach((flower) => flower.remove());
    }

    // Tạo hoa theo từng loại
    function createFlowerByType(
        type,
        position,
        petalColor,
        centerColor,
        index
    ) {
        const flower = document.createElement("div");
        flower.className = `flower flower-${index + 1} ${type}`;

        // Thiết lập vị trí
        flower.style.bottom = `${position.bottom}px`;
        flower.style.left = `calc(50% ${position.left >= 0 ? "+" : ""}${
            position.left
        }px)`;

        // Tạo các cánh hoa
        const petals = document.createElement("div");
        petals.className = "petals";

        // Tạo hiệu ứng khác nhau cho từng loại hoa
        switch (type) {
            case "rose":
                createRosePetals(petals, petalColor);
                break;
            case "tulip":
                createTulipPetals(petals, petalColor);
                break;
            case "daisy":
                createDaisyPetals(petals, petalColor);
                break;
            case "sunflower":
                createSunflowerPetals(petals, petalColor);
                break;
            case "poppy":
                createPoppyPetals(petals, petalColor);
                break;
            case "bluebell":
                createBluebellPetals(petals, petalColor);
                break;
            case "orchid":
                createOrchidPetals(petals, petalColor);
                break;
            case "carnation":
                createCarnationPetals(petals, petalColor);
                break;
            case "lily":
                createLilyPetals(petals, petalColor);
                break;
            case "peony":
                createPeonyPetals(petals, petalColor);
                break;
            default:
                createDefaultPetals(petals, petalColor);
        }

        // Tạo trung tâm hoa
        const flowerCenter = document.createElement("div");
        flowerCenter.className = "flower-center";
        flowerCenter.style.background = centerColor;

        // Thêm chi tiết cho trung tâm tùy loại hoa
        if (type === "sunflower") {
            flowerCenter.style.width = "25px";
            flowerCenter.style.height = "25px";
            flowerCenter.style.background = `radial-gradient(circle at center, #f1c40f 30%, #8B4513 70%)`;
        } else if (type === "daisy") {
            flowerCenter.style.background = `radial-gradient(circle at center, #ffeaa7 40%, #fdcb6e 100%)`;
        } else if (type === "peony") {
            flowerCenter.style.background = `radial-gradient(circle at center, ${centerColor} 30%, ${petalColor} 90%)`;
        }

        // Thêm hiệu ứng sương mai cho một số hoa (mới)
        if (Math.random() > 0.6) {
            addDewDrops(flower, petalColor);
        }

        // Thêm các phần vào hoa
        flower.appendChild(petals);
        flower.appendChild(flowerCenter);

        return flower;
    }

    // Thêm giọt sương cho hoa (mới)
    function addDewDrops(flower, color) {
        const dropCount = 2 + Math.floor(Math.random() * 3);

        for (let i = 0; i < dropCount; i++) {
            const dewDrop = document.createElement("div");
            dewDrop.className = "dew-drop";

            // Vị trí ngẫu nhiên trên hoa
            const angle = Math.random() * 360;
            const distance = 15 + Math.random() * 10;
            const posX = Math.cos((angle * Math.PI) / 180) * distance;
            const posY = Math.sin((angle * Math.PI) / 180) * distance;

            dewDrop.style.left = `calc(50% + ${posX}px)`;
            dewDrop.style.top = `calc(50% + ${posY}px)`;
            dewDrop.style.backgroundColor = "rgba(255, 255, 255, 0.8)";

            // Kích thước ngẫu nhiên
            const size = 3 + Math.random() * 2;
            dewDrop.style.width = `${size}px`;
            dewDrop.style.height = `${size}px`;

            // Hiệu ứng lấp lánh
            dewDrop.style.animation = `dewSparkle 3s infinite ${
                Math.random() * 3
            }s`;

            flower.appendChild(dewDrop);
        }
    }

    // Tạo cánh hoa hồng (nhiều lớp xếp chồng)
    function createRosePetals(petalsContainer, color) {
        // Tạo nhiều lớp cánh
        for (let layer = 0; layer < 3; layer++) {
            const petalLayer = document.createElement("div");
            petalLayer.className = "petal-layer";
            petalLayer.style.transform = `rotate(${layer * 15}deg)`;

            // Mỗi lớp có 8 cánh
            for (let i = 0; i < 8; i++) {
                const petal = document.createElement("div");
                petal.className = "petal rose-petal";
                const angle = i * 45;
                petal.style.transform = `rotate(${angle}deg) translateY(-${
                    14 + layer * 2
                }px)`;

                // Lớp càng trong càng đậm
                const brightness = 100 - layer * 10;
                petal.style.color = adjustColorBrightness(color, brightness);

                petalLayer.appendChild(petal);
            }

            petalsContainer.appendChild(petalLayer);
        }
    }

    // Tạo cánh hoa tulip (hình giọt dài)
    function createTulipPetals(petalsContainer, color) {
        for (let i = 0; i < 6; i++) {
            const petal = document.createElement("div");
            petal.className = "petal tulip-petal";
            const angle = i * 60;
            petal.style.transform = `rotate(${angle}deg) translateY(-18px)`;
            petal.style.color = color;

            petalsContainer.appendChild(petal);
        }
    }

    // Tạo cánh hoa cúc (nhiều cánh nhỏ và dài)
    function createDaisyPetals(petalsContainer, color) {
        for (let i = 0; i < 16; i++) {
            const petal = document.createElement("div");
            petal.className = "petal daisy-petal";
            const angle = i * 22.5;
            petal.style.transform = `rotate(${angle}deg) translateY(-16px)`;
            petal.style.color = color;

            petalsContainer.appendChild(petal);
        }
    }

    // Tạo cánh hoa hướng dương
    function createSunflowerPetals(petalsContainer, color) {
        for (let i = 0; i < 20; i++) {
            const petal = document.createElement("div");
            petal.className = "petal sunflower-petal";
            const angle = i * 18;
            petal.style.transform = `rotate(${angle}deg) translateY(-20px)`;
            petal.style.color = color;

            petalsContainer.appendChild(petal);
        }
    }

    // Tạo cánh hoa anh túc
    function createPoppyPetals(petalsContainer, color) {
        for (let i = 0; i < 4; i++) {
            const petal = document.createElement("div");
            petal.className = "petal poppy-petal";
            const angle = i * 90;
            petal.style.transform = `rotate(${angle}deg) translateY(-15px)`;
            petal.style.color = color;

            petalsContainer.appendChild(petal);
        }
    }

    // Tạo cánh hoa chuông xanh
    function createBluebellPetals(petalsContainer, color) {
        // Tạo lớp cánh
        const petalLayer = document.createElement("div");
        petalLayer.className = "bell-shape";
        petalLayer.style.color = color;

        petalsContainer.appendChild(petalLayer);

        // Tạo các phần nhỏ của chuông
        for (let i = 0; i < 5; i++) {
            const tip = document.createElement("div");
            tip.className = "bell-tip";
            const angle = i * 72;
            tip.style.transform = `rotate(${angle}deg) translateY(10px)`;

            petalsContainer.appendChild(tip);
        }
    }

    // Tạo cánh hoa lan (mới)
    function createOrchidPetals(petalsContainer, color) {
        // Tạo cánh hoa chính
        const mainPetal = document.createElement("div");
        mainPetal.className = "petal orchid-main-petal";
        mainPetal.style.backgroundColor = color;
        petalsContainer.appendChild(mainPetal);

        // Tạo các cánh bên
        for (let i = 0; i < 2; i++) {
            const sidePetal = document.createElement("div");
            sidePetal.className = "petal orchid-side-petal";
            sidePetal.style.backgroundColor = color;
            sidePetal.style.transform = `rotate(${
                i === 0 ? -40 : 40
            }deg) translateY(-5px)`;
            petalsContainer.appendChild(sidePetal);
        }

        // Tạo cánh nhỏ phía trên
        for (let i = 0; i < 2; i++) {
            const topPetal = document.createElement("div");
            topPetal.className = "petal orchid-top-petal";
            topPetal.style.backgroundColor = color;
            topPetal.style.transform = `rotate(${
                i === 0 ? -15 : 15
            }deg) translateY(-22px)`;
            petalsContainer.appendChild(topPetal);
        }

        // Tạo phần môi lan
        const lip = document.createElement("div");
        lip.className = "orchid-lip";
        lip.style.backgroundColor = adjustColorBrightness(color, 90);
        petalsContainer.appendChild(lip);
    }

    // Tạo cánh hoa cẩm chướng (mới)
    function createCarnationPetals(petalsContainer, color) {
        // Tạo nhiều lớp cánh
        for (let layer = 0; layer < 4; layer++) {
            const petalLayer = document.createElement("div");
            petalLayer.className = "petal-layer";
            petalLayer.style.transform = `rotate(${(layer * 15) / 2}deg)`;

            // Số cánh mỗi lớp
            const petalCount = 10 + layer * 2;

            for (let i = 0; i < petalCount; i++) {
                const petal = document.createElement("div");
                petal.className = "petal carnation-petal";
                const angle = (i / petalCount) * 360;
                petal.style.transform = `rotate(${angle}deg) translateY(-${
                    15 - layer * 2
                }px)`;

                // Màu chuyển dần từ trong ra ngoài
                const brightness = 100 - layer * 5;
                petal.style.backgroundColor = adjustColorBrightness(
                    color,
                    brightness
                );

                // Độ trong suốt giảm dần từ trong ra ngoài
                petal.style.opacity = 1 - layer * 0.15;

                petalLayer.appendChild(petal);
            }

            petalsContainer.appendChild(petalLayer);
        }
    }

    // Tạo cánh hoa loa kèn (mới)
    function createLilyPetals(petalsContainer, color) {
        // Tạo 6 cánh hoa loa kèn
        for (let i = 0; i < 6; i++) {
            const petal = document.createElement("div");
            petal.className = "petal lily-petal";
            const angle = i * 60;

            // Cánh cong và dài
            petal.style.transform = `rotate(${angle}deg) translateY(-20px)`;
            petal.style.backgroundColor = color;

            if (i % 2 === 0) {
                // Cánh ngoài lớn hơn
                petal.style.width = "12px";
                petal.style.height = "35px";
            } else {
                // Cánh trong nhỏ hơn
                petal.style.width = "10px";
                petal.style.height = "30px";
            }

            petalsContainer.appendChild(petal);
        }

        // Thêm nhụy hoa
        for (let i = 0; i < 1; i++) {
            const stamen = document.createElement("div");
            stamen.className = "lily-stamen";
            stamen.style.transform = `rotate(${i * 60}deg)`;
            petalsContainer.appendChild(stamen);

            // Thêm đầu nhụy
            const anther = document.createElement("div");
            anther.className = "lily-anther";
            stamen.appendChild(anther);
        }
    }

    // Tạo cánh hoa mẫu đơn (mới)
    function createPeonyPetals(petalsContainer, color) {
        // Nhiều lớp cánh dày đặc
        for (let layer = 0; layer < 5; layer++) {
            const petalLayer = document.createElement("div");
            petalLayer.className = "petal-layer";
            petalLayer.style.transform = `rotate(${layer * 9}deg)`;

            // Số cánh mỗi lớp tăng dần từ trong ra ngoài
            const petalCount = 8 + layer * 4;

            for (let i = 0; i < petalCount; i++) {
                const petal = document.createElement("div");
                petal.className = "petal peony-petal";
                const angle = (i / petalCount) * 360;

                // Kích thước cánh giảm dần từ ngoài vào trong
                const scale = 1 - layer * 0.15;
                petal.style.transform = `rotate(${angle}deg) translateY(-${
                    18 - layer * 2.5
                }px) scale(${scale})`;

                // Màu sáng dần từ trong ra ngoài
                const brightness = 85 + layer * 5;
                petal.style.backgroundColor = adjustColorBrightness(
                    color,
                    brightness
                );

                petalLayer.appendChild(petal);
            }

            petalsContainer.appendChild(petalLayer);
        }
    }

    // Tạo cánh hoa mặc định
    function createDefaultPetals(petalsContainer, color) {
        for (let i = 0; i < 8; i++) {
            const petal = document.createElement("div");
            petal.className = "petal";
            const angle = i * 45;
            petal.style.transform = `rotate(${angle}deg) translateY(-15px)`;
            petal.style.color = color;

            petalsContainer.appendChild(petal);
        }
    }

    // Điều chỉnh độ sáng của màu
    function adjustColorBrightness(hex, percent) {
        // Chuyển từ hex sang rgb
        let r = parseInt(hex.substring(1, 3), 16);
        let g = parseInt(hex.substring(3, 5), 16);
        let b = parseInt(hex.substring(5, 7), 16);

        // Điều chỉnh độ sáng
        r = Math.round(r * (percent / 100));
        g = Math.round(g * (percent / 100));
        b = Math.round(b * (percent / 100));

        // Giới hạn giá trị
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));

        // Chuyển lại thành hex
        return `#${r
            .toString(16)
            .padStart(
                2,
                "0"
            )}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    }

    // Hiệu ứng nở hoa tuần tự
    function bloomBouquet(flowers) {
        flowers.forEach((flower, index) => {
            setTimeout(() => {
                flower.classList.add("bloom");

                // Thêm hiệu ứng lắc nhẹ khi mỗi hoa nở
                flower.classList.add("shake");
                setTimeout(() => {
                    flower.classList.remove("shake");
                }, 500);

                // Thêm hiệu ứng tỏa sáng cho một số hoa
                if (index % 3 === 0) {
                    addGlowEffect(flower);
                }

                // Thêm hiệu ứng lá rơi cho một số hoa
                if (index % 4 === 0) {
                    createFallingPetal(flower);
                }
            }, index * 150); // Thời gian trễ ngắn hơn để hiệu ứng nhanh hơn
        });
    }

    // Thêm hiệu ứng tỏa sáng
    function addGlowEffect(flower) {
        const glow = document.createElement("div");
        glow.className = "flower-glow";

        // Lấy màu từ hoa
        const petalElement = flower.querySelector(".petal");
        if (petalElement) {
            const petalColor = window.getComputedStyle(petalElement).color;
            glow.style.boxShadow = `0 0 20px ${petalColor}`;
        }

        flower.appendChild(glow);

        // Xóa hiệu ứng sau khi hoàn thành
        setTimeout(() => {
            glow.remove();
        }, 1000);
    }

    // Tạo hiệu ứng cánh hoa rơi
    function createFallingPetal(flower) {
        const bouquetContainer = flower.parentElement;
        if (!bouquetContainer) return;

        // Lấy vị trí của hoa
        const flowerRect = flower.getBoundingClientRect();
        const containerRect = bouquetContainer.getBoundingClientRect();

        // Tạo hai cánh hoa rơi
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
                const fallingPetal = document.createElement("div");
                fallingPetal.className = "falling-petal";

                // Lấy màu từ hoa
                const petalElement = flower.querySelector(".petal");
                if (petalElement) {
                    const petalColor =
                        window.getComputedStyle(petalElement).color;
                    fallingPetal.style.backgroundColor = petalColor;
                } else {
                    fallingPetal.style.backgroundColor = "#f8a5c2"; // Màu dự phòng
                }

                // Vị trí bắt đầu
                const startX =
                    flowerRect.left - containerRect.left + flowerRect.width / 2;
                const startY =
                    flowerRect.top - containerRect.top + flowerRect.height / 2;

                fallingPetal.style.left = `${startX}px`;
                fallingPetal.style.top = `${startY}px`;

                // Thêm vào container
                bouquetContainer.appendChild(fallingPetal);

                // Xóa sau khi animation hoàn thành
                setTimeout(() => {
                    fallingPetal.remove();
                }, 3000);
            }, i * 500);
        }
    }

    // Animation toàn bộ bó hoa
    function animateBouquet(bouquetElement) {
        // Thêm hiệu ứng chuyển động cho bó hoa
        bouquetElement.classList.add("animate");

        // Tạo hiệu ứng ánh sáng cho bó hoa
        const bouquetLight = document.createElement("div");
        bouquetLight.className = "bouquet-light";
        bouquetElement.appendChild(bouquetLight);

        // Tạo các ánh sáng nhỏ xung quanh
        for (let i = 0; i < 15; i++) {
            // Tăng số lượng ánh sáng
            setTimeout(() => {
                createSparkle(bouquetElement);
            }, i * 250);
        }
    }

    // Thêm hiệu ứng bướm bay (mới)
    function addButterflyEffect(container) {
        const butterflyCount = 3;

        for (let i = 0; i < butterflyCount; i++) {
            const butterfly = document.createElement("div");
            butterfly.className = "butterfly";

            // Bướm với màu sắc khác nhau
            const colors = ["#ff9ff3", "#74b9ff", "#55efc4", "#fdcb6e"];
            const colorIndex = Math.floor(Math.random() * colors.length);
            butterfly.style.setProperty(
                "--butterfly-color",
                colors[colorIndex]
            );

            // Tạo cánh bướm
            const leftWing = document.createElement("div");
            leftWing.className = "butterfly-wing left-wing";

            const rightWing = document.createElement("div");
            rightWing.className = "butterfly-wing right-wing";

            const body = document.createElement("div");
            body.className = "butterfly-body";

            butterfly.appendChild(leftWing);
            butterfly.appendChild(rightWing);
            butterfly.appendChild(body);

            // Vị trí bắt đầu và thông số bay
            butterfly.style.left = `${-50 + i * 50}px`;
            butterfly.style.bottom = `${50 + i * 100}px`;
            butterfly.style.animationDelay = `${i * 0.5}s`;

            // Thêm vào container
            container.appendChild(butterfly);

            // Animation bay tự do
            animateButterfly(butterfly, container, i);
        }
    }

    // Animation bay tự do cho bướm (mới)
    function animateButterfly(butterfly, container, index) {
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        // Các điểm dừng trong quỹ đạo bay
        const waypoints = [
            { x: containerWidth * 0.3, y: containerHeight * 0.7 },
            { x: containerWidth * 0.6, y: containerHeight * 0.5 },
            { x: containerWidth * 0.4, y: containerHeight * 0.8 },
            { x: containerWidth * 0.7, y: containerHeight * 0.6 },
            { x: containerWidth + 50, y: containerHeight * 0.3 },
        ];

        // Tốc độ bay khác nhau cho mỗi con bướm
        const baseSpeed = 2000 + index * 500;

        // Di chuyển qua từng điểm
        waypoints.forEach((point, i) => {
            setTimeout(() => {
                const speed = baseSpeed + Math.random() * 1000;

                butterfly.animate(
                    [
                        {
                            left: butterfly.style.left,
                            bottom: butterfly.style.bottom,
                        },
                        { left: `${point.x}px`, bottom: `${point.y}px` },
                    ],
                    {
                        duration: speed,
                        easing: "ease-in-out",
                        fill: "forwards",
                    }
                ).onfinish = () => {
                    butterfly.style.left = `${point.x}px`;
                    butterfly.style.bottom = `${point.y}px`;

                    // Khi đến điểm cuối, xóa bướm
                    if (i === waypoints.length - 1) {
                        setTimeout(() => {
                            butterfly.remove();
                        }, 500);
                    }
                };
            }, i * (baseSpeed + 1000));
        });
    }

    // Tạo hiệu ứng tia sáng
    function createSparkle(bouquetElement) {
        const sparkle = document.createElement("div");
        sparkle.className = "bouquet-sparkle";

        // Vị trí ngẫu nhiên quanh bó hoa
        const posX = Math.random() * 120 - 60; // Phạm vi rộng hơn
        const posY = 150 + Math.random() * 200; // Phạm vi cao hơn

        sparkle.style.left = `calc(50% + ${posX}px)`;
        sparkle.style.bottom = `${posY}px`;

        // Kích thước ngẫu nhiên
        const size = 3 + Math.random() * 5;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;

        // Màu sắc ngẫu nhiên
        const sparkleColors = [
            "#ffffff",
            "#ffeaa7",
            "#55efc4",
            "#74b9ff",
            "#ff9ff3",
        ];
        const colorIndex = Math.floor(Math.random() * sparkleColors.length);
        sparkle.style.backgroundColor = sparkleColors[colorIndex];
        sparkle.style.boxShadow = `0 0 10px ${sparkleColors[colorIndex]}`;

        bouquetElement.appendChild(sparkle);

        // Xóa sau khi animation hoàn thành
        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }

    //=============================================================================
    // PHẦN 6: HIỆU ỨNG KHÁC & KHỞI TẠO
    //=============================================================================

    // Sự kiện nút Bất ngờ
    surpriseButton.addEventListener("click", function () {
        modalOverlay.classList.add("active");
        setTimeout(() => {
            // Sử dụng pháo hoa nâng cao
            createEnhancedFireworks(fireworksContainer, 5);
        }, 500);
    });

    // Đóng cửa sổ modal
    modalClose.addEventListener("click", function () {
        modalOverlay.classList.remove("active");
    });

    // Khởi tạo
    setTimeout(() => {
        pageElements[0].classList.add("active");
    }, 500);
});
