/**
 * Hiệu ứng hoa bay ngang - tối ưu đặc biệt cho di động
 */

// Biến toàn cục
let horizontalFlowersInterval;
let horizontalFlowersContainer;
let isHorizontalFlowersActive = false;
let flowerCount = 0;
let isMobile = false;

// Phát hiện thiết bị di động
function detectMobile() {
    return (
        window.innerWidth <= 768 ||
        navigator.maxTouchPoints > 0 ||
        navigator.userAgent.toLowerCase().indexOf("mobile") > -1
    );
}

// Cấu hình dựa trên thiết bị
function getDeviceConfig() {
    isMobile = detectMobile();

    // Giảm số lượng hoa trên di động
    const config = {
        maxFlowers: isMobile ? 20 : 40, // Giảm mạnh cho di động
        flowerInterval: isMobile ? 400 : 250, // Tạo hoa chậm hơn trên di động
        initialBatch: isMobile ? 8 : 15, // Ít hoa hơn khi bắt đầu
        burstSize: isMobile ? 5 : 10, // Ít hoa trong hiệu ứng bùng nổ
        effectChance: isMobile ? 0.3 : 0.5, // Ít hiệu ứng phụ hơn
        flowerTypes: isMobile ? 4 : 4, // Giảm số loại hoa
        flowerSizes: isMobile ? 3 : 4, // Giảm số kích thước
    };

    return config;
}

// Lấy cấu hình hiện tại
let CONFIG = getDeviceConfig();

// Tạo container chứa hoa bay
function createHorizontalFlowersContainer() {
    if (!document.getElementById("horizontal-flowers")) {
        horizontalFlowersContainer = document.createElement("div");
        horizontalFlowersContainer.id = "horizontal-flowers";
        horizontalFlowersContainer.className = "horizontal-flowers-container";

        const page4 = document.getElementById("page-4");
        if (page4) {
            const pageStyle = window.getComputedStyle(page4);
            if (pageStyle.position === "static") {
                page4.style.position = "relative";
            }
            page4.appendChild(horizontalFlowersContainer);
        }
    } else {
        horizontalFlowersContainer =
            document.getElementById("horizontal-flowers");
    }

    return horizontalFlowersContainer;
}

// Tạo một bông hoa
function createHorizontalFlower() {
    // Kiểm tra số lượng tối đa
    if (flowerCount >= CONFIG.maxFlowers) {
        return;
    }

    const container =
        horizontalFlowersContainer || createHorizontalFlowersContainer();

    // Tạo phần tử hoa
    const flower = document.createElement("div");
    flower.className = "horizontal-flower";

    // Chọn kiểu và kích thước ngẫu nhiên nhưng hạn chế
    const typeIndex = Math.floor(Math.random() * CONFIG.flowerTypes) + 1;
    const sizeIndex = Math.floor(Math.random() * CONFIG.flowerSizes) + 1;

    flower.classList.add(`type-${typeIndex}`);
    flower.classList.add(`size-${sizeIndex}`);

    // Vị trí dọc ngẫu nhiên
    flower.style.top = `${10 + Math.random() * 80}%`;

    // Chọn kiểu animation đơn giản
    const animRand = Math.random();
    if (animRand < 0.5) {
        flower.classList.add("anim-simple");

        // Chỉ thêm 1 thuộc tính tùy chỉnh đơn giản
        flower.style.setProperty("--end-y", `${Math.random() * 40 - 20}px`);
    } else if (animRand < 0.8) {
        flower.classList.add("anim-wave");
        flower.style.setProperty("--wave-height", `${Math.random() * 30}px`);
    } else {
        flower.classList.add("anim-zigzag");
        flower.style.setProperty("--zig", `${Math.random() * 30}px`);
        flower.style.setProperty("--zag", `-${Math.random() * 30}px`);
    }

    // Giới hạn hiệu ứng phụ trên di động
    if (Math.random() < CONFIG.effectChance) {
        // Chỉ áp dụng hiệu ứng đơn giản
        flower.classList.add(
            Math.random() < 0.5 ? "rotate-slow" : "float-simple"
        );
    }

    // Thời gian animation
    const duration = 8 + Math.random() * 4; // 8-12s
    flower.style.animationDuration = `${duration}s`;

    // Thêm vào container và tăng biến đếm
    container.appendChild(flower);
    flowerCount++;

    // Xóa hoa sau khi animation kết thúc
    setTimeout(() => {
        if (flower && flower.parentNode) {
            flower.parentNode.removeChild(flower);
            flowerCount--;
        }
    }, duration * 1000);
}

// Sử dụng requestAnimationFrame với ít tính toán hơn
let lastFlowerTime = 0;

function animationLoop(timestamp) {
    if (!isHorizontalFlowersActive) return;

    // Chỉ tạo hoa sau mỗi khoảng thời gian
    if (timestamp - lastFlowerTime > CONFIG.flowerInterval) {
        createHorizontalFlower();
        lastFlowerTime = timestamp;
    }

    requestAnimationFrame(animationLoop);
}

// Bắt đầu hiệu ứng hoa bay
function startHorizontalFlowers() {
    if (!isHorizontalFlowersActive) {
        isHorizontalFlowersActive = true;
        flowerCount = 0;

        // Cập nhật cấu hình dựa trên thiết bị hiện tại
        CONFIG = getDeviceConfig();

        // Tạo container nếu chưa tồn tại
        createHorizontalFlowersContainer();

        // Tạo lô hoa ban đầu với số lượng vừa phải
        for (let i = 0; i < CONFIG.initialBatch; i++) {
            setTimeout(() => {
                if (isHorizontalFlowersActive) {
                    createHorizontalFlower();
                }
            }, i * 200);
        }

        // Sử dụng requestAnimationFrame
        lastFlowerTime = performance.now();
        requestAnimationFrame(animationLoop);
    }
}

// Tạo hiệu ứng bùng nổ hoa
function createFlowerBurst() {
    if (!isHorizontalFlowersActive) return;

    // Số lượng hoa trong bùng nổ
    const burstCount = Math.min(
        CONFIG.burstSize,
        CONFIG.maxFlowers - flowerCount
    );

    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            if (isHorizontalFlowersActive) {
                createHorizontalFlower();
            }
        }, i * 100);
    }
}

// Dừng hiệu ứng hoa bay
function stopHorizontalFlowers() {
    if (isHorizontalFlowersActive) {
        isHorizontalFlowersActive = false;

        // Xóa hết hoa trong container
        if (horizontalFlowersContainer) {
            horizontalFlowersContainer.innerHTML = "";
        }

        // Reset biến đếm
        flowerCount = 0;
    }
}

// Thực thi khi trang tải và khi thay đổi kích thước màn hình
document.addEventListener("DOMContentLoaded", function () {
    // Lấy các phần tử
    const bloomButton = document.getElementById("bloom-flowers");
    const page4 = document.getElementById("page-4");

    // Phát hiện thiết bị di động
    CONFIG = getDeviceConfig();

    // Lắng nghe sự kiện thay đổi kích thước màn hình để cập nhật thiết lập
    window.addEventListener("resize", function () {
        // Cập nhật cấu hình khi thay đổi kích thước
        CONFIG = getDeviceConfig();
    });

    // Hàm bắt đầu animation hoa
    function startAllFlowerAnimations() {
        // Bắt đầu hiệu ứng hoa bay ngang
        startHorizontalFlowers();

        // Lên lịch bùng nổ chỉ nếu không phải thiết bị di động
        if (!isMobile) {
            setTimeout(() => {
                if (isHorizontalFlowersActive) {
                    createFlowerBurst();
                }
            }, 3000);
        }
    }

    // Thêm sự kiện click vào nút làm nở hoa
    if (bloomButton) {
        // Lưu xử lý click ban đầu nếu có
        const originalClickHandler = bloomButton.onclick;

        // Thay thế bằng xử lý mới
        bloomButton.onclick = function (event) {
            // Gọi xử lý ban đầu nếu có
            if (originalClickHandler) {
                originalClickHandler.call(this, event);
            }

            // Bắt đầu hiệu ứng hoa bay ngang
            startHorizontalFlowers();

            // Thêm bùng nổ nhỏ, ngay cả trên di động
            setTimeout(() => {
                if (isHorizontalFlowersActive) {
                    // Bùng nổ nhỏ hơn trên di động
                    createFlowerBurst();
                }
            }, 500);
        };
    }

    // Xử lý điều hướng
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
        item.addEventListener("click", function () {
            const targetPage = this.getAttribute("data-page");

            // Nếu chuyển đến trang 4, bắt đầu animation
            if (targetPage === "page-4") {
                setTimeout(startAllFlowerAnimations, 300);
            } else {
                // Nếu rời khỏi trang 4, dừng animation
                stopHorizontalFlowers();
            }
        });
    });

    // Kiểm tra nếu trang 4 đang active khi tải trang
    const isPage4Active =
        window.location.hash === "#page-4" ||
        (page4 && page4.classList.contains("active"));

    if (isPage4Active) {
        // Chờ trang tải xong
        setTimeout(startAllFlowerAnimations, 500);
    }
});
