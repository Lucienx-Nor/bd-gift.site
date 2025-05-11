/**
 * Hiệu ứng hoa bay ngang từ trái sang phải - phiên bản nâng cấp
 */

let horizontalFlowersInterval;
let horizontalFlowersContainer;
let isHorizontalFlowersActive = false;

function createHorizontalFlowersContainer() {
    // Kiểm tra xem container đã tồn tại chưa
    if (!document.getElementById("horizontal-flowers")) {
        horizontalFlowersContainer = document.createElement("div");
        horizontalFlowersContainer.id = "horizontal-flowers";
        horizontalFlowersContainer.className = "horizontal-flowers-container";

        // Thêm vào trang 4
        const page4 = document.getElementById("page-4");
        if (page4) {
            // Đảm bảo page4 có position relative nếu chưa có
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

function createHorizontalFlower() {
    // Lấy hoặc tạo container
    const container =
        horizontalFlowersContainer || createHorizontalFlowersContainer();

    // Tạo phần tử hoa
    const flower = document.createElement("div");
    flower.className = "horizontal-flower";

    // Loại hoa ngẫu nhiên (1-6, tăng từ 3 loại lên 6 loại)
    const typeClass = `type-${Math.floor(Math.random() * 6) + 1}`;
    flower.classList.add(typeClass);

    // Kích thước ngẫu nhiên (1-5, thêm kích thước 5)
    const sizeClass = `size-${Math.floor(Math.random() * 5) + 1}`;
    flower.classList.add(sizeClass);

    // Vị trí dọc ngẫu nhiên (5%-95% chiều cao container, tăng phạm vi)
    const topPosition = 5 + Math.random() * 90;
    flower.style.top = `${topPosition}%`;

    // Tham số chuyển động ngẫu nhiên với nhiều điểm hơn
    const waveYStart = Math.random() * 40 - 20 + "px"; // -20px đến +20px
    const waveYMid = Math.random() * 80 - 40 + "px"; // -40px đến +40px
    const waveYEnd = Math.random() * 100 - 50 + "px"; // -50px đến +50px

    const rotationStart = Math.random() * 90 + "deg"; // 0-90 độ xoay ban đầu
    const rotationMid = Math.random() * 180 + 90 + "deg"; // 90-270 độ xoay giữa
    const rotationEnd = Math.random() * 360 + "deg"; // 0-360 độ xoay cuối

    flower.style.setProperty("--wave-y-start", waveYStart);
    flower.style.setProperty("--wave-y-mid", waveYMid);
    flower.style.setProperty("--wave-y", waveYEnd);

    flower.style.setProperty("--rotation-start", rotationStart);
    flower.style.setProperty("--rotation-mid", rotationMid);
    flower.style.setProperty("--rotation", rotationEnd);

    // Xác định kiểu animation (thêm nhiều kiểu)
    const animationType = Math.random();

    if (animationType < 0.2) {
        // ZigZag pattern (20% cơ hội)
        flower.classList.add("zigzag");

        // Tham số zigzag
        const zig1 = Math.random() * 60 - 30 + "px";
        const zag1 = Math.random() * 60 - 30 + "px";
        const zig2 = Math.random() * 60 - 30 + "px";
        const zag2 = Math.random() * 60 - 30 + "px";
        const zig3 = Math.random() * 60 - 30 + "px";
        const zag3 = Math.random() * 60 - 30 + "px";

        flower.style.setProperty("--zig1", zig1);
        flower.style.setProperty("--zag1", zag1);
        flower.style.setProperty("--zig2", zig2);
        flower.style.setProperty("--zag2", zag2);
        flower.style.setProperty("--zig3", zig3);
        flower.style.setProperty("--zag3", zag3);
    } else if (animationType < 0.4) {
        // Thêm hiệu ứng phát sáng (20% cơ hội)
        flower.classList.add("with-glow");
    } else {
        // Hiệu ứng bay tiêu chuẩn (60% cơ hội)
    }

    // Thêm hiệu ứng phụ
    const secondaryEffect = Math.random();

    if (secondaryEffect < 0.25) {
        // Hiệu ứng nổi (25% cơ hội)
        flower.classList.add("floating-effect");
        // Tham số nổi ngẫu nhiên
        const floatDist = Math.random() * 30 - 15 + "px"; // -15px đến +15px khoảng cách nổi
        const floatRot = Math.random() * 20 - 10 + "deg"; // -10deg đến +10deg xoay
        flower.style.setProperty("--float-dist", floatDist);
        flower.style.setProperty("--float-rot", floatRot);
    } else if (secondaryEffect < 0.5) {
        // Hiệu ứng xoay tròn (25% cơ hội)
        flower.classList.add("spinning-effect");
    } else if (secondaryEffect < 0.75) {
        // Hiệu ứng phóng to thu nhỏ (25% cơ hội)
        flower.classList.add("pulsing-effect");
    } else {
        // Hiệu ứng cánh bướm (25% cơ hội)
        flower.classList.add("butterfly-effect");
    }

    // Thời gian animation ngẫu nhiên (5-12s, tăng thời gian tối đa)
    const duration = 5 + Math.random() * 7;
    flower.style.animationDuration = `${duration}s`;

    // Thêm vào container
    container.appendChild(flower);

    // Xóa hoa sau khi animation kết thúc
    setTimeout(() => {
        if (flower && flower.parentNode) {
            flower.parentNode.removeChild(flower);
        }
    }, duration * 1000);
}

function startHorizontalFlowers() {
    if (!isHorizontalFlowersActive) {
        isHorizontalFlowersActive = true;

        // Tạo container nếu chưa tồn tại
        createHorizontalFlowersContainer();

        // Tạo lô hoa ban đầu nhiều hơn (25 hoa thay vì 15)
        for (let i = 0; i < 25; i++) {
            setTimeout(() => {
                createHorizontalFlower();
            }, i * 150); // Giảm thời gian chờ giữa mỗi lần tạo
        }

        // Tạo hoa định kỳ thường xuyên hơn
        horizontalFlowersInterval = setInterval(createHorizontalFlower, 200); // 200ms thay vì 300ms
    }
}

function stopHorizontalFlowers() {
    if (isHorizontalFlowersActive) {
        isHorizontalFlowersActive = false;

        // Xóa interval
        clearInterval(horizontalFlowersInterval);

        // Xóa hết hoa trong container
        if (horizontalFlowersContainer) {
            horizontalFlowersContainer.innerHTML = "";
        }
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

        // Đặt lịch tạo burst hiệu ứng ngẫu nhiên
        setTimeout(createFlowerBurst, 2000);
        setTimeout(createFlowerBurst, 5000);
        setTimeout(createFlowerBurst, 8000);
    }

    // Tạo hiệu ứng bùng nổ hoa
    function createFlowerBurst() {
        if (isHorizontalFlowersActive) {
            // Tạo một loạt hoa cùng lúc
            for (let i = 0; i < 15; i++) {
                setTimeout(createHorizontalFlower, i * 50);
            }

            // Lên lịch bùng nổ tiếp theo
            const nextBurst = 3000 + Math.random() * 5000; // 3-8 giây
            setTimeout(createFlowerBurst, nextBurst);
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

            // Thêm hiệu ứng bùng nổ khi click
            setTimeout(createFlowerBurst, 300);
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
        setTimeout(startAllFlowerAnimations, 500);
    }
});
