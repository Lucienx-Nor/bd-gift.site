/**
 * Hiệu ứng hoa bay ngang - tối ưu nhưng vẫn đẹp
 */

// Biến toàn cục
let horizontalFlowersInterval;
let horizontalFlowersContainer;
let isHorizontalFlowersActive = false;
let flowerCount = 0;
const MAX_FLOWERS = 60; // Số lượng hoa tối đa (tăng từ 50 lên 60 để vẫn đẹp)
const FLOWER_TYPES = 6; // Giữ đủ 6 loại hoa
const FLOWER_SIZES = 5; // Giữ đủ 5 kích thước
const ANIMATION_CLASSES = ["fly-normal", "fly-zigzag", "fly-wave"]; // Lớp animation
const EFFECT_CLASSES = ["floating", "spinning", "pulsing", "butterfly"]; // Hiệu ứng phụ

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
    if (flowerCount >= MAX_FLOWERS) {
        return;
    }

    const container =
        horizontalFlowersContainer || createHorizontalFlowersContainer();

    // Tạo phần tử hoa
    const flower = document.createElement("div");
    flower.className = "horizontal-flower";

    // Chọn kiểu và kích thước ngẫu nhiên
    const typeIndex = Math.floor(Math.random() * FLOWER_TYPES) + 1;
    const sizeIndex = Math.floor(Math.random() * FLOWER_SIZES) + 1;

    flower.classList.add(`type-${typeIndex}`);
    flower.classList.add(`size-${sizeIndex}`);

    // Vị trí dọc ngẫu nhiên
    flower.style.top = `${5 + Math.random() * 90}%`;

    // Chọn kiểu animation
    const animIndex = Math.floor(Math.random() * ANIMATION_CLASSES.length);
    const animClass = ANIMATION_CLASSES[animIndex];
    flower.classList.add(animClass);

    // Thêm tham số tùy chỉnh dựa vào kiểu animation
    if (animClass === "fly-normal") {
        // Cho đường bay tiêu chuẩn
        const waveYStart = Math.random() * 30 - 15 + "px";
        const waveYMid = Math.random() * 60 - 30 + "px";
        const waveYEnd = Math.random() * 60 - 30 + "px";

        const rotStart = Math.random() * 90 + "deg";
        const rotMid = Math.random() * 180 + 90 + "deg";
        const rotEnd = Math.random() * 360 + "deg";

        flower.style.setProperty("--wave-y-start", waveYStart);
        flower.style.setProperty("--wave-y-mid", waveYMid);
        flower.style.setProperty("--wave-y", waveYEnd);

        flower.style.setProperty("--rotation-start", rotStart);
        flower.style.setProperty("--rotation-mid", rotMid);
        flower.style.setProperty("--rotation", rotEnd);
    } else if (animClass === "fly-zigzag") {
        // Cho đường bay zích zắc
        const zig1 = Math.random() * 40 - 20 + "px";
        const zag1 = Math.random() * 40 - 20 + "px";
        const zig2 = Math.random() * 40 - 20 + "px";
        const zag2 = Math.random() * 40 - 20 + "px";
        const zig3 = Math.random() * 40 - 20 + "px";

        flower.style.setProperty("--zig1", zig1);
        flower.style.setProperty("--zag1", zag1);
        flower.style.setProperty("--zig2", zig2);
        flower.style.setProperty("--zag2", zag2);
        flower.style.setProperty("--zig3", zig3);

        // Góc xoay cho zigzag
        flower.style.setProperty("--rot1", `${Math.random() * 45}deg`);
        flower.style.setProperty("--rot2", `${Math.random() * 45 + 45}deg`);
        flower.style.setProperty("--rot3", `${Math.random() * 90 + 135}deg`);
        flower.style.setProperty("--rot4", `${Math.random() * 90 + 225}deg`);
        flower.style.setProperty("--rot5", `${Math.random() * 45 + 315}deg`);
    }

    // Thêm hiệu ứng ánh sáng cho 20% hoa
    if (Math.random() < 0.2) {
        flower.classList.add("with-glow");
    }

    // Thêm hiệu ứng phụ khác cho 50% hoa còn lại
    if (Math.random() < 0.5) {
        const effectIndex = Math.floor(Math.random() * EFFECT_CLASSES.length);
        flower.classList.add(EFFECT_CLASSES[effectIndex]);
    }

    // Thời gian animation ngẫu nhiên nhưng giới hạn
    const duration = 7 + Math.random() * 5; // 7-12s
    flower.style.animationDuration = `${duration}s`;

    // Thêm vào container và tăng biến đếm
    container.appendChild(flower);
    flowerCount++;

    // Xóa hoa sau khi animation kết thúc
    setTimeout(() => {
        if (flower && flower.parentNode) {
            flower.parentNode.removeChild(flower);
            flowerCount--; // Giảm biến đếm khi xóa
        }
    }, duration * 1000);
}

// Sử dụng requestAnimationFrame để tối ưu timing
let lastFlowerTime = 0;
const FLOWER_INTERVAL = 250; // 250ms giữa mỗi lần tạo hoa (tối ưu hơn)

function animationLoop(timestamp) {
    if (!isHorizontalFlowersActive) return;

    // Chỉ tạo hoa sau mỗi khoảng thời gian
    if (timestamp - lastFlowerTime > FLOWER_INTERVAL) {
        createHorizontalFlower();
        lastFlowerTime = timestamp;
    }

    requestAnimationFrame(animationLoop);
}

// Bắt đầu hiệu ứng hoa bay
function startHorizontalFlowers() {
    if (!isHorizontalFlowersActive) {
        isHorizontalFlowersActive = true;
        flowerCount = 0; // Reset biến đếm

        // Tạo container nếu chưa tồn tại
        createHorizontalFlowersContainer();

        // Tạo lô hoa ban đầu với số lượng vừa phải
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                if (isHorizontalFlowersActive) {
                    createHorizontalFlower();
                }
            }, i * 150);
        }

        // Sử dụng requestAnimationFrame thay vì setInterval
        lastFlowerTime = performance.now();
        requestAnimationFrame(animationLoop);
    }
}

// Tạo hiệu ứng bùng nổ hoa
function createFlowerBurst() {
    if (!isHorizontalFlowersActive) return;

    // Số lượng hoa trong bùng nổ (tối ưu hơn)
    const burstCount = Math.min(10, MAX_FLOWERS - flowerCount);

    for (let i = 0; i < burstCount; i++) {
        setTimeout(() => {
            if (isHorizontalFlowersActive) {
                createHorizontalFlower();
            }
        }, i * 80);
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

// Thực thi khi trang tải
document.addEventListener("DOMContentLoaded", function () {
    // Lấy các phần tử
    const bloomButton = document.getElementById("bloom-flowers");
    const page4 = document.getElementById("page-4");

    // Hàm bắt đầu tất cả animation hoa
    function startAllFlowerAnimations() {
        // Bắt đầu hiệu ứng hoa bay ngang
        startHorizontalFlowers();

        // Lên lịch tạo bùng nổ ngẫu nhiên theo thời gian
        setTimeout(() => {
            if (isHorizontalFlowersActive) {
                createFlowerBurst();
                // Lập lịch bùng nổ tiếp theo, nhưng chỉ nếu hiệu ứng vẫn đang chạy
                setTimeout(() => {
                    if (isHorizontalFlowersActive) {
                        createFlowerBurst();
                    }
                }, 4000 + Math.random() * 2000);
            }
        }, 3000);
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

            // Thêm bùng nổ khi click
            setTimeout(createFlowerBurst, 500);
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
        // Chờ một chút để trang hiển thị đầy đủ
        setTimeout(startAllFlowerAnimations, 500);
    }
});
